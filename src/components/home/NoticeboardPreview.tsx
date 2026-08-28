import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Fact } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { getFact } from '@/lib/facts';
import type { FarmersContent, HomeContent } from '@content/types';
import type { Locale } from '@content/site';

/**
 * The members' half of the site, previewed on the home page: the cherry price
 * and the next payment date, the two things a member opens this site to check.
 */
export function NoticeboardPreview({
  locale,
  content,
  noticeboard,
}: {
  locale: Locale;
  content: HomeContent['noticeboard'];
  noticeboard: FarmersContent['noticeboard'];
}) {
  const payment = noticeboard.notices.find((notice) => notice.kind === 'payment');
  const price = getFact('cherryPriceCurrent');

  return (
    <Section tone="ink" ariaLabelledby="noticeboard-preview-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow surface="dark">{content.eyebrow}</Eyebrow>
            <h2 id="noticeboard-preview-heading" className="t-section text-parchment">
              {content.heading}
            </h2>
            <p className="t-body measure text-parchment/70">{content.lead}</p>
            <Link href={`/${locale}/${content.cta.href}`} className="link t-meta w-fit">
              {content.cta.label}
            </Link>
          </div>

          <Reveal className="lg:col-span-7" delay={60}>
            <div className="grid gap-px overflow-hidden border border-parchment/20 bg-parchment/20 sm:grid-cols-2">
              <div className="flex flex-col gap-3 bg-ink p-8 sm:p-10">
                <p className="t-meta text-parchment/60">{noticeboard.priceLabel}</p>
                <p className="t-figure text-parchment">
                  <Fact id="cherryPriceCurrent" />
                </p>
                <p className="t-meta text-ochre-light">{price?.unit ?? noticeboard.priceUnit}</p>
              </div>

              <div className="flex flex-col gap-3 bg-ink p-8 sm:p-10">
                <p className="t-meta text-parchment/60">{payment?.label}</p>
                <p className="t-figure-sm text-parchment">{payment?.value}</p>
                <p className="t-body text-[0.9375rem] text-parchment/70">{payment?.detail}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
