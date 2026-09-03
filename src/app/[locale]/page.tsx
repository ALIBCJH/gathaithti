import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/home/Hero';
import { ProofBand } from '@/components/home/ProofBand';
import { SeasonPanel } from '@/components/home/SeasonPanel';
import { StoryTeaser } from '@/components/home/StoryTeaser';
import { NoticeboardPreview } from '@/components/home/NoticeboardPreview';
import { Partners } from '@/components/home/Partners';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { buildMetadata, localBusinessLd, organizationLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: '', meta: getDictionary(locale).home.meta });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { home, farmers } = dict;

  return (
    <>
      <JsonLd data={[organizationLd(locale), localBusinessLd(locale)]} />
      <Hero content={home.hero} />

      {/* The record and the season panel are desktop-only now.

          `hidden` rather than dropped: the figures they carry — the cupping
          score, the national rank, the year, the membership — are the whole of
          this site's credibility, and Google indexes the mobile rendering. Kept
          in the markup they stay indexed and stay available to a screen reader;
          they are simply not drawn on a phone, where the ask was for a shorter
          first scroll. Delete the wrappers and the sections come back. */}
      <div className="hidden lg:block">
        <ProofBand content={home.proof} />
      </div>
      <div className="hidden lg:block">
        <SeasonPanel locale={locale} content={home.season} />
      </div>
      <StoryTeaser locale={locale} content={home.story} />
      <NoticeboardPreview
        locale={locale}
        content={home.noticeboard}
        noticeboard={farmers.noticeboard}
      />

      {/* Last, and after the members' band on purpose: the society's own people
          come before the organisations it works with. */}
      <Partners content={home.partners} />
    </>
  );
}
