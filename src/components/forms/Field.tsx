import type { ReactNode } from 'react';

/**
 * One labelled field, with the space for its error message already reserved —
 * so an error appearing never pushes the rest of the form down the page.
 *
 * Labels are ordinary sentence-case text now, not small uppercase captions:
 * a label is the question being asked, and it should read like one. Optional
 * fields say so in their own label; required ones carry no asterisk, because
 * almost everything on these forms is required.
 */
export function Field({
  name,
  label,
  error,
  hint,
  children,
  className = '',
}: {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-[0.9375rem] font-medium text-ink">
        {label}
      </label>

      {children}

      {hint ? (
        <p id={`${name}-hint`} className="text-[0.8125rem] text-ink-soft">
          {hint}
        </p>
      ) : null}

      <p id={`${name}-error`} aria-live="polite" className="min-h-[1.25rem] text-[0.8125rem] text-cherry">
        {error}
      </p>
    </div>
  );
}

/** The one input style, so the two forms cannot drift apart. */
export const fieldClass =
  'w-full rounded-xl border border-line bg-parchment px-4 py-3.5 text-[1.0625rem] text-ink placeholder:text-ink-soft/70 ' +
  'transition-[border-color,box-shadow] duration-200 [transition-timing-function:var(--ease)] ' +
  'hover:border-ink/35 focus:border-ochre focus:shadow-[0_0_0_3px_rgb(180_98_42/0.18)] focus:outline-none ' +
  'aria-[invalid=true]:border-cherry';
