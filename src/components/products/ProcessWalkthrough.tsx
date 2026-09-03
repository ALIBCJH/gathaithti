import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { ProductsContent } from '@content/types';

/**
 * The top of the page, and the six steps that open it.
 *
 * Two heads, deliberately, and they are not the same kind of thing. The first
 * names the PAGE — you clicked "Our Coffee" and this is what it is, plus the
 * one claim every lot below shares. The second names the BAND, which is the
 * first chapter of that page rather than the whole of it.
 *
 * They were one, and the page was worse for it: after the hero came off in
 * #40 the page began on PROCESSING / From cherry to parchment / 01 Selective
 * picking, with nothing anywhere near the top saying "Our Coffee". Arriving
 * from the nav, it read as though you had landed halfway down someone else's
 * page. The h1 carried a chapter title while the page itself had none.
 *
 * A rule and real space separate the two, and they are set at different
 * sizes — `t-page-title` against `t-section` — so the page title reads as the
 * masthead and the band head reads as what follows it, rather than the two
 * competing as a stack of centred type.
 *
 * The space between them is deliberately smaller than a section's: at a full
 * section's rhythm the two heads sat 193px apart and pushed the first step's
 * photograph under the fold, which is the dead air this page was cleared of
 * in #49 arriving back by another route.
 */
export function ProcessWalkthrough({
  content,
  opening,
}: {
  content: ProductsContent['process'];
  /** The page's own title and the claim every lot on it shares. */
  opening: ProductsContent['hero'];
}) {
  /* `opener`, because this band is the top of the page now that the hero has
     gone — a loose section padding left 192px of dead air under a fixed header
     on a desktop. */
  return (
    <Section tone="parchment-2" size="opener" id="processing" ariaLabelledby="coffee-heading">
      <Container width="wide">
        {/* The page's masthead. `h1`, and the only one on the page: a page
            with no h1 is a page with no title as far as a crawler or a screen
            reader is concerned, and until now the h1 here was a chapter's. */}
        <SectionHead
          as="h1"
          id="coffee-heading"
          eyebrow={opening.eyebrow}
          heading={opening.title}
          lead={opening.lead}
        />

        <div className="mt-14 border-t border-line pt-14 lg:mt-16 lg:pt-16">
          <SectionHead
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
                        <h3 className="t-section text-[clamp(1.375rem,2.2vw,1.875rem)]">{step.title}</h3>
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
        </div>
      </Container>
    </Section>
  );
}
