import { Container } from '@/components/ui/Container';
import { Fact } from '@/components/ui/Fact';
import type { FarmersContent } from '@content/types';
import { site } from '@content/site';

/**
 * The section members actually use.
 *
 * Designed for a low-end Android phone on a slow connection in bright sun, not
 * for the projector: no JavaScript at all, no images, no entrance animation,
 * very large type and high contrast.
 *
 * It was written to put the cherry price inside the FIRST SCREEN, and it does
 * not: the page header above it is a title, a lead and a great deal of air, and
 * the price starts below the fold on anything smaller than a full desktop
 * window. Tightening both (this band's top padding, and the centred PageHeader
 * to the same rhythm as `Section size="opener"`) moved the price up 168px on a
 * desktop and 190px on a phone, which is as far as spacing alone goes. Closing
 * the rest means changing what is ABOVE this band, not what is in it — the
 * regression below records where it actually sits, so it cannot quietly get
 * worse again.
 */
export function Noticeboard({ content }: { content: FarmersContent['noticeboard'] }) {
  return (
    <section
      id="noticeboard"
      aria-labelledby="noticeboard-heading"
      className="bg-inverse text-on-inverse on-ink"
    >
      <Container width="wide">
        {/* Top tighter than bottom: this band follows the page header, and two
            full section paddings back to back were most of a screen of nothing
            above the price. */}
        <div className="pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-16">
          {/* Centred, like every other head on this page — but still its own
              markup rather than SectionHead: this band sits on ink, and the
              shared Eyebrow renders the dark ochre that measures 2.9:1 here. */}
          <div className="mx-auto flex max-w-[52rem] flex-col items-center gap-4 text-center">
            <p className="t-meta text-ochre-on-inverse">{content.eyebrow}</p>
            <h2 id="noticeboard-heading" className="t-section text-balance text-on-inverse">
              {content.heading}
            </h2>
            <p className="t-body max-w-[56ch] text-on-inverse/75">{content.lead}</p>
            <p className="t-meta text-on-inverse/65">{content.updated}</p>
          </div>

          {/* The price. The single most-read number on the site. */}
          <div className="mt-8 border-2 border-ochre bg-ochre/10 p-8 sm:p-12">
            <p className="t-meta text-ochre-on-inverse">{content.priceLabel}</p>
            <p className="t-figure mt-4 text-on-inverse" style={{ fontSize: 'clamp(3.5rem, 14vw, 7rem)' }}>
              <Fact id="cherryPriceCurrent" />
            </p>
            <p className="t-lead mt-2 text-on-inverse/80">{content.priceUnit}</p>
            <p className="t-body mt-6 max-w-[52ch] text-[0.9375rem] text-on-inverse/70">
              {content.priceFootnote}
            </p>
          </div>

          {/* Notices. Each one a large block, readable at arm's length. */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.notices.map((notice) => (
              <li
                key={notice.id}
                className={`flex min-h-[11rem] flex-col gap-3 border p-6 sm:p-8 ${
                  notice.urgent ? 'border-ochre bg-on-inverse/8' : 'border-on-inverse/25'
                }`}
              >
                <p className="t-meta text-ochre-on-inverse">{notice.label}</p>
                <p className="t-figure-sm text-on-inverse">{notice.value}</p>
                <p className="t-body text-[0.9375rem] leading-relaxed text-on-inverse/75">
                  {notice.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Collection times */}
            <div className="border border-on-inverse/25 p-6 sm:p-8">
              <h3 className="t-body font-medium text-on-inverse">{content.collection.heading}</h3>
              <dl className="mt-6">
                {content.collection.rows.map((row, i) => (
                  <div
                    key={`${row.point}-${i}`}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-t border-on-inverse/15 py-4 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-[1.0625rem] text-on-inverse/85">{row.point}</dt>
                    <dd className="t-figure-sm text-[1.5rem] text-on-inverse tnum">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-meta mt-4 text-on-inverse/65">{content.collection.note}</p>
            </div>

            {/* Help */}
            <div className="flex flex-col gap-4 border border-on-inverse/25 bg-moss/40 p-6 sm:p-8">
              <h3 className="t-body font-medium text-on-inverse">{content.help.heading}</h3>
              <p className="t-body text-[0.9375rem] text-on-inverse/80">{content.help.body}</p>
              <div className="mt-auto pt-4">
                <p className="t-meta text-on-inverse/60">{content.help.phoneLabel}</p>
                {site.contact.memberLine.value ? (
                  <a
                    href={`tel:${site.contact.memberLine.value.replace(/\s/g, '')}`}
                    className="t-figure-sm mt-2 inline-block text-on-inverse underline decoration-ochre-on-inverse/60 decoration-2 underline-offset-8 transition-colors duration-200 [transition-timing-function:var(--ease)] hover:text-ochre-on-inverse"
                  >
                    {site.contact.memberLine.display}
                  </a>
                ) : (
                  <p className="t-figure-sm mt-2 text-on-inverse/70">
                    {site.contact.memberLine.display}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
