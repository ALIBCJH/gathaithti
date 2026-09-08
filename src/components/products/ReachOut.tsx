import { PhoneMark, WhatsAppMark } from '@/components/icons/Channels';
import { PackEnquiryForm } from '@/components/products/PackEnquiryForm';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Section } from '@/components/ui/Section';
import { site, whatsappHref } from '@content/site';
import type { Common, Lot, ProductsContent } from '@content/types';

/**
 * How to reach the society about a bag of coffee — one card, in the order
 * people actually use: WhatsApp, the phone, then a short form.
 *
 * WHY THE CHANNELS COME FIRST. The band used to be a form and nothing else,
 * eight fields wide, written when the catalogue sold green coffee by the
 * container. Somebody who wants a 250 g bag sends a WhatsApp message; the form
 * is for the ones who would rather write, and it is three fields.
 *
 * THE NUMBERS ARE NOT WRITTEN HERE. They come from content/site.ts, which is
 * also where the contact page, the footer and the LocalBusiness JSON-LD read
 * them, so there is one number to correct rather than four. A channel whose
 * `value` is empty renders as plain text carrying `channels.missing` instead
 * of as a link — a dead tel: or wa.me link is worse than an honest gap,
 * because somebody acts on it.
 *
 * ⚠ The numbers in site.ts are still SAMPLE DATA — the unissued +254 700 000
 * xxx block, chosen so a misdial cannot ring a stranger. Replace them with the
 * society's own before this page is advertised.
 */
export function ReachOut({
  content,
  form,
  packs,
}: {
  content: ProductsContent['sample'];
  form: Common['form'];
  packs: Pick<Lot, 'id' | 'grade' | 'name'>[];
}) {
  const whatsapp = site.contact.whatsapp;
  const phone = site.contact.officePhone;

  /* One row, drawn twice: filled for WhatsApp because it is the action this
     card is for, outlined for the phone because it is the alternative. */
  const row =
    'group/row flex items-center gap-4 border px-5 py-4 transition-[background-color,border-color] duration-200 [transition-timing-function:var(--ease)]';

  return (
    <Section tone="parchment-2" size="loose" id="request-a-sample" ariaLabelledby="sample-heading">
      <Container width="wide">
        <SectionHead
          id="sample-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        {/* A single column, centred and narrow. The band was two columns —
            copy on the left, form on the right — which is a layout for a form
            with eight fields in it. Three fields and two buttons read as one
            card. */}
        <div className="mx-auto mt-12 w-full max-w-[40rem] border border-line bg-parchment p-6 sm:p-8 lg:mt-16 lg:p-10">
          <ul className="flex flex-col gap-3">
            <li>
              {whatsapp.value ? (
                <a
                  href={whatsappHref(content.channels.whatsapp.prefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${row} tap border-accent bg-accent text-on-accent hover:bg-accent-hover`}
                >
                  <WhatsAppMark className="h-6 w-6 shrink-0" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="t-body font-medium">{content.channels.whatsapp.label}</span>
                    <span className="text-[0.8125rem] opacity-80">{whatsapp.display}</span>
                  </span>
                  <span className="hidden text-[0.8125rem] opacity-80 sm:block">
                    {content.channels.whatsapp.note}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 [transition-timing-function:var(--ease)] group-hover/row:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ) : (
                <p className={`${row} border-line text-ink-soft`}>
                  <WhatsAppMark className="h-6 w-6 shrink-0" />
                  <span className="flex flex-col">
                    <span className="t-body font-medium text-ink">
                      {content.channels.whatsapp.label}
                    </span>
                    <span className="text-[0.8125rem]">{content.channels.missing}</span>
                  </span>
                </p>
              )}
            </li>

            <li>
              {phone.value ? (
                <a href={`tel:${phone.value}`} className={`${row} tap border-line hover:border-ink/35`}>
                  <PhoneMark className="h-6 w-6 shrink-0 text-ochre-ink" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="t-body font-medium text-ink">{content.channels.phone.label}</span>
                    <span className="tnum text-[0.8125rem] text-ink-soft">{phone.display}</span>
                  </span>
                  <span className="hidden text-[0.8125rem] text-ink-soft sm:block">
                    {content.channels.phone.note}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ochre-ink transition-transform duration-200 [transition-timing-function:var(--ease)] group-hover/row:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ) : (
                <p className={`${row} border-line text-ink-soft`}>
                  <PhoneMark className="h-6 w-6 shrink-0" />
                  <span className="flex flex-col">
                    <span className="t-body font-medium text-ink">{content.channels.phone.label}</span>
                    <span className="text-[0.8125rem]">{content.channels.missing}</span>
                  </span>
                </p>
              )}
            </li>
          </ul>

          {/* The form is the alternative, so it is introduced as one. `h3`
              under the band's h2 — the card is not a section of its own. */}
          <h3 className="t-meta mt-10 border-t border-line pt-8 text-ink-soft">
            {content.form.heading}
          </h3>

          <div className="mt-5">
            <PackEnquiryForm content={content.form} form={form} packs={packs} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
