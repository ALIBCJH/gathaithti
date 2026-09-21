import { getImageProps } from 'next/image';
import { SmoothAnchor } from '@/components/ui/SmoothAnchor';
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
  const image = getImage('homeHeroTwo');

  /* Three frames, three crops — and all three are landscape now, where the
     first used to be portrait. That changes what the phone sees: a portrait
     viewport takes a narrow vertical slice, so WHICH slice is a decision. On
     slide one the sun and the ridge are on the left and the cherry branch is
     on the right, and neither alone is the picture; the crop is held just
     right of centre so the slice carries the lit ridge and the front of the
     branch together. It opens out toward the sunrise as the screen widens and
     there is room for both. */
  /* Each desktop frame may carry a PORTRAIT counterpart for phones. The
     desktop pictures are landscape, and a phone was being shown a narrow
     vertical slice of one — the crops below were the best that could be done
     with the wrong shape of photograph.

     `getImageProps` builds the optimiser's srcSet for both, and HeroSlides
     renders them as a `<picture>`. That matters for weight: two `<Image>`
     elements toggled with `lg:hidden` would BOTH be downloaded, because a
     `display:none` image is still fetched. A `<source media>` is chosen before
     the fetch, so a phone takes only the portrait and a desktop only the
     landscape.

     All five have a portrait counterpart now. The fifth is the retail pack —
     the thing the society sells — which also closes the one case where a
     phone still got a landscape frame cropped hard. */
  const srcSetFor = (slot: Parameters<typeof getImage>[0], quality: number) => {
    const slide = getImage(slot);
    if (!slide.exists) return null;
    const { props } = getImageProps({
      src: slide.src,
      alt: slide.alt,
      width: slide.minWidth,
      height: slide.minHeight,
      quality,
      sizes: slide.sizes ?? '100vw',
    });
    return { srcSet: props.srcSet ?? '', sizes: props.sizes ?? '100vw', src: props.src };
  };

  const slides: HeroSlide[] = (
    [
      /* The third entry is the crop on a PHONE. Two of the portraits are wider
         in ratio than a phone screen and get cropped horizontally, and the
         wordmark burned into hero-mobile-01 sits hard against its left edge —
         centred, it was sliced in half. `object-left` keeps it. The other
         three are close enough to a phone's own ratio that centre is right. */
      /* THREE slides since 2026-09-18. The society asked for the sunrise over
         the ridge (homeHero) and the sunlit cherry cluster (homeHeroFive) to
         come out. The phone portraits are re-paired so the phone keeps three
         of its four: roasted beans with the scoop, cherry on the branch and
         green beans. hero-mobile-03 (cherry with sun through the leaves) is
         dropped as the nearest thing to the sunlit frame they rejected. The
         first slide gets the eager, high-priority load by its position. */
      /* SIX since later on 2026-09-18: the society's three photographs
         (Six, Seven, Eight) join the three above, alternating cherry and
         beans so two similar frames never follow each other. The new three
         have no portrait, so `null` and the fourth entry is the crop at every
         width: the phone slice is held on the cherry. */
      ['homeHeroSix', null, null, 'object-[32%_50%] lg:object-center'],
      ['homeHeroTwo', 'heroMobileOne', 'object-left', 'object-center'],
      ['homeHeroSeven', null, null, 'object-[42%_50%] lg:object-center'],
      ['homeHeroFour', 'heroMobileFour', 'object-center', 'object-center'],
      ['homeHeroThree', 'heroMobileTwo', 'object-center', 'object-[38%_50%] lg:object-[42%_50%]'],
      ['homeHeroEight', null, null, 'object-center'],
    ] as const
  )
    .map(([slot, mobileSlot, mobilePosition, position]) => ({
      image: getImage(slot),
      mobileSlot,
      mobilePosition,
      position,
    }))
    .filter(({ image: slide }) => slide.exists)
    .map(({ image: slide, mobileSlot, mobilePosition, position }) => {
      const wide = srcSetFor(slide.key as Parameters<typeof getImage>[0], 74);
      const tall = mobileSlot ? srcSetFor(mobileSlot, 74) : null;
      return {
        key: slide.key,
        src: wide?.src ?? slide.src,
        alt: slide.alt,
        sizes: wide?.sizes ?? slide.sizes ?? '100vw',
        srcSet: wide?.srcSet ?? '',
        /* Present only where a portrait file exists; HeroSlides omits the
           `<source>` entirely when it is null, and the phone then takes the
           landscape frame with the crop that was tuned for it. */
        mobileSrcSet: tall?.srcSet ?? null,
        mobileSizes: tall?.sizes ?? null,
        mobileAlt: mobileSlot ? getImage(mobileSlot).alt : null,
        /* One <img> serves both sources, so one class list has to carry both
           crops: the phone's crop unprefixed, and only the `lg:` half of the
           landscape offset above it. Built here rather than in the client
           component because it is a string transform on content, and getting
           it wrong silently shifts a crop. */
        position: mobileSlot
          ? [
              mobilePosition ?? 'object-center',
              ...position.split(' ').filter((c) => c.startsWith('lg:')),
            ].join(' ')
          : position,
      };
    });

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
         of the copy.

         56px -> 40px, which drops the motto 16px down the frame and still
         leaves 20px between it and the arrow. The floor is the arrow, not
         taste: it is absolutely positioned at `bottom-4` and is a 44px target,
         so the reserved band cannot go much below this without the two
         touching. */
      className="hero-fit relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-fixed pb-10 text-on-ink-fixed on-ink-fixed lg:pb-0"
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

      <div /* pb-20 on a phone clears the "More" pill, which is centred at the very
             bottom of the frame; the desktop keeps its own padding. */
        className="hero-body relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-end px-6 pb-20 pt-[calc(var(--header-h)+2rem)] sm:px-10 lg:px-16 lg:pb-6">
        <div className="flex max-w-[46rem] flex-col gap-4 sm:gap-5">
          {/* THE NAME, drawn at both sizes since 2026-09-21. It used to be
              `sr-only` on a phone — the motto sat here instead — and once the
              motto went the frame read as a photograph with nothing on it.

              The phone gets a LOCKUP rather than the desktop headline shrunk:
              a copper rule, the first word at display size, and the rest of
              the name under it in small capitals. Three short lines sit inside
              the dark band the scrim already lays along the bottom of the
              frame (see .hero-scrim below 40rem), so the words never cross the
              cherries or the beans above them — which is the whole reason for
              splitting the name rather than wrapping it across the picture.

              One <h1>, two spellings of the same name: whichever is drawn, a
              crawler and a screen reader get the society in full. */}
          {/* The 13em measure belongs on the desktop span, where `t-hero` sets
              the size: on the <h1> itself it was 13em of the 16px body size,
              and #167 squeezed the desktop headline into a 208px column. */}
          <h1 className="text-on-ink-fixed">
            <span className="t-hero hidden max-w-[13em] lg:block">{content.title}</span>

            <span className="flex flex-col gap-2.5 lg:hidden">
              <span aria-hidden="true" className="h-px w-10 bg-ochre-on-ink-fixed" />
              <span className="font-display text-[clamp(1.75rem,8.5vw,2.5rem)] font-semibold leading-none">
                {content.titleLead}
              </span>
              <span className="t-meta text-on-ink-fixed/80">{content.titleRest}</span>
            </span>
          </h1>

        </div>
      </div>

      {/* The phone's cue out of the hero: a small labelled button at the foot
          of the frame, where a bare arrow used to be. An arrow means "there is
          more below" only if you already read it that way; a word says it.

          It still SCROLLS rather than navigates — to the first section under
          the hero, not to another page — which is why it is a SmoothAnchor and
          not a Button. The arrow stays as a glyph beside the word, so the
          direction is not carried by the text alone.

          No `.tap` here. That utility grows a small link's hit area on a touch
          screen by forcing `position: relative` — an UNLAYERED rule inside
          `@media (pointer: coarse)` that beats Tailwind's layered `absolute`.
          On a real phone it stopped being positioned at all and sat 104px
          above the bottom edge, in flow. This is already a 44px-tall target,
          so it never needed it. */}
      <SmoothAnchor
        href="#story-heading"
        ariaLabel={content.scrollDown}
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-11 w-fit items-center gap-2 rounded-full border border-on-ink-fixed/35 bg-ink-fixed/45 px-5 text-[0.875rem] font-medium text-on-ink-fixed backdrop-blur-[2px] transition-[background-color,border-color] duration-200 [transition-timing-function:var(--ease)] hover:border-on-ink-fixed/60 hover:bg-ink-fixed/70 lg:hidden"
      >
        {content.scrollMore}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
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
      </SmoothAnchor>

      <div className="hero-foot relative mx-auto flex w-full max-w-[100rem] items-end justify-between gap-10 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10">
        <p className="t-meta hidden items-center gap-3 text-on-ink-fixed/50 lg:flex">
          {/* `on-ink-fixed`: this rule sits on the HERO, which keeps the brand
              brown in both themes. On `--on-inverse` it was black at 35% on a
              dark photograph in the light theme — an invisible hairline. */}
          <span aria-hidden="true" className="inline-block h-px w-8 bg-on-ink-fixed/35" />
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
