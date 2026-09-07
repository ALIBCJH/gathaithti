import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LotCard } from '@/components/products/LotCard';
import { LotCatalogue, type CatalogueItem } from '@/components/products/LotCatalogue';
import { ProcessWalkthrough } from '@/components/products/ProcessWalkthrough';
import { SeasonGem } from '@/components/products/SeasonGem';
import { ReachOut } from '@/components/products/ReachOut';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
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

      {/* ORDER OF THE PAGE.

          The packs come FIRST. This band used to sit fourth, under the
          processing walkthrough, the season and the note on how the coffee is
          sold — an order written when the catalogue held two GREEN COFFEE
          lots, where a stranger really did need to know how a grade comes
          about before the grades meant anything to them.

          It sells roasted retail packs now, and that reasoning inverts: the
          thing for sale is a bag of coffee with a price on it, and someone who
          came to buy one should not have to scroll past six processing steps
          to find it. So: what is for sale, how to buy it, how it is made, what
          this season gave, then the way to ask for a sample.

          The band therefore carries the page's `h1` and the `opener` padding —
          the header is fixed, and whatever comes first has to clear it. Both
          moved off the processing band, which now sits in mid-page and takes
          an ordinary h2 and ordinary padding. */}
      <Section tone="parchment-2" size="opener" id="lots" ariaLabelledby="catalogue-heading">
        <Container width="wide">
          <SectionHead
            as="h1"
            id="catalogue-heading"
            eyebrow={products.catalogue.eyebrow}
            heading={products.catalogue.heading}
          />

          {/* Tighter than the mt-20/24 this band used mid-page. As the opener
              the head is a page title rather than a section head, and the old
              gap left a visible hole between the lead and the filter bar. */}
          <div className="mt-12 lg:mt-16">
            <LotCatalogue items={catalogueItems} copy={products.catalogue} />
          </div>
        </Container>
      </Section>

      {/* How this coffee is actually bought, said plainly and kept next to the
          catalogue — it is the answer to the cards above it, and its first
          line points at them ("The roasted packs above"). It followed the
          catalogue's move up the page rather than being left behind under the
          processing steps. */}
      <Section tone="parchment" size="tight" ariaLabelledby="market-heading">
        <Container width="wide">
          <SectionHead id="market-heading" eyebrow={products.marketNote.eyebrow} heading={products.marketNote.heading} />

          {/* Two columns of prose under the head, rather than one column of
              prose beside it. */}
          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            {products.marketNote.body.map((paragraph, i) => (
              <p key={i} className="t-body text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessWalkthrough content={products.process} />

      <SeasonGem content={products.gem} />

      <ReachOut
        content={products.sample}
        form={common.form}
        locale={locale}
        packs={products.lots.map(({ id, grade, name }) => ({ id, grade, name }))}
      />
    </>
  );
}
