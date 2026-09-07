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
 * cards under it. The claim is the same wherever it sits, but on About it was
 * a statement about the society and here it is the page's subject, so it opens
 * Our Farmers and carries that page's `h1`.
 *
 * Somebody who reads only this far should still leave knowing the farmers own
 * it, that it is one mill and one catchment, and that it has run itself since
 * 2000.
 *
 * The photograph beneath is the members at a drying bed. Until it arrived, the
 * single claim on this site that most needed a picture of real members did not
 * have one — the three frames further down this page are still generated.
 *
 * The cards are not numbered, because they are not a sequence and numbering
 * them would say they were. A copper rule and the space between separate them.
 */
export function Ownership({ content }: { content: FarmersContent['ownership'] }) {
  return (
    /* `opener`: this band is the top of the page now, and the header is fixed,
       so its own top padding is the only thing holding the title clear of it. */
    <Section tone="parchment" size="opener" ariaLabelledby="ownership-heading">
      <Container width="wide">
        {/* `h1`, and the only one on the page — it moved here from the hero
            that used to carry it. Centred, like every other head on this page:
            a heading in a left column reads as a column, not as a title. */}
        <SectionHead
          as="h1"
          id="ownership-heading"
          eyebrow={content.eyebrow}
          heading={content.title}
          lead={content.lead}
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {content.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <article className="flex h-full flex-col gap-4 border-t-2 border-ochre pt-8">
                <h2 className="t-quiet text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug">
                  <RichText text={card.title} />
                </h2>
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
