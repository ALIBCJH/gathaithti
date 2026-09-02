import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { AboutContent } from '@content/types';

/**
 * Three cards under the hero: what this society IS, before any history or
 * governance. Somebody who reads only this far should still leave knowing the
 * farmers own it, that it is one mill and one catchment, and that it has run
 * itself since 2000.
 *
 * Numbered, because they are not a sequence and the numbers would be a lie —
 * so they are not numbered. What separates them is a copper rule and the space
 * between, the same device the three governing bodies use further down.
 */
export function Pillars({ content }: { content: AboutContent['pillars'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="pillars-heading">
      <Container width="wide">
        {/* Left, not centred: on the sketch this heading starts hard against
            the left margin, and it opens the page rather than a subject. */}
        <SectionHead
          id="pillars-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          align="left"
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {content.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <article className="flex h-full flex-col gap-4 border-t-2 border-ochre pt-8">
                <h3 className="t-quiet text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug">
                  <RichText text={card.title} />
                </h3>
                <p className="t-body text-[0.9375rem] leading-relaxed text-ink-soft">
                  <RichText text={card.body} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
