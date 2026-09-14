import type { Metadata } from 'next';

import { ContactForm } from '@/components/contact/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChannelTile } from '@/components/ui/ChannelTile';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { dict } from '@/lib/i18n';
import { site, whatsappHref } from '@content/site';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'contact', meta: dict.contact.meta });
}

/**
 * CONTACT — ONE SCREEN, rebuilt 2026-09-14 so that sending a message is the
 * easiest thing on the page.
 *
 * Left: the heading, the three ways to reach the office straight away, and
 * where and when it is open. Right: the message form, in view without
 * scrolling on a desktop. On a phone the two stack, the tap-to-call buttons
 * first, the form directly under them.
 *
 * What went: the Buyers / Members / Suppliers explainer (the form's "What is
 * it about?" choices do that job), a second "Talk to the society" heading, the
 * registration details (they are on About, under "The society on paper"), and
 * the company and member-number fields.
 */
export default function ContactPage() {
  const { contact, common } = dict;
  const c = site.contact;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          localBusinessLd(),
          breadcrumbLd([
            { name: common.nav.home, path: '' },
            { name: common.nav.contact, path: 'contact' },
          ]),
        ]}
      />

      <Section tone="parchment" size="opener" id="enquiry" ariaLabelledby="contact-title">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <div className="flex flex-col gap-4">
                <Eyebrow>{contact.hero.eyebrow}</Eyebrow>
                <h1 id="contact-title" className="t-page-title max-w-[12ch] text-balance">
                  {contact.hero.title}
                </h1>
                <p className="t-lead max-w-[42ch] text-ink-soft">{contact.hero.lead}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="t-meta text-ink-soft">{contact.direct.heading}</h2>
                <ChannelTile
                  kind="whatsapp"
                  primary
                  href={c.whatsapp.value ? whatsappHref(contact.direct.whatsapp.prefill) : ''}
                  label={contact.direct.whatsapp.label}
                  value={c.whatsapp.display}
                  note={contact.direct.whatsapp.note}
                />
                <ChannelTile
                  kind="phone"
                  href={c.officePhone.value ? `tel:${c.officePhone.value}` : ''}
                  label={contact.direct.phone.label}
                  value={c.officePhone.display}
                  note={contact.direct.phone.note}
                />
                <ChannelTile
                  kind="email"
                  href={c.officeEmail.value ? `mailto:${c.officeEmail.value}` : ''}
                  label={contact.direct.email.label}
                  value={c.officeEmail.display}
                  note={contact.direct.email.note}
                />
                {c.memberLine.value ? (
                  <ChannelTile
                    kind="phone"
                    href={`tel:${c.memberLine.value}`}
                    label={contact.direct.memberLine.label}
                    value={c.memberLine.display}
                    note={contact.direct.memberLine.note}
                  />
                ) : null}
              </div>

              <div className="grid gap-5 rounded-2xl border border-line p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <h2 className="t-meta text-ink-soft">{contact.office.heading}</h2>
                  <address className="flex flex-col text-[0.9375rem] not-italic leading-relaxed">
                    {contact.office.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </div>
                <dl className="flex flex-col gap-2 text-[0.9375rem]">
                  {contact.office.hours.map((row) => (
                    <div key={row.day} className="flex flex-col">
                      <dt className="text-ink-soft">{row.day}</dt>
                      <dd className="tnum font-medium">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[1.5rem] border border-line bg-parchment-2 p-6 shadow-[0_40px_80px_-56px_rgb(36_22_17/0.5)] sm:p-10">
                <div className="mb-7 flex flex-col gap-2">
                  <h2 className="t-section text-[clamp(1.5rem,2.4vw,2rem)]">{contact.form.heading}</h2>
                  <p className="t-body text-ink-soft">{contact.form.lead}</p>
                </div>
                <ContactForm content={contact.form} form={common.form} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
