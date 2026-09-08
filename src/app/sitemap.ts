import type { MetadataRoute } from 'next';
import { routes } from '@content/site';
import { urlFor } from '@/lib/seo';

/* `output: 'export'` refuses a metadata route that has not said it is static —
   "export const dynamic = force-static / export const revalidate not
   configured". Nothing in here reads a request, so it always was static; the
   export just wants that stated. Harmless on Vercel, where it was already
   being emitted as a static file. */
export const dynamic = 'force-static';


/**
 * Every page, once. Regenerated on each build — adding a route to
 * content/site.ts adds it here automatically.
 *
 * It used to iterate the locales as well, emitting each page twice with
 * hreflang alternates. There is one language and the URLs no longer carry a
 * locale segment, so a second pass would list the same six URLs again.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-08');

  return routes.map((route) => ({
    url: urlFor(route.path),
    lastModified,
    changeFrequency: (route.key === 'farmers' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route.key === 'home' ? 1 : route.key === 'products' ? 0.9 : 0.7,
  }));
}
