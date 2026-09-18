import Link from 'next/link';
import { routes, site } from '@content/site';
import type { Common } from '@content/types';
import { Container } from '@/components/ui/Container';

export function Footer({ common }: { common: Common }) {
  const year = 2026; // stamped at build; update in this one place each January

  return (
    <footer className="border-t border-line bg-inverse text-on-inverse on-ink" role="contentinfo">
      <Container width="wide">
        {/* CONDENSED 2026-09-18 at the client's request: the blurb and the
            wet mill / village / sub-county address lines are gone, and the
            three tall columns became one compact band — the name, the pages
            in a single row, and the county and postal box (Contact is already in the page row). */}
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-14">
          <p className="t-quiet text-[1.375rem] leading-tight">{common.brand.name}</p>

          <nav aria-label="Footer">
            <h2 className="sr-only">{common.footer.sections.explore}</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {routes.map((route) => (
                <li key={route.key}>
                  <Link
                    href={route.path ? `/${route.path}` : '/'}
                    className="tap inline-block py-1 text-[0.9375rem] text-on-inverse/80 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-on-inverse"
                  >
                    {common.nav[route.key as keyof Common['nav']]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1 text-[0.9375rem] text-on-inverse/80 lg:items-end lg:text-right">
            <h2 className="sr-only">{common.footer.sections.contact}</h2>
            <address className="flex flex-col gap-1 not-italic">
              <span>{site.address.county}, {site.address.country}</span>
              <span>{site.address.postal}</span>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-on-inverse/15 py-6 text-[0.8125rem] text-on-inverse/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {common.footer.rights}
          </p>
          <p className="tnum">{common.footer.registration}</p>
        </div>
      </Container>
    </footer>
  );
}
