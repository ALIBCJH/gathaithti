'use client';

import { useEffect, useRef, useState } from 'react';
import { ChoiceChips } from '@/components/forms/ChoiceChips';
import { Field, fieldClass } from '@/components/forms/Field';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { SAMPLE_ENDPOINT } from '@/lib/endpoints';
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
  packs,
}: {
  content: ProductsContent['sample']['form'];
  form: Common['form'];
  /** Offered in the size select, and set by the cards above. */
  packs: Pick<Lot, 'id' | 'grade' | 'name'>[];
}) {
  const successRef = useRef<HTMLDivElement>(null);
  const [pack, setPack] = useState('');

  const enquiry = useEnquiryForm<SampleField>({
    endpoint: SAMPLE_ENDPOINT,
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
      <div ref={successRef} tabIndex={-1} className="flex flex-col items-start gap-5 py-6 outline-none">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-moss text-on-moss">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="t-section text-[clamp(1.25rem,2vw,1.625rem)]">{content.success.title}</h3>
        <p className="t-body text-ink-soft">{content.success.body}</p>
        <button
          type="button"
          onClick={enquiry.reset}
          className="tap inline-flex items-center rounded-full border border-ink/25 px-5 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          {content.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => enquiry.submit(event)} noValidate className="flex flex-col gap-4">
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* The size as choices to tap, set already when somebody arrives from
          "Ask about this pack" in the size picker above. */}
      <ChoiceChips
        name="pack"
        legend={content.fields.pack}
        options={[
          { value: '', label: content.packAny },
          ...packs.map((option) => ({ value: option.id, label: option.grade.replace(/(\d)\s*(g|kg)$/i, '$1\u00a0$2') })),
        ]}
        value={pack}
        onChange={setPack}
        error={enquiry.errors.pack}
      />

      <Field name="email" label={content.fields.email} error={enquiry.errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={content.placeholders.email}
          onBlur={enquiry.onBlur}
          onChange={() => enquiry.clearError('email')}
          aria-required="true"
          aria-invalid={Boolean(enquiry.errors.email)}
          aria-describedby={enquiry.errors.email ? 'email-error' : undefined}
          className={fieldClass}
        />
      </Field>

      <Field name="message" label={content.fields.message} error={enquiry.errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={content.placeholders.message}
          onBlur={enquiry.onBlur}
          onChange={() => enquiry.clearError('message')}
          aria-required="true"
          aria-invalid={Boolean(enquiry.errors.message)}
          aria-describedby={enquiry.errors.message ? 'message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <div aria-live="polite" className="empty:hidden">
        {enquiry.status === 'error' && (
          <p className="rounded-xl border-l-4 border-cherry bg-cherry/5 px-4 py-3 text-[0.9375rem] text-ink">
            <strong className="font-medium">{form.errorTitle}.</strong> {enquiry.serverError ?? form.errorBody}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={enquiry.status === 'sending'}
        className="tap inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-[1rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
      >
        {enquiry.status === 'sending' ? (
          <>
            <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border-2 border-on-accent/40 border-t-current" />
            {form.sending}
          </>
        ) : (
          <>
            {content.submit} <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <p className="text-[0.8125rem] text-ink-soft">{content.consent}</p>
    </form>
  );
}
