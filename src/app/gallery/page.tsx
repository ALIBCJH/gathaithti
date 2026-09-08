import type { Metadata } from 'next';

import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { dict } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'gallery', meta: dict.gallery.meta });
}

export default function GalleryPage() {
    const { gallery, common } = dict;


  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          breadcrumbLd([
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
