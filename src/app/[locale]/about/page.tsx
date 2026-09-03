import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SplitHero } from '@/components/layout/SplitHero';
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

      {/* Hero, then five bands in the order a stranger needs them: what the
          society is, where it came from, how it is run and by whom, the paper
          an auditor wants, and finally why the coffee tastes as it does. */}
      <SplitHero
        slot="aboutHero"
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lead={about.hero.lead}
        /* Measured: the man sits at ~29% across the source and the picked hand
           at ~64%. A tall crop cannot hold both centred, and at 58% his face
           was cut in half by the left edge of the panel on a phone. */
        objectPosition="object-[34%_45%] lg:object-[50%_40%]"
      />

      <Pillars content={about.pillars} />
      <History content={about.origin} />
      <Governance content={about.governance} />
      <InformationPoint content={about.registration} />
      <Terroir content={about.terroir} />
    </>
  );
}
