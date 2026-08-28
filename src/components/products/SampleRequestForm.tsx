'use client';

import { useEffect, useRef, useState } from 'react';
import { Field, fieldClass } from '@/components/forms/Field';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { sampleRules, type SampleField } from '@/lib/enquiry';
import type { Common, Lot, ProductsContent } from '@content/types';

/**
 * The primary conversion action of the entire site.
 *
 * Shares its rules, field styling and submission behaviour with the contact
 * form — see src/lib/enquiry.ts and src/components/forms. Validation runs on
 * blur, never on every keystroke; the submit button shows a real loading
 * state; and success is an arrival, replacing the form rather than announcing
 * itself over the top of it.
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
  const successRef = useRef<HTMLDivElement>(null);
  const [lot, setLot] = useState('');

  const enquiry = useEnquiryForm<SampleField>({
    endpoint: '/api/sample-request',
    rules: sampleRules,
    messages: {
      required: form.required,
      email: form.invalidEmail,
      short: form.tooShort,
      long: form.tooShort,
      invalid: form.invalidEmail,
    },
    onSuccess: () => successRef.current?.focus(),
  });

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

  if (enquiry.status === 'success') {
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
          onClick={enquiry.reset}
          className="tap t-meta w-fit text-ochre-ink underline decoration-ochre/40 underline-offset-4 transition-[text-decoration-thickness,color] duration-200 [transition-timing-function:var(--ease)] hover:text-ink hover:decoration-2"
        >
          {form.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => enquiry.submit(event, { locale })} noValidate className="flex flex-col gap-8">
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label={content.fields.name} error={enquiry.errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={content.placeholders.name}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('name')}
            aria-invalid={Boolean(enquiry.errors.name)}
            aria-describedby={enquiry.errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="company" label={content.fields.company} error={enquiry.errors.company} required>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={content.placeholders.company}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('company')}
            aria-invalid={Boolean(enquiry.errors.company)}
            aria-describedby={enquiry.errors.company ? 'company-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="email" label={content.fields.email} error={enquiry.errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={content.placeholders.email}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('email')}
            aria-invalid={Boolean(enquiry.errors.email)}
            aria-describedby={enquiry.errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="country" label={content.fields.country} error={enquiry.errors.country} required>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder={content.placeholders.country}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('country')}
            aria-invalid={Boolean(enquiry.errors.country)}
            aria-describedby={enquiry.errors.country ? 'country-error' : undefined}
            className={fieldClass}
          />
        </Field>

        <Field name="role" label={content.fields.role} error={enquiry.errors.role} required>
          <select
            id="role"
            name="role"
            defaultValue=""
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('role')}
            aria-invalid={Boolean(enquiry.errors.role)}
            aria-describedby={enquiry.errors.role ? 'role-error' : undefined}
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

        <Field name="volume" label={content.fields.volume} error={enquiry.errors.volume} required>
          <select
            id="volume"
            name="volume"
            defaultValue=""
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('volume')}
            aria-invalid={Boolean(enquiry.errors.volume)}
            aria-describedby={enquiry.errors.volume ? 'volume-error' : undefined}
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

      <Field name="lot" label={content.fields.lot} error={enquiry.errors.lot}>
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

      <Field name="message" label={content.fields.message} error={enquiry.errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={content.placeholders.message}
          onBlur={enquiry.onBlur}
          onChange={() => enquiry.clearError('message')}
          aria-invalid={Boolean(enquiry.errors.message)}
          aria-describedby={enquiry.errors.message ? 'message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <div aria-live="polite" className="min-h-6">
        {enquiry.status === 'error' && (
          <p className="border-l-2 border-cherry bg-cherry/5 py-3 pl-4 text-[0.9375rem] text-ink">
            <strong className="font-medium">{form.errorTitle}.</strong>{' '}
            {enquiry.serverError ?? form.errorBody}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={enquiry.status === 'sending'}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-[0.9375rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
        >
          {enquiry.status === 'sending' ? (
            <>
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-accent/40 border-t-current"
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
