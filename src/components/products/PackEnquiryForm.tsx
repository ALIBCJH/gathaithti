'use client';

import { useEffect, useRef, useState } from 'react';
import { Field, fieldClass } from '@/components/forms/Field';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { sampleRules, type SampleField } from '@/lib/enquiry';
import type { Common, Lot, ProductsContent } from '@content/types';

/**
 * Three fields: which size, an email to reply to, and the message.
 *
 * It replaced an eight-field importer form — name, company, country, role,
 * volume of interest, lot of interest, "what are you looking for?" — that was
 * asking a stranger for a CV before it would tell them the price of a bag of
 * coffee. The page sells retail packs, so this asks a retail question.
 *
 * Shares its rules, field styling and submission behaviour with the contact
 * form (src/lib/enquiry.ts, src/components/forms): validation on blur, never
 * on every keystroke; a real loading state; and success is an arrival that
 * replaces the form rather than announcing itself over the top of it.
 */
export function PackEnquiryForm({
  content,
  form,
  locale,
  packs,
}: {
  content: ProductsContent['sample']['form'];
  form: Common['form'];
  locale: string;
  /** Offered in the size select, and set by the cards above. */
  packs: Pick<Lot, 'id' | 'grade' | 'name'>[];
}) {
  const successRef = useRef<HTMLDivElement>(null);
  const [pack, setPack] = useState('');

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

  /* "Enquire about this pack" on a card jumps here and pre-selects the size.
     Delegating from the document keeps the cards as server components — they
     need a data attribute, not a click handler shipped to the browser.

     It reads `data-pack`, NOT `data-lot`. The card's <article> also carries a
     data-lot, holding the GRADE ("250g") for the colour rules in globals.css,
     so a delegate matching [data-lot] set this select to a grade string
     whenever somebody clicked the card anywhere but the link — a value no
     <option> has, which silently emptied the field. Two attributes, two
     jobs. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const id = (event.target as HTMLElement | null)?.closest('[data-pack]')?.getAttribute('data-pack');
      if (id) setPack(id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (enquiry.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col gap-5 border border-moss/40 bg-moss/8 p-8 sm:p-10"
      >
        <span aria-hidden="true" className="inline-block h-px w-16 bg-moss" />
        <h3 className="t-section text-[clamp(1.25rem,2vw,1.625rem)]">{content.success.title}</h3>
        <p className="t-body text-ink-soft">{content.success.body}</p>
        <button
          type="button"
          onClick={enquiry.reset}
          className="tap t-meta w-fit text-ochre-ink underline decoration-ochre/40 underline-offset-4 transition-[text-decoration-thickness,color] duration-200 [transition-timing-function:var(--ease)] hover:text-ink hover:decoration-2"
        >
          {content.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => enquiry.submit(event, { locale })} noValidate className="flex flex-col gap-2">
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Size first, because the cards above set it — somebody arriving from
          "Enquire about this pack" should see their answer already filled in
          rather than have to find it. */}
      <Field name="pack" label={content.fields.pack} error={enquiry.errors.pack}>
        <select
          id="pack"
          name="pack"
          value={pack}
          onChange={(event) => setPack(event.target.value)}
          className={fieldClass}
        >
          <option value="">{content.packAny}</option>
          {packs.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
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

      <Field name="message" label={content.fields.message} error={enquiry.errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={content.placeholders.message}
          onBlur={enquiry.onBlur}
          onChange={() => enquiry.clearError('message')}
          aria-invalid={Boolean(enquiry.errors.message)}
          aria-describedby={enquiry.errors.message ? 'message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <div aria-live="polite" className="empty:hidden">
        {enquiry.status === 'error' && (
          <p className="mb-4 border-l-2 border-cherry bg-cherry/5 py-3 pl-4 text-[0.9375rem] text-ink">
            <strong className="font-medium">{form.errorTitle}.</strong>{' '}
            {enquiry.serverError ?? form.errorBody}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={enquiry.status === 'sending'}
        className="tap inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-[0.9375rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
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

      <p className="t-body mt-4 text-[0.8125rem] text-ink-soft">{content.consent}</p>
    </form>
  );
}
