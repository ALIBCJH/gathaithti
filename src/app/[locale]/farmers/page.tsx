import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MemberCard } from '@/components/farmers/MemberCard';
import { Noticeboard } from '@/components/farmers/Noticeboard';
import { PreFinance } from '@/components/farmers/PreFinance';
import { Training } from '@/components/farmers/Training';
import { SmartImage } from '@/components/media/SmartImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { getDictionary, isLocale } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: 'farmers', meta: getDictionary(locale).farmers.meta });
}

export default async function FarmersPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { farmers, common } = dict;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          localBusinessLd(locale),
          breadcrumbLd(locale, [
            { name: common.nav.home, path: '' },
            { name: common.nav.farmers, path: 'farmers' },
          ]),
        ]}
      />

      <PageHeader eyebrow={farmers.hero.eyebrow} title={farmers.hero.title} lead={farmers.hero.lead} />

      {/* The noticeboard comes first, before any photography: members open this
          page for the price, and they should not have to scroll past a hero. */}
      <Noticeboard content={farmers.noticeboard} />

      <div className="bg-parchment py-8">
        <Container width="wide">
          <SmartImage slot="farmersHero" />
        </Container>
      </div>

      <Section tone="parchment" ariaLabelledby="profiles-heading">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <Eyebrow>{farmers.profiles.eyebrow}</Eyebrow>
              <h2 id="profiles-heading" className="t-section max-w-[14ch]">
                {farmers.profiles.heading}
              </h2>
            </div>
            <p className="t-lead measure text-ink-soft lg:col-span-5 lg:col-start-8">
              {farmers.profiles.lead}
            </p>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-16">
            {farmers.profiles.members.map((member, i) => (
              <Reveal key={member.id} delay={(i % 3) * 60}>
                <MemberCard
                  member={member}
                  yearsLabel={farmers.profiles.yearsLabel}
                  treesLabel={farmers.profiles.treesLabel}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Training content={farmers.training} />
      <PreFinance content={farmers.prefinance} />
    </>
  );
}
