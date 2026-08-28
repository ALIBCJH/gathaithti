import { NextResponse } from 'next/server';
import { sendContactEnquiry, type ContactEnquiry } from '@/lib/email/adapter';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { contactRules, serverMessage, validateAll, MIN_FILL_MS } from '@/lib/enquiry';

/**
 * The general enquiry endpoint, behind the contact page form.
 *
 * Same shape as /api/sample-request and the same defences, against the same
 * shared rules: rate limit, honeypot, minimum fill time, then validation. The
 * browser's checks are a courtesy; these are the ones that count.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const limit = rateLimit(clientKey(request.headers), 8);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Please try again later, or telephone the office.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  /* Honeypot and impossible speed: accept quietly so a bot learns nothing,
     but deliver nothing. */
  const elapsed = typeof body.elapsedMs === 'number' ? body.elapsedMs : Number.MAX_SAFE_INTEGER;
  if (asString(body.website) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const values = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone),
    organisation: asString(body.organisation),
    topic: asString(body.topic),
    memberNumber: asString(body.memberNumber),
    message: asString(body.message),
  };

  const errors = validateAll(values, contactRules);
  const firstError = Object.entries(errors)[0];
  if (firstError) {
    const [field, code] = firstError as [string, keyof typeof serverMessage];
    return NextResponse.json({ error: `${field}: ${serverMessage[code]}` }, { status: 422 });
  }

  const enquiry: ContactEnquiry = {
    ...values,
    locale: asString(body.locale) || 'en',
    submittedAt: new Date().toISOString(),
  };

  const delivery = await sendContactEnquiry(enquiry);
  if (!delivery.ok) {
    return NextResponse.json(
      { error: 'We could not send that just now. Please try again, or telephone the office.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
