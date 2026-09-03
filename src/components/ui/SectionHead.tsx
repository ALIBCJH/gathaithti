import type { ReactNode } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';

/**
 * The head of a section: label, title, and the one sentence under it.
 *
 * Every band on this site used to open the same way — the heading in a left
 * column and the lead in a right one, reading across a 12-column grid. It
 * works, but it makes the title a column rather than a title, and on the
 * sketches for these pages the heading is always a line ACROSS THE TOP with
 * the content beneath it. This is that, in one place, so the pages cannot
 * drift apart again.
 *
 * `align` is not decoration. Centred marks a band that opens a subject — the
 * catalogue, the processing, the paperwork — and reads as a chapter head. Left
 * stays with narrative bands, where the heading is the first line of a column
 * of prose and centring it would orphan it from the words it belongs to.
 */
export function SectionHead({
  id,
  eyebrow,
  heading,
  lead,
  align = 'center',
  as: Tag = 'h2',
  className = '',
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  align?: 'center' | 'left';
  /**
   * `h1` for a page whose opening band IS its first section. Every page needs
   * exactly one, and Google indexes it; a page that lost its hero must hand
   * the level to whatever now comes first rather than simply going without.
   */
  as?: 'h1' | 'h2';
  className?: string;
  children?: ReactNode;
}) {
  const centred = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-6',
        centred ? 'mx-auto max-w-[52rem] items-center text-center' : 'items-start',
        className,
      ].join(' ')}
    >
      <Eyebrow>{eyebrow}</Eyebrow>

      <Tag
        id={id}
        className={`${Tag === 'h1' ? 't-page-title' : 't-section'} text-balance ${centred ? 'max-w-[20ch]' : 'max-w-[16ch]'}`}
      >
        <RichText text={heading} />
      </Tag>

      {lead ? (
        <p className={`t-lead text-ink-soft ${centred ? 'max-w-[56ch]' : 'measure'}`}>
          <RichText text={lead} />
        </p>
      ) : null}

      {children}
    </div>
  );
}
