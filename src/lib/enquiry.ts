/**
 * Validation rules for the two enquiry forms, in one place.
 *
 * The browser and the route handler validate against the *same* rules: the
 * client for immediate feedback, the server because that is the check that
 * actually counts. Keeping one definition means the two can never drift, which
 * is how forms end up accepting something in the browser and rejecting it on
 * submit.
 *
 * Rules return error CODES rather than sentences, so the client can render the
 * message from the content files and the server can log plain English.
 */

export type ErrorCode = 'required' | 'email' | 'short' | 'long' | 'invalid';

export interface FieldRule {
  required?: boolean;
  /** Minimum trimmed length, applied only when a value is present. */
  min?: number;
  max: number;
  email?: boolean;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Values that end up in mail headers must not carry line breaks. */
const HEADER_SAFE = /^[^\r\n]*$/;

export function validateField(value: string, rule: FieldRule): ErrorCode | undefined {
  const trimmed = value.trim();

  if (!trimmed) return rule.required ? 'required' : undefined;
  if (trimmed.length > rule.max) return 'long';
  if (!HEADER_SAFE.test(trimmed)) return 'invalid';
  if (rule.email && !EMAIL.test(trimmed)) return 'email';
  if (rule.min && trimmed.length < rule.min) return 'short';

  return undefined;
}

export function validateAll<K extends string>(
  values: Partial<Record<K, string>>,
  rules: Record<K, FieldRule>,
): Partial<Record<K, ErrorCode>> {
  const errors: Partial<Record<K, ErrorCode>> = {};

  for (const key of Object.keys(rules) as K[]) {
    const code = validateField(values[key] ?? '', rules[key]);
    if (code) errors[key] = code;
  }

  return errors;
}

/* ── The sample request, on Our Coffee ───────────────────────────────────── */

export const sampleRules = {
  name: { required: true, max: 120 },
  company: { required: true, max: 160 },
  email: { required: true, max: 200, email: true },
  country: { required: true, max: 80 },
  role: { required: true, max: 60 },
  volume: { required: true, max: 60 },
  lot: { max: 40 },
  message: { required: true, min: 12, max: 4000 },
} satisfies Record<string, FieldRule>;

export type SampleField = keyof typeof sampleRules;

/* ── The general enquiry, on Contact ─────────────────────────────────────── */

export const contactRules = {
  name: { required: true, max: 120 },
  email: { required: true, max: 200, email: true },
  phone: { max: 40 },
  organisation: { max: 160 },
  topic: { required: true, max: 60 },
  /** Only asked of members, and only used to find their record. */
  memberNumber: { max: 40 },
  message: { required: true, min: 12, max: 4000 },
} satisfies Record<string, FieldRule>;

export type ContactField = keyof typeof contactRules;

/** Plain-English wording for the server log and the API response. */
export const serverMessage: Record<ErrorCode, string> = {
  required: 'This field is required.',
  email: 'That email address does not look right.',
  short: 'Please tell us a little more.',
  long: 'That value is longer than we can accept.',
  invalid: 'That value contains characters we cannot accept.',
};

/**
 * Requests filled in faster than a person could type are scripts. Shared by
 * both endpoints so the threshold cannot drift between them.
 */
export const MIN_FILL_MS = 2_500;
