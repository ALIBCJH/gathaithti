import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Fact, RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { HomeContent } from '@content/types';

/**
 * The four numbers this society is credible on.
 *
 * It used to be a bare row of figures under an eyebrow reading "The record" —
 * four statistics with no sentence saying what they added up to. It now opens
 * with that sentence, and each figure is given a title of its own before the
 * detail, so the row can be read at three depths: the numbers at a glance,
 * the titles in a scan, the captions if the claim is being checked.
 *
 * The figures are the only thing on the home page a buyer might quote back, so
 * every one still goes through <Fact /> and still carries `data-verified` into
 * the DOM. None of the four is verified yet.
 */
export function ProofBand({ content }: { content: HomeContent['proof'] }) {
  return (
    <Section tone="parchment" size="loose" ariaLabelledby="proof-heading">
      <Container width="wide">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-7 text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2
            id="proof-heading"
            className="t-section text-[clamp(1.875rem,3.6vw,3.25rem)] text-balance"
          >
            {content.heading}
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {content.factIds.map((id, i) => (
            <Reveal
              key={id}
              delay={i * 60}
              className="flex h-full flex-col gap-5 border-t border-ochre/45 pt-10"
            >
              {/* Larger than the site's standard `.t-figure` (which caps at
                  5.5rem), because this row had the room and was not using it:
                  the widest of the four, 1,700, drew 186px inside a 292px
                  track on a desktop. At a 7rem cap it draws 225px and still
                  clears. The floor and the vw term are untouched, so the two
                  narrow cases — a 1024px window and the two-up at 640px —
                  render exactly as they did. */}
              <p className="t-figure [--figure-size:clamp(3rem,7vw,7rem)]">
                <Fact id={id} display={content.figures?.[id]} />
              </p>

              <h3 className="t-quiet text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.25]">
                {content.titles[id]}
              </h3>

              <p className="t-body max-w-[28ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                <RichText text={content.captions[id]} />
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
