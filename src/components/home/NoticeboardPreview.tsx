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
 * The members' half of the site, previewed on the home page.
 *
 * It showed two tiles — the cherry price and the next payment date. The
 * payment date has gone: a date and an M-Pesa instruction are for members who
 * have already delivered, and this is the page a buyer lands on. It is still
 * on Our Farmers, in the noticeboard, which is where a member is sent.
 *
 * What is left is one figure, so it is no longer laid out as a grid of tiles
 * pretending to be a dashboard. The price stands on its own, larger, with the
 * footnote that qualifies it — the advance rate, not the final one — which the
 * cramped tile never had room for.
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
  const price = getFact('cherryPriceCurrent');

  return (
    <Section tone="ink" ariaLabelledby="noticeboard-preview-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow surface="dark">{content.eyebrow}</Eyebrow>
            <h2 id="noticeboard-preview-heading" className="t-section text-on-inverse">
              {content.heading}
            </h2>
            <p className="t-body measure text-on-inverse/70">{content.lead}</p>
            <Link href={`/${locale}/${content.cta.href}`} className="link t-meta w-fit">
              {content.cta.label}
            </Link>
          </div>

          <Reveal className="lg:col-span-7" delay={60}>
            <div className="flex flex-col gap-4 border border-on-inverse/20 p-10 sm:p-14">
              <p className="t-meta text-on-inverse/60">{noticeboard.priceLabel}</p>
              <p className="t-figure text-on-inverse">
                <Fact id="cherryPriceCurrent" />
              </p>
              <p className="t-meta text-ochre-on-inverse">{price?.unit ?? noticeboard.priceUnit}</p>
              <p className="t-body mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-on-inverse/70">
                {noticeboard.priceFootnote}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
