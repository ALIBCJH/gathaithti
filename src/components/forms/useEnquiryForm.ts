'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { validateAll, validateField, type ErrorCode, type FieldRule } from '@/lib/enquiry';

export type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * The behaviour both enquiry forms share: blur-time validation against the
 * shared rules, a real loading state, server errors surfaced rather than
 * swallowed, and a success state that replaces the form.
 *
 * Validation runs on blur, never on every keystroke — being corrected while
 * still typing is the most irritating pattern in web forms.
 */
export function useEnquiryForm<K extends string>({
  endpoint,
  rules,
  messages,
  onSuccess,
}: {
  endpoint: string;
  rules: Record<K, FieldRule>;
  /** Error wording, from the content files. */
  messages: Record<ErrorCode, string>;
  /** Called once the enquiry is accepted — used to move focus to the receipt. */
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(0);

  /* Stamped after mount, not during render: the endpoint rejects anything
     filled in impossibly fast, and the server shares no clock with us. */
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function onBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as K;
    const rule = rules[field];
    if (!rule) return;
    const code = validateField(event.target.value, rule);
    setErrors((prev) => ({ ...prev, [field]: code ? messages[code] : undefined }));
  }

  /** Clears an error as soon as the reader starts fixing it. */
  function clearError(field: K) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function submit(event: FormEvent<HTMLFormElement>, extra: Record<string, unknown> = {}) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<K, string>;

    const codes = validateAll(values, rules);
    const next = Object.fromEntries(
      Object.entries(codes).map(([field, code]) => [field, messages[code as ErrorCode]]),
    ) as Partial<Record<K, string>>;
    setErrors(next);

    const firstInvalid = Object.keys(codes)[0];
    if (firstInvalid) {
      document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    setServerError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...extra, elapsedMs: Date.now() - startedAt.current }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setServerError(data?.error ?? null);
        setStatus('error');
        return;
      }

      setStatus('success');
      if (onSuccess) requestAnimationFrame(onSuccess);
    } catch {
      setServerError(null);
      setStatus('error');
    }
  }

  function reset() {
    startedAt.current = Date.now();
    setErrors({});
    setServerError(null);
    setStatus('idle');
  }

  /* No refs are returned: a hook handing a ref back to its caller reads as a
     render-time ref access to the React compiler, and the caller owns the node
     anyway. */
  return { status, errors, serverError, onBlur, clearError, submit, reset };
}
