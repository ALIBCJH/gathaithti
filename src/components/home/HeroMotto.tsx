'use client';

import { useEffect, useState } from 'react';

import { HERO_SLIDE_EVENT } from '@/components/home/HeroSlides';

/**
 * The society's motto, over the hero photographs, sliding in each time the
 * photograph changes — the client asked for it to move with the pictures
 * rather than sit still over them.
 *
 * It lives in the hero's type column, not inside HeroSlides, because that is
 * where the type is laid out; HeroSlides announces each change with an event
 * and this listens. Remounting the span on a new `key` is what replays the CSS
 * animation — an animation does not restart just because a class is still
 * there.
 *
 * At rest it is simply visible: without JavaScript, in a hidden tab, when the
 * slideshow is paused, and under `prefers-reduced-motion` (where the rotation
 * never starts and the animation is not declared).
 */
export function HeroMotto({ text }: { text: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    const replay = () => setRun((n) => n + 1);
    window.addEventListener(HERO_SLIDE_EVENT, replay);
    return () => window.removeEventListener(HERO_SLIDE_EVENT, replay);
  }, []);

  return (
    <p lang="sw" className="hero-motto flex items-center gap-3 overflow-hidden">
      {/* The rule and the words enter together, so the rule reads as the
          motto being drawn in from the edge of the picture. */}
      <span key={run} className="motto-in flex items-center gap-3">
        <span aria-hidden="true" className="inline-block h-px w-8 shrink-0 bg-on-ink-fixed/60" />
        {text}
      </span>
    </p>
  );
}
