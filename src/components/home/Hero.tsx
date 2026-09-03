import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { HeroSlides, type HeroSlide } from '@/components/home/HeroSlides';
import { getImage } from '@/lib/images';
import type { HomeContent } from '@content/types';

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
export function Hero({ content }: { content: HomeContent['hero'] }) {
  const image = getImage('homeHero');

  /* Three frames, three crops — and all three are landscape now, where the
     first used to be portrait. That changes what the phone sees: a portrait
     viewport takes a narrow vertical slice, so WHICH slice is a decision. On
     slide one the sun and the ridge are on the left and the cherry branch is
     on the right, and neither alone is the picture; the crop is held just
     right of centre so the slice carries the lit ridge and the front of the
     branch together. It opens out toward the sunrise as the screen widens and
     there is room for both. */
  const slides: HeroSlide[] = (
    [
      ['homeHero', 'object-[58%_46%] sm:object-[54%_46%] lg:object-[46%_44%]'],
      ['homeHeroTwo', 'object-center'],
      ['homeHeroThree', 'object-[38%_50%] lg:object-[42%_50%]'],
      ['homeHeroFour', 'object-center'],
      /* Sun flare top-left, cluster right. The type is bottom-left, so the
         crop keeps the cluster in and the flare out of the words. */
      ['homeHeroFive', 'object-[64%_55%] lg:object-[58%_50%]'],
    ] as const
  )
    .map(([slot, position]) => ({ image: getImage(slot), position }))
    .filter(({ image: slide }) => slide.exists)
    .map(({ image: slide, position }) => ({
      key: slide.key,
      src: slide.src,
      alt: slide.alt,
      sizes: slide.sizes ?? '100vw',
      position,
    }));

  return (
    /* Exactly one viewport tall. The old hero was 92svh with everything pushed
       to the bottom edge, which left a void above the type and a sliver of the
       next section peeking below — it read as a page that had not quite fitted.
       Now the type sits centred in the space under the header, and the foot of
       the frame carries the scroll cue. */
    <section
      /* The band at the foot is now only for the arrow, which is why it is
         much shallower than the one the dots and pause button needed. Below
         `lg` the hero is content-height rather than a full screen, so without
         a reserved band an element positioned against the section lands on top
         of the copy. */
      className="hero-fit relative isolate flex min-h-svh flex-col overflow-hidden bg-inverse pb-14 text-on-inverse on-ink lg:pb-0"
    >
      {slides.length > 0 ? (
        <HeroSlides
          slides={slides}
          slideLabel={content.slideLabel}
          pauseLabel={content.pauseLabel}
          playLabel={content.playLabel}
          regionLabel={content.regionLabel}
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

      <div className="hero-body relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-end px-6 pb-2 pt-[calc(var(--header-h)+2rem)] sm:px-10 lg:px-16 lg:pb-6">
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

        </div>
      </div>

      {/* The phone's cue out of the hero: a small arrow at the foot of the
          frame. It replaced a "Read more" button that took up a whole row of
          the composition — the picture is the point of this section, and the
          arrow says the same thing in a tenth of the space.

          It scrolls rather than navigates. A downward arrow at the bottom of a
          hero means "there is more below", and the button it replaced went to
          About, which would have been a downward arrow that left the page. The
          tap target is a full 44px; only the glyph inside it is small. */}
      <a
        href="#story-heading"
        aria-label={content.scrollDown}
        /* No `.tap` here. That utility exists to grow a small inline link's hit
             area on a touch screen, and it does it by forcing
             `position: relative` — an UNLAYERED rule inside
             `@media (pointer: coarse)`, which beats Tailwind's layered
             `absolute`. On a real phone the arrow stopped being positioned at
             all and sat 104px above the bottom edge, in flow. It is already a
             44px target, so it never needed `.tap`. */
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-11 w-11 items-center justify-center text-on-inverse/70 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-on-inverse lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m6 13 6 6 6-6" />
        </svg>
      </a>

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
