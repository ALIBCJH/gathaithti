import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { AboutContent } from '@content/types';

/**
 * HERITAGE & PURPOSE — the opener of About, and its h1.
 *
 * Type only, no photograph: the society's overview on the left and, under it,
 * the pillars as a strip — Location & terroir, Processing & quality, Cup
 * profile & varietals — each a label, a short title and one sentence. A reader
 * who stops here has the whole society in three cells; the history and the
 * values below are for the one who keeps going. The column count follows the
 * content: three since 2026-09-20, when the society dropped a fourth.
 */
export function AboutIntro({ content }: { content: AboutContent['intro'] }) {
  return (
    <Section tone="parchment-2" size="opener" ariaLabelledby="about-heading">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 id="about-heading" className="t-page-title">
              {content.heading}
            </h1>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-5 lg:self-end">
            <p className="t-lead text-ink-soft">
              <RichText text={content.lead} />
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {content.pillars.map((pillar, i) => (
            <li key={pillar.label}>
              <Reveal delay={i * 70} className="flex h-full flex-col gap-3 border-t-2 border-ochre pt-6">
                <p className="t-meta text-ochre-ink">{pillar.label}</p>
                <h2 className="font-display text-[1.375rem] font-semibold leading-snug text-balance">
                  <RichText text={pillar.title} />
                </h2>
                <p className="t-body text-ink-soft">
                  <RichText text={pillar.body} />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
