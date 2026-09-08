import { notFound } from 'next/navigation';

/**
 * Catches any unmatched path inside a locale so that a 404 still renders
 * inside the locale layout — header, footer, correct <html lang> and all.
 */
export default function CatchAll(): never {
  notFound();
}

/* NO generateStaticParams HERE, and none is wanted.

   An empty one was tried, to let `output: 'export'` build: a static export
   refuses a dynamic segment that never says which paths it covers. Next
   refuses an EMPTY list just as firmly — "returned an empty array from
   generateStaticParams(). With output: export, at least one route must be
   generated" — and the only way to satisfy it would be to invent a path like
   /en/404/, a real URL answering 200 with a not-found page on it.

   So the cpanel build PARKS this route instead, the way it parks the API
   handlers and the proxy: scripts/build-cpanel.mjs moves it aside for the
   length of the build and puts it back afterwards. On Apache an unmatched URL
   is handled by ErrorDocument in deploy/htaccess. On Vercel this file is
   untouched and still catches unmatched paths inside the locale layout. */
