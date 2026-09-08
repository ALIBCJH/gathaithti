import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import type { HomeContent } from '@content/types';

/**
 * The society's Vision and Mission, under the figures.
 *
 * These are the only sentences on the home page the co-operative wrote itself,
 * so they are set as statements rather than as body copy: centred, one under
 * the other, at a size between the section heads and the prose. Nothing else
 * shares the band.
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
      <Container width="narrow">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-12 text-center lg:gap-16">
          <Eyebrow>{content.eyebrow}</Eyebrow>

          {/* The heading a screen reader hears. Nothing draws it: the two
              labels below say what these are, and a third heading over them
              would be the same word twice. */}
          <h2 id="statements-heading" className="sr-only">
            {content.eyebrow}
          </h2>

          {content.items.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              <p className="t-meta text-ochre-ink">{item.label}</p>
              <p className="t-quiet text-balance text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.35]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
