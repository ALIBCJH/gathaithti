'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { BLUR_DATA_URL } from '@/lib/blur';
import { ROTATION_INTERVAL } from '@/lib/rotation';

/**
 * Resolved on the SERVER and handed over as plain data.
 *
 * Not the image slot: `SmartImage` reaches `lib/images`, which reads
 * `node:fs`, and pulling that into a `'use client'` module does not fail at
 * runtime — it fails the Turbopack BUILD, with "the chunking context does not
 * support external modules (request: node:fs)". Everything the browser needs
 * is a src, an alt and a sizes hint; the photographer's brief and the
 * existence check stay on the server, where they belong.
 */
export interface GallerySlide {
  id: string;
  src: string;
  alt: string;
  sizes: string;
  caption: string;
}

/**
 * The gallery, as one photograph at a time.
 *
 * A grid would show four thumbnails; this shows one picture properly, which is
 * the point when the pictures are the first real evidence on the site that the
 * place exists. The photographs are mixed landscape and portrait, so the frame
 * is a fixed 3/2 box and each image is CONTAINED inside it rather than cropped
 * to fill — a portrait bed is not improved by having its ends cut off, and the
 * fixed box holds the shape steady so the page never jumps between slides.
 *
 * It carries real controls, unlike the hero. The hero rotates behind a
 * headline and a visitor is not there for the photographs; here they are the
 * content, so previous, next and pause are all visible, and the dots say how
 * many there are.
 *
 * Everything that stops it being an annoyance is the contract the other
 * slideshows on this site use: `prefers-reduced-motion` stops it before it
 * starts, a hidden tab stops it, hovering or focusing holds it, and an
 * explicit press beats the hover hold — see `manual`, which exists because the
 * first version of that logic did nothing at all when you pressed Play with
 * the pointer still resting on the button.
 */
export function GallerySlideshow({
  slides,
  prevLabel,
  nextLabel,
  pauseLabel,
  playLabel,
  regionLabel,
  slideLabel,
}: {
  slides: GallerySlide[];
  prevLabel: string;
  nextLabel: string;
  pauseLabel: string;
  playLabel: string;
  regionLabel: string;
  slideLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manual, setManual] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
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

  const go = (next: number) => setIndex((next + slides.length) % slides.length);
  const label = (n: number) =>
    slideLabel.replace('{{n}}', String(n + 1)).replace('{{total}}', String(slides.length));

  const control =
    'tap flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-ink/45';

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      className="flex flex-col gap-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-[var(--radius-photo)] bg-parchment-2">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={label(i)}
            aria-hidden={i !== index}
            className={[
              'absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease)]',
              'motion-reduce:transition-none',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes={slide.sizes}
              quality={78}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="photo object-contain"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        {/* The caption is the live region: when the picture changes, the words
            under it are what a screen reader needs, not the image. */}
        <p aria-live="polite" className="t-body max-w-[62ch] text-[0.9375rem] text-ink-soft">
          {slides[index]?.caption}
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button type="button" onClick={() => { setManual(true); go(index - 1); }} aria-label={prevLabel} className={control}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m14.5 5-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => { setManual(true); setIndex(i); }}
                aria-label={label(i)}
                aria-current={i === index}
                className={[
                  'h-2.5 w-2.5 rounded-full border transition-colors duration-200',
                  '[transition-timing-function:var(--ease)]',
                  i === index ? 'border-ochre bg-ochre' : 'border-ink/35 bg-transparent hover:border-ink/70',
                ].join(' ')}
              />
            ))}
          </div>

          <button type="button" onClick={() => { setManual(true); go(index + 1); }} aria-label={nextLabel} className={control}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9.5 5 7 7-7 7" />
            </svg>
          </button>

          {/* WCAG 2.2.2: anything moving by itself for more than five seconds
              needs a way to stop it. This rotates indefinitely. */}
          {!reduced && slides.length > 1 ? (
            <button type="button" onClick={() => { setManual(true); setPlaying((on) => !on); }} aria-label={playing ? pauseLabel : playLabel} className={`${control} ml-1`}>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
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
  );
}
