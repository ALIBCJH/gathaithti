import type { ElementType, ReactNode } from 'react';

type Tone = 'parchment' | 'parchment-2' | 'ink' | 'moss';

const tones: Record<Tone, string> = {
  parchment: 'bg-parchment text-ink',
  'parchment-2': 'bg-parchment-2 text-ink',
  ink: 'bg-inverse text-on-inverse on-ink',
  moss: 'bg-moss text-on-moss on-moss',
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
  size?: 'default' | 'tight' | 'loose' | 'opener';
  id?: string;
  as?: ElementType;
  className?: string;
  ariaLabelledby?: string;
}) {
  /* `opener` is for the first section on a page that has no hero. The header
     is FIXED, so a page's first band starts at y=0 underneath it and its own
     top padding is the only thing holding the content clear. A normal section
     padding is written for a band in the middle of a page and leaves far too
     much air there — 192px on a desktop, most of it dead. This clears the
     header and adds a deliberate gap, nothing more. The bottom stays loose.

     The gap was 3rem on a desktop and is 1.5rem now: 48px of clear ground
     under the bar became 24px. At the larger value the eyebrow floated in the
     middle of an empty band and the page read as though it started late. */
  const padding =
    size === 'tight'
      ? 'py-16 sm:py-20 lg:py-24'
      : size === 'loose'
        ? 'py-24 sm:py-32 lg:py-48'
        : size === 'opener'
          ? 'pb-24 pt-[calc(var(--header-h)+0.75rem)] sm:pb-32 sm:pt-[calc(var(--header-h)+1rem)] lg:pb-48 lg:pt-[calc(var(--header-h)+1.5rem)]'
          : 'py-20 sm:py-28 lg:py-40';

  /* A hairline along the top of every section, so one band is told from the
     next by a drawn line rather than by a change of shade. Dark mode has no
     change of shade left to offer — every surface is the same brown — and on
     white the alternating tones were always a quiet signal. This is the same
     line in both themes, and it is the only thing separating the bands on a
     phone, where the sections it divides are the whole page. */
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`border-t border-line ${tones[tone]} ${padding} ${className}`}
    >
      {children}
    </Tag>
  );
}
