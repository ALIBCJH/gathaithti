/**
 * CURRENTLY UNMOUNTED. The site ships English only, so the header does not
 * render this. Kept because the Kiswahili scaffolding is intact: add 'sw' to
 * `locales` in content/site.ts and put this back in Header.tsx to restore the
 * language switch.
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@content/site';

/**
 * Swaps the locale segment of the current path, so the reader stays on the
 * page they were reading. Two real links, not a select — one tap, crawlable.
 */
export function LocaleToggle({
  locale,
  labels,
  surface = 'light',
}: {
  locale: Locale;
  labels: { label: string; en: string; sw: string };
  surface?: 'light' | 'dark';
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.split('/').slice(2).join('/');

  const idle = surface === 'dark' ? 'text-parchment/60' : 'text-ink-soft';
  const active = surface === 'dark' ? 'text-parchment' : 'text-ink';
  const divider = surface === 'dark' ? 'bg-parchment/30' : 'bg-line';

  return (
    <div className="flex items-center gap-2" role="group" aria-label={labels.label}>
      {locales.map((code, i) => {
        const isCurrent = code === locale;
        return (
          <span key={code} className="flex items-center gap-2">
            {i > 0 && <span className={`h-3 w-px ${divider}`} aria-hidden="true" />}
            <Link
              href={rest ? `/${code}/${rest}` : `/${code}`}
              hrefLang={code}
              aria-current={isCurrent ? 'true' : undefined}
              className={[
                't-meta transition-colors duration-200 [transition-timing-function:var(--ease)]',
                surface === 'dark' ? 'hover:text-parchment' : 'hover:text-ink',
                isCurrent ? active : idle,
              ].join(' ')}
            >
              <span className="sr-only">{code === 'en' ? labels.en : labels.sw}</span>
              <span aria-hidden="true">{code === 'en' ? 'EN' : 'SW'}</span>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
