import type { Metadata } from 'next';

import { PackShowcase } from '@/components/products/PackShowcase';
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
          {/* One bag, pick a size — the page's h1 is inside it. */}
          <PackShowcase lots={products.lots} copy={products.catalogue} requestHref={requestHref} />
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
          <ul className="mx-auto mt-12 grid max-w-[64rem] gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
            {products.marketNote.options.map((option) => (
              <li key={option.title} className="flex flex-col gap-3 border border-line bg-parchment-2 px-7 py-8 sm:px-9">
                <span aria-hidden="true" className="h-0.5 w-10 bg-ochre" />
                <h3 className="font-display text-xl font-semibold leading-snug">{option.title}</h3>
                <p className="t-body text-ink-soft">{option.body}</p>
              </li>
            ))}
          </ul>
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
