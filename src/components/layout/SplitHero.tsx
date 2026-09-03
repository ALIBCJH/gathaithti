import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { BLUR_DATA_URL, getImage } from '@/lib/images';

/**
 * The opening of a page: the claim on the left, its photograph running the
 * full height of the band and off the right edge of the screen.
 *
 * It replaced the pattern this site used everywhere — the standard PageHeader
 * with a full-width photograph laid underneath it — which put the loudest
 * thing on the page in a band of its own, doing nothing but being large. A
 * photograph beside the sentence it illustrates is evidence; the same
 * photograph in a slab under the sentence is decoration.
 *
 * Nothing is set over the picture, which is the point of a split: no line of
 * type has to win a contrast fight with foliage. The home hero needs three
 * shaped scrims and this needs none.
 *
 * The type column sits inside the standard Container so its left edge lines up
 * with every other section at every width, including past 1600px where the
 * container stops growing and centres. The photograph is positioned against
 * the SECTION, so it reaches the viewport edge rather than the container's.
 *
 * `objectPosition` is per-page and is not a default worth guessing: each frame
 * has its subject somewhere different, and a tall crop of a landscape photo
 * throws away most of the width.
 */
export function SplitHero({
  slot,
  eyebrow,
  title,
  lead,
  objectPosition,
  warm = true,
}: {
  slot: string;
  eyebrow: string;
  title: string;
  lead: string;
  objectPosition: string;
  /** The stronger treatment, for a frame louder than the palette it sits in. */
  warm?: boolean;
}) {
  const image = getImage(slot as Parameters<typeof getImage>[0]);

  return (
    <section className="relative isolate overflow-hidden bg-parchment lg:min-h-[46rem]">
      <Container width="wide" className="relative z-10 pb-14 pt-36 sm:pb-16 sm:pt-44 lg:py-44">
        <div className="flex flex-col gap-8 lg:max-w-[52%]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="t-page-title max-w-[16ch]">{title}</h1>
          <p className="t-lead max-w-[44ch] text-ink-soft">
            <RichText text={lead} />
          </p>
        </div>
      </Container>

      {/* In flow beneath the type on a phone, full-bleed and tall. Absolutely
          positioned against the section from `lg`, where it becomes the right
          hand column. One element in both cases: never requested twice. */}
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
            className={`${warm ? 'photo-warm' : 'photo'} object-cover ${objectPosition}`}
          />
        ) : (
          <Placeholder slot={image} />
        )}
      </div>
    </section>
  );
}
