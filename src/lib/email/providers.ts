import type { EmailMessage, EmailProvider, EmailResult } from './adapter';

/**
 * Default. Validates and accepts the enquiry, prints it to the server log and
 * reports success. Use it until real credentials exist — a form that silently
 * fails is worse than one that obviously logs.
 */
export const consoleProvider: EmailProvider = async (message: EmailMessage): Promise<EmailResult> => {
  console.info(
    [
      '',
      '──────── SAMPLE REQUEST (console provider — no email sent) ────────',
      `To:      ${message.to}`,
      `From:    ${message.from}`,
      `Reply-to:${message.replyTo ?? '—'}`,
      `Subject: ${message.subject}`,
      '',
      message.text,
      '───────────────────────────────────────────────────────────────────',
      'Set EMAIL_PROVIDER and credentials in .env.local to send this for real.',
      '',
    ].join('\n'),
  );
  return { ok: true, id: 'console' };
};

/**
 * Resend — https://resend.com. Needs RESEND_API_KEY and a verified sending
 * domain. No SDK: one fetch call, so the dependency list stays as it is.
 */
export const resendProvider: EmailProvider = async (message): Promise<EmailResult> => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY is not set' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `Resend responded ${response.status}: ${await response.text()}` };
  }

  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
};

/**
 * SMTP — for the society's own mail server. Deliberately not implemented: it
 * needs a mail library, and adding one before the credentials exist would put
 * a dependency in the tree for nothing.
 *
 *   npm install nodemailer && npm install -D @types/nodemailer
 *
 * then replace the body below with a createTransport call using SMTP_HOST,
 * SMTP_PORT, SMTP_USER and SMTP_PASS.
 */
export const smtpProvider: EmailProvider = async (): Promise<EmailResult> => ({
  ok: false,
  error:
    'The SMTP provider is a stub. Install nodemailer and implement smtpProvider in src/lib/email/providers.ts, or set EMAIL_PROVIDER=resend.',
});
