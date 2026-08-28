/**
 * ══════════════════════════════════════════════════════════════════════════
 *  ★ THIS IS THE ONLY FILE TO TOUCH TO MAKE THE FORM SEND REAL EMAIL.
 * ══════════════════════════════════════════════════════════════════════════
 *
 *  Out of the box the site runs the `console` provider: every sample request
 *  is validated, accepted, and printed to the server log. Nothing is lost and
 *  nothing is sent.
 *
 *  To send real email:
 *
 *    1. Choose a provider in .env.local
 *
 *         EMAIL_PROVIDER=resend
 *         RESEND_API_KEY=re_xxxxxxxxxxxx
 *         SAMPLE_REQUEST_TO=marketing@gathaithicoffee.co.ke
 *         SAMPLE_REQUEST_FROM="Gathaithi website <website@gathaithicoffee.co.ke>"
 *
 *    2. Add the same variables in the Vercel project settings.
 *
 *    3. Nothing else. The route handler already validates, rate-limits and
 *       formats the message; it only asks this adapter to deliver it.
 *
 *  To use a provider that is not listed, write a function with the shape of
 *  `EmailProvider` in ./providers.ts and add it to the switch below.
 */

import { consoleProvider, resendProvider, smtpProvider } from './providers';

export interface SampleRequest {
  name: string;
  company: string;
  email: string;
  country: string;
  role: string;
  volume: string;
  /** Id of the lot the buyer clicked through from, if any. */
  lot?: string;
  message: string;
  locale: string;
  submittedAt: string;
}

export interface EmailMessage {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export type EmailResult = { ok: true; id?: string } | { ok: false; error: string };

export type EmailProvider = (message: EmailMessage) => Promise<EmailResult>;

const providers: Record<string, EmailProvider> = {
  console: consoleProvider,
  resend: resendProvider,
  smtp: smtpProvider,
};

function chooseProvider(): { name: string; send: EmailProvider } {
  const name = (process.env.EMAIL_PROVIDER ?? 'console').toLowerCase();
  const send = providers[name];
  if (!send) {
    console.warn(
      `[email] Unknown EMAIL_PROVIDER "${name}". Falling back to console. Known: ${Object.keys(providers).join(', ')}`,
    );
    return { name: 'console', send: consoleProvider };
  }
  return { name, send };
}

/** Renders the enquiry as plain text. Deliberately plain — it is read, not admired. */
function format(request: SampleRequest): EmailMessage {
  const to = process.env.SAMPLE_REQUEST_TO ?? 'office@example.invalid';
  const from =
    process.env.SAMPLE_REQUEST_FROM ?? 'Gathaithi website <website@example.invalid>';

  const lines = [
    'New sample request from the Gathaithi website',
    '',
    `Name:      ${request.name}`,
    `Company:   ${request.company}`,
    `Email:     ${request.email}`,
    `Country:   ${request.country}`,
    `Role:      ${request.role}`,
    `Volume:    ${request.volume}`,
    `Lot:       ${request.lot || '—'}`,
    '',
    'Message:',
    request.message,
    '',
    '—',
    `Submitted: ${request.submittedAt}`,
    `Language:  ${request.locale}`,
  ];

  return {
    to,
    from,
    replyTo: request.email,
    subject: `Sample request — ${request.company || request.name} (${request.country})`,
    text: lines.join('\n'),
  };
}

export async function sendSampleRequest(request: SampleRequest): Promise<EmailResult> {
  const { name, send } = chooseProvider();
  try {
    const result = await send(format(request));
    if (!result.ok) console.error(`[email:${name}] delivery failed: ${result.error}`);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown email error';
    console.error(`[email:${name}] threw: ${message}`);
    return { ok: false, error: message };
  }
}
