import { NextResponse } from 'next/server';
import { sendSampleRequest, type SampleRequest } from '@/lib/email/adapter';
import { clientKey, rateLimit } from '@/lib/rate-limit';

/**
 * The sample request endpoint.
 *
 * Everything here is server-side: the browser's validation is a courtesy, this
 * is the check that counts. In order —
 *   1. rate limit by IP          (5 requests per hour)
 *   2. honeypot field must be empty
 *   3. the form must have taken a human amount of time to fill in
 *   4. field validation
 *   5. hand off to the email adapter
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LIMITS = { name: 120, company: 160, email: 200, country: 80, role: 60, volume: 60, message: 4000 };
const LOT_MAX = 40;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2_500;

type Body = Record<string, unknown>;

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

function validate(body: Body): { ok: true; data: SampleRequest } | { ok: false; error: string } {
  const fields = {
    name: asString(body.name),
    company: asString(body.company),
    email: asString(body.email),
    country: asString(body.country),
    role: asString(body.role),
    volume: asString(body.volume),
    message: asString(body.message),
  };

  for (const [key, value] of Object.entries(fields)) {
    if (!value) return { ok: false, error: `Missing required field: ${key}.` };
    if (value.length > LIMITS[key as keyof typeof LIMITS]) {
      return { ok: false, error: `That ${key} is longer than we can accept.` };
    }
  }

  if (!EMAIL.test(fields.email)) return { ok: false, error: 'That email address does not look right.' };
  if (fields.message.length < 12) return { ok: false, error: 'Please tell us a little more.' };

  /* Header injection guard — these values end up in a mail header. */
  if (/[\r\n]/.test(fields.email + fields.name + fields.company)) {
    return { ok: false, error: 'Invalid characters in your details.' };
  }

  const lot = asString(body.lot);
  if (lot.length > LOT_MAX) return { ok: false, error: 'Unrecognised lot.' };

  return {
    ok: true,
    data: {
      ...fields,
      lot,
      locale: asString(body.locale) || 'en',
      submittedAt: new Date().toISOString(),
    },
  };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const limit = rateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests from this connection. Please try again later, or email us directly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  /* Honeypot: a hidden field no human can see, let alone fill in. Accept the
     request so the bot does not learn anything, but do not deliver it. */
  if (asString(body.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* Filled in impossibly fast — a script, not a buyer. */
  const elapsed = typeof body.elapsedMs === 'number' ? body.elapsedMs : Number.MAX_SAFE_INTEGER;
  if (elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = validate(body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 422 });

  const delivery = await sendSampleRequest(result.data);
  if (!delivery.ok) {
    return NextResponse.json(
      { error: 'We could not send that just now. Please try again, or email the office directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
