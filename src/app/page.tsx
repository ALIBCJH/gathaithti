import type { Metadata } from 'next';

import { Hero } from '@/components/home/Hero';
import { ProofBand } from '@/components/home/ProofBand';
import { Statements } from '@/components/home/Statements';
import { SeasonPanel } from '@/components/home/SeasonPanel';
import { Journey } from '@/components/home/Journey';
import { Acclaim } from '@/components/home/Acclaim';
import { Partners } from '@/components/home/Partners';
import { JsonLd } from '@/components/seo/JsonLd';
import { dict } from '@/lib/i18n';
import { buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: '', meta: dict.home.meta });
}

export default function HomePage() {
    const { home } = dict;

  return (
    <>
      <JsonLd data={[organizationLd(), localBusinessLd()]} />
      <Hero content={home.hero} />

      {/* ON EVERY WIDTH since 2026-09-30. Both bands were `hidden lg:block`
          from the days when the ask was a shorter first scroll on a phone —
          kept in the markup so Google, which indexes the MOBILE rendering,
          and screen readers still had them, but never drawn. The motto moved
          into the first of them on 2026-09-30, and a motto only desktop
          visitors can see is not a motto; the client asked for both back. */}
      <ProofBand content={home.proof} />
      {/* The society's Vision and Mission, directly under the figures. */}
      <Statements content={home.statements} />

      <SeasonPanel content={home.season} />

      {/* Under the season panel, and on every width: the four steps from the
          branch to the cup, then what roasters say about the result. */}
      <Journey content={home.journey} />
      <Acclaim content={home.acclaim} />

      {/* Last, and after the members' band on purpose: the society's own people
          come before the organisations it works with. */}
      <Partners content={home.partners} />
    </>
  );
}
