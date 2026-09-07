import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MemberCard } from '@/components/farmers/MemberCard';
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

      {/* No page header. The members band opens the page, which is why it is
          `opener` and why its head is the `h1`: a page with no h1 is a page
          with no title as far as a crawler or a screen reader is concerned,
          and removing the header without moving the level would have taken
          the title off the one page about the membership.

          `farmers.hero` is parked in the content file, not deleted. */}
      <Section tone="parchment" size="opener" ariaLabelledby="profiles-heading">
        <Container width="wide">
          <SectionHead
            as="h1"
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
