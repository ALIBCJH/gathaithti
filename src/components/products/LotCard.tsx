import { Fact, RichText } from '@/components/ui/Fact';
import { SmartImage } from '@/components/media/SmartImage';
import { getFact } from '@/lib/facts';
import type { Lot, ProductsContent } from '@content/types';

const availabilityTone: Record<Lot['availability'], string> = {
  available: 'bg-moss text-on-inverse',
  allocated: 'bg-ink/8 text-ink-soft',
  forward: 'bg-ochre/15 text-ochre-ink',
};

/**
 * A lot, presented like a product and sold like green coffee.
 *
 * There is no cart and no checkout: Kenyan coffee moves through the Nairobi
 * Coffee Exchange or under a direct-sales licence, so the only action a card
 * can honestly offer is a sample request.
 *
 * The face is deliberately bare — the photograph, the availability, the grade,
 * the name, and the way to ask. Everything a buyer weighs sits one disclosure
 * below it, including the price and the minimum, which used to be on the face.
 * `showPrices: false` in content/en/products.ts still removes every price on
 * the page; it now removes a row rather than a block.
 *
 * The specification is a native <details>: scannable, no JavaScript, and
 * keyboard- and screen-reader-correct without any work from us.
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

  /* The face of the card carries the grade, the name and the way to ask. The
     price, the minimum and the cupping notes used to sit on it and now sit
     here, one disclosure away — MOVED rather than deleted, because a green
     coffee catalogue that states no price and no minimum anywhere stops being
     a catalogue. The description is the one thing that is gone outright; it is
     still in the structured data for machines. */
  const spec = [
    ...(showPrice
      ? [{ label: 'Price', value: `{{${lot.priceFactId}}} · ${copy.priceCaption} (${copy.indicativeLabel.toLowerCase()})` }]
      : []),
    { label: copy.moqLabel, value: lot.moq },
    { label: 'Screen', value: lot.screen },
    { label: 'Varieties', value: lot.varieties },
    { label: 'Process', value: lot.processing },
    { label: 'Score', value: lot.score },
    { label: 'Cupping notes', value: lot.cuppingNotes.join(' · ') },
    { label: 'Harvest', value: lot.harvestWindow },
    { label: 'Volume', value: lot.volume },
    { label: 'Packaging', value: lot.packaging },
    { label: 'Terms', value: lot.incoterm },
  ];

  return (
    /* `data-lot` sets one custom property, `--lot`, and everything coloured on
       this card reads from it — the rule, the grade, the wash, the hover, the
       tint over the photograph. The card never names a grade, so a fifth one
       needs a colour in globals.css and nothing here. */
    <article
      id={`lot-${lot.id}`}
      data-lot={lot.grade}
      className="group/card relative flex h-full flex-col border border-line bg-parchment transition-[border-color,box-shadow] duration-200 [transition-timing-function:var(--ease)] hover:shadow-[0_1px_0_rgba(36,22,17,0.06)] hover:border-[color-mix(in_srgb,var(--lot)_55%,transparent)] focus-within:border-[color-mix(in_srgb,var(--lot)_55%,transparent)]"
      style={{
        /* A wash, not a fill: enough that four cards side by side are plainly
           four different things, light enough that the type on them keeps the
           contrast it was measured at. */
        backgroundColor: 'color-mix(in srgb, var(--lot) 5%, var(--surface))',
      }}
    >
      {/* The grade's colour, stated once at the top edge. */}
      <span aria-hidden="true" className="h-1 w-full shrink-0 bg-[var(--lot)]" />

      <div className="relative">
        <SmartImage slot={lot.imageSlot} zoom />

        {/* One photograph stands in for both grades until each has its own.
            A tint in the grade's colour, held low and thrown across the corner
            rather than laid flat over the whole frame, is what stops the row
            reading as the same picture printed four times. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(215deg, color-mix(in srgb, var(--lot) 34%, transparent) 0%, color-mix(in srgb, var(--lot) 8%, transparent) 46%, transparent 78%)',
          }}
        />

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

        <div className="flex flex-col gap-1 border-b border-line pb-5">
          <p className="t-figure-sm text-[2rem] text-[var(--lot)]">{lot.grade}</p>
          <h3 className="t-body font-medium">{lot.name}</h3>
        </div>

        <details className="group/spec border-t border-line pt-4">
          <summary className="tap t-meta flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between gap-4 text-ink-soft transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-ink [&::-webkit-details-marker]:hidden">
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
          className="tap mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[0.875rem] font-medium text-ink transition-[background-color,border-color,color,transform] duration-200 [transition-timing-function:var(--ease)] hover:border-accent hover:bg-accent hover:text-on-accent active:scale-[0.985]"
        >
          {copy.requestLotLabel}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
