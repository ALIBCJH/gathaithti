'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { routes, type Locale } from '@content/site';
import type { Common } from '@content/types';
import { ThemeToggle } from './ThemeToggle';
import { NavIcon } from './NavIcon';

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


  /* Clicking the nav item for the page you are already on used to do nothing:
     the App Router does not re-navigate to the current route, so there was no
     scroll reset and the click was dead. Every OTHER nav click puts the reader
     at the top of a page, so this one should too. */
  const toTopIfCurrent = (current: boolean) => () => {
    if (current) window.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* The guard that used to live here is gone with the transparency it
          guarded. Without JavaScript the observer never runs, so on the home
          page the bar keeps its initial state the whole way down — and when
          that state was transparent, it meant parchment type on a parchment
          section: an invisible navigation bar. The initial state is now an
          opaque brown band with light type on it, which is legible over the
          hero and over every section below it, so there is nothing left to
          pin. */}
      <header
      className={[
        'site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        '[transition-timing-function:var(--ease)]',
        solid
          ? 'bg-parchment/95 border-b border-line backdrop-blur-[2px]'
          /* Over the hero the bar used to be transparent, which made it part of
             the photograph rather than a thing sitting on top of one — the
             navigation floated in the sky and had to be rescued by a scrim.
             It is the brand brown now: opaque, its own band, distinct from
             whatever the picture is doing behind it. Light type on #241611 is
             16.27:1 whatever the crop lands on, which is a guarantee no scrim
             over a photograph can make. */
          : 'bg-ink-fixed border-b border-on-ink-fixed/15 on-ink-fixed',
      ].join(' ')}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="mx-auto flex h-full w-full max-w-[100rem] items-center justify-between gap-4 px-6 sm:gap-8 sm:px-10 lg:px-16">
        <Link
          href={`/${locale}`}
          className={`tap -my-2 inline-flex items-center py-2 t-meta transition-colors duration-200 [transition-timing-function:var(--ease)] ${
            solid ? 'text-ink hover:text-ochre-ink' : 'text-on-ink-fixed hover:text-ochre-on-ink-fixed'
          }`}
        >
          <span className="font-semibold tracking-[0.14em] whitespace-nowrap">GATHAITHI</span>
          {/* `on-ink-fixed`, not `on-inverse`. Over the hero this bar is the
              brand brown in BOTH themes, and `--on-inverse` went black in the
              light theme when the inverse bands started following the toggle —
              which left this at 1.15:1 on its own bar. */}
          <span className={`ml-3 hidden sm:inline ${solid ? 'text-ink-soft' : 'text-on-ink-fixed/70'}`}>
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
                    onClick={toTopIfCurrent(current)}
                    className={[
                      'group relative inline-block py-2 text-[0.9375rem] transition-colors duration-200',
                      '[transition-timing-function:var(--ease)]',
                      solid
                        ? current
                          ? 'text-ink'
                          : 'text-ink-soft hover:text-ink'
                        : current
                          ? 'text-on-ink-fixed'
                          : 'text-on-ink-fixed/75 hover:text-on-ink-fixed',
                    ].join(' ')}
                  >
                    {navLabel(route.key)}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-200',
                        '[transition-timing-function:var(--ease)]',
                        solid ? 'bg-ochre' : 'bg-ochre-on-ink-fixed',
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
          {/* Desktop only. On a phone the switch lives in the drawer instead —
              there is one of it, not two, and the bar keeps to the two things
              it needs at that width: who this is, and the way in. The drawer
              is `lg:hidden`, so the two are exact complements and the control
              is never absent and never doubled. */}
          <div className="hidden lg:block">
            <ThemeToggle surface={solid ? 'light' : 'fixed-dark'} />
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            /* Same correction as the wordmark above, and this one mattered
               more: the three bars were black on the brown bar at 1.20:1, so
               the menu button was all but invisible on the home page of a
               phone in the default theme. */
            className={`-mr-3 flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center lg:hidden ${solid ? 'text-ink' : 'text-on-ink-fixed'}`}
          >
            {/* The word is gone from the bar, but the name is not: the three
                bars are decorative, so without this the button would announce
                itself as nothing but "button". Still read aloud, still found by
                voice control, just not drawn. */}
            <span className="sr-only">{common.actions.menu}</span>
            <span aria-hidden="true" className="flex h-3 w-5 flex-col justify-between">
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-ink-fixed'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-ink-fixed'}`} />
              <span className={`h-px w-full ${solid ? 'bg-ink' : 'bg-on-ink-fixed'}`} />
            </span>
          </button>
        </div>
      </div>

      </header>
      {/* The navigation drawer — Gmail's pattern: a column that slides in from
          the left over a dimmed page, rows of icon-and-label, and a filled pill
          marking where you already are.

          Rendered as a SIBLING of the header, never inside it. The solid bar
          carries `backdrop-blur`, and a backdrop-filter makes an element the
          containing block for its `position: fixed` descendants — nested here
          the drawer would not be fixed to the viewport at all, but clipped to
          the 4.5rem height of the bar.

          The scrim sits above the header rather than below it, so the bar dims
          with the rest of the page. A drawer that left the header burning
          bright above the dimmed page would read as a panel stuck on top of the
          site rather than one drawn out of it. */}
      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="scrim-in fixed inset-0 z-50 bg-black/55 lg:hidden"
          />

          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={common.actions.menu}
            className="drawer-in fixed inset-y-0 left-0 z-[55] flex w-[min(20rem,86vw)] flex-col overflow-y-auto overscroll-contain bg-inverse text-on-inverse on-ink lg:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div
              className="flex shrink-0 items-center justify-between pl-5 pr-3"
              style={{ height: 'var(--header-h)' }}
            >
              <span className="t-meta font-semibold tracking-[0.14em]">GATHAITHI</span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-on-inverse/70 transition-[background-color,color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-on-inverse/10 hover:text-on-inverse active:scale-[0.94]"
              >
                <span className="sr-only">{common.actions.close}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
                </svg>
              </button>
            </div>

            {/* The rows. 3rem tall and full-width pills, the shape a thumb
                expects from every drawer it has ever opened. */}
            <nav aria-label="Primary" className="px-3 pt-1">
              <ul className="flex flex-col gap-0.5">
                {routes.map((route, i) => {
                  const current = isCurrent(route.path);
                  return (
                    <li key={route.key} className="stagger-in" style={{ '--i': i } as React.CSSProperties}>
                      <Link
                        href={route.path ? `/${locale}/${route.path}` : `/${locale}`}
                        aria-current={current ? 'page' : undefined}
                        onClick={() => {
                          setOpen(false);
                          toTopIfCurrent(current)();
                        }}
                        className={[
                          'flex min-h-[3rem] items-center gap-4 rounded-full px-4 text-[0.9375rem]',
                          'transition-colors duration-200 [transition-timing-function:var(--ease)]',
                          current
                            ? 'bg-ochre-on-inverse/15 font-medium text-ochre-on-inverse'
                            : 'text-on-inverse/85 hover:bg-on-inverse/8 hover:text-on-inverse',
                        ].join(' ')}
                      >
                        <NavIcon route={route.key} className="h-5 w-5 shrink-0" />
                        <span className="truncate">{navLabel(route.key)}</span>
                        {current ? <span className="sr-only">Current page</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="stagger-in mx-4 mt-4 border-t border-on-inverse/12 pt-5"
              style={{ '--i': 5 } as React.CSSProperties}
            >
              <p className="t-quiet max-w-[24ch] text-[1.0625rem] leading-snug text-on-inverse/45">
                {common.brand.tagline}
              </p>
            </div>

            {/* What members open this site for, one tap from anywhere. Stacked
                rather than set in a row: at 86vw of a 320px screen there is no
                room to put a label and a figure side by side without one of
                them breaking. */}
            <Link
              href={`/${locale}/farmers#noticeboard`}
              onClick={() => setOpen(false)}
              className="stagger-in mx-4 mt-auto flex flex-col gap-1 rounded-lg border border-on-inverse/20 px-4 py-3 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-ochre"
              style={{ '--i': 6 } as React.CSSProperties}
            >
              <span className="t-meta text-on-inverse/60">{memberPrice.label}</span>
              <span className="flex items-baseline gap-2">
                <span className="t-figure-sm text-[1.5rem] text-on-inverse">{memberPrice.value}</span>
                <span className="t-meta text-ochre-on-inverse">{memberPrice.unit}</span>
              </span>
            </Link>

            <div
              className="stagger-in mt-4 flex items-center gap-3 border-t border-on-inverse/15 px-4 py-4"
              style={{ '--i': 7 } as React.CSSProperties}
            >
              <ThemeToggle surface="dark" />
              <Link
                href={`/${locale}/products#request-a-sample`}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-full bg-btn-inverse-fill px-4 text-center text-[0.875rem] font-medium text-btn-inverse-text transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-on-inverse active:scale-[0.985]"
              >
                {common.actions.requestSample}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
