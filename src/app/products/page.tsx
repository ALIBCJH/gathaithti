import type { Metadata } from 'next';

import { LotCard } from '@/components/products/LotCard';
import { PackGrid } from '@/components/products/PackGrid';
import { ProcessWalkthrough } from '@/components/products/ProcessWalkthrough';
import { SeasonGem } from '@/components/products/SeasonGem';
import { ReachOut } from '@/components/products/ReachOut';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Section } from '@/components/ui/Section';
import { dict } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd, productLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'products', meta: dict.products.meta });
}

export default function ProductsPage() {
    const { products, common } = dict;
  const requestHref = '#request-a-sample';

  /* The cards read the filesystem to choose between a photograph and a
     placeholder, so they are rendered here. They used to be handed to a client
     component along with a price, a score and an availability rank so that it
     could filter and sort them; that bar is gone, so all it needs is the card
     and a key. */
  const packCards = products.lots.map((lot) => ({
    id: lot.id,
    card: <LotCard lot={lot} copy={products.catalogue} requestHref={requestHref} />,
  }));

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          localBusinessLd(),
          breadcrumbLd([
            { name: common.nav.home, path: '' },
            { name: common.nav.products, path: 'products' },
          ]),
          ...products.lots.map((lot) => productLd(lot)),
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
            <PackGrid cards={packCards} />
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
        packs={products.lots.map(({ id, grade, name }) => ({ id, grade, name }))}
      />
    </>
  );
}
