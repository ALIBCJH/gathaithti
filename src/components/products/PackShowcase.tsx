import { SmartImage } from '@/components/media/SmartImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Fact, RichText } from '@/components/ui/Fact';
import { getFact } from '@/lib/facts';
import { whatsappHref } from '@content/site';
import type { Lot, ProductsContent } from '@content/types';

/**
 * ONE BAG, PICK A SIZE — the retail packs on Our Coffee.
 *
 * The client's choice on 2026-09-14, replacing four dark cards. The four packs
 * are one coffee in four sizes, photographed as the same bag, so four cards
 * side by side were four copies of one picture. Here there is one large bag,
 * and the decision the buyer is actually making — which size — is the control.
 *
 * Picking a size swaps the photograph, the price, the line about who that size
 * suits, and both buttons. It is a native radio group styled as choices, with
 * the switching done in CSS (see "PACK SHOWCASE" in globals.css), so this is a
 * server component and the page ships no JavaScript for it.
 *
 * "Order on WhatsApp" opens a chat with the size and price already written;
 * "Ask about this pack" jumps to the enquiry form below, where PackEnquiryForm
 * reads `data-pack` and pre-selects the same size.
 */
export function PackShowcase({
  lots,
  copy,
  requestHref,
}: {
  lots: Lot[];
  copy: ProductsContent['catalogue'];
  requestHref: string;
}) {
  const initial = lots.find((lot) => lot.id === copy.defaultPack)?.id ?? lots[0]?.id;
  const first = lots[0];
  if (!first || !initial) return null;

  /* One pair of rules per pack: its photograph and its text show while its
     radio is checked. Generated from the ids, so a fifth size needs content
     and nothing here. */
  const rules = lots
    .map(
      (lot) =>
        `.pack-showcase:has(#size-${lot.id}:checked) .pack-photo[data-size="${lot.id}"]{opacity:1;visibility:visible;transition-delay:0s}` +
        `.pack-showcase:has(#size-${lot.id}:checked) .pack-text[data-size="${lot.id}"]{display:flex}`,
    )
    .join('');

  const priceOf = (lot: Lot) => (copy.showPrices && lot.priceFactId ? getFact(lot.priceFactId) : undefined);
  const weight = (lot: Lot) => lot.grade.replace(/(\d)\s*(g|kg)$/i, '$1 $2');
  /* The bag icon on each size grows with the weight, so the choices read as
     sizes at a glance before a single number is read. */
  const bagScale = (i: number) => 0.62 + (0.38 * i) / Math.max(1, lots.length - 1);

  return (
    <div className="pack-showcase grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-24">
      <style dangerouslySetInnerHTML={{ __html: rules }} />

      {/* The bag. Held in view on a desktop while the details beside it are read. */}
      <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
        <div className="relative mx-auto grid max-w-[34rem] overflow-hidden rounded-[var(--radius-photo)] bg-parchment shadow-[0_40px_80px_-48px_rgb(36_22_17/0.55)]">
          {lots.map((lot) => (
            <div
              key={lot.id}
              data-size={lot.id}
              data-default={lot.id === initial ? '' : undefined}
              className="pack-photo col-start-1 row-start-1"
            >
              <SmartImage
                slot={lot.imageSlot}
                ratio="864/1220"
                sizes="(min-width: 1024px) 34rem, 100vw"
                priority={lot.id === initial}
                square
              />
            </div>
          ))}
        </div>
      </div>

      {/* The details. */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 id="catalogue-heading" className="t-page-title max-w-[14ch] text-balance">
            {copy.heading}
          </h1>
          <p className="t-lead text-ink">
            <span className="font-medium">{copy.productName}</span>
            <span className="block text-[0.9375rem] text-ink-soft sm:text-base">{copy.productLine}</span>
          </p>
        </div>

        {/* Price and availability, per size. */}
        {lots.map((lot) => {
          const price = priceOf(lot);
          return (
            <div
              key={lot.id}
              data-size={lot.id}
              data-default={lot.id === initial ? '' : undefined}
              className="pack-text items-end justify-between gap-6 border-y border-line py-6"
            >
              <div className="flex flex-col gap-1">
                {price ? (
                  <p className="t-figure text-[clamp(2.75rem,5vw,3.75rem)] leading-none">
                    <Fact id={lot.priceFactId!} />
                  </p>
                ) : null}
                <p className="t-meta text-ink-soft">{lot.packaging}</p>
              </div>
              <p className="flex items-center gap-2 text-[0.875rem] text-ink-soft">
                <span aria-hidden="true" className="size-2 rounded-full bg-moss" />
                {lot.availabilityLabel}
              </p>
            </div>
          );
        })}

        {/* The choice. */}
        <fieldset className="flex flex-col">
          <legend className="t-meta mb-4 text-ink-soft">{copy.sizeLabel}</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {lots.map((lot, i) => (
              <div key={lot.id} className="relative">
                <input
                  type="radio"
                  name="pack-size"
                  id={`size-${lot.id}`}
                  value={lot.id}
                  defaultChecked={lot.id === initial}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`size-${lot.id}`}
                  className="flex h-full cursor-pointer flex-col items-center justify-end gap-2 rounded-2xl border border-line bg-parchment px-3 pb-3.5 pt-4 text-center transition-[border-color,background-color,box-shadow] duration-200 [transition-timing-function:var(--ease)] hover:border-ink/35 peer-checked:border-accent peer-checked:bg-[color-mix(in_srgb,var(--accent-fill)_7%,var(--surface))] peer-checked:shadow-[inset_0_0_0_1px_var(--accent-fill)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ochre"
                >
                  <BagIcon scale={bagScale(i)} />
                  <span className="font-display text-[1.25rem] font-semibold leading-none">{weight(lot)}</span>
                  {priceOf(lot) ? (
                    <span className="tnum text-[0.8125rem] text-ink-soft">
                      <Fact id={lot.priceFactId!} />
                    </span>
                  ) : null}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Who the size suits, and the two ways to act on it. */}
        {lots.map((lot) => {
          const price = priceOf(lot);
          const order = whatsappHref(
            copy.orderMessage.replace('{{pack}}', weight(lot)).replace(' ({{price}})', price ? ` (${price.display})` : ''),
          );
          return (
            <div
              key={lot.id}
              data-size={lot.id}
              data-default={lot.id === initial ? '' : undefined}
              className="pack-text flex-col gap-6"
            >
              <p className="t-body max-w-[52ch] text-ink-soft">{lot.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {order ? (
                  <a
                    href={order}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-[0.9375rem] font-medium text-on-accent transition-[background-color,transform] duration-200 [transition-timing-function:var(--ease)] hover:bg-accent-hover active:scale-[0.985]"
                  >
                    <WhatsAppGlyph />
                    {copy.orderLabel}
                  </a>
                ) : null}
                <a
                  href={requestHref}
                  data-pack={lot.id}
                  className="tap inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-[0.9375rem] font-medium text-ink transition-[background-color,border-color,color,transform] duration-200 [transition-timing-function:var(--ease)] hover:border-accent hover:bg-accent hover:text-on-accent active:scale-[0.985]"
                >
                  {copy.askLabel}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          );
        })}

        {/* The same for every size. */}
        <div className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="t-meta text-ink-soft">{copy.notesLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {first.cuppingNotes.map((note) => (
                <li key={note} className="rounded-full border border-line px-3.5 py-1.5 text-[0.875rem]">
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <dl className="flex flex-col gap-3 text-[0.9375rem]">
            <div className="flex flex-col gap-1">
              <dt className="t-meta text-ink-soft">{copy.processLabel}</dt>
              <dd>{first.processing}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="t-meta text-ink-soft">{copy.varietiesLabel}</dt>
              <dd>
                <RichText text={first.varieties} />
              </dd>
            </div>
          </dl>
        </div>

        <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{copy.orderNote}</p>
      </div>
    </div>
  );
}

/** A resealable pouch, drawn to scale with its size. */
function BagIcon({ scale }: { scale: number }) {
  const h = Math.round(34 * scale);
  return (
    <svg aria-hidden="true" viewBox="0 0 24 32" style={{ height: h, width: 'auto' }} className="text-ochre-ink" fill="none">
      <path d="M5 2.5h14l1.5 5v21a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-21z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3.5 7.5h17" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="16" width="10" height="8" rx="0.6" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.73.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48" />
    </svg>
  );
}
