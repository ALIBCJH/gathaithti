import type { MetadataRoute } from 'next';
import { locales, routes } from '@content/site';
import { urlFor } from '@/lib/seo';

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
