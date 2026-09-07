'use client';

import { useMemo, useState, type ReactNode } from 'react';
import type { ProductsContent } from '@content/types';

export interface CatalogueItem {
  id: string;
  grade: string;
  availability: 'available' | 'allocated' | 'forward';
  availabilityLabel: string;
  /** Sorting only. Undefined where the society has not published a figure. */
  price?: number;
  score?: number;
  /** The card, rendered on the server and handed over as a prop. */
  card: ReactNode;
}

type SortId = ProductsContent['catalogue']['sortOptions'][number]['id'];

/**
 * Filtering and sorting for the lot catalogue.
 *
 * The cards themselves are server components — they read the filesystem to
 * decide between a photograph and a placeholder — so they are rendered on the
 * server and passed in as props. This component only decides which of them to
 * show and in what order, which keeps the client bundle to the filter bar.
 *
 * Filters are buttons with aria-pressed rather than a listbox, so the whole
 * control is operable with Tab and Space, and the result count is announced.
 */
export function LotCatalogue({
  items,
  copy,
}: {
  items: CatalogueItem[];
  copy: ProductsContent['catalogue'];
}) {
  const [grade, setGrade] = useState<string | null>(null);
  const [sort, setSort] = useState<SortId>('grade');

  const availabilityRank: Record<CatalogueItem['availability'], number> = {
    available: 0,
    forward: 1,
    allocated: 2,
  };

  const shown = useMemo(() => {
    const filtered = grade ? items.filter((item) => item.grade === grade) : items;
    const sorted = [...filtered];

    sorted.sort((a, b) => {
      if (sort === 'price') {
        /* Lots without a published price sort last rather than as zero. */
        if (a.price === undefined) return b.price === undefined ? 0 : 1;
        if (b.price === undefined) return -1;
        return a.price - b.price;
      }
      if (sort === 'score') {
        if (a.score === undefined) return b.score === undefined ? 0 : 1;
        if (b.score === undefined) return -1;
        return b.score - a.score;
      }
      if (sort === 'availability') {
        return availabilityRank[a.availability] - availabilityRank[b.availability];
      }
      return items.indexOf(a) - items.indexOf(b);
    });

    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, grade, sort]);

  const count =
    shown.length === 1 ? copy.resultCountOne : copy.resultCount.replace('{count}', String(shown.length));

  const chip =
    'tap inline-flex min-h-[2.75rem] items-center rounded-full border px-5 text-[0.875rem] transition-[background-color,border-color,color,transform] duration-200 [transition-timing-function:var(--ease)] active:scale-[0.98]';
  const chipOn = 'border-accent bg-accent text-on-accent';
  const chipOff = 'border-line text-ink-soft hover:border-ink/40 hover:text-ink';

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="t-meta mr-1 text-ink-soft" id="grade-filter-label">
            {copy.filterLabel}
          </span>

          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="grade-filter-label">
            <button
              type="button"
              onClick={() => setGrade(null)}
              aria-pressed={grade === null}
              className={`${chip} ${grade === null ? chipOn : chipOff}`}
            >
              {copy.filterAll}
            </button>

            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGrade(grade === item.grade ? null : item.grade)}
                aria-pressed={grade === item.grade}
                className={`${chip} ${grade === item.grade ? chipOn : chipOff}`}
              >
                {item.grade}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="lot-sort" className="t-meta text-ink-soft">
            {copy.sortLabel}
          </label>
          <select
            id="lot-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortId)}
            className="min-h-[2.75rem] border border-line bg-parchment px-4 py-2 text-[1rem] text-ink transition-colors duration-200 [transition-timing-function:var(--ease)] hover:border-ink/40 focus:border-ochre focus:outline-none"
          >
            {copy.sortOptions
              .filter((option) => option.id !== 'price' || copy.showPrices)
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      <p className="t-meta text-ink-soft" aria-live="polite">
        {count}
      </p>

      {/* Four across on a desktop: the catalogue holds four pack SIZES that
          differ only in weight, so they read as one row of a set rather than as
          two pairs. Two columns was written for two green-coffee lots.

          THREE across, and a short last row is CENTRED under them. A 3-column
          grid puts a lone fourth card hard against the left margin, which
          reads as a mistake rather than as a fourth of four. The grid is
          therefore SIX columns with each card spanning two, so a half-column
          offset exists at all: the first card of a short last row is pushed to
          column 3 when one is left over, or column 2 when two are. Driven by
          the number SHOWN, so filtering to two sizes centres the pair too.

          BOTH COMMENTS LIVE HERE, not beside the <ul>: a ternary branch takes
          a single expression, and a JSX comment inside one makes it two. That
          has now broken this exact file twice. */}
      {shown.length === 0 ? (
        <div className="flex flex-col items-start gap-4 border border-line p-10">
          <p className="t-lead text-ink-soft">{copy.emptyState}</p>
          <button type="button" onClick={() => setGrade(null)} className="link t-meta">
            {copy.clearFilters}
          </button>
        </div>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {shown.map((item, i) => {
            const orphans = shown.length % 3;
            const firstOfShortRow = orphans !== 0 && i === shown.length - orphans;
            const offset = orphans === 1 ? 'lg:col-start-3' : 'lg:col-start-2';
            return (
              <li
                key={item.id}
                className={`lg:col-span-2 ${firstOfShortRow ? offset : ''}`}
              >
                {item.card}
              </li>
            );
          })}
        </ul>
      )}

      {copy.showPrices ? (
        <p className="t-body measure text-[0.8125rem] text-ink-soft">{copy.priceNote}</p>
      ) : null}
    </div>
  );
}
