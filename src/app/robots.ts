import type { MetadataRoute } from 'next';
import { siteUrl } from '@content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    /* No `host:` — it is a Yandex-only directive, and Lighthouse's robots.txt
       validator scores the file invalid because of it. */
  };
}
