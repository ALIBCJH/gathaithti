import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

const SLOTS = ['historyOne', 'historyTwo', 'historyThree'] as const;

/**
 * The history: the account on the left, three photographs on the right, and
 * the dated spine underneath.
 *
 * The three frames are a row of tall portraits rather than one wide plate,
 * because the section is about a span of time and three pictures read as a
 * sequence where one reads as an illustration. They are deliberately small —
 * the argument is the text; the photographs are evidence beside it.
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="history-heading" className="t-section max-w-[16ch]">
              <RichText text={content.heading} />
            </h2>
            {content.body.map((paragraph, i) => (
              <p
                key={i}
                className={i === 0 ? 't-lead measure text-ink-soft' : 't-body measure text-ink-soft'}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </div>

          {/* Three tall frames. On a phone they scroll sideways rather than
              stacking: three portrait photographs stacked full-width would be
              most of a screen each and push the timeline a long way down, and
              a row of them reads as a set, which is the point. */}
          {/* `min-w-0`: a grid item's default `min-width: auto` is min-content,
              so a horizontally scrolling child sizes the TRACK instead of
              scrolling inside it. Without this the strip made the whole page
              10px wider than the viewport at 320px. */}
          <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:self-center">
            <ul className="-mx-6 flex min-w-0 max-w-[100vw] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
              {SLOTS.map((slot, i) => (
                <li key={slot} className="w-[62%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
                  <Reveal delay={i * 60} className="flex flex-col gap-3">
                    <SmartImage slot={slot} />
                    <p className="t-meta text-ink-soft">{content.captions[i]}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
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
