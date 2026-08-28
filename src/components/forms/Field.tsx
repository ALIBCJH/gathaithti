import type { ReactNode } from 'react';

/**
 * One labelled field, with the space for its error message already reserved —
 * so an error appearing never pushes the rest of the form down the page.
 */
export function Field({
  name,
  label,
  error,
  required,
  hint,
  children,
  className = '',
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="t-meta text-ink-soft">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-ochre-ink">
            *
          </span>
        ) : null}
      </label>

      {children}

      {hint ? <p className="text-[0.8125rem] text-ink-soft">{hint}</p> : null}

      <p
        id={`${name}-error`}
        aria-live="polite"
        className="min-h-[1.25rem] text-[0.8125rem] text-cherry"
      >
        {error}
      </p>
    </div>
  );
}

/** The one input style, so the two forms cannot drift apart. */
export const fieldClass =
  'w-full border border-line bg-parchment px-4 py-3.5 text-[1.0625rem] text-ink ' +
  'transition-[border-color,background-color] duration-200 [transition-timing-function:var(--ease)] ' +
  'hover:border-ink/35 focus:border-ochre focus:outline-none focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-ochre ' +
  'aria-[invalid=true]:border-cherry';
