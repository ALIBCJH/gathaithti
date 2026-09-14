import { PackEnquiryForm } from '@/components/products/PackEnquiryForm';
import { ChannelTile } from '@/components/ui/ChannelTile';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { site, whatsappHref } from '@content/site';
import type { Common, Lot, ProductsContent } from '@content/types';

/**
 * How to ask about the coffee — one card, two sides.
 *
 * Rebuilt 2026-09-14 with the Contact page, so the two feel like one system:
 * the ways to reach the office straight away (WhatsApp, then the phone) on one
 * side, and a short message form on the other — which size, an email, the
 * message. On a phone the two stack, talking first.
 *
 * The numbers come from content/site.ts, like everywhere else. "Ask about this
 * pack" in the size picker jumps here and pre-selects the size.
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

  return (
    <Section tone="parchment-2" size="loose" id="request-a-sample" ariaLabelledby="sample-heading">
      <Container width="wide">
        <div className="mx-auto grid max-w-[70rem] overflow-hidden rounded-[1.5rem] border border-line bg-parchment shadow-[0_40px_80px_-56px_rgb(36_22_17/0.5)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-6 border-b border-line bg-[color-mix(in_srgb,var(--accent-fill)_6%,var(--surface))] p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="sample-heading" className="t-section text-[clamp(1.75rem,3vw,2.5rem)] text-balance">
              {content.heading}
            </h2>
            <p className="t-body text-ink-soft">{content.lead}</p>
            <div className="mt-2 flex flex-col gap-3">
              <ChannelTile
                kind="whatsapp"
                primary
                href={whatsapp.value ? whatsappHref(content.channels.whatsapp.prefill) : ''}
                label={content.channels.whatsapp.label}
                value={whatsapp.display}
                note={content.channels.whatsapp.note}
                missing={content.channels.missing}
              />
              <ChannelTile
                kind="phone"
                href={phone.value ? `tel:${phone.value}` : ''}
                label={content.channels.phone.label}
                value={phone.display}
                note={content.channels.phone.note}
                missing={content.channels.missing}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-10 lg:p-12">
            <h3 className="t-section text-[clamp(1.375rem,2vw,1.75rem)]">{content.form.heading}</h3>
            <PackEnquiryForm content={content.form} form={form} packs={packs} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
