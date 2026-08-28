'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Common, Lot, ProductsContent } from '@content/types';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<FieldName, string>>;
type FieldName = 'name' | 'company' | 'email' | 'country' | 'role' | 'volume' | 'message';

const REQUIRED: FieldName[] = ['name', 'company', 'email', 'country', 'role', 'volume', 'message'];

/**
 * The primary conversion action of the entire site.
 *
 * Validation runs on blur, never on every keystroke — being corrected while
 * still typing is the most irritating pattern in web forms. Errors are
 * announced, the submit button shows a real loading state, and success is an
 * arrival: the form is replaced by an acknowledgement, not an alert.
 */
export function SampleRequestForm({
  content,
  form,
  locale,
  lots,
}: {
  content: ProductsContent['sample'];
  form: Common['form'];
  locale: string;
  /** Offered in the “lot of interest” select, and set by the cards above. */
  lots: Pick<Lot, 'id' | 'grade' | 'name'>[];
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);
  const [lot, setLot] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  /* Stamped after mount, not during render: the server has no clock the client
     shares, and the endpoint rejects anything filled in impossibly fast. */
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  /* “Request this lot” on a card jumps to this form and pre-selects the lot.
     Delegating from the document keeps the cards as server components — they
     only need a data attribute, not a click handler shipped to the browser. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('[data-lot]');
      const id = target?.getAttribute('data-lot');
      if (id) setLot(id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function validate(field: FieldName, value: string): string | undefined {
    const trimmed = value.trim();
    if (REQUIRED.includes(field) && !trimmed) return form.required;
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return form.invalidEmail;
    if (field === 'message' && trimmed.length < 12) return form.tooShort;
    return undefined;
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const field = event.target.name as FieldName;
    const message = validate(field, event.target.value);
    setErrors((prev) => ({ ...prev, [field]: message }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const next: Errors = {};
    for (const field of REQUIRED) {
      const message = validate(field, String(formData.get(field) ?? ''));
      if (message) next[field] = message;
    }
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus('sending');
    setServerError(null);

    try {
      const response = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(formData.entries()),
          locale,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setServerError(data?.error ?? form.errorBody);
        setStatus('error');
        return;
      }

      setStatus('success');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setServerError(form.errorBody);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col gap-6 border border-moss/40 bg-moss/8 p-10 sm:p-14"
      >
        <span aria-hidden="true" className="inline-block h-px w-16 bg-moss" />
        <h3 className="t-section text-[clamp(1.5rem,2.4vw,2rem)]">{form.successTitle}</h3>
        <p className="t-body measure text-ink-soft">{form.successBody}</p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus('idle');
          }}
          className="t-meta w-fit text-ochre-ink underline decoration-ochre/40 underline-offset-4 transition-[text-decoration-thickness,color] duration-200 [transition-timing-function:var(--ease)] hover:text-ink hover:decoration-2"
        >
          {form.successAgain}
        </button>
      </div>
    );
  }

  const fieldClass =
    'w-full border border-line bg-parchment px-4 py-3.5 text-[1.0625rem] text-ink ' +
    'transition-[border-color,background-color] duration-200 [transition-timing-function:var(--ease)] ' +
    'hover:border-ink/35 focus:border-ochre focus:outline-none focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-ochre ' +
    'aria-[invalid=true]:border-cherry';

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label={content.fields.name} error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={content.placeholders.name}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="company" label={content.fields.company} error={errors.company} required>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={content.placeholders.company}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="email" label={content.fields.email} error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={content.placeholders.email}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="country" label={content.fields.country} error={errors.country} required>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder={content.placeholders.country}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? 'country-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="role" label={content.fields.role} error={errors.role} required>
          <select
            id="role"
            name="role"
            defaultValue=""
            onBlur={onBlur}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? 'role-error' : undefined}
            className={fieldClass}
          >
            <option value="" disabled>
              —
            </option>
            {content.roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </Field>

        <Field name="volume" label={content.fields.volume} error={errors.volume} required>
          <select
            id="volume"
            name="volume"
            defaultValue=""
            onBlur={onBlur}
            aria-invalid={Boolean(errors.volume)}
            aria-describedby={errors.volume ? 'volume-error' : undefined}
            className={fieldClass}
          >
            <option value="" disabled>
              —
            </option>
            {content.volumes.map((volume) => (
              <option key={volume} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="lot" label={content.fields.lot}>
        <select
          id="lot"
          name="lot"
          value={lot}
          onChange={(event) => setLot(event.target.value)}
          className={fieldClass}
        >
          <option value="">{content.lotAny}</option>
          {lots.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} · {option.grade}
            </option>
          ))}
        </select>
      </Field>

      <Field name="message" label={content.fields.message} error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={content.placeholders.message}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <div aria-live="polite" className="min-h-6">
        {status === 'error' && (
          <p className="border-l-2 border-cherry bg-cherry/5 py-3 pl-4 text-[0.9375rem] text-ink">
            <strong className="font-medium">{form.errorTitle}.</strong> {serverError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-[0.9375rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === 'sending' ? (
            <>
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-inverse/40 border-t-parchment"
              />
              {form.sending}
            </>
          ) : (
            content.submit
          )}
        </button>

        <p className="t-body max-w-[42ch] text-[0.8125rem] text-ink-soft">{content.consent}</p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="t-meta text-ink-soft">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-ochre-ink">
            *
          </span>
        ) : null}
      </label>
      {children}
      <p id={`${name}-error`} aria-live="polite" className="min-h-[1.25rem] text-[0.8125rem] text-cherry">
        {error}
      </p>
    </div>
  );
}
