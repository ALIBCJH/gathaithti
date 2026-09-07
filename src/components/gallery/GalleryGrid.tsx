import { SmartImage } from '@/components/media/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import type { GalleryContent } from '@content/types';

/**
 * The gallery, as a walk through the mill.
 *
 * It was a slideshow, one photograph at a time. Ten photographs that happen to
 * cover a whole process are better seen together: a slideshow hides nine
 * tenths of the mill at any moment and makes the ORDER — the thing that
 * explains how a wet mill works — something you have to sit through rather
 * than see.
 *
 * Circles, three to a row. A circle throws away the corners of a photograph,
 * which is a real cost, so it is worth saying why it earns its place here:
 * every one of these frames has its subject dead centre and its edges full of
 * hillside, and ten rectangles of wildly different shape — 0.67 to 1.64 —
 * would have had to be cropped to a common ratio anyway. A circle crops them
 * all identically and makes a row of ten unrelated compositions read as one
 * set.
 *
 * NUMBERED, because the order is not decorative: it is the order the cherry
 * moves in, gate to drying beds. The numbers come from the array index, so
 * reordering the content reorders them and the sequence is never written down
 * twice.
 *
 * No JavaScript. The slideshow it replaced was a client component with five
 * pieces of state and a timer; this is a list.
 */
export function GalleryGrid({ items }: { items: GalleryContent['items'] }) {
  /* A short last row is centred under the ones above, the same way the pack
     catalogue does it: a 3-column grid cannot offset anything, so the grid is
     six columns with each card spanning two. */
  const orphans = items.length % 3;

  return (
    <ol className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-20">
      {items.map((item, i) => {
        const firstOfShortRow = orphans !== 0 && i === items.length - orphans;
        const offset = orphans === 1 ? 'lg:col-start-3' : 'lg:col-start-2';

        return (
          <li
            key={item.id}
            className={`flex flex-col items-center text-center sm:col-span-1 lg:col-span-2 ${
              firstOfShortRow ? offset : ''
            }`}
          >
            <Reveal delay={(i % 3) * 60} className="flex flex-col items-center">
              {/* `w-full` needs a parent with a WIDTH. This column is
                  `items-center`, which shrink-wraps its children, so without
                  a width here the frame collapsed to 0x0 and rendered nothing
                  at all — silently, because a 0px circle is still a circle. */}
              <div className="relative w-full max-w-[19rem]">
                <SmartImage
                  slot={item.imageSlot}
                  ratio="1/1"
                  className="w-full rounded-full"
                  imageClassName={item.position ?? 'object-center'}
                  zoom
                />

                {/* The step number, on the rim. `tnum` so 1 and 10 are the same
                    width and the badges do not jitter down the page. */}
                <span
                  aria-hidden="true"
                  className="t-figure-sm tnum absolute -bottom-1 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-ochre bg-parchment text-[1rem] text-ochre-ink"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="t-section mt-9 text-[clamp(1.125rem,1.6vw,1.375rem)]">{item.title}</h3>
              <p className="t-body mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                {item.caption}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
