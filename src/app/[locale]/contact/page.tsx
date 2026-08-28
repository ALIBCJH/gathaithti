import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationBlock } from '@/components/about/LocationBlock';
import { SmartImage } from '@/components/media/SmartImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { getDictionary, isLocale } from '@/lib/i18n';
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

      <Section tone="parchment" size="tight" ariaLabelledby="routes-heading">
        <Container width="wide">
          <h2 id="routes-heading" className="sr-only">
            {contact.hero.eyebrow}
          </h2>

          <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
            {contact.routes.map((route, i) => (
              <Reveal key={route.id} delay={i * 60}>
                <article className="flex h-full flex-col gap-6 bg-parchment p-8 lg:p-10">
                  <Eyebrow>{route.eyebrow}</Eyebrow>
                  <h3 className="t-section text-[clamp(1.375rem,2vw,1.75rem)] max-w-[16ch]">
                    {route.heading}
                  </h3>
                  <p className="t-body text-[0.9375rem] text-ink-soft">{route.body}</p>

                  {route.person ? (
                    <div className="border-l-2 border-ochre pl-4">
                      <p className="t-body font-medium">{route.person.name}</p>
                      <p className="t-meta text-ink-soft">{route.person.role}</p>
                    </div>
                  ) : null}

                  <dl className="mt-auto flex flex-col">
                    {route.rows.map((row) => (
                      <div key={row.label} className="flex flex-col gap-1 border-t border-line py-4">
                        <dt className="t-meta text-ink-soft">{row.label}</dt>
                        <dd className="t-body tnum">
                          {row.href ? (
                            <a className="link" href={`/${locale}/${row.href}`}>
                              {row.value}
                            </a>
                          ) : (
                            <RichText text={row.value} />
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment-2" ariaLabelledby="office-heading">
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <h2 id="office-heading" className="t-section max-w-[14ch]">
                {contact.office.heading}
              </h2>

              <address className="flex flex-col gap-1 text-[1.0625rem] not-italic leading-relaxed">
                {contact.office.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <dl className="flex flex-col">
                {contact.office.hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-baseline justify-between gap-6 border-t border-line py-3"
                  >
                    <dt className="t-body text-ink-soft">{row.day}</dt>
                    <dd className="t-body tnum">{row.time}</dd>
                  </div>
                ))}
              </dl>

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

            <Reveal className="lg:col-span-6 lg:col-start-7">
              <SmartImage slot="contactOffice" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <LocationBlock
        heading={contact.office.mapLabel}
        address={contact.office.address}
        directions={contact.office.directions}
      />
    </>
  );
}
