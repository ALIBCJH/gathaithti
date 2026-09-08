import type { MetadataRoute } from 'next';
import { defaultLocale, site } from '@content/site';

/* `output: 'export'` refuses a metadata route that has not said it is static —
   "export const dynamic = force-static / export const revalidate not
   configured". Nothing in here reads a request, so it always was static; the
   export just wants that stated. Harmless on Vercel, where it was already
   being emitted as a static file. */
export const dynamic = 'force-static';


/**
 * A web manifest, so that "open the app" has a defined starting point.
 *
 * Without one, a site pinned to a home screen or opened from a browser
 * shortcut starts wherever the browser last was — which is why the site can
 * appear to "open on Our Farmers" for somebody who has been working on that
 * page. `start_url` settles it: the entry point is the home page, in the
 * default locale, whatever the browser remembers.
 *
 * It does not change ordinary navigation, and it is not a fix for a redirect
 * bug — `/` already answers 308 to `/en`, verified. It removes the one case
 * where the browser, not the site, chose the page.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.short,
    start_url: `/${defaultLocale}`,
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#241611',
    lang: defaultLocale,
  };
}
