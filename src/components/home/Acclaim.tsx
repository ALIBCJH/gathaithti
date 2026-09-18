import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHead } from '@/components/ui/SectionHead';
import type { HomeContent } from '@content/types';

/**
 * GLOBAL ROASTER ACCLAIM — three roasters on the coffee, in their words.
 *
 * Each is a <figure> with the quotation in a <blockquote> and the roaster in
 * the <figcaption>, so the attribution is tied to the words it belongs to.
 * The text is set exactly as supplied; nothing here trims or re-punctuates it.
 */
export function Acclaim({ content }: { content: HomeContent['acclaim'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="acclaim-heading">
      <Container width="wide">
        <SectionHead id="acclaim-heading" eyebrow={content.eyebrow} heading={content.heading} />

        <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {content.quotes.map((quote, i) => (
            <li key={quote.source} className="h-full">
              <Reveal delay={i * 80} className="h-full">
                <figure className="flex h-full flex-col gap-8 border border-line bg-parchment px-7 py-9 sm:px-9">
                  <span aria-hidden="true" className="font-display text-6xl leading-[0.6] text-ochre">
                    “
                  </span>
                  <blockquote className="t-quiet flex-1 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45]">
                    <p>{quote.text}</p>
                  </blockquote>
                  <figcaption className="flex flex-col gap-1 border-t border-line pt-5">
                    <span className="font-semibold">{quote.source}</span>
                    <span className="t-meta text-ink-soft">{quote.country}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
