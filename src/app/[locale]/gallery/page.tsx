import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, organizationLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: 'gallery', meta: getDictionary(locale).gallery.meta });
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const { gallery, common } = dict;


  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          breadcrumbLd(locale, [
            { name: common.nav.home, path: '' },
            { name: common.nav.gallery, path: 'gallery' },
          ]),
        ]}
      />

      {/* Centred, like About, Our Coffee and Our Farmers. Contact is the last
          page still opening left-aligned. */}
      <PageHeader
        align="center"
        eyebrow={gallery.hero.eyebrow}
        title={gallery.hero.title}
        lead={gallery.hero.lead}
      />

      <Section tone="parchment-2" ariaLabelledby="gallery-heading">
        <Container width="wide">
          {/* The band is labelled by the page's own h1: this page is the
              gallery, so a second heading over the slideshow would be a
              heading for the whole page written twice. */}
          <h2 id="gallery-heading" className="sr-only">
            {gallery.hero.title}
          </h2>

          <div className="mx-auto w-full max-w-[76rem]">
            <GalleryGrid items={gallery.items} />
          </div>
        </Container>
      </Section>
    </>
  );
}
