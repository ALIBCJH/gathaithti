'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { routes, type Locale } from '@content/site';
import type { Common } from '@content/types';

/**
 * Transparent over the hero, an opaque parchment bar with a hairline once the
 * hero has passed — transitioned, never jumped.
 *
 * The switch is driven by an IntersectionObserver on a sentinel element the
 * hero renders (#hero-sentinel). Pages without a hero have no sentinel and get
 * the solid bar immediately, with no scroll listener running at all.
 */
export function Header({ locale, common }: { locale: Locale; common: Common }) {
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

  /* transparent → solid, watching a 1px sentinel at the foot of the hero.
     Pages without a hero never create an observer. */
  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setHeroState({
          path: pathname,
          /* Direction matters. A sentinel that is not intersecting is either
             above the viewport (we have scrolled past the hero) or below it
             (the hero is taller than the window — which happens on Kiswahili
             pages, where the translation notice pushes it down). Only the
             first should turn the bar solid. */
          past: !entry.isIntersecting && entry.boundingClientRect.top < 0,
        }),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

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
          className={`t-meta transition-colors duration-200 [transition-timing-function:var(--ease)] ${
            solid ? 'text-ink hover:text-ochre-ink' : 'text-parchment hover:text-ochre-light'
          }`}
        >
          <span className="font-semibold tracking-[0.14em] whitespace-nowrap">GATHAITHI</span>
          <span className={`ml-3 hidden sm:inline ${solid ? 'text-ink-soft' : 'text-parchment/70'}`}>
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
                          ? 'text-parchment'
                          : 'text-parchment/75 hover:text-parchment',
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
          <Link
            href={`/${locale}/products#request-a-sample`}
            className={[
              'hidden rounded-full px-5 py-2.5 text-[0.875rem] font-medium lg:inline-flex',
              'transition-[background-color,color,transform] duration-200 [transition-timing-function:var(--ease)] active:scale-[0.985]',
              solid
                ? 'bg-ochre-ink text-parchment hover:bg-ochre-deep'
                : 'bg-parchment/12 text-parchment ring-1 ring-parchment/35 hover:bg-parchment hover:text-ink',
            ].join(' ')}
          >
            {common.actions.requestSample}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`flex items-center gap-3 py-2 lg:hidden ${solid ? 'text-ink' : 'text-parchment'}`}
          >
            <span className="t-meta">{common.actions.menu}</span>
            <span aria-hidden="true" className="flex h-3 w-5 flex-col justify-between">
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-parchment'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-parchment'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-parchment'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* full-screen mobile panel — a designed screen, not a dropdown */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={common.actions.menu}
          className="fixed inset-0 z-50 flex flex-col bg-ink text-parchment on-ink lg:hidden"
        >
          <div
            className="flex items-center justify-between px-6 sm:px-10"
            style={{ height: 'var(--header-h)' }}
          >
            <span className="t-meta font-semibold tracking-[0.14em]">GATHAITHI</span>
            <button type="button" onClick={() => setOpen(false)} className="t-meta py-2">
              {common.actions.close}
              <span aria-hidden="true" className="ml-3">
                ✕
              </span>
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-1 flex-col justify-center px-6 sm:px-10">
            <ul className="flex flex-col gap-2">
              {routes.map((route, i) => (
                <li key={route.key}>
                  <Link
                    href={route.path ? `/${locale}/${route.path}` : `/${locale}`}
                    aria-current={isCurrent(route.path) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="t-page-title block py-2 text-parchment transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-ochre-light"
                    style={{ fontSize: 'clamp(2rem, 9vw, 3.25rem)' }}
                  >
                    <span className="t-meta mr-4 align-middle text-ochre-light">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {navLabel(route.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-6 border-t border-parchment/20 px-6 py-8 sm:px-10">
            <span className="t-meta max-w-[16ch] text-parchment/60">{common.brand.tagline}</span>
            <Link
              href={`/${locale}/products#request-a-sample`}
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-full bg-ochre-light px-6 py-3 text-[0.9375rem] font-medium text-ink transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-parchment active:scale-[0.985]"
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
