import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { ProductsContent } from '@content/types';

/**
 * What the mill produced this year, placed between the processing walkthrough
 * and the catalogue.
 *
 * That position is the whole idea: the walkthrough explains how any lot is
 * made, the catalogue lists what is for sale, and this stands between them
 * saying what THIS season actually was. Three frames — the cherry it started
 * as, the parchment it dried to, the cup it scored — which is the same
 * sequence the walkthrough just went through, told once more in one screen.
 *
 * The closing line is a judgement rather than a fact, so it is set apart on
 * the brand brown and signed off by the button rather than dressed up as
 * another statistic.
 */
export function SeasonGem({ content }: { content: ProductsContent['gem'] }) {
  return (
    <Section tone="parchment" size="loose" ariaLabelledby="gem-heading">
      <Container width="wide">
        <SectionHead
          id="gem-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {content.cards.map((card, i) => (
            <li key={card.title}>
              <Reveal delay={(i % 3) * 60}>
                <article className="group/card flex h-full flex-col gap-5">
                  <SmartImage slot={card.imageSlot} zoom />
                  <h3 className="t-quiet text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug">
                    {card.title}
                  </h3>
                  <p className="t-body text-[0.9375rem] leading-relaxed text-ink-soft">
                    <RichText text={card.body} />
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="on-ink mt-16 flex flex-col gap-8 border border-ochre/40 bg-inverse px-7 py-10 text-on-inverse sm:px-12 sm:py-12 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-14">
            <p className="t-quiet max-w-[52ch] text-[clamp(1.125rem,1.9vw,1.5rem)] leading-snug">
              {content.statement}
            </p>
            <div className="shrink-0">
              <Button href={content.cta.href} surface="dark">
                {content.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
