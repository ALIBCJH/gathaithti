import type { MetadataRoute } from 'next';
import { siteUrl } from '@content/site';

/* `output: 'export'` refuses a metadata route that has not said it is static —
   "export const dynamic = force-static / export const revalidate not
   configured". Nothing in here reads a request, so it always was static; the
   export just wants that stated. Harmless on Vercel, where it was already
   being emitted as a static file. */
export const dynamic = 'force-static';


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    /* No `host:` — it is a Yandex-only directive, and Lighthouse's robots.txt
       validator scores the file invalid because of it. */
  };
}
