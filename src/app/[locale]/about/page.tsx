import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
