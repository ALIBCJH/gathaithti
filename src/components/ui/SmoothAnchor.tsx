'use client';

import type { ReactNode } from 'react';

/**
 * An in-page anchor that glides, on a site whose scrolling is otherwise
 * instant.
 *
 * `scroll-behavior: smooth` used to be set on `html`, which made every scroll
 * on the site animate — including the one the router performs when you change
 * page. Clicking About from halfway down a page sent you FURTHER down and then
 * animated back to the top over about 900ms, which read as the new page
 * scrolling itself. That rule is gone.
 *
 * The one place the glide was doing real work is the hero's scroll cue, where
 * an arrow says "there is more below" and jumping instantly says it far less
 * clearly. So the behaviour moves here, to the single element that wants it,
 * and the router is left alone.
 *
 * `prefers-reduced-motion` is honoured explicitly — the CSS rule that used to
 * do it applied to the property this no longer uses.
 */
export function SmoothAnchor({
  href,
  className,
  ariaLabel,
  children,
}: {
  /** An in-page target: `#id`. */
  href: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        const target = document.querySelector(href);
        if (!target) return; /* let the browser do whatever it would have done */
        event.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        /* The URL still changes, so the link is a link: back works, and the
           address bar says where the reader is. */
        history.pushState(null, '', href);
      }}
    >
      {children}
    </a>
  );
}
