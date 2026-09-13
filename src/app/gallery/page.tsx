import type { Metadata } from 'next';

import { GalleryWalk } from '@/components/gallery/GalleryWalk';
import { JsonLd } from '@/components/seo/JsonLd';
import { dict } from '@/lib/i18n';
import { breadcrumbLd, buildMetadata, organizationLd } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: 'gallery', meta: dict.gallery.meta });
}

/* The gallery is a walk through the society — see GalleryWalk. It opens on its
   own first stop rather than a PageHeader: the title stands beside the gate,
   which is where the walk begins. */
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
      <GalleryWalk content={gallery} />
    </>
  );
}
