import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { BLUR_DATA_URL, getImage } from '@/lib/images';
import type { HomeContent } from '@content/types';
import type { Locale } from '@content/site';

/**
 * The first five seconds. Without scrolling a visitor must learn who this is
 * and that the coffee is exceptional — the name and the proof, with nothing
 * competing with them.
 *
 * There are no buttons here any more. The hero states who the society is and
 * lets the page carry the visitor on; the routes out are the navigation, the
 * scroll cue, and the calls to action further down the page, which is where
 * they now live alone rather than being announced twice.
 *
 * The hero is still sized to a SCREEN rather than a width, and the type scale
 * is driven by `vw`. A phone turned on its side keeps its width and loses two
 * thirds of its height, so the headline would stay at desktop size and push the
 * lead off the bottom. `hero-fit` / `hero-body` / `hero-foot` are the hooks the
 * short-viewport rules in globals.css use to keep the whole thing on one
 * screen.
 */
export function Hero({ locale, content }: { locale: Locale; content: HomeContent['hero'] }) {
  const image = getImage('homeHero');

  return (
    /* Exactly one viewport tall. The old hero was 92svh with everything pushed
       to the bottom edge, which left a void above the type and a sliver of the
       next section peeking below — it read as a page that had not quite fitted.
       Now the type sits centred in the space under the header, and the foot of
       the frame carries the scroll cue. */
    <section className="hero-fit relative isolate flex min-h-svh flex-col overflow-hidden bg-inverse text-on-inverse on-ink">
      {image.exists ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={74}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          /* The photograph is portrait and the viewport usually is not, so
             `object-cover` throws away a band of it. WHICH band is a design
             decision, not a default: centred, a wide screen keeps the cherries
             and loses the sunrise, which is the half the headline needs to sit
             in. Biasing the crop upward as the screen widens keeps the open sky
             on screen exactly when there is least height to hold it. */
          className="photo object-cover object-[60%_45%] sm:object-[55%_38%] lg:object-[50%_28%]"
        />
      ) : null}

      {/* Three scrims, each doing one job, each shaped rather than flat.

          A photograph does not have a background colour, so none of this can be
          reasoned about from the CSS — the numbers below come from sampling the
          rendered pixels behind each line of type with the text hidden. Two
          things failed a flat treatment: the navigation, sitting over the
          brightest part of the sky at 2.6:1, and the ochre eyebrow over the
          sunlit hillside at 2.7:1. Ochre is a mid-tone, so it needs genuinely
          dark ground under it — no gentle wash was going to rescue it.

          Hence the middle layer. Darkening the whole frame to fix one corner
          would have cost the picture everything it is here to do, so the weight
          is a radial anchored to the bottom-left, over the leaves where the
          words already are. The cherries on the right are barely touched.

            1  top-down     the header, over open sky
            2  bottom-left  the type column
            3  bottom-up    grounds the frame and carries the scroll cue

          Mixed from `--inverse` rather than black, so the hero belongs to the
          site rather than looking like a stock photo with a filter on it. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0" />

      <div className="hero-body relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-end px-6 pb-6 pt-[calc(var(--header-h)+2rem)] sm:px-10 lg:px-16">
        <div className="flex max-w-[46rem] flex-col gap-4 sm:gap-5">
          {/* `sr-only` below lg, not `hidden`. The name is off the small screen
              as asked, but it is still the page's only <h1> — and Google indexes
              the MOBILE rendering of a page, so a heading actually removed there
              is a heading removed from the index, on the one page whose title is
              the society's name. Screen readers and crawlers still get it; the
              phone simply does not draw it. */}
          <h1 className="sr-only t-hero max-w-[13em] text-on-inverse lg:not-sr-only">
            {content.title}
          </h1>

          <p className="t-lead max-w-[44ch] text-on-inverse/90">
            <RichText text={content.positioning} />
          </p>

          {/* The phone's way out of the hero. It replaces the scroll cue rather
              than joining it: a cue that says "there is more below" and a button
              that takes you somewhere are the same job asked twice. */}
          <div className="mt-2 flex justify-center lg:hidden">
            <Button href={`/${locale}/${content.readMore.href}`} surface="dark" variant="secondary">
              {content.readMore.label}
            </Button>
          </div>
        </div>
      </div>

      <div className="hero-foot relative mx-auto flex w-full max-w-[100rem] items-end justify-between gap-10 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10">
        <p className="t-meta hidden items-center gap-3 text-on-inverse/50 lg:flex">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-on-inverse/35" />
          {content.scrollHint}
        </p>

        {!image.exists && (
          <div className="hidden w-[min(24rem,32vw)] lg:block">
            <div style={{ aspectRatio: '21 / 9' }}>
              <Placeholder slot={image} tone="dark" compact />
            </div>
          </div>
        )}
      </div>

      {/* Watched by the header: while this is on screen the bar is transparent. */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
