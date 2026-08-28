import type { ReactNode } from 'react';

/**
 * Small caps label above a heading. Never a heading element itself.
 *
 * `surface="dark"` switches to the light ochre: the dark ochre used on
 * parchment measures 2.9:1 against ink, well under AA.
 */
export function Eyebrow({
  children,
  surface = 'light',
  className = '',
}: {
  children: ReactNode;
  surface?: 'light' | 'dark';
  className?: string;
}) {
  const text = surface === 'dark' ? 'text-ochre-light' : 'text-ochre-ink';
  const rule = surface === 'dark' ? 'bg-ochre-light' : 'bg-ochre';

  return (
    <p className={`t-meta ${text} ${className}`}>
      <span className={`mr-3 inline-block h-px w-6 align-middle ${rule}`} aria-hidden="true" />
      {children}
    </p>
  );
}
