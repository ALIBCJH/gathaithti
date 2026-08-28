import type { ReactNode } from 'react';

/**
 * The measure the whole site is built on. `wide` is for full-bleed sections
 * that still need their content pulled in from the edge.
 */
export function Container({
  children,
  width = 'default',
  className = '',
}: {
  children: ReactNode;
  width?: 'default' | 'wide' | 'narrow';
  className?: string;
}) {
  const max =
    width === 'wide' ? 'max-w-[100rem]' : width === 'narrow' ? 'max-w-[52rem]' : 'max-w-[82rem]';
  return <div className={`mx-auto w-full ${max} px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}
