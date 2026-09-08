import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import type { HomeContent } from '@content/types';

/**
 * The society's Vision and Mission, under the figures.
 *
 * These are the only sentences on the home page the co-operative wrote itself,
 * so they are set as statements rather than as body copy: centred, at a size
 * between the section heads and the prose. Nothing else shares the band.
 *
 * ONE CARD EACH. They were two centred blocks stacked in open space, which
 * read as one statement that had been broken in half — the eye had nothing to
 * tell it where the Vision ended and the Mission began except a gap. A card
 * apiece draws that line, and side by side on a desktop they read as a pair
 * rather than as a sequence, which is what they are.
 *
 * The cards sit on `bg-parchment` inside a `parchment-2` band, so in the light
 * theme the shade separates them and in the dark theme — where every surface
 * is the same brown — the hairline and the copper rule do it instead. Neither
 * theme is left relying on something the other does not have.
 *
 * NOT HIDDEN ON A PHONE, unlike the figures above and the season panel below.
 * Those two are `hidden lg:block` to keep the first scroll short, and it was
 * tempting to fold this in with them — but they are DATA a visitor can take or
 * leave, and this is what the society says it is for. Two short statements
 * cost a phone almost nothing.
 */
export function Statements({ content }: { content: HomeContent['statements'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="statements-heading">
      <Container width="wide">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <Eyebrow>{content.eyebrow}</Eyebrow>

          {/* The heading a screen reader hears. Nothing draws it: the two
              labels below say what these are, and a third heading over them
              would be the same word twice. */}
          <h2 id="statements-heading" className="sr-only">
            {content.eyebrow}
          </h2>

          {/* Two equal cards, and `items-stretch` so the shorter statement's
              card matches the taller one rather than floating at its own
              height. The Mission runs to three lines and the Vision to two. */}
          <ul className="grid w-full max-w-[64rem] items-stretch gap-6 sm:grid-cols-2 lg:gap-8">
            {content.items.map((item) => (
              <li key={item.label} className="h-full">
                {/* `justify-center`: the two statements are different lengths,
                    and with the cards stretched to a common height the shorter
                    one otherwise sits at the top of its card with a hole under
                    it. Centred, the pair reads as two of the same thing. */}
                <article className="flex h-full flex-col items-center justify-center gap-5 border border-line bg-parchment px-7 py-10 text-center sm:px-9 sm:py-12">
                  {/* A short copper rule over each label — the same mark the
                      ownership cards on Our Farmers use, so a card on this
                      site looks like a card on any other page of it. */}
                  <span aria-hidden="true" className="h-0.5 w-10 shrink-0 bg-ochre" />

                  <p className="t-meta text-ochre-ink">{item.label}</p>

                  <p className="t-quiet text-balance text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.4]">
                    {item.body}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
