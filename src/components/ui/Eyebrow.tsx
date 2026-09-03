import type { ReactNode } from 'react';

/**
 * Small caps label above a heading. Never a heading element itself.
 *
 * `surface="dark"` means "on an inverse band", not "on a dark colour". Those
 * bands are dark in the dark theme and light in the light one, so the colour
 * comes from a token that follows the theme rather than from a fixed light
 * ochre: on a light band that ochre measures about 2.2:1, and the dark one it
 * swaps to measures 5.9:1.
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
  const text = surface === 'dark' ? 'text-ochre-on-inverse' : 'text-ochre-ink';
  const rule = surface === 'dark' ? 'bg-ochre-on-inverse' : 'bg-ochre';

  return (
    <p className={`t-meta ${text} ${className}`}>
      <span className={`mr-3 inline-block h-px w-6 align-middle ${rule}`} aria-hidden="true" />
      {children}
    </p>
  );
}
