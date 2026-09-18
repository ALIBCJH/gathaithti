import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

/**
 * OUR HISTORY — 1967 to today as a single vertical line.
 *
 * Replaced the band of three photographs and four timeline cards on
 * 2026-09-18. The year is the only large element in each step, set in the
 * display face down a copper rule, so the eye runs the dates first and reads
 * the sentence under whichever one it stops at. The last step, "Today", has a
 * filled marker: it is where the line has been heading.
 *
 * One photograph, the society gate with its values board, held beside the
 * line on a desktop (sticky, so it stays in view while the dates scroll past)
 * and above it on a phone. The client asked for few images here.
 */
export function History({ content }: { content: AboutContent['history'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="history-heading">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Reveal className="flex flex-col gap-5">
                <Eyebrow>{content.eyebrow}</Eyebrow>
                <h2 id="history-heading" className="t-section">
                  {content.heading}
                </h2>
                <p className="t-lead text-ink-soft">
                  <RichText text={content.lead} />
                </p>
              </Reveal>
              <Reveal delay={80} className="hidden flex-col gap-3 lg:flex">
                <SmartImage slot={content.imageSlot} ratio="4/5" sizes="(min-width: 1024px) 34vw, 100vw" />
                <p className="t-meta text-ink-soft">{content.caption}</p>
              </Reveal>
            </div>
          </div>

          <ol className="relative flex flex-col lg:col-span-7">
            {content.milestones.map((m, i) => {
              const last = i === content.milestones.length - 1;
              return (
                <li key={m.title} className="relative grid grid-cols-[1.5rem_1fr] gap-x-6">
                  {/* The line and its marker. The rule stops at the last step. */}
                  <span aria-hidden="true" className="relative flex justify-center">
                    <span
                      className={`relative z-10 mt-3 h-3.5 w-3.5 rounded-full border-2 border-ochre ${
                        m.current ? 'bg-ochre' : 'bg-parchment'
                      }`}
                    />
                    {!last && <span className="absolute top-5 bottom-0 w-px bg-ochre/40" />}
                  </span>
                  <Reveal delay={i * 60} className={`flex flex-col gap-2 ${last ? '' : 'pb-12 lg:pb-14'}`}>
                    <p className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tnum text-ochre-ink">
                      <RichText text={m.year} />
                    </p>
                    <h3 className="font-display text-xl font-semibold leading-snug">
                      <RichText text={m.title} />
                    </h3>
                    <p className="t-body max-w-[38rem] text-ink-soft">
                      <RichText text={m.body} />
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
