'use client';

import { useEffect, useRef, useState } from 'react';
import { Field, fieldClass } from '@/components/forms/Field';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { contactRules, type ContactField } from '@/lib/enquiry';
import type { Common, ContactForm as ContactFormContent } from '@content/types';

/**
 * The general enquiry form.
 *
 * It shares its rules, its field styling and its submission behaviour with the
 * sample request on Our Coffee — one definition of what a valid enquiry is,
 * checked in the browser for immediate feedback and again on the server, where
 * it counts.
 *
 * The member-number field appears only for members. Asking every roaster in
 * Melbourne for a Gathaithi member number is the sort of small thoughtlessness
 * that makes a form feel like paperwork.
 */
export function ContactForm({
  content,
  form,
  locale,
}: {
  content: ContactFormContent;
  form: Common['form'];
  locale: string;
}) {
  const messages = {
    required: form.required,
    email: form.invalidEmail,
    short: form.tooShort,
    long: form.tooShort,
    invalid: form.invalidEmail,
  };

  const successRef = useRef<HTMLDivElement>(null);

  const enquiry = useEnquiryForm<ContactField>({
    endpoint: '/api/contact',
    rules: contactRules,
    messages,
    onSuccess: () => successRef.current?.focus(),
  });

  const [topic, setTopic] = useState(content.topics[0]?.id ?? 'other');

  /* “Write to us” on a contact route jumps here and picks that topic. The
     routes stay server-rendered; they only need a data attribute. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('[data-topic]');
      const id = target?.getAttribute('data-topic');
      if (id) setTopic(id);
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
        <p className="t-body measure text-ink-soft">{content.successBody}</p>
        <button
          type="button"
          onClick={enquiry.reset}
          className="tap t-meta w-fit text-ochre-ink underline decoration-ochre/40 underline-offset-4 transition-[text-decoration-thickness,color] duration-200 [transition-timing-function:var(--ease)] hover:text-ink hover:decoration-2"
        >
          {content.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form
      id="enquiry-form"
      onSubmit={(event) => enquiry.submit(event, { locale })}
      noValidate
      className="flex flex-col gap-8"
    >
      {/* Honeypot. Real people never see it; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field name="topic" label={content.fields.topic} error={enquiry.errors.topic} required>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
            enquiry.clearError('topic');
          }}
          onBlur={enquiry.onBlur}
          className={fieldClass}
        >
          {content.topics.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

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

        <Field
          name="phone"
          label={`${content.fields.phone} — ${form.optional}`}
          error={enquiry.errors.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={content.placeholders.phone}
            onBlur={enquiry.onBlur}
            onChange={() => enquiry.clearError('phone')}
            className={fieldClass}
          />
        </Field>

        {topic === 'members' ? (
          <Field
            name="memberNumber"
            label={`${content.fields.memberNumber} — ${form.optional}`}
            error={enquiry.errors.memberNumber}
            hint={content.memberHint}
          >
            <input
              id="memberNumber"
              name="memberNumber"
              type="text"
              inputMode="numeric"
              onBlur={enquiry.onBlur}
              onChange={() => enquiry.clearError('memberNumber')}
              className={fieldClass}
            />
          </Field>
        ) : (
          <Field
            name="organisation"
            label={`${content.fields.organisation} — ${form.optional}`}
            error={enquiry.errors.organisation}
          >
            <input
              id="organisation"
              name="organisation"
              type="text"
              autoComplete="organization"
              placeholder={content.placeholders.organisation}
              onBlur={enquiry.onBlur}
              onChange={() => enquiry.clearError('organisation')}
              className={fieldClass}
            />
          </Field>
        )}
      </div>

      <Field name="message" label={content.fields.message} error={enquiry.errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={6}
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
