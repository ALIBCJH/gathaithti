import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/AboutIntro';
import { History } from '@/components/about/History';
import { Values } from '@/components/about/Values';
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

      {/* Heritage & Purpose opens the page and carries the h1 (2026-09-18),
          then the history as a timeline, then the four core values. */}
      <AboutIntro content={about.intro} />
      <History content={about.history} />
      <Values content={about.values} />
      <Governance content={about.governance} />
      <InformationPoint content={about.registration} />
      <Terroir content={about.terroir} />
    </>
  );
}
