'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { routes, type Locale } from '@content/site';
import type { Common } from '@content/types';
import { ThemeToggle } from './ThemeToggle';

/**
 * Transparent over the hero, an opaque parchment bar with a hairline once the
 * hero has passed — transitioned, never jumped.
 *
 * The switch is driven by an IntersectionObserver on a sentinel element the
 * hero renders (#hero-sentinel). Pages without a hero have no sentinel and get
 * the solid bar immediately, with no scroll listener running at all.
 */
export function Header({
  locale,
  common,
  memberPrice,
}: {
  locale: Locale;
  common: Common;
  /** Prepared on the server so the panel needs no access to the facts file. */
  memberPrice: { label: string; value: string; unit: string };
}) {
  const pathname = usePathname() ?? `/${locale}`;
  /* Only the home page has a full-bleed hero to sit transparently over.
     `solid` is DERIVED from the current path rather than held in state: the
     header stays mounted across client-side navigation, and a stored value
     went stale the moment you moved from the hero to a parchment page —
     parchment type on a parchment background, an invisible navigation bar. */
  const isHome = pathname === `/${locale}`;

  /* The observed value is stored with the path it was measured on, so a value
     left over from the previous page can never be read as current. */
  const [heroState, setHeroState] = useState({ path: pathname, past: false });
  const pastHero = heroState.path === pathname ? heroState.past : false;
  const solid = !isHome || pastHero;

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* transparent → solid.
     The sentinel is re-queried on every measurement rather than captured once:
     if React ever re-renders the tree underneath us (a hydration recovery, a
     route change) a captured node goes stale, the measurement silently stops,
     and the bar sits transparent over a white page — invisible. Re-reading the
     DOM each time costs one layout read per animation frame while scrolling,
     which is nothing, and cannot go stale. */
  useEffect(() => {
    if (!isHome) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const sentinel = document.getElementById('hero-sentinel');
      /* No hero on this page: the bar is solid, which is also the fallback if
         the element ever disappears. */
      const past = !sentinel || sentinel.getBoundingClientRect().top < 64;
      setHeroState({ path: pathname, past });
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    /* Deferred, not called inline: the first measurement belongs after paint,
       and a reload part-way down the page needs it. */
    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname, isHome]);

  /* mobile panel: lock scroll, escape to close, keep focus inside */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const navLabel = (key: string) => common.nav[key as keyof Common['nav']];

  const isCurrent = (path: string) => {
    const full = path ? `/${locale}/${path}` : `/${locale}`;
    return path ? pathname.startsWith(full) : pathname === full;
  };

  return (
    <>
      {/* Without JavaScript the observer never runs, so the bar could sit
          transparent over the parchment sections below the hero. Pin it solid. */}
      <noscript>
        <style>{`.site-header{background:var(--color-parchment)!important;border-bottom:1px solid var(--color-line)!important}
.site-header a,.site-header button{color:var(--color-ink)!important}
.site-header button span span{background:var(--color-ink)!important}`}</style>
      </noscript>
      <header
      className={[
        'site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        '[transition-timing-function:var(--ease)]',
        solid
          ? 'bg-parchment/95 border-b border-line backdrop-blur-[2px]'
          : 'bg-transparent border-b border-transparent on-ink',
      ].join(' ')}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="mx-auto flex h-full w-full max-w-[100rem] items-center justify-between gap-4 px-6 sm:gap-8 sm:px-10 lg:px-16">
        <Link
          href={`/${locale}`}
          className={`tap -my-2 inline-flex items-center py-2 t-meta transition-colors duration-200 [transition-timing-function:var(--ease)] ${
            solid ? 'text-ink hover:text-ochre-ink' : 'text-on-inverse hover:text-ochre-light'
          }`}
        >
          <span className="font-semibold tracking-[0.14em] whitespace-nowrap">GATHAITHI</span>
          <span className={`ml-3 hidden sm:inline ${solid ? 'text-ink-soft' : 'text-on-inverse/70'}`}>
            F.C.S.
          </span>
        </Link>

        {/* desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {routes.map((route) => {
              const current = isCurrent(route.path);
              return (
                <li key={route.key}>
                  <Link
                    href={route.path ? `/${locale}/${route.path}` : `/${locale}`}
                    aria-current={current ? 'page' : undefined}
                    className={[
                      'group relative inline-block py-2 text-[0.9375rem] transition-colors duration-200',
                      '[transition-timing-function:var(--ease)]',
                      solid
                        ? current
                          ? 'text-ink'
                          : 'text-ink-soft hover:text-ink'
                        : current
                          ? 'text-on-inverse'
                          : 'text-on-inverse/75 hover:text-on-inverse',
                    ].join(' ')}
                  >
                    {navLabel(route.key)}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-200',
                        '[transition-timing-function:var(--ease)]',
                        solid ? 'bg-ochre' : 'bg-ochre-light',
                        current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      ].join(' ')}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <ThemeToggle surface={solid ? 'light' : 'dark'} />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`-mr-3 flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center lg:hidden ${solid ? 'text-ink' : 'text-on-inverse'}`}
          >
            {/* The word is gone from the bar, but the name is not: the three
                bars are decorative, so without this the button would announce
                itself as nothing but "button". Still read aloud, still found by
                voice control, just not drawn. */}
            <span className="sr-only">{common.actions.menu}</span>
            <span aria-hidden="true" className="flex h-3 w-5 flex-col justify-between">
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-inverse'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-inverse'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-inverse'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen mobile panel — a designed screen, not a dropdown. */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={common.actions.menu}
          className="panel-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-inverse text-on-inverse on-ink lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div
            className="flex shrink-0 items-center justify-between px-6 sm:px-10"
            style={{ height: 'var(--header-h)' }}
          >
            <span className="t-meta font-semibold tracking-[0.14em]">GATHAITHI</span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-inverse/25 text-on-inverse transition-[border-color,background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:border-on-inverse/60 hover:bg-on-inverse/10 active:scale-[0.94]"
            >
              <span className="sr-only">{common.actions.close}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="px-6 pt-2 sm:px-10">
            <ul className="flex flex-col">
              {routes.map((route, i) => {
                const current = isCurrent(route.path);
                return (
                  <li key={route.key} className="stagger-in" style={{ '--i': i } as React.CSSProperties}>
                    <Link
                      href={route.path ? `/${locale}/${route.path}` : `/${locale}`}
                      aria-current={current ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={[
                        'group flex min-h-[4.5rem] items-center gap-4 border-b border-on-inverse/12 py-3',
                        'transition-colors duration-200 [transition-timing-function:var(--ease)]',
                        current ? 'text-ochre-light' : 'text-on-inverse hover:text-ochre-light',
                      ].join(' ')}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          'w-6 shrink-0 text-[0.75rem] tracking-[0.1em] tnum transition-colors duration-200',
                          current ? 'text-ochre-light' : 'text-on-inverse/40',
                        ].join(' ')}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span
                        className="t-quiet flex-1 leading-none"
                        style={{ fontSize: 'clamp(1.75rem, 7.5vw, 2.5rem)' }}
                      >
                        {navLabel(route.key)}
                      </span>

                      {current ? (
                        <span className="t-meta text-[0.625rem] text-ochre-light">
                          <span className="sr-only">Current page</span>
                          <span aria-hidden="true">●</span>
                        </span>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="translate-x-0 text-on-inverse/30 transition-transform duration-200 [transition-timing-function:var(--ease)] group-hover:translate-x-1"
                        >
                          →
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p
            className="stagger-in mt-8 px-6 text-on-inverse/45 sm:px-10"
            style={{ '--i': 5 } as React.CSSProperties}
          >
            <span className="t-quiet block max-w-[22ch] text-[1.125rem] leading-snug">
              {common.brand.tagline}
            </span>
          </p>

          {/* What members open this site for, one tap from anywhere. */}
          <Link
            href={`/${locale}/farmers#noticeboard`}
            onClick={() => setOpen(false)}
            className="stagger-in mx-6 mt-auto flex items-center justify-between gap-4 border border-on-inverse/20 px-5 py-4 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-ochre sm:mx-10"
            style={{ '--i': 6 } as React.CSSProperties}
          >
            <span className="t-meta max-w-[12ch] text-on-inverse/60">{memberPrice.label}</span>
            <span className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
              <span className="t-figure-sm text-[1.5rem] text-on-inverse">{memberPrice.value}</span>
              <span className="t-meta text-ochre-light">{memberPrice.unit}</span>
            </span>
          </Link>

          <div
            className="stagger-in mt-6 flex items-center justify-between gap-4 border-t border-on-inverse/15 px-6 py-6 sm:px-10"
            style={{ '--i': 7 } as React.CSSProperties}
          >
            <ThemeToggle surface="dark" />
            <Link
              href={`/${locale}/products#request-a-sample`}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[3rem] items-center whitespace-nowrap rounded-full bg-ochre-light px-6 text-[0.9375rem] font-medium text-inverse transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-on-inverse active:scale-[0.985]"
            >
              {common.actions.requestSample}
            </Link>
          </div>
        </div>
      )}
      </header>
    </>
  );
}
