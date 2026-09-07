import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MemberCard } from '@/components/farmers/MemberCard';
import { Ownership } from '@/components/farmers/Ownership';
import { Training } from '@/components/farmers/Training';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
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

      {/* The ownership band opens the page and carries the h1 — the claim
          that the farmers own this society is what the page is for. It came
          from About, where it was the page title. */}
      <Ownership content={farmers.ownership} />

      {/* The members band. No longer the opener, so its head steps down to h2
          and it takes the ordinary section padding back. */}
      <Section tone="parchment" ariaLabelledby="profiles-heading">
        <Container width="wide">
          <SectionHead
            id="profiles-heading"
            eyebrow={farmers.profiles.eyebrow}
            heading={farmers.profiles.heading}
            lead={farmers.profiles.lead}
          />

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
    </>
  );
}
