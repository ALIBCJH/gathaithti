import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { AboutContent } from '@content/types';

/**
 * The opening of the page, and the three cards that answer it.
 *
 * There was a photographic hero above this band. It is gone: a landscape frame
 * cropped into a tall column, doing nothing but being large, above a title
 * stranded in the left half of the screen. What it left behind was two bands
 * in a row labelled ABOUT THE SOCIETY, the first of them holding a sentence
 * and nothing else.
 *
 * They are one band now. The title of the page sits centred at the top, its
 * one sentence under it, and the three cards immediately beneath — so the
 * first screen of the About page states what the society is and then starts
 * proving it, rather than showing a picture of a man in a tree.
 *
 * Somebody who reads only this far should still leave knowing the farmers own
 * it, that it is one mill and one catchment, and that it has run itself since
 * 2000.
 *
 * Numbered, because they are not a sequence and the numbers would be a lie —
 * so they are not numbered. What separates them is a copper rule and the space
 * between, the same device the three governing bodies use further down.
 */
export function Pillars({
  content,
  opening,
}: {
  content: AboutContent['pillars'];
  /** The page's own title and sentence, which used to belong to the hero. */
  opening: AboutContent['hero'];
}) {
  return (
    /* `opener`: this band is the top of the page now, and the header is fixed,
       so its own top padding is the only thing holding the title clear of it. */
    <Section tone="parchment" size="opener" ariaLabelledby="about-heading">
      <Container width="wide">
        {/* `h1`, and the only one on the page — it moved here from the hero
            that used to carry it. Centred, like every other head on this page:
            a heading in a left column reads as a column, not as a title. */}
        <SectionHead
          as="h1"
          id="about-heading"
          eyebrow={opening.eyebrow}
          heading={opening.title}
          lead={opening.lead}
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
      </Container>
    </Section>
  );
}
