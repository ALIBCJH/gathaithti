import Link from 'next/link';
import { routes, site, type Locale } from '@content/site';
import type { Common } from '@content/types';
import { Container } from '@/components/ui/Container';
import { RichText } from '@/components/ui/Fact';

export function Footer({ locale, common }: { locale: Locale; common: Common }) {
  const year = 2026; // stamped at build; update in this one place each January

  return (
    <footer className="border-t border-line bg-inverse text-on-inverse on-ink" role="contentinfo">
      <Container width="wide">
        {/* Was four tracks at 1.4/1/1/1. With the members' column gone, three
            tracks at the old ratio left the row stopping ~130px short of the
            right edge — a hole exactly where the fourth column used to be.
            Widening the brand track pushes the other two out to meet it. */}
        <div className="grid gap-16 py-24 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 lg:py-32">
          <div className="flex max-w-[38ch] flex-col gap-6">
            <p className="t-quiet text-[1.5rem] leading-tight">
              {common.brand.name}
            </p>
            <p className="t-body text-[0.9375rem] text-on-inverse/70">
              <RichText text={common.footer.blurb} />
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-5">
            <h2 className="t-meta text-ochre-light">{common.footer.sections.explore}</h2>
            <ul className="flex flex-col gap-3">
              {routes.map((route) => (
                <li key={route.key}>
                  <Link
                    href={route.path ? `/${locale}/${route.path}` : `/${locale}`}
                    className="tap inline-block py-1 text-[0.9375rem] text-on-inverse/80 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-on-inverse"
                  >
                    {common.nav[route.key as keyof Common['nav']]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <h2 className="t-meta text-ochre-light">{common.footer.sections.contact}</h2>
            <address className="flex flex-col gap-2 text-[0.9375rem] not-italic text-on-inverse/80">
              <span>{site.address.line1}</span>
              <span>{site.address.village}</span>
              <span>{site.address.subCounty}</span>
              <span>{site.address.county}, {site.address.country}</span>
            </address>
            <Link
              href={`/${locale}/contact`}
              className="link text-[0.9375rem]"
            >
              {common.nav.contact}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-on-inverse/15 py-10 text-[0.8125rem] text-on-inverse/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {common.footer.rights}
          </p>
          <p className="tnum">{common.footer.registration}</p>
        </div>
      </Container>
    </footer>
  );
}
