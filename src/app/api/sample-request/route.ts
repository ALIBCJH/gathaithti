import { NextResponse } from 'next/server';
import { sendSampleRequest } from '@/lib/email/adapter';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { sampleRules, serverMessage, validateAll, MIN_FILL_MS } from '@/lib/enquiry';

/**
 * The sample request endpoint.
 *
 * Everything here is server-side: the browser's validation is a courtesy, this
 * is the check that counts. In order —
 *   1. rate limit by IP          (5 requests per hour)
 *   2. honeypot field must be empty
 *   3. the form must have taken a human amount of time to fill in
 *   4. field validation, against the same rules the browser used
 *      (src/lib/enquiry.ts — one definition, so the two cannot drift)
 *   5. hand off to the email adapter
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = Record<string, unknown>;

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

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

  const values = {
    name: asString(body.name),
    company: asString(body.company),
    email: asString(body.email),
    country: asString(body.country),
    role: asString(body.role),
    volume: asString(body.volume),
    lot: asString(body.lot),
    message: asString(body.message),
  };

  const errors = validateAll(values, sampleRules);
  const firstError = Object.entries(errors)[0];
  if (firstError) {
    const [field, code] = firstError as [string, keyof typeof serverMessage];
    return NextResponse.json({ error: `${field}: ${serverMessage[code]}` }, { status: 422 });
  }

  const delivery = await sendSampleRequest({
    ...values,
    locale: asString(body.locale) || 'en',
    submittedAt: new Date().toISOString(),
  });
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
