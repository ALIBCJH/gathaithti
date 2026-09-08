import type { MetadataRoute } from 'next';
import { locales, routes } from '@content/site';
import { urlFor } from '@/lib/seo';

/* `output: 'export'` refuses a metadata route that has not said it is static —
   "export const dynamic = force-static / export const revalidate not
   configured". Nothing in here reads a request, so it always was static; the
   export just wants that stated. Harmless on Vercel, where it was already
   being emitted as a static file. */
export const dynamic = 'force-static';


/**
 * Both locales, every page, with hreflang alternates. Regenerated on each
 * build — adding a route to content/site.ts adds it here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-28');

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: urlFor(locale, route.path),
      lastModified,
      changeFrequency: (route.key === 'farmers' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route.key === 'home' ? 1 : route.key === 'products' ? 0.9 : 0.7,
    })),
  );
}
