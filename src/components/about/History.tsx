import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

/**
 * The history: the account on the left, one photograph on the right, and the
 * dated spine underneath.
 *
 * It was three tall frames, on the argument that a section about a span of
 * time reads better as a sequence than as a single illustration. That was true
 * of three photographs and false of one photograph and two empty boxes, which
 * is what it actually was — only the mill frame ever existed, and the other
 * two sat beside it printing the filenames they were waiting for.
 *
 * So: one frame, at the shape the file actually is. It was being cropped from
 * 16:9 into a 4:5 portrait box a fifth of the page wide, which threw away most
 * of its width to show a sliver of the thing the section is about. At full
 * width in its own ratio it shows the beds, the mill and the ridge behind —
 * the whole ground the history happened on.
 *
 * The timeline stays. Nothing in the sketch of this page had it, but four
 * dated facts — organised under Tetu, registered independently, cupped at 93,
 * second nationally on cherry payment — are the checkable spine of everything
 * the prose claims, and photographs cannot carry a date.
 */
export function History({ content }: { content: AboutContent['origin'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="history-heading">
      <Container width="wide">
        {/* Across the top, centred, like every other head on this page. It
            used to sit in the left column as the first line of the account
            beside it; on a page where every other band announces itself in
            the middle, that read as a fourth column of prose rather than as
            the title of the band. */}
        <SectionHead
          id="history-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-6">
            {content.body.map((paragraph, i) => (
              <p
                key={i}
                className={i === 0 ? 't-lead measure text-ink-soft' : 't-body measure text-ink-soft'}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </div>

          {/* One frame, beside the account it belongs to. `min-w-0` stays: a
              grid item's default `min-width: auto` is min-content, and this
              track is the one that used to push the page 10px wider than a
              320px viewport. */}
          <figure className="min-w-0 lg:col-span-6 lg:col-start-7 lg:self-center">
            <Reveal className="flex flex-col gap-3">
              <SmartImage slot="historyOne" />
              <figcaption className="t-meta text-ink-soft">{content.caption}</figcaption>
            </Reveal>
          </figure>
        </div>

        <ol className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {content.timeline.map((entry, i) => (
            <li key={i} className="bg-parchment-2">
              <Reveal delay={i * 60}>
                <div className="flex h-full flex-col gap-4 p-8 lg:p-10">
                  <p className="t-figure-sm text-ochre-ink">
                    <RichText text={entry.year} />
                  </p>
                  <h3 className="t-body font-medium">
                    <RichText text={entry.title} />
                  </h3>
                  <p className="t-body text-[0.9375rem] text-ink-soft">
                    <RichText text={entry.body} />
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
