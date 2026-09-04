'use client';

import { useEffect, useState } from 'react';

import { BLUR_DATA_URL } from '@/lib/blur';
import { ROTATION_INTERVAL } from '@/lib/rotation';


export interface HeroSlide {
  key: string;
  src: string;
  alt: string;
  /** From the slot. Carries the height-aware rule — see content/images.ts. */
  sizes: string;
  /** The optimiser's candidates for the landscape frame. */
  srcSet: string;
  /**
   * The portrait frame for phones, where one exists. Null means this slide has
   * no phone-specific photograph and the landscape one is used at every width.
   */
  mobileSrcSet: string | null;
  mobileSizes: string | null;
  mobileAlt: string | null;
  /** Per-slide crop. Each frame has its subject in a different place. */
  position: string;
}

/**
 * The hero photograph, as three photographs.
 *
 * Same contract as the harvest slideshow on Our Farmers — a visible pause
 * control, `prefers-reduced-motion` honoured, holds on hover and focus, stops
 * in a hidden tab, and an explicit press of the control beats the implicit
 * hold. Two things are specific to the hero:
 *
 * LCP. The first slide is the largest contentful paint of the whole site, and
 * three full-screen images racing each other would push it out. Slides two and
 * three are not rendered at all until after the first paint, and then at
 * `fetchPriority="low"`, so they queue behind the one the visitor is actually
 * looking at. They are needed at four seconds, which is a long time to fetch
 * an image that has already started.
 *
 * The crop. The first frame is portrait and the other two are landscape, so a
 * single `object-position` cannot serve all three — each slide carries its own.
 *
 * Without JavaScript the first slide renders on its own, which is what the
 * hero was before this.
 */
export function HeroSlides({
  slides,
  slideLabel,
  pauseLabel,
  playLabel,
  regionLabel,
}: {
  slides: HeroSlide[];
  slideLabel: string;
  pauseLabel: string;
  playLabel: string;
  regionLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manual, setManual] = useState(false);
  const [reduced, setReduced] = useState(false);
  /* Slides beyond the first are withheld from the first paint. See LCP above. */
  const [rest, setRest] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setRest(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const running = playing && !hidden && !reduced && (manual || !hovered);

  useEffect(() => {
    if (!running || slides.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % slides.length),
      ROTATION_INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [index, running, slides.length]);

  const label = (n: number) =>
    slideLabel
      .replace("{{n}}", String(n + 1))
      .replace("{{total}}", String(slides.length));

  return (
    /* One region containing BOTH the slides and their controls. The first
       build had the controls as a sibling of the carousel element, which left
       them outside the region they operate: assistive technology had no way to
       associate the dots with the pictures they change. The wrapper takes no
       pointer events so the type and the header above it stay clickable; the
       control cluster turns them back on for itself. */
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) =>
          i > 0 && !rest ? null : (
            <div
              key={slide.key}
              role="group"
              aria-roledescription="slide"
              aria-label={label(i)}
              aria-hidden={i !== index}
              className={[
                "absolute inset-0 transition-opacity duration-[900ms]",
                "[transition-timing-function:var(--ease)] motion-reduce:transition-none",
                /* Invisible must mean untouchable: these are stacked on
                   inset-0 and an element at opacity 0 still takes the pointer. */
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              ].join(" ")}
            >
              {/* A `<picture>`, not next/image, because this is the one place
                  on the site that needs ART DIRECTION rather than a resize:
                  the phone gets a different PHOTOGRAPH, not a crop of the same
                  one. Two <Image> elements toggled with `lg:hidden` would both
                  be downloaded — a display:none image is still fetched — where
                  a `<source media>` is resolved before the request.

                  The blur-up moves to the wrapper's background, which is what
                  next/image does internally anyway.

                  The crop offset is applied ONLY to the landscape frame. Each
                  portrait file is already composed for a phone, and every one
                  of them has the wordmark set into the photograph, so shifting
                  the crop would push it off the edge. */}
              <picture>
                {slide.mobileSrcSet ? (
                  <source
                    media="(max-width: 1023px)"
                    srcSet={slide.mobileSrcSet}
                    sizes={slide.mobileSizes ?? "100vw"}
                  />
                ) : null}
                <source media="(min-width: 1024px)" srcSet={slide.srcSet} sizes={slide.sizes} />
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  decoding={i === 0 ? "sync" : "async"}
                  style={{
                    backgroundImage: `url(${BLUR_DATA_URL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`photo absolute inset-0 h-full w-full object-cover ${slide.position}`}
                />
              </picture>
            </div>
          ),
        )}
      </div>

      {/* No visible controls. The dots and the pause button were clutter over
          a photograph and they are gone.

          The pause button is NOT gone — it is `sr-only` until it takes
          keyboard focus, at which point it appears. WCAG 2.2.2 requires a
          mechanism to stop anything that moves automatically for more than
          five seconds, and this rotates indefinitely; deleting the mechanism
          outright would make the hero a conformance failure rather than a
          tidier design. Hidden-until-focused keeps the frame clean for
          everyone looking at it and keeps the control for anyone who needs it.
          `prefers-reduced-motion` still stops the rotation before it starts.

          There is nothing left to hover, so the hover hold goes with the
          controls; focus still holds, because focus means someone is on the
          button and about to press it. */}
      {!reduced && slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setManual(true);
              setPlaying((on) => !on);
            }}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            aria-label={playing ? pauseLabel : playLabel}
            className="pointer-events-auto sr-only focus-visible:not-sr-only focus-visible:relative focus-visible:m-4 focus-visible:flex focus-visible:h-11 focus-visible:w-11 focus-visible:items-center focus-visible:justify-center focus-visible:rounded-full focus-visible:border focus-visible:border-on-inverse/60 focus-visible:bg-inverse/80 focus-visible:text-on-inverse"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              {playing ? (
                <>
                  <rect x="7" y="5" width="3.5" height="14" rx="0.5" />
                  <rect x="13.5" y="5" width="3.5" height="14" rx="0.5" />
                </>
              ) : (
                <path d="M8 5.5v13l11-6.5z" />
              )}
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
