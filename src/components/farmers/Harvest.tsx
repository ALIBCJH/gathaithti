import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { HarvestSlideshow, type Slide } from '@/components/farmers/HarvestSlideshow';
import { getImage } from '@/lib/images';
import type { FarmersContent } from '@content/types';

const SLOTS = ['harvestOne', 'harvestTwo', 'harvestThree'] as const;

/**
 * The case for the picking, next to the picking.
 *
 * This replaced a single photograph slot that had no photograph in it, sitting
 * between the noticeboard and the member profiles like a slab. The section now
 * makes the argument the rest of the page assumes: that selective picking is
 * the reason the coffee cups the way it does, and that it is done by hand by
 * the people who own the society.
 *
 * The slideshow is a client component; everything else here is not, so the
 * copy is in the HTML on the first response whatever happens to the JavaScript.
 */
export function Harvest({ content }: { content: FarmersContent['harvest'] }) {
  /* Narrowed to the four fields the browser needs — see `Slide`. */
  const slides: Slide[] = SLOTS.map((slot) => getImage(slot))
    .filter((image) => image.exists)
    .map((image) => ({ key: image.key, src: image.src, alt: image.alt, sizes: image.sizes }));

  return (
    <Section tone="parchment" size="loose" ariaLabelledby="harvest-heading">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-7 lg:col-span-5 lg:self-center">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="harvest-heading" className="t-section max-w-[20ch]">
              {content.heading}
            </h2>
            {content.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 't-lead measure text-ink-soft'
                    : 't-body measure text-ink-soft'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            {/* If the files are ever missing the section keeps its argument and
                simply loses its pictures, rather than rendering an empty
                carousel with dots that do nothing. */}
            {slides.length > 0 ? (
              <HarvestSlideshow
                slides={slides}
                captions={content.captions}
                slideLabel={content.slideLabel}
                pauseLabel={content.pauseLabel}
                playLabel={content.playLabel}
                regionLabel={content.regionLabel}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
