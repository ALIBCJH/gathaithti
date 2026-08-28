import { Fact, RichText } from '@/components/ui/Fact';
import { SmartImage } from '@/components/media/SmartImage';
import { getFact } from '@/lib/facts';
import type { Lot, ProductsContent } from '@content/types';

const availabilityTone: Record<Lot['availability'], string> = {
  available: 'bg-moss text-parchment',
  allocated: 'bg-ink/8 text-ink-soft',
  forward: 'bg-ochre/15 text-ochre-ink',
};

/**
 * A lot, presented like a product and priced like green coffee.
 *
 * There is no cart and no checkout: Kenyan coffee moves through the Nairobi
 * Coffee Exchange or under a direct-sales licence, so the only action a card
 * can honestly offer is a sample request. The price is indicative and labelled
 * as such, and the whole price block disappears if `showPrices` is turned off
 * in content/en/products.ts.
 *
 * The specification sits behind a native <details>, which keeps the card
 * scannable, costs no JavaScript, and is keyboard- and screen-reader-correct
 * without any work from us.
 */
export function LotCard({
  lot,
  copy,
  requestHref,
}: {
  lot: Lot;
  copy: ProductsContent['catalogue'];
  requestHref: string;
}) {
  const price = lot.priceFactId ? getFact(lot.priceFactId) : undefined;
  const showPrice = copy.showPrices && !!price;
  const score = lot.scoreValue ? getFact('cuppingScore') : undefined;

  const spec = [
    { label: 'Screen', value: lot.screen },
    { label: 'Varieties', value: lot.varieties },
    { label: 'Process', value: lot.processing },
    { label: 'Score', value: lot.score },
    { label: 'Harvest', value: lot.harvestWindow },
    { label: 'Volume', value: lot.volume },
    { label: 'Packaging', value: lot.packaging },
    { label: 'Terms', value: lot.incoterm },
  ];

  return (
    <article
      id={`lot-${lot.id}`}
      className="group/card flex h-full flex-col border border-line bg-parchment transition-[border-color,box-shadow] duration-200 [transition-timing-function:var(--ease)] hover:border-ochre/55 hover:shadow-[0_1px_0_rgba(36,22,17,0.06)] focus-within:border-ochre/55"
    >
      <div className="relative">
        <SmartImage slot={lot.imageSlot} zoom />

        {score ? (
          <p className="absolute right-4 top-4 flex flex-col items-center rounded-full bg-parchment/95 px-3 py-2 leading-none shadow-[0_1px_0_rgba(36,22,17,0.08)]">
            <span className="t-figure-sm text-[1.375rem] text-ink">
              <Fact id="cuppingScore" />
            </span>
            <span className="t-meta mt-1 text-[0.625rem] text-ink-soft">Cupped</span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
        <p className={`t-meta w-fit rounded-full px-3 py-1.5 ${availabilityTone[lot.availability]}`}>
          {lot.availabilityLabel}
        </p>

        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
          <div className="flex flex-col gap-1">
            <p className="t-figure-sm text-[2rem] text-ochre-ink">{lot.grade}</p>
            <h3 className="t-body font-medium">{lot.name}</h3>
          </div>

          {showPrice ? (
            <div className="flex flex-col items-end gap-1 text-right">
              <p className="t-figure-sm text-[1.75rem] text-ink">
                <Fact id={price.id} />
              </p>
              <p className="t-meta text-ink-soft">
                <span className="text-ochre-ink">{copy.indicativeLabel}</span>
                <span aria-hidden="true"> · </span>
                {copy.priceCaption}
              </p>
            </div>
          ) : null}
        </div>

        <p className="t-body text-[0.9375rem] text-ink-soft">
          <RichText text={lot.description} />
        </p>

        <ul className="flex flex-wrap gap-2" aria-label={`Cupping notes, ${lot.name}`}>
          {lot.cuppingNotes.map((note) => (
            <li
              key={note}
              className="rounded-full border border-line px-3 py-1 text-[0.8125rem] text-ink-soft transition-colors duration-200 [transition-timing-function:var(--ease)] group-hover/card:border-ochre/30"
            >
              {note}
            </li>
          ))}
        </ul>

        <dl className="flex flex-wrap gap-x-8 gap-y-2 text-[0.8125rem]">
          <div className="flex gap-2">
            <dt className="t-meta text-ink-soft">{copy.moqLabel}</dt>
            <dd className="tnum">{lot.moq}</dd>
          </div>
        </dl>

        <details className="group/spec border-t border-line pt-4">
          <summary className="t-meta flex cursor-pointer list-none items-center justify-between gap-4 text-ink-soft transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-ink [&::-webkit-details-marker]:hidden">
            {copy.detailsLabel}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 [transition-timing-function:var(--ease)] group-open/spec:rotate-45"
            >
              +
            </span>
          </summary>

          <dl className="mt-4 flex flex-col text-[0.875rem]">
            {spec.map((row) => (
              <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-3">
                <dt className="t-meta text-ink-soft">{row.label}</dt>
                <dd className="tnum leading-relaxed">
                  <RichText text={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        </details>

        <a
          href={requestHref}
          data-lot={lot.id}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[0.875rem] font-medium text-ink transition-[background-color,border-color,color,transform] duration-200 [transition-timing-function:var(--ease)] hover:border-ochre-ink hover:bg-ochre-ink hover:text-parchment active:scale-[0.985]"
        >
          {copy.requestLotLabel}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
