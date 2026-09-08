import type { Metadata } from 'next';
import {
  site,
  siteUrl,
  locales,
  defaultLocale,
  localeTags,
  localeOgTags,
  type Locale,
} from '@content/site';
import { facts } from '@content/facts';
import { getFact } from './facts';
import { resolve } from './facts';
import type { Lot, Meta } from '@content/types';

/** Canonical URL for a page in a locale. Path is relative: '', 'about', … */
export function urlFor(locale: Locale, path = ''): string {
  const clean = path.replace(/^\//, '');
  return clean ? `${siteUrl}/${locale}/${clean}` : `${siteUrl}/${locale}`;
}

/**
 * One metadata builder for every page. Titles and descriptions come from the
 * content files and are resolved for {{facts}} first, so a corrected figure
 * corrects the search snippet too.
 */
export function buildMetadata({
  locale,
  path = '',
  meta,
}: {
  locale: Locale;
  path?: string;
  meta: Meta;
}): Metadata {
  const title = resolve(meta.title);
  const description = resolve(meta.description);
  const canonical = urlFor(locale, path);

  /* Only worth emitting once there is more than one language to point at. */
  const languages =
    locales.length > 1
      ? {
          ...Object.fromEntries(locales.map((l) => [localeTags[l] ?? l, urlFor(l, path)])),
          'x-default': urlFor(defaultLocale, path),
        }
      : undefined;

  return {
    title,
    description,
    alternates: { canonical, ...(languages ? { languages } : {}) },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: localeOgTags[locale] ?? 'en_KE',
      url: canonical,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

/* ── JSON-LD ─────────────────────────────────────────────────────────────── */

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${site.address.line1}, ${site.address.village}`,
  addressLocality: site.address.subCounty,
  addressRegion: site.address.county,
  addressCountry: site.address.countryCode,
};

export function organizationLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: site.legalName,
    alternateName: [...site.alternateNames],
    url: urlFor(locale),
    foundingDate: String(facts.established.value),
    description: resolve(
      'Farmer-owned coffee co-operative in Gathaithi village, Tetu Sub-County, Nyeri County, Kenya. {{members}} smallholder members, one wet mill, washed {{varieties}}.',
    ),
    address: postalAddress,
    areaServed: 'Worldwide',
    /* Kept in step with the `varieties` fact by hand — structured data cannot
       take a {{token}}. The society lists three; Batian was in the brief and is
       not grown here. */
    knowsAbout: ['Washed Kenya coffee', 'SL28', 'SL34', 'Ruiru 11', 'Nyeri coffee'],
    memberOf: { '@type': 'Organization', name: 'Kenyan co-operative coffee sector' },
    numberOfEmployees: undefined,
  };
}

export function localBusinessLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: site.legalName,
    image: `${siteUrl}/opengraph-image`,
    url: urlFor(locale),
    address: postalAddress,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    parentOrganization: { '@id': `${siteUrl}/#organization` },
  };
}

export function productLd(lot: Lot, locale: Locale) {
  const price = lot.priceFactId ? getFact(lot.priceFactId) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${urlFor(locale, 'products')}#lot-${lot.id}`,
    /* The catalogue sells ROASTED RETAIL PACKS now, not green coffee by the
       container. Saying "green coffee" here would be a machine-readable claim
       that the thing on sale is unroasted — wrong for a 250 g bag of ground
       medium roast, and the sort of error a shopping crawler acts on. */
    name: `${lot.name} — single-origin Kenyan coffee`,
    category: 'Roasted coffee',
    description: resolve(lot.description),
    brand: { '@type': 'Brand', name: site.short },
    manufacturer: { '@id': `${siteUrl}/#organization` },
    countryOfOrigin: 'KE',
    material: resolve(lot.varieties),
    /* Screen size, harvest window and the rest are wholesale-only and absent
       from a retail pack. An `undefined` value in a PropertyValue is not a
       missing property — it serialises as a malformed one. */
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Net weight', value: lot.grade },
      { '@type': 'PropertyValue', name: 'Screen size', value: lot.screen },
      { '@type': 'PropertyValue', name: 'Processing', value: lot.processing },
      { '@type': 'PropertyValue', name: 'Harvest', value: lot.harvestWindow },
      { '@type': 'PropertyValue', name: 'Altitude', value: resolve('{{altitude}}') },
    ].filter((property) => Boolean(property.value)),
    /**
     * `offers` appears only when the lot's price has been CONFIRMED in
     * content/facts.ts. The catalogue may show an indicative figure to a human
     * reader, clearly labelled as indicative — but publishing an unverified
     * placeholder as machine-readable price data, which Google may surface in
     * a result for a coffee that legally sells through the Nairobi Coffee
     * Exchange, is a different matter entirely.
     */
    ...(price?.verified
      ? {
          offers: {
            '@type': 'Offer',
            /* KES: the retail list is in Kenyan shillings. The currency is
               read off the fact rather than assumed — a price published in
               the wrong currency is worse than no price at all. */
            priceCurrency: price.display.startsWith('KSh') ? 'KES' : 'USD',
            price: price.value,
            availability:
              lot.availability === 'available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            seller: { '@id': `${siteUrl}/#organization` },
          },
        }
      : {}),
  };
}

export function breadcrumbLd(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: urlFor(locale, item.path),
    })),
  };
}
