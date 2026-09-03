import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Pillars } from '@/components/about/Pillars';
import { History } from '@/components/about/History';
import { Governance } from '@/components/about/Governance';
import { InformationPoint } from '@/components/about/InformationPoint';
import { Terroir } from '@/components/about/Terroir';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: 'about', meta: getDictionary(locale).about.meta });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { about, common } = dict;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          localBusinessLd(locale),
          breadcrumbLd(locale, [
            { name: common.nav.home, path: '' },
            { name: common.nav.about, path: 'about' },
          ]),
        ]}
      />

      {/* Five bands in the order a stranger needs them: what the society is,
          where it came from, how it is run and by whom, the paper an auditor
          wants, and finally why the coffee tastes as it does.

          There is no hero band. The photographic split that used to open the
          page has gone, and the title it carried now opens the first band —
          which is why Pillars is handed `about.hero` as well as its own
          cards. */}
      <Pillars content={about.pillars} opening={about.hero} />
      <History content={about.origin} />
      <Governance content={about.governance} />
      <InformationPoint content={about.registration} />
      <Terroir content={about.terroir} />
    </>
  );
}
