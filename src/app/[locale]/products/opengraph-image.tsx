import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { getDictionary, isLocale } from '@/lib/i18n';
import { defaultLocale, locales } from '@content/site';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Gathaithi Farmers’ Co-operative Society';

/** Prerendered for both locales at build time — no cold render on first share. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  const page = dict.products;

  return renderOgImage({ title: page.hero.title, line: page.meta.ogLine });
}
