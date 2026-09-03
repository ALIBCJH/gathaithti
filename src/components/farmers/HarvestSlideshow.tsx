'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { BLUR_DATA_URL } from '@/lib/blur';
import { ROTATION_INTERVAL } from '@/lib/rotation';



/**
 * Only what the browser needs to draw a slide. Deliberately not
 * `ResolvedImage`: that carries the art direction, the minimum dimensions and
 * the slot key, and every field of it would be serialised into the RSC payload
 * for no reason. The photographer's brief is not something the page ships.
 */
export interface Slide {
  key: string;
  src: string;
  alt: string;
  sizes?: string;
}

/**
 * Three photographs of the harvest, cross-fading every three seconds.
 *
 * Cross-fade rather than slide on purpose: in all three frames the member is
 * right of centre with the loaded branch to their left, so the compositions
 * rhyme. A slide throws that away and turns three views of one act into three
 * unrelated pictures going past. A fade holds the frame still and changes who
 * is in it.
 *
 * Four things stop it being an annoyance:
 *
 *   - It carries a visible pause control. WCAG 2.2.2 requires a way to stop
 *     anything that moves automatically for more than five seconds, and this
 *     rotates indefinitely. A carousel without one is a failure, not a taste
 *     question.
 *   - `prefers-reduced-motion` stops it before it starts. It never
 *     auto-advances for those users and the fade is instant; the dots still
 *     work, so nothing is unreachable.
 *   - It pauses on hover and on keyboard focus, so it cannot move under
 *     someone who is reading a caption or aiming at a control.
 *   - It pauses when the tab is hidden, which stops a background tab burning
 *     a phone battery repainting pictures nobody is looking at.
 *
 * The timer is re-armed from `index`, so a manual jump restarts the full three
 * seconds rather than leaving a partly elapsed one to fire immediately.
 */
export function HarvestSlideshow({
  slides,
  captions,
  slideLabel,
  pauseLabel,
  playLabel,
  regionLabel,
  ratio = 'aspect-3/2',
}: {
  slides: Slide[];
  captions: string[];
  slideLabel: string;
  pauseLabel: string;
  playLabel: string;
  regionLabel: string;
  /** The frame's shape. `3/2` is the files' own; the wide layout crops to
   *  16/9 so a photograph running most of the page's width does not take a
   *  whole screen of height with it. */
  ratio?: string;
}) {
  const [index, setIndex] = useState(0);
  /* Four separate pieces of state, because they are four different reasons to
     stop and they do not compose as one boolean:
       playing   what the visitor asked for with the button
       hovered   a transient hold while the pointer or focus is inside
       hidden    the tab is in the background
       manual    the visitor has used the button at least once
     The hover hold exists to protect someone who has NOT been given explicit
     control. Once they have used the control, it stops applying: pressing Play
     with the pointer still resting on the button has to start it, and the
     first build of this did nothing at all in that case, because the click
     focused the button and the focus hold immediately stopped it again. */
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manual, setManual] = useState(false);
  const [reduced, setReduced] = useState(false);
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  /* A hidden tab still runs timers. Nothing is being watched, so nothing
     should be repainted. */
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

  const label = (n: number) =>
    slideLabel.replace('{{n}}', String(n + 1)).replace('{{total}}', String(slides.length));

  return (
    <div
      className="flex flex-col gap-5"
      role="group"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div ref={region} className={`relative ${ratio} w-full overflow-hidden bg-parchment-2`}>
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={label(i)}
            aria-hidden={i !== index}
            className={[
              'absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease)]',
              'motion-reduce:transition-none',
              /* An element at `opacity: 0` is still there. All three slides
                 are stacked on `inset-0`, so without this the LAST one sits on
                 top of the visible one and swallows every pointer event that
                 reaches the frame — the hover hold never fires, and anything
                 interactive placed in a slide would simply be dead. Invisible
                 has to mean untouchable as well as transparent. */
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              /* Only the first is priority. The other two still sit in the
                 markup and load with the page, so the first fade is never a
                 fade into an empty box. */
              priority={i === 0}
              sizes={slide.sizes ?? '100vw'}
              quality={75}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="photo object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between gap-6">
        {/* The caption is the one thing that must reach a screen reader when
            the picture changes, and it is the only live region here — the
            slides themselves are not, because an image swapping every three
            seconds is not worth announcing. */}
        <p aria-live="polite" className="t-meta min-h-[2.5rem] max-w-[46ch] text-ink-soft">
          {captions[index]}
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={label(i)}
                aria-current={i === index}
                className={[
                  'tap h-2.5 w-2.5 rounded-full border transition-colors duration-200',
                  '[transition-timing-function:var(--ease)]',
                  i === index
                    ? 'border-ochre bg-ochre'
                    : 'border-ink/35 bg-transparent hover:border-ink/70',
                ].join(' ')}
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
              className="tap flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-ink/45"
            >
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
