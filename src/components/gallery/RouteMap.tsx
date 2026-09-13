'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The route: one line with a dot per stop, like a trail map. The stop in the
 * middle of the screen fills; the ones already walked keep an ochre ring.
 *
 * A column beside the photographs on a desktop; on a phone it is a bar under
 * the header that slides along with the walk. Without JavaScript it is still a
 * list of working links — the highlighting is the only thing that needs this
 * component to run.
 */
export function RouteMap({
  stops,
  label,
  title,
}: {
  stops: { id: string; n: string; short: string }[];
  label: string;
  title: string;
}) {
  const [here, setHere] = useState(-1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const targets = stops
      .map((stop) => document.getElementById(`stop-${stop.id}`))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setHere(targets.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stops]);

  /* On the phone bar, keep the current stop in view as the walk moves on. */
  useEffect(() => {
    const list = listRef.current;
    if (here < 0 || !list || window.matchMedia('(min-width: 1024px)').matches) return;
    const link = list.children[here] as HTMLElement | undefined;
    if (!link) return;
    list.scrollTo({
      left: link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [here]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[var(--header-h)] z-30 -mx-6 border-b border-line bg-parchment/95 px-6 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:top-[calc(var(--header-h)+1.5rem)] lg:mx-0 lg:mt-10 lg:self-start lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
    >
      <p className="stencil mb-4 hidden text-[1.125rem] text-ochre-ink lg:block">{title}</p>
      <ol
        ref={listRef}
        className="relative flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:py-0 lg:before:absolute lg:before:bottom-3.5 lg:before:left-[14px] lg:before:top-3.5 lg:before:w-px lg:before:bg-line lg:before:content-['']"
      >
        {stops.map((stop, i) => {
          const isHere = i === here;
          const passed = here >= 0 && i < here;
          return (
            <li key={stop.id} className="shrink-0">
              <a
                href={`#stop-${stop.id}`}
                aria-current={isHere ? 'step' : undefined}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-ink lg:rounded-lg lg:py-[7px] ${
                  isHere ? 'bg-parchment-2 text-ink' : 'text-ink-soft'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`relative z-[1] size-[9px] shrink-0 rounded-full border-[1.5px] transition-colors duration-200 ${
                    isHere
                      ? 'border-ochre bg-ochre shadow-[0_0_0_4px_rgb(180_98_42/0.2)]'
                      : passed
                        ? 'border-ochre bg-parchment'
                        : 'border-line bg-parchment'
                  }`}
                />
                <span className={`stencil min-w-[1.4em] text-base tracking-[0.04em] ${isHere ? 'text-ochre-ink' : ''}`}>
                  {stop.n}
                </span>
                {stop.short}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
