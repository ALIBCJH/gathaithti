'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface ViewerItem {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

/**
 * Tap a photograph on the walk and it opens here, large, with its caption;
 * the arrows and the arrow keys move along the walk in order.
 *
 * The photographs are server-rendered LINKS to their largest file, so without
 * JavaScript a tap still opens the picture. This listens for clicks on any
 * `a[data-walk-photo]` and takes them over instead of making every photograph
 * a client component.
 */
export function GalleryViewer({
  items,
  labels,
}: {
  items: ViewerItem[];
  labels: { label: string; close: string; previous: string; next: string; count: string };
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);

  const move = useCallback((step: number) => {
    setIndex((i) => (i + step + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-walk-photo]');
      const dialog = dialogRef.current;
      if (!link || !dialog || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      openerRef.current = link;
      setIndex(Number(link.dataset.walkPhoto) || 0);
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const item = items[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.label}
      onClose={() => {
        document.documentElement.style.overflow = '';
        openerRef.current?.focus();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      }}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target === dialogRef.current || target.dataset.stage === 'true') dialogRef.current?.close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[rgb(18_10_7/0.95)] p-0 text-[#faf6ef] backdrop:bg-transparent"
    >
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-3.5 px-4 pb-6 pt-3.5 sm:px-10">
        <div className="flex items-center justify-between">
          <span className="stencil text-[1.125rem] text-ochre-light" aria-live="polite">
            {labels.count.replace('{{n}}', String(index + 1)).replace('{{total}}', String(items.length))}
          </span>
          <ViewerButton label={labels.close} onClick={() => dialogRef.current?.close()}>
            <path d="M6 6l12 12M18 6L6 18" />
          </ViewerButton>
        </div>

        <div data-stage="true" className="grid min-h-0 grid-cols-[minmax(0,1fr)] items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
          <ViewerButton label={labels.previous} onClick={() => move(-1)} className="hidden sm:grid">
            <path d="M15 5l-7 7 7 7" />
          </ViewerButton>
          {item ? (
            /* A plain <img>: the file is already the largest the ladder holds,
               chosen on the server, and next/image would only add a second
               resize decision to a picture that is meant to be seen whole. */
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt={item.alt} className="m-auto max-h-full max-w-full rounded-md object-contain" />
          ) : null}
          <ViewerButton label={labels.next} onClick={() => move(1)} className="hidden sm:grid">
            <path d="M9 5l7 7-7 7" />
          </ViewerButton>
        </div>

        {item ? (
          <div className="grid justify-items-center gap-1 text-center">
            <p className="font-display text-[1.25rem] font-semibold">{item.title}</p>
            <p className="max-w-[62ch] text-[0.9375rem] text-[#c9bbad]">{item.caption}</p>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

function ViewerButton({
  label,
  onClick,
  className = 'grid',
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${className} size-11 place-items-center rounded-full border border-[#faf6ef]/30 text-[#faf6ef] transition-colors hover:border-ochre-light hover:text-ochre-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre-light`}
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
