import Script from 'next/script';
import type { ElementType, ReactNode } from 'react';

/**
 * A single entrance: fade with a 14px rise, fired once, when the element first
 * enters the viewport. Never re-animates on scroll back.
 *
 * This is a *server* component — it renders nothing but a marked-up element.
 * The observer that reveals it is a few hundred bytes of inline script
 * injected before hydration (see RevealScript), which means content never
 * waits on React to become visible: on a slow phone on rural mobile data that
 * is the difference between a page and a blank rectangle.
 *
 * The hidden starting state lives in CSS behind
 * `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`,
 * so content is visible without JavaScript and for anyone who asked for less
 * motion, and it is forced visible again for print.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  /** Stagger: index × 60ms. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      data-reveal=""
      /* The bootstrap script sets data-revealed on this node before React
         hydrates. That is a deliberate mutation of a node React owns, and this
         is the escape hatch React provides for exactly that case — without it
         every revealed element logs a hydration mismatch. */
      suppressHydrationWarning
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Two details in here are load-bearing:
 *
 * 1. It marks elements with a `data-revealed` ATTRIBUTE, not a class. React
 *    owns `className` on these elements; a script writing to it before
 *    hydration is a hydration mismatch, and React discards the change —
 *    leaving the content permanently invisible. React never touches an
 *    attribute it did not render.
 *
 * 2. A MutationObserver picks up elements added by client-side navigation.
 *    Without it, only the first page a visitor loads ever reveals anything,
 *    and every page reached through the menu renders blank below the fold.
 */
const SCRIPT = `(function(){
var m=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
if(!window.IntersectionObserver||(m&&m.matches))return;
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];
if(e.isIntersecting){e.target.setAttribute('data-revealed','');io.unobserve(e.target);}}},
{rootMargin:'0px 0px -8% 0px',threshold:0.05});
var queued=false;
function scan(){queued=false;
var n=document.querySelectorAll('[data-reveal]:not([data-revealed])');
for(var i=0;i<n.length;i++)io.observe(n[i]);}
function queue(){if(queued)return;queued=true;requestAnimationFrame(scan);}
function watch(){if(!window.MutationObserver)return;
new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});}
if(document.body)scan();else document.addEventListener('DOMContentLoaded',scan);
/* The watcher only exists to catch pages arriving through client-side
   navigation, and it is attached after load: running a DOM observer through
   hydration costs hundreds of milliseconds of main thread for no benefit,
   because the initial scan has already covered the page. */
window.addEventListener('load',function(){scan();watch();});
})();`;

/** Rendered once, from the root layout. */
export function RevealScript() {
  return (
    /* The lint rule below is a pages-router rule: in the App Router,
       beforeInteractive is documented as belonging in the root layout, which
       is exactly where this renders. It is what puts the observer in the HTML
       ahead of hydration — the whole point of doing it this way. */
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="reveal-observer" strategy="beforeInteractive">
      {SCRIPT}
    </Script>
  );
}
