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
  whatsapp: ContactDetail;
} = {
  /* ALL REAL FROM 2026-09-08. Nothing in this block is sample data any more.

     THE NUMBER: 0726680365, one line answering both the phone and WhatsApp.
     Written in international form because that is the only form `tel:` and
     wa.me both take from a phone abroad; the display keeps the spacing a
     Kenyan reader expects.

     THE ADDRESSES: three mailboxes on gathaithi.cloud, created in cPanel on
     the society's own Truehost account. They replace addresses on
     gathaithicoffee.co.ke, a domain with no DNS record, chosen deliberately so
     that mail to them bounced at the sender rather than reaching a stranger.

       office@      general enquiries, read daily
       marketing@   sample and buyer enquiries
       website@     what the forms send FROM. Nobody reads it.

     THAT THIRD ONE IS NOT DECORATION. gathaithi.cloud publishes DMARC
     `p=quarantine` with `aspf=s` — strict alignment — so anything the site
     sends must be From: an address on this domain. Send as gmail.com and the
     mail is not bounced, it is silently filed as spam, and the form looks
     broken when it is not.

     The members' line is BLANK rather than invented. It carried
     +254 700 000 111 from the old sample block, and a fake number standing
     next to a real one is worse than no row at all: a member would ring it.
     Both the contact page and the footer drop a channel whose `value` is
     empty, so the row simply is not drawn. Fill it in and it comes back. */
  officePhone: { value: '+254726680365', display: '+254 726 680 365' },
  officeEmail: { value: 'office@gathaithi.cloud', display: 'office@gathaithi.cloud' },
  buyerEmail: { value: 'marketing@gathaithi.cloud', display: 'marketing@gathaithi.cloud' },
  /* BLANK, not invented. This was "Grace Wanjiru, Marketing & Sales" — a
     person who does not exist, carried since the first build. Nothing renders
     it (it is exposed as a {{buyerContact}} token that no content file uses),
     which is exactly how it survived every pass that removed the other
     invented people. Supply the real marketing contact and it has a home. */
  buyerContact: { name: '', role: '' },
  memberLine: { value: '', display: '' },
  /* `value` is digits only, no plus and no spaces — that is the form wa.me
     takes, and anything else silently 404s rather than erroring. Same number
     as the office line above; the society answers both on one handset. */
  whatsapp: { value: '254726680365', display: '+254 726 680 365' },
};

/** wa.me wants digits with no plus and no spaces; `text` is pre-filled for the
 *  sender so the office knows which page the message came from. */
export function whatsappHref(text?: string): string {
  const n = contact.whatsapp.value;
  if (!n) return '';
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

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
    /* From the society's own letterhead, 2026-09-08. Was 'P.O. Box 217,
       Nyeri 10100', which came from the brief and was never confirmed —
       and which nothing rendered, so a wrong address sat unread for months.
       It is in the footer and the structured data now. */
    poBox: '12504',
    postal: 'P.O. Box 12504, Nyeri',
    country: 'Kenya',
    countryCode: 'KE',
  },

  /**
   * Coordinates are the Gathaithi area of Tetu, Nyeri — approximate, for the
   * map frame only. Replace with the mill's surveyed position.
   */
  geo: { lat: -0.4183, lng: 36.8586, verified: false },

  contact,

  /** Where the sample-request form delivers. Override with SAMPLE_REQUEST_TO
   *  in .env; the fallback is a real mailbox now, so a deployment that forgets
   *  the variable still delivers instead of posting into a void. */
  sampleRequestTo: process.env.SAMPLE_REQUEST_TO ?? 'marketing@gathaithi.cloud',

  openingHours: [
    { day: 'Monday – Friday', time: '8:00 – 17:00' },
    { day: 'Saturday', time: '8:00 – 13:00' },
    { day: 'Sunday & public holidays', time: 'Closed' },
  ],
} as const;

/**
 * The order of this array IS the order of the navigation — the bar, the mobile
 * drawer, the footer and the sitemap all map over it, so they can never
 * disagree about where a page sits.
 *
 * Gallery moved AFTER Contact on 2026-09-08 at the user's request. The drawer's
 * icons are keyed by `key` rather than by position, so nothing else had to
 * move with it.
 */
export const routes = [
  { key: 'home', path: '' },
  { key: 'about', path: 'about' },
  { key: 'products', path: 'products' },
  { key: 'farmers', path: 'farmers' },
  { key: 'contact', path: 'contact' },
  { key: 'gallery', path: 'gallery' },
] as const;

export type RouteKey = (typeof routes)[number]['key'];

/** /en, /en/about, /sw/products … */
export function href(locale: Locale, path: string = ''): string {
  const clean = path.replace(/^\//, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
