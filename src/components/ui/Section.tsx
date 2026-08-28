import type { ElementType, ReactNode } from 'react';

type Tone = 'parchment' | 'parchment-2' | 'ink' | 'moss';

const tones: Record<Tone, string> = {
  parchment: 'bg-parchment text-ink',
  'parchment-2': 'bg-parchment-2 text-ink',
  ink: 'bg-inverse text-on-inverse on-ink',
  moss: 'bg-moss text-on-inverse on-moss',
};

/**
 * Vertical rhythm lives here and nowhere else, so every section on the site
 * breathes to the same 8px-derived scale. Desktop padding is deliberately
 * generous — crowding is what makes a site look cheap.
 */
export function Section({
  children,
  tone = 'parchment',
  size = 'default',
  id,
  as: Tag = 'section',
  className = '',
  ariaLabelledby,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: 'default' | 'tight' | 'loose';
  id?: string;
  as?: ElementType;
  className?: string;
  ariaLabelledby?: string;
}) {
  const padding =
    size === 'tight'
      ? 'py-16 sm:py-20 lg:py-24'
      : size === 'loose'
        ? 'py-24 sm:py-32 lg:py-48'
        : 'py-20 sm:py-28 lg:py-40';

  return (
    <Tag id={id} aria-labelledby={ariaLabelledby} className={`${tones[tone]} ${padding} ${className}`}>
      {children}
    </Tag>
  );
}
