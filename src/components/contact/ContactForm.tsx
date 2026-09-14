'use client';

import { useRef, useState } from 'react';
import { ChoiceChips } from '@/components/forms/ChoiceChips';
import { Field, fieldClass } from '@/components/forms/Field';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { CONTACT_ENDPOINT } from '@/lib/endpoints';
import { contactRules, type ContactField } from '@/lib/enquiry';
import type { Common, ContactForm as ContactFormContent } from '@content/types';

/**
 * The message form on Contact — four things to fill in.
 *
 * What it is about (tap one), your name, your email, your message; a phone
 * number only if you want a call back. The company and member-number fields
 * are gone at the client's request, and the topic is a choice rather than a
 * blank box.
 *
 * It shares its rules, field styling and submission behaviour with the enquiry
 * on Our Coffee — one definition of a valid enquiry, checked here for
 * immediate feedback and again on the server, where it counts.
 */
export function ContactForm({ content, form }: { content: ContactFormContent; form: Common['form'] }) {
  const successRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState('');

  const enquiry = useEnquiryForm<ContactField>({
    endpoint: CONTACT_ENDPOINT,
    rules: contactRules,
    messages: {
      required: form.required,
      email: form.invalidEmail,
      short: form.tooShort,
      long: form.tooShort,
      invalid: form.invalidEmail,
    },
    onSuccess: () => successRef.current?.focus(),
  });

  if (enquiry.status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} className="flex flex-col items-start gap-5 py-6 outline-none">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-moss text-on-moss">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="t-section text-[clamp(1.5rem,2.4vw,2rem)]">{form.successTitle}</h3>
        <p className="t-body max-w-[46ch] text-ink-soft">{content.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setTopic('');
            enquiry.reset();
          }}
          className="tap inline-flex items-center rounded-full border border-ink/25 px-5 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          {content.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form id="enquiry-form" onSubmit={(event) => enquiry.submit(event)} noValidate className="flex flex-col gap-4">
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ChoiceChips
        name="topic"
        legend={content.fields.topic}
        options={content.topics.map((t) => ({ value: t, label: t }))}
        value={topic}
        onChange={(value) => {
          setTopic(value);
          enquiry.clearError('topic');
        }}
        error={enquiry.errors.topic ? form.selectOne : undefined}
      />

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field name="name" label={content.fields.name} error={enquiry.errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={content.placeholders.name}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('name')}
            aria-required="true"
            aria-invalid={Boolean(enquiry.errors.name)}
            aria-describedby={enquiry.errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
        </Field>

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
      </div>

      <Field name="phone" label={content.fields.phone} error={enquiry.errors.phone} hint={content.phoneHint}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={content.placeholders.phone}
          onBlur={enquiry.onBlur}
          onChange={() => enquiry.clearError('phone')}
          aria-describedby="phone-hint"
          className={fieldClass}
        />
      </Field>

      <Field name="message" label={content.fields.message} error={enquiry.errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={enquiry.status === 'sending'}
          className="tap inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-[1rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
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
      </div>
    </form>
  );
}
