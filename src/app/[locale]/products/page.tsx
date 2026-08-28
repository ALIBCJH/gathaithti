import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LotCard } from '@/components/products/LotCard';
import { LotCatalogue, type CatalogueItem } from '@/components/products/LotCatalogue';
import { ProcessWalkthrough } from '@/components/products/ProcessWalkthrough';
import { SampleRequestForm } from '@/components/products/SampleRequestForm';
import { SmartImage } from '@/components/media/SmartImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { getFact } from '@/lib/facts';
import { getDictionary, isLocale } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd, productLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: 'products', meta: getDictionary(locale).products.meta });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { products, common } = dict;
  const requestHref = '#request-a-sample';

  /* The cards are server components — they check the filesystem for each
     photograph — so they are rendered here and handed to the client-side
     filter as props, alongside just enough metadata to sort and filter on. */
  const catalogueItems: CatalogueItem[] = products.lots.map((lot) => ({
    id: lot.id,
    grade: lot.grade,
    availability: lot.availability,
    availabilityLabel: lot.availabilityLabel,
    price:
      products.catalogue.showPrices && lot.priceFactId
        ? Number(getFact(lot.priceFactId)?.value ?? Number.NaN) || undefined
        : undefined,
    score: lot.scoreValue,
    card: <LotCard lot={lot} copy={products.catalogue} requestHref={requestHref} />,
  }));

  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          localBusinessLd(locale),
          breadcrumbLd(locale, [
            { name: common.nav.home, path: '' },
            { name: common.nav.products, path: 'products' },
          ]),
          ...products.lots.map((lot) => productLd(lot, locale)),
        ]}
      />

      <PageHeader
        eyebrow={products.hero.eyebrow}
        title={products.hero.title}
        lead={products.hero.lead}
      />

      <div className="bg-parchment pb-8">
        <Container width="wide">
          <SmartImage slot="productsHero" />
        </Container>
      </div>

      {/* How this coffee is actually bought — said plainly, before the catalogue */}
      <Section tone="parchment" size="tight" ariaLabelledby="market-heading">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <h2 id="market-heading" className="t-section max-w-[14ch] lg:col-span-5">
              {products.marketNote.heading}
            </h2>
            <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              {products.marketNote.body.map((paragraph, i) => (
                <p key={i} className="t-body measure text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="parchment-2" id="lots" ariaLabelledby="catalogue-heading">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Eyebrow>{products.catalogue.eyebrow}</Eyebrow>
              <h2 id="catalogue-heading" className="t-section max-w-[14ch]">
                {products.catalogue.heading}
              </h2>
            </div>
            <p className="t-lead measure text-ink-soft lg:col-span-5 lg:col-start-8">
              {products.catalogue.lead}
            </p>
          </div>

          <div className="mt-20 lg:mt-24">
            <LotCatalogue items={catalogueItems} copy={products.catalogue} />
          </div>
        </Container>
      </Section>

      <ProcessWalkthrough content={products.process} />

      <Section tone="parchment" size="loose" id="request-a-sample" ariaLabelledby="sample-heading">
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-8 lg:col-span-4">
              <Eyebrow>{products.sample.eyebrow}</Eyebrow>
              <h2 id="sample-heading" className="t-section max-w-[12ch]">
                {products.sample.heading}
              </h2>
              <p className="t-lead measure text-ink-soft">{products.sample.lead}</p>
              <p className="t-body border-t border-line pt-6 text-[0.9375rem] text-ink-soft">
                {products.sample.note}
              </p>
              <div className="hidden lg:block">
                <SmartImage slot="sampleForm" />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <SampleRequestForm
                content={products.sample}
                form={common.form}
                locale={locale}
                lots={products.lots.map(({ id, grade, name }) => ({ id, grade, name }))}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
