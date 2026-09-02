'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { BLUR_DATA_URL } from '@/lib/blur';
import { ROTATION_INTERVAL } from '@/lib/rotation';


export interface HeroSlide {
  key: string;
  src: string;
  alt: string;
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
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="100vw"
                quality={74}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className={`photo object-cover ${slide.position}`}
              />
            </div>
          ),
        )}
      </div>

      {/* Bottom-right of the frame, opposite the scroll cue and clear of the
          type column, which sits bottom-left.

          The hover hold is scoped to THIS cluster, not to the whole frame as
          it is on the harvest section. A hero fills the screen, so a pointer
          resting anywhere on the page would be resting on it — holding on that
          would stop the rotation more or less permanently for anyone using a
          mouse. Resting on the controls is a deliberate act; resting on the
          hero is just where the cursor happens to be. Positioned against the SECTION
          rather than dropped into `hero-foot`, for two reasons: the foot is
          `display: none` under 37rem of viewport height, and a pause control
          is not something that may disappear on a short screen — WCAG 2.2.2
          requires it wherever the thing it stops is moving. The inner wrapper
          repeats the container's own max-width and padding so the controls
          line up with the page margin at every width. */}
      <div className="absolute inset-x-0 bottom-8 z-10 lg:bottom-10">
        <div className="mx-auto flex w-full max-w-[100rem] justify-end px-6 sm:px-10 lg:px-16">
          <div
            className="pointer-events-auto flex items-center gap-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setHovered(false);
            }}
          >
            <div className="flex items-center gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={label(i)}
                  aria-current={i === index}
                  className={[
                    "tap h-2.5 w-2.5 rounded-full border transition-colors duration-200",
                    "[transition-timing-function:var(--ease)]",
                    i === index
                      ? "border-on-inverse bg-on-inverse"
                      : "border-on-inverse/50 bg-transparent hover:border-on-inverse",
                  ].join(" ")}
                />
              ))}
            </div>

            {!reduced && slides.length > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setManual(true);
                  setPlaying((on) => !on);
                }}
                aria-label={playing ? pauseLabel : playLabel}
                className="tap flex h-9 w-9 items-center justify-center rounded-full border border-on-inverse/40 text-on-inverse transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-on-inverse"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  aria-hidden="true"
                >
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
