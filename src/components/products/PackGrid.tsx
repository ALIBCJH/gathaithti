import type { ReactNode } from 'react';

/**
 * The row of retail packs on Our Coffee.
 *
 * NO FILTER BAR, NO SORT. This was a client component whose entire reason to
 * exist was a size filter and a sort control — SIZE / All sizes / 100g / 250g /
 * 500g / 1kg on the left, SORT BY on the right, a result count under it. The
 * user asked for it removed, and it deserved removing: four packs of one
 * coffee, all in stock, all visible in a single glance, is not a catalogue
 * anybody needs to narrow. Filtering four things to two is more work than
 * reading four.
 *
 * Removing it took the last state out of the band, so this is a SERVER
 * component now and the page ships no JavaScript for it at all. The cards were
 * already rendered on the server — they read the filesystem to choose between
 * a photograph and a placeholder — and were being handed to the client purely
 * so that a filter could hide some of them.
 *
 * THREE ACROSS, AND A SHORT LAST ROW IS CENTRED. A 3-column grid puts a lone
 * fourth card hard against the left margin, which reads as a mistake rather
 * than as the fourth of four. The grid is therefore SIX columns with each card
 * spanning two, so a half-column offset exists at all: the first card of a
 * short last row is pushed to column 3 when one is left over, or column 2 when
 * two are.
 */
export function PackGrid({ cards }: { cards: { id: string; card: ReactNode }[] }) {
  const orphans = cards.length % 3;

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
      {cards.map((item, i) => {
        const firstOfShortRow = orphans !== 0 && i === cards.length - orphans;
        const offset = orphans === 1 ? 'lg:col-start-3' : 'lg:col-start-2';

        return (
          <li key={item.id} className={`lg:col-span-2 ${firstOfShortRow ? offset : ''}`}>
            {item.card}
          </li>
        );
      })}
    </ul>
  );
}
