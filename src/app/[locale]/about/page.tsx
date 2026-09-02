import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AboutHero } from '@/components/about/AboutHero';
import { Origin } from '@/components/about/Origin';
import { Governance } from '@/components/about/Governance';
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

      <AboutHero content={about.hero} />

      <Origin content={about.origin} />
      <Governance content={about.governance} />
      <Terroir content={about.terroir} />
    </>
  );
}
