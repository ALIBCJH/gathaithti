import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Stat } from '@/components/ui/Stat';
import type { AboutContent } from '@content/types';

/**
 * Terroir: the section that has to argue the coffee tastes the way it does
 * because of where it grows. Four numbers carry it.
 *
 * The photograph has gone. It was never this section's own — it borrowed the
 * Our Coffee hero, landscape crammed into a portrait box, the same frame on
 * two pages — and it was flagged as a stand-in that should not stay. Without
 * it the four figures lead the band, which is what they were always the
 * strongest thing in it.
 *
 * Restyled, not redesigned. The palette, the type scale, the two-column grid
 * and every word are the ones that were here. What changed is weight and
 * spacing: the photograph is wider and no longer stranded in the last third of
 * the grid, the four figures read as one row rather than four headlines, and
 * the varieties sit in a bounded list instead of trailing off.
 */
export function Terroir({ content }: { content: AboutContent['terroir'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="terroir-heading" className="terroir">
      <Container width="wide">
        <SectionHead
          id="terroir-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        {/* The four figures as one row.

            They were four separate blocks, each with its own top rule, spaced
            far enough apart to read as four unrelated headlines. One copper
            rule runs across all four now, hairlines divide them, and the
            figures come down a step so the row reads at a glance. */}
        <div className="mt-14 border-t border-ochre/45 lg:mt-20">
          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {content.factIds.map((id, i) => (
              <Reveal
                key={id}
                delay={i * 60}
                className={[
                  'py-7 sm:py-8',
                  /* dividers between, never before the first in a row */
                  'border-line',
                  i % 2 === 1 ? 'border-l pl-6 sm:pl-0' : 'pr-6 sm:pr-0',
                  i >= 2 ? 'border-t sm:border-t-0' : '',
                  'sm:border-l sm:first:border-l-0 sm:px-8 sm:first:pl-0 sm:last:pr-0',
                ].join(' ')}
              >
                <Stat
                  id={id}
                  size="small"
                  figureClassName="[--figure-size:clamp(1.625rem,2.6vw,2.125rem)]"
                />
              </Reveal>
            ))}
          </dl>
        </div>

        {/* What grows here. */}
        <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5 lg:self-center">
            <h3 className="t-section text-[clamp(1.5rem,2.4vw,2.25rem)]">
              {content.varieties.heading}
            </h3>
            <p className="t-body measure text-ink-soft">
              <RichText text={content.varieties.body} />
            </p>
          </div>

          {/* Reveal renders each row itself: a dl may contain divs, but the dt
              and dd pair must be a direct child of that div. */}
          <dl className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            {content.varieties.list.map((variety, i) => (
              <Reveal
                key={variety.name}
                delay={i * 60}
                className={[
                  'group/variety grid grid-cols-1 gap-1.5 border-t border-line py-6 last:border-b',
                  'transition-colors duration-200 [transition-timing-function:var(--ease)]',
                  'hover:border-ochre/45',
                  'sm:grid-cols-[9rem_1fr] sm:gap-8',
                ].join(' ')}
              >
                <dt className="t-body text-[1.0625rem] font-medium tracking-[0.01em] text-ink transition-colors duration-200 [transition-timing-function:var(--ease)] group-hover/variety:text-ochre-ink">
                  {variety.name}
                </dt>
                <dd className="t-body text-[0.9375rem] leading-relaxed text-ink-soft">
                  {variety.note}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
