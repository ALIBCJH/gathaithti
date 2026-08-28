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

/** Set NEXT_PUBLIC_SITE_URL on Vercel. Used for canonicals, OG and the sitemap. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gathaithicoffee.co.ke'
).replace(/\/$/, '');

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
  officePhone: { value: '', display: 'To be confirmed' },
  officeEmail: { value: '', display: 'To be confirmed' },
  buyerEmail: { value: '', display: 'To be confirmed' },
  buyerContact: { name: 'To be confirmed', role: 'Marketing & Sales, Gathaithi FCS' },
  memberLine: { value: '', display: 'To be confirmed' },
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
    postal: 'P.O. Box — to be confirmed',
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
