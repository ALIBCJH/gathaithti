import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHead } from '@/components/ui/SectionHead';
import { SmartImage } from '@/components/media/SmartImage';
import type { HomeContent } from '@content/types';

/**
 * FROM OUR FARMERS, TO YOUR CUP — four photographs in the order the coffee
 * travels, with an arrow from each to the next.
 *
 * The arrows are the point of the section, so they follow the reading
 * direction at every width: pointing RIGHT between the columns on a desktop,
 * where the four sit in one row, and pointing DOWN under each step on a phone,
 * where they stack. The desktop arrow sits in the gap at the height of the
 * photographs' centre line, which is why it is positioned against the image
 * wrapper rather than the whole step. The order itself is carried by the <ol>
 * and the step numbers, so the arrows are decoration to a screen reader.
 */
export function Journey({ content }: { content: HomeContent['journey'] }) {
  const last = content.steps.length - 1;
  return (
    <Section tone="parchment" ariaLabelledby="journey-heading">
      <Container width="wide">
        <SectionHead
          id="journey-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        <ol className="mx-auto mt-16 grid max-w-md gap-6 lg:mt-20 lg:max-w-none lg:grid-cols-4 lg:gap-10">
          {content.steps.map((step, i) => (
            <li key={step.imageSlot} className="flex flex-col">
              <Reveal delay={i * 90} className="flex flex-col gap-5">
                <div className="relative">
                  <SmartImage slot={step.imageSlot} />
                  <span
                    aria-hidden="true"
                    className="t-meta tnum absolute left-3 top-3 rounded-full bg-parchment/90 px-3 py-1 text-ink"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < last && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[calc(100%+0.375rem)] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-ochre/60 bg-parchment text-ochre-ink lg:flex"
                    >
                      <Arrow />
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {step.label && <p className="t-meta text-ochre-ink">{step.label}</p>}
                  <h3 className="font-display text-xl font-semibold leading-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="t-body text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
              {i < last && (
                <span
                  aria-hidden="true"
                  className="mx-auto mt-6 flex h-9 w-9 rotate-90 items-center justify-center rounded-full border border-ochre/60 text-ochre-ink lg:hidden"
                >
                  <Arrow />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <Button href={`/${content.cta.href}`} variant="secondary">
            {content.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
