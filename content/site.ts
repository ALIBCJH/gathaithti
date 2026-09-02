/**
 * Society identity, navigation and the things every page needs to know.
 * Locale-independent facts about the organisation live here; page copy lives
 * in content/en and content/sw.
 */

/**
 * The site ships English only.
 *
 * The Kiswahili scaffolding is still in content/sw, and the machinery that
 * merges it over English is still in src/lib/i18n.ts. To bring it back:
 *   1. add 'sw' here,
 *   2. restore <LocaleToggle /> in src/components/layout/Header.tsx,
 *   3. render <TranslationNotice /> in src/app/[locale]/layout.tsx.
 * Nothing else needs to change — the sitemap, the hreflang alternates and the
 * static routes all follow this array.
 */
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/**
 * BCP-47 tags, used for <html lang>, hreflang and OpenGraph. Kept keyed by
 * string rather than by Locale so that switching Kiswahili back on is a
 * one-line change in `locales` above and nothing else.
 */
export const localeTags: Record<string, string> = { en: 'en-KE', sw: 'sw-KE' };
export const localeOgTags: Record<string, string> = { en: 'en_KE', sw: 'sw_KE' };

/** Where the site lives, if nothing else says otherwise. */
const FALLBACK_SITE_URL = 'https://gathaithicoffee.co.ke';

/**
 * The canonical origin, used for <link rel="canonical">, OpenGraph URLs,
 * JSON-LD, robots.txt and the sitemap.
 *
 * Resolved defensively, because getting this wrong breaks the build rather
 * than one page: `new URL('')` throws, and an env var that exists but is empty
 * is not caught by `??`. That is exactly what an empty NEXT_PUBLIC_SITE_URL in
 * the Vercel dashboard produces.
 *
 * In order of preference:
 *   1. NEXT_PUBLIC_SITE_URL          the real domain, once it is set
 *   2. VERCEL_PROJECT_PRODUCTION_URL the production domain Vercel assigns
 *   3. VERCEL_URL                    this specific deployment (previews)
 *   4. the fallback above
 *
 * Anything unusable — blank, whitespace, or not a URL — is skipped rather than
 * thrown, so a mistyped variable degrades to the next candidate instead of
 * failing the deployment.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    FALLBACK_SITE_URL,
  ];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (!trimmed) continue;

    /* Vercel supplies bare hostnames; a hand-typed value may omit the scheme. */
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
      return new URL(withScheme).origin;
    } catch {
      /* not a URL — try the next candidate */
    }
  }

  return FALLBACK_SITE_URL;
}

export const siteUrl = resolveSiteUrl();

/** A phone number or address. `value` is the machine form (tel:, mailto:). */
export interface ContactDetail {
  value: string;
  display: string;
}

/**
 * NOT INVENTED. Fill these in and they appear across the contact page, the
 * footer, the noticeboard and the LocalBusiness JSON-LD automatically. Leave
 * `value` empty and the site renders the `display` text as plain text rather
 * than as a dead link.
 */
const contact: {
  officePhone: ContactDetail;
  officeEmail: ContactDetail;
  buyerEmail: ContactDetail;
  buyerContact: { name: string; role: string };
  memberLine: ContactDetail;
} = {
  /* ⚠ SAMPLE DATA — none of this reaches anybody.
     The numbers are the +254 700 000 xxx block, which is patterned rather than
     issued, so a misdial does not ring a stranger. The addresses are on
     gathaithicoffee.co.ke, which has no DNS record at all, so mail to them
     bounces at the sender rather than landing in someone else's inbox.
     Both are deliberate: a plausible-looking wrong number on a live page is
     worse than an empty field, because somebody acts on it. */
  officePhone: { value: '+254700000000', display: '+254 700 000 000' },
  officeEmail: { value: 'office@gathaithicoffee.co.ke', display: 'office@gathaithicoffee.co.ke' },
  buyerEmail: { value: 'marketing@gathaithicoffee.co.ke', display: 'marketing@gathaithicoffee.co.ke' },
  buyerContact: { name: 'Grace Wanjiru', role: 'Marketing & Sales, Gathaithi FCS' },
  memberLine: { value: '+254700000111', display: '+254 700 000 111' },
};

export const site = {
  legalName: 'Gathaithi Farmers’ Co-operative Society Ltd',
  name: 'Gathaithi Farmers’ Co-operative Society',
  short: 'Gathaithi',
  /** Used in <title> templates and JSON-LD alternateName. */
  alternateNames: ['Gathaithi Coffee', 'Gathaithi Coffee Factory', 'Gathaithi FCS'],

  address: {
    line1: 'Gathaithi Wet Mill',
    village: 'Gathaithi Village',
    subCounty: 'Tetu Sub-County',
    county: 'Nyeri County',
    postal: 'P.O. Box 217, Nyeri 10100',
    country: 'Kenya',
    countryCode: 'KE',
  },

  /**
   * Coordinates are the Gathaithi area of Tetu, Nyeri — approximate, for the
   * map frame only. Replace with the mill's surveyed position.
   */
  geo: { lat: -0.4183, lng: 36.8586, verified: false },

  contact,

  /** Where the sample-request form delivers. Set SAMPLE_REQUEST_TO in .env. */
  sampleRequestTo: process.env.SAMPLE_REQUEST_TO ?? 'office@example.invalid',

  openingHours: [
    { day: 'Monday – Friday', time: '8:00 – 17:00' },
    { day: 'Saturday', time: '8:00 – 13:00' },
    { day: 'Sunday & public holidays', time: 'Closed' },
  ],
} as const;

export const routes = [
  { key: 'home', path: '' },
  { key: 'about', path: 'about' },
  { key: 'products', path: 'products' },
  { key: 'farmers', path: 'farmers' },
  { key: 'contact', path: 'contact' },
] as const;

export type RouteKey = (typeof routes)[number]['key'];

/** /en, /en/about, /sw/products … */
export function href(locale: Locale, path: string = ''): string {
  const clean = path.replace(/^\//, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
