import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

/**
 * The history: the account, three photographs of the thing it describes, and
 * the dated spine underneath.
 *
 * It OPENS THE PAGE now and carries its `h1`. The ownership band that used to
 * — the page title and three cards — moved to Our Farmers, where that claim is
 * the subject rather than a statement in passing; a page with no h1 has no
 * title as far as a crawler or a screen reader is concerned, so the level came
 * with the position.
 *
 * It was prose in one column with a single photograph beside it, and that
 * photograph was gathaithi-mill-and-ridge.jpg — a picture of a wet mill
 * standing in for THIS wet mill, on the one band that is entirely about this
 * society taking over its own. Three real ones replace it, and each carries a
 * paragraph of the history rather than illustrating the band in general: the
 * gate is the society in its own name, the drying ground is what came under
 * its management in 2000, the pulper is the running of it.
 *
 * They reuse the GALLERY slots — same files, so a second set of slots would
 * fetch them at two different sizes on one page — and are forced to a common
 * 4/5 through `SmartImage`'s `ratio`, because the three files are 0.67, 1.38
 * and 1.64 and a row of three different shapes reads as three accidents.
 *
 * The account sits between the head and the photographs in two columns rather
 * than one: centred under a centred head, a single column of prose ran to a
 * measure nobody wants to read and left the band lopsided.
 *
 * The timeline stays. Nothing in the sketch of this page had it, but four
 * dated facts — organised under Tetu, registered independently, cupped at 93,
 * second nationally on cherry payment — are the checkable spine of everything
 * the prose claims, and photographs cannot carry a date.
 */
export function History({ content }: { content: AboutContent['origin'] }) {
  return (
    <Section tone="parchment-2" size="opener" ariaLabelledby="history-heading">
      <Container width="wide">
        {/* Across the top, centred, like every other head on this page. It
            used to sit in the left column as the first line of the account
            beside it; on a page where every other band announces itself in
            the middle, that read as a fourth column of prose rather than as
            the title of the band. */}
        <SectionHead
          as="h1"
          id="history-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
        />

        {/* The account, in two columns under the head. */}
        <div className="mx-auto mt-14 grid w-full max-w-[68rem] gap-x-16 gap-y-6 lg:mt-16 lg:grid-cols-2">
          {content.body.map((paragraph, i) => (
            <p key={i} className={i === 0 ? 't-lead text-ink-soft lg:col-span-2' : 't-body text-ink-soft'}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        {/* Three frames, one per turn of the history. Forced to a common
            ratio: the files are 0.67, 1.38 and 1.64, and three different
            shapes in a row read as three accidents rather than a set. */}
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {content.frames.map((frame, i) => (
            <li key={frame.imageSlot}>
              <Reveal delay={(i % 3) * 60} className="flex flex-col gap-4">
                <SmartImage slot={frame.imageSlot} ratio="4/5" zoom />
                <p className="t-body text-[0.9375rem] leading-relaxed text-ink-soft">
                  {frame.caption}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <ol className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {content.timeline.map((entry, i) => (
            <li key={i} className="bg-parchment-2">
              <Reveal delay={i * 60}>
                <div className="flex h-full flex-col gap-4 p-8 lg:p-10">
                  <p className="t-figure-sm text-ochre-ink">
                    <RichText text={entry.year} />
                  </p>
                  {/* `h2`, not `h3`: this band's head is the page's h1 now
                      that the ownership band has moved to Our Farmers, so a
                      timeline entry is one level under it. As h3 the outline
                      skipped 1->3 four times. */}
                  <h2 className="t-body font-medium">
                    <RichText text={entry.title} />
                  </h2>
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
