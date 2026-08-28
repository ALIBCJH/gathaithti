import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { RevealScript } from '@/components/ui/Reveal';
import { THEME_SCRIPT } from '@/components/layout/ThemeToggle';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { localeTags, site, siteUrl } from '@content/site';

/**
 * Display face. Optical sizing is the point of Fraunces: it thickens the
 * hairlines at text sizes and lets them go fine at hero scale.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  /* Optical sizing only. SOFT and WONK are lovely and cost ~40 kB of font
     for two axes this design never moves off their defaults — and the hero
     headline is the LCP element on every page. */
  axes: ['opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — farmer-owned coffee, Nyeri, Kenya`,
    template: '%s',
  },
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: false, email: true },
  /* Static files rather than a generated /icon route: the route resolves
     relative to the locale segment and 404s on /en/icon. */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#241611' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale] ?? 'en-KE'}
      className={`${fraunces.variable} ${inter.variable}`}
      /* data-theme is written by the script below before React sees the page. */
      suppressHydrationWarning
    >
      <head>
        {/* Ahead of everything, including the stylesheet: no flash of the
            wrong theme on a dark-mode device. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <SkipLink label={dict.common.actions.skipToContent} />
        <Header locale={locale} common={dict.common} />
        {/* English only. If Kiswahili is switched back on in content/site.ts,
            the translation-in-progress notice goes here:
            <div style={{ paddingTop: 'var(--header-h)' }}>
              <TranslationNotice message={dict.common.locale.pending} />
            </div> */}
        <main id="main">{children}</main>
        <Footer locale={locale} common={dict.common} />
        <RevealScript />
      </body>
    </html>
  );
}
