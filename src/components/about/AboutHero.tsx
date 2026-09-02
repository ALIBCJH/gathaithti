import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { BLUR_DATA_URL, getImage } from '@/lib/images';
import type { AboutContent } from '@content/types';

/**
 * The opening of the About page.
 *
 * It used to be the standard PageHeader with a 16:9 photograph laid underneath
 * it like a slab — and the photograph was the mill's empty drying beds, a
 * picture of nobody, under a headline that says the farmers own this. It
 * decorated the page instead of arguing it.
 *
 * Now the claim and its evidence sit side by side: the title on the page's own
 * ground, and a member reaching into the branch running the full height of the
 * opening and off the right edge of the screen. Nothing is set over the
 * photograph, so no line of type has to win a contrast fight with foliage —
 * the reason the home hero needs three shaped scrims and this needs none.
 *
 * The crop is tall because the gesture is vertical. `object-position` holds the
 * arms and the picked branch in frame as the column narrows.
 */
export function AboutHero({ content }: { content: AboutContent['hero'] }) {
  const image = getImage('aboutHero');

  return (
    <section className="relative isolate overflow-hidden bg-parchment lg:min-h-[46rem]">
      {/* The type column is inside the standard Container, so its left edge
          lines up with every other section on the site at every width,
          including past 1600px where the container stops growing and centres. */}
      <Container width="wide" className="relative z-10 pb-14 pt-36 sm:pb-16 sm:pt-44 lg:py-44">
        <div className="flex flex-col gap-8 lg:max-w-[52%]">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="t-page-title max-w-[16ch]">{content.title}</h1>
          <p className="t-lead max-w-[44ch] text-ink-soft">
            <RichText text={content.lead} />
          </p>
        </div>
      </Container>

      {/* In flow beneath the type on a phone, full-bleed and tall. Absolutely
          positioned against the section from `lg`, where it becomes the right
          hand column and runs to the viewport edge rather than the container's.
          One element in both cases: the photograph is never requested twice. */}
      <div className="relative h-[58svh] min-h-[20rem] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%]">
        {image.exists ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            sizes={image.sizes}
            quality={75}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            /* Measured, not guessed. The subject sits at roughly 29% across the
               source and the picked hand at 64%, and a tall crop of a 3:2 frame
               cannot hold both at a centred position: at 58% the man's face was
               cut in half by the left edge of the panel on a phone, which is the
               one part of this photograph that must survive any crop. */
            className="photo-warm object-cover object-[34%_45%] lg:object-[50%_40%]"
          />
        ) : (
          <Placeholder slot={image} />
        )}
      </div>
    </section>
  );
}
