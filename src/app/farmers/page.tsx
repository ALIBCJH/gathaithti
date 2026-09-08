import type { Metadata } from 'next';

import { MemberCard } from '@/components/farmers/MemberCard';
import { Ownership } from '@/components/farmers/Ownership';
import { Training } from '@/components/farmers/Training';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { dict } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'farmers', meta: dict.farmers.meta });
}

export default function FarmersPage() {
    const { farmers, common } = dict;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          localBusinessLd(),
          breadcrumbLd([
            { name: common.nav.home, path: '' },
            { name: common.nav.farmers, path: 'farmers' },
          ]),
        ]}
      />

      {/* THE MEMBERS BAND OPENS THE PAGE, at the user's request. It sat
          second, under the ownership claim; a visitor now meets the people
          before the constitutional statement about who owns the society,
          which is the right way round for a page called Our Farmers.

          It therefore carries the `h1` and the header-clearing `opener`
          padding. Both came off <Ownership />, which is an ordinary h2 band
          below it now. */}
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

      {/* The ownership claim — that the farmers are the shareholders and the
          committee is elected from among them — reads as the answer to the
          faces above it rather than as the page's opening statement. */}
      <Ownership content={farmers.ownership} />

      <Training content={farmers.training} />
    </>
  );
}
