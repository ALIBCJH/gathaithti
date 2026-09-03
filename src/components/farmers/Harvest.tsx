import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Section } from '@/components/ui/Section';
import { HarvestSlideshow, type Slide } from '@/components/farmers/HarvestSlideshow';
import { getImage } from '@/lib/images';
import type { FarmersContent } from '@content/types';

const SLOTS = ['harvestOne', 'harvestTwo', 'harvestThree'] as const;

/**
 * The case for the picking, and the people doing it.
 *
 * It was a split: the argument in five columns on the left, the photographs in
 * six on the right, both at half strength. On a page whose whole job is the
 * membership, the members were the smaller half of a two-column layout and the
 * frame they were in was about 790px wide.
 *
 * The band leads with them now. The head is centred across the top, the
 * photographs run nearly the full width beneath it, and the rest of the
 * argument sits under the picture in two columns. Nothing was written for
 * this: the head's lead is the first paragraph, which was already set as the
 * lead, and the two that follow are the two that followed.
 *
 * The frame is cropped to 16/9 rather than the files' own 3/2. At 3/2 across
 * 1280px the photograph would be 853px tall — a whole screen of one picture on
 * most laptops.
 *
 * The slideshow is a client component; everything else here is not, so the
 * copy is in the HTML on the first response whatever happens to the JavaScript.
 */
export function Harvest({ content }: { content: FarmersContent['harvest'] }) {
  /* Narrowed to the four fields the browser needs — see `Slide`. */
  const slides: Slide[] = SLOTS.map((slot) => getImage(slot))
    .filter((image) => image.exists)
    .map((image) => ({ key: image.key, src: image.src, alt: image.alt, sizes: image.sizes }));

  const [lead, ...rest] = content.body;

  return (
    <Section tone="parchment" size="loose" ariaLabelledby="harvest-heading">
      <Container width="wide">
        <SectionHead
          id="harvest-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={lead}
        />

        {/* If the files are ever missing the section keeps its argument and
            simply loses its pictures, rather than rendering an empty carousel
            with dots that do nothing. */}
        {slides.length > 0 ? (
          <div className="mx-auto mt-16 w-full max-w-[80rem] lg:mt-20">
            <HarvestSlideshow
              slides={slides}
              captions={content.captions}
              slideLabel={content.slideLabel}
              pauseLabel={content.pauseLabel}
              playLabel={content.playLabel}
              regionLabel={content.regionLabel}
              ratio="aspect-16/9"
            />
          </div>
        ) : null}

        <div className="mx-auto mt-16 grid w-full max-w-[80rem] gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {rest.map((paragraph, i) => (
            <p key={i} className="t-body text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
