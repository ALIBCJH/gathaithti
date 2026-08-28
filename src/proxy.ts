import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@content/site';

/**
 * Every page lives under a locale: /en/… and /sw/…
 * Anything without one is redirected to the default locale, permanently, so
 * search engines consolidate on a single canonical form.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  /* The site was briefly bilingual. Anyone holding a /sw link — a bookmark, a
     crawler, a shared URL — lands on the English page rather than a 404. */
  if (pathname === '/sw' || pathname.startsWith('/sw/')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname.slice(3)}`;
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|.*\\.\\w+$).*)'],
};
