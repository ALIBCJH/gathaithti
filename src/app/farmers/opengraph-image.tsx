import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { dict } from '@/lib/i18n';

/* Same reason as robots.ts and sitemap.ts: `output: 'export'` will not build a
   route that has not said it is static. It always was — nothing here reads a
   request — and it used to be prerendered because generateStaticParams listed
   the locales. That went with the locale segment, so it says so itself now. */
export const dynamic = 'force-static';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Gathaithi Farmers’ Co-operative Society';

export default async function Image() {
  const page = dict.farmers;

  return renderOgImage({ title: page.hero.title, line: page.meta.ogLine });
}
