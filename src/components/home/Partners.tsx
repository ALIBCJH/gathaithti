import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { HomeContent } from '@content/types';

/**
 * The organisations the society works with, shown as their own marks.
 *
 * Each supplied file is 1376x768 with the logo centred on its own pale ground,
 * so each card is 16/9 and the image fills it edge to edge — the ground that
 * came with the file becomes the tile. Knocking the logos out to transparent
 * would put four different pale halos on this site's dark parchment; leaving
 * them as they are gives one even row.
 *
 * The name under each mark is the organisation's name and nothing else. There
 * is no sentence about what any of them does or how it is involved, because
 * those are claims about other companies and the society is the only party
 * that can make them. The same reasoning that keeps invented members off Our
 * Farmers keeps invented relationships off this band.
 */
export function Partners({ content }: { content: HomeContent['partners'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="partners-heading">
      <Container width="wide">
        <SectionHead id="partners-heading" eyebrow={content.eyebrow} heading={content.heading} />

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {content.items.map((partner, i) => (
            <li key={partner.id}>
              <Reveal delay={(i % 4) * 60} className="flex flex-col gap-4">
                {/* No `zoom`: a trademark is not a photograph to play with. */}
                <SmartImage slot={partner.imageSlot} className="border border-line" />
                <p className="t-meta text-center text-ink-soft">{partner.name}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
