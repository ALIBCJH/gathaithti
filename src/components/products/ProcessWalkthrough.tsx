import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { ProductsContent } from '@content/types';

/**
 * Six steps, alternating side to side, each one a photograph and a paragraph.
 * The top of the page, and the only band on it that carries an `h1`.
 *
 * DO NOT ADD A PAGE MASTHEAD ABOVE THIS. One was added in #52 — OUR COFFEE /
 * This season's lots / the one-mill-one-catchment lead, rendered from
 * `products.hero` — on the reasoning that a page whose h1 is a chapter head
 * reads as though the reader landed halfway down it. The user looked at it and
 * asked for it off: the page opens on PROCESSING / From cherry to parchment,
 * and the first thing under the header is the work itself. `products.hero` is
 * parked again in content/en/products.ts and marked with that decision.
 */
export function ProcessWalkthrough({ content }: { content: ProductsContent['process'] }) {
  /* `opener`, because this band is the top of the page now that the hero has
     gone — a loose section padding left 192px of dead air under a fixed header
     on a desktop. */
  return (
    <Section tone="parchment-2" size="opener" id="processing" ariaLabelledby="process-heading">
      <Container width="wide">
        {/* `h1`: this band opens the page, and a page with no h1 is a page
            with no title as far as a crawler or a screen reader is
            concerned. */}
        <SectionHead
          as="h1"
          id="process-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        <ol className="mt-20 flex flex-col gap-24 lg:mt-28 lg:gap-32">
          {content.steps.map((step, i) => (
            <li key={step.n}>
              <Reveal>
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-20">
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-7' : ''}`}>
                    <SmartImage slot={step.imageSlot} />
                  </div>

                  <div
                    className={`flex flex-col gap-5 lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="t-figure-sm text-ochre/60 tnum" aria-hidden="true">
                        {step.n}
                      </span>
                      {/* `h2`, not `h3`: the band head above is the page's h1,
                          so a step is one level under it. As h3 the outline
                          skipped 1->3 — the state this page was in before #52
                          briefly put an h2 in between. */}
                      <h2 className="t-section text-[clamp(1.375rem,2.2vw,1.875rem)]">{step.title}</h2>
                    </div>

                    <p className="t-meta text-ochre-ink">
                      <RichText text={step.duration} />
                    </p>

                    <p className="t-body measure text-ink-soft">
                      <RichText text={step.body} />
                    </p>

                    <p className="t-meta border-t border-line pt-4 text-ink-soft">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
