import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/contact/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { getDictionary, isLocale } from '@/lib/i18n';
import { site, whatsappHref } from '@content/site';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: 'contact', meta: getDictionary(locale).contact.meta });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { contact, common } = dict;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          localBusinessLd(locale),
          breadcrumbLd(locale, [
            { name: common.nav.home, path: '' },
            { name: common.nav.contact, path: 'contact' },
          ]),
        ]}
      />

      <PageHeader eyebrow={contact.hero.eyebrow} title={contact.hero.title} lead={contact.hero.lead} />

      {/* The three ways in, as three things you can actually press.

          What was here before was three tall cards, each repeating the office
          address, the email and the phone inside its own definition list — the
          address appeared four times on this page, and the reader had to read a
          card to find a number. Now the numbers are the interface: WhatsApp,
          call, email, stated once at the top, and the routing underneath is
          three lines saying which one to use. */}
      <Section
        tone="parchment"
        size="tight"
        ariaLabelledby="direct-heading"
        /* Pulled up under the page title on a phone. The actions are the reason
           this page exists, and at the section's normal top padding the
           WhatsApp button started below the fold on a 664px viewport. */
        className="pt-2 sm:pt-16"
      >
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-4 lg:col-span-4">
              {/* "Talk to the society" under a page titled "Talk to the
                  society directly" is the same sentence twice. On a phone,
                  where the two would sit within one screen of each other and
                  the space costs the WhatsApp button its place above the fold,
                  the second one is read but not drawn. */}
              <h2 id="direct-heading" className="t-section max-w-[12ch] sr-only sm:not-sr-only">
                {contact.direct.heading}
              </h2>
              <p className="t-body measure text-ink-soft">{contact.direct.lead}</p>
            </div>

            <ul className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6">
              {([
                site.contact.whatsapp.value && {
                  key: 'whatsapp',
                  href: whatsappHref(contact.direct.whatsapp.prefill),
                  label: contact.direct.whatsapp.label,
                  value: site.contact.whatsapp.display,
                  note: contact.direct.whatsapp.note,
                  primary: true,
                },
                site.contact.officePhone.value && {
                  key: 'phone',
                  href: `tel:${site.contact.officePhone.value}`,
                  label: contact.direct.phone.label,
                  value: site.contact.officePhone.display,
                  note: contact.direct.phone.note,
                },
                site.contact.officeEmail.value && {
                  key: 'email',
                  href: `mailto:${site.contact.officeEmail.value}`,
                  label: contact.direct.email.label,
                  value: site.contact.officeEmail.display,
                  note: contact.direct.email.note,
                },
                site.contact.memberLine.value && {
                  key: 'member',
                  href: `tel:${site.contact.memberLine.value}`,
                  label: contact.direct.memberLine.label,
                  value: site.contact.memberLine.display,
                  note: contact.direct.memberLine.note,
                },
              ].filter(Boolean) as {
                key: string;
                href: string;
                label: string;
                value: string;
                note: string;
                primary?: boolean;
              }[]).map((row) => (
                <li key={row.key}>
                  <a
                    href={row.href}
                    {...(row.key === 'whatsapp'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={[
                      'group/row flex min-h-[4.5rem] items-center justify-between gap-5 border px-5 py-4',
                      'transition-[border-color,background-color] duration-200 [transition-timing-function:var(--ease)]',
                      row.primary
                        ? 'border-accent bg-accent/8 hover:bg-accent/14'
                        : 'border-line hover:border-ink/35',
                    ].join(' ')}
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="t-meta text-ink-soft">{row.label}</span>
                      <span className="t-body font-medium text-ink">{row.value}</span>
                      <span className="text-[0.8125rem] text-ink-soft">{row.note}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-ochre-ink transition-transform duration-200 [transition-timing-function:var(--ease)] group-hover/row:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Which one to use, in three lines rather than three cards. */}
      <Section tone="parchment-2" size="tight" ariaLabelledby="routes-heading">
        <Container width="wide">
          <h2 id="routes-heading" className="sr-only">
            {contact.hero.eyebrow}
          </h2>
          <dl className="flex flex-col">
            {contact.routes.map((route) => (
              <div
                key={route.id}
                className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <dt className="t-meta pt-1 text-ochre-ink">{route.label}</dt>
                <dd className="flex flex-col gap-1">
                  <p className="t-body font-medium">{route.heading}</p>
                  <p className="t-body measure text-[0.9375rem] text-ink-soft">{route.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="parchment" size="loose" id="enquiry" ariaLabelledby="enquiry-heading">
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-8 lg:col-span-4">
              <Eyebrow>{contact.form.eyebrow}</Eyebrow>
              <h2 id="enquiry-heading" className="t-section max-w-[13ch]">
                {contact.form.heading}
              </h2>
              <p className="t-lead measure text-ink-soft">{contact.form.lead}</p>
              <p className="t-body border-t border-line pt-6 text-[0.9375rem] text-ink-soft">
                {contact.form.note}
              </p>
              <a href={`/${locale}/products#request-a-sample`} className="link t-meta w-fit">
                {common.actions.requestSample}
              </a>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm content={contact.form} form={common.form} locale={locale} />
            </div>
          </div>
        </Container>
      </Section>

      {/* The office, without the photograph and without the map block.

          Removing the picture left the text in five columns of twelve with
          seven empty beside it, so the three things this section actually holds
          — where it is, when it is open, and what it is registered as — take a
          column each instead. Nothing was cut but the images. */}
      <Section tone="parchment-2" ariaLabelledby="office-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <h2 id="office-heading" className="t-section max-w-[14ch]">
                {contact.office.heading}
              </h2>

              <address className="flex flex-col gap-1 text-[1.0625rem] not-italic leading-relaxed">
                {contact.office.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="lg:col-span-4 lg:col-start-6">
              <dl className="flex flex-col">
                {contact.office.hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-baseline justify-between gap-6 border-t border-line py-3 last:border-b"
                  >
                    <dt className="t-body text-ink-soft">{row.day}</dt>
                    <dd className="t-body tnum">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <dl className="flex flex-col border-t-2 border-ochre pt-6">
                {contact.office.registration.map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 py-3">
                    <dt className="t-meta text-ink-soft">{row.label}</dt>
                    <dd className="t-body tnum">
                      <RichText text={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}
