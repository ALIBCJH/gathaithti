import type { Metadata } from 'next';

import { History } from '@/components/about/History';
import { Governance } from '@/components/about/Governance';
import { InformationPoint } from '@/components/about/InformationPoint';
import { Terroir } from '@/components/about/Terroir';
import { JsonLd } from '@/components/seo/JsonLd';
import { dict } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'about', meta: dict.about.meta });
}

export default function AboutPage() {
    const { about, common } = dict;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          localBusinessLd(),
          breadcrumbLd([
            { name: common.nav.home, path: '' },
            { name: common.nav.about, path: 'about' },
          ]),
        ]}
      />

      {/* The history opens the page now. The ownership band that used to —
          "Owned by the farmers who grow the coffee" and its three cards —
          moved to Our Farmers, where that claim is the subject rather than a
          statement in passing. History carries the h1 in its place. */}
      <History content={about.origin} />
      <Governance content={about.governance} />
      <InformationPoint content={about.registration} />
      <Terroir content={about.terroir} />
    </>
  );
}
