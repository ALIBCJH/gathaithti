import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GallerySlideshow } from '@/components/gallery/GallerySlideshow';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { getImage } from '@/lib/images';
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

  /* Resolved here, on the server. The slideshow is a client component and
     `getImage` reads node:fs — see the note on `GallerySlide`. A slot whose
     file is missing is dropped rather than rendered as a placeholder: a
     gallery of "photograph to come" boxes is not a gallery. */
  const slides = gallery.items
    .map((item) => ({ item, image: getImage(item.imageSlot as Parameters<typeof getImage>[0]) }))
    .filter(({ image }) => image.exists)
    .map(({ item, image }) => ({
      id: item.id,
      src: image.src,
      alt: image.alt,
      sizes: image.sizes ?? '100vw',
      caption: item.caption,
    }));

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

          <div className="mx-auto w-full max-w-[64rem]">
            <GallerySlideshow
              slides={slides}
              prevLabel={gallery.prevLabel}
              nextLabel={gallery.nextLabel}
              pauseLabel={gallery.pauseLabel}
              playLabel={gallery.playLabel}
              regionLabel={gallery.regionLabel}
              slideLabel={gallery.slideLabel}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
