import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { FarmersContent } from '@content/types';

/**
 * What this page is for: the farmers own the society.
 *
 * It was the OPENING OF THE ABOUT PAGE — its title, its one sentence and three
 * cards under it — and then the opening of this one. It is second now: the
 * members band was moved above it at the user's request, so a visitor meets
 * the people before the constitutional claim about who owns them. This band
 * gave up the `h1` and the opener padding in that move.
 *
 * Somebody who reads only this far should still leave knowing the farmers own
 * it, that it is one mill and one catchment, and that it has run itself since
 * 2000.
 *
 * The photograph beneath is the members at a drying bed, and it is the only
 * frame on this page that is a photograph of this society. The three above it
 * in the members band were generated, and the three that replaced them on
 * 2026-09-08 read the same way.
 *
 * The cards are not numbered, because they are not a sequence and numbering
 * them would say they were. A copper rule and the space between separate them.
 */
export function Ownership({ content }: { content: FarmersContent['ownership'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="ownership-heading">
      <Container width="wide">
        {/* `h2` and ordinary padding: the members band above opens the page
            and holds the h1 now. Centred, like every other head on this page:
            a heading in a left column reads as a column, not as a title. */}
        <SectionHead
          id="ownership-heading"
          eyebrow={content.eyebrow}
          heading={content.title}
          lead={content.lead}
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {content.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <article className="flex h-full flex-col gap-4 border-t-2 border-ochre pt-8">
                {/* `h3`: one under this band's own head, which is an h2 now. */}
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

        {/* The members, under the claim that the society is theirs. */}
        <figure className="mx-auto mt-16 w-full max-w-[64rem] lg:mt-20">
          <Reveal className="flex flex-col gap-4">
            <SmartImage slot={content.imageSlot} />
            <figcaption className="t-meta text-ink-soft">{content.caption}</figcaption>
          </Reveal>
        </figure>
      </Container>
    </Section>
  );
}
