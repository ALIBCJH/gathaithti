import { Container } from '@/components/ui/Container';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { AboutContent } from '@content/types';

export function Origin({ content }: { content: AboutContent['origin'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="origin-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="origin-heading" className="t-section max-w-[14ch]">
                <RichText text={content.heading} />
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            {content.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="t-body measure text-ink-soft">
                  <RichText text={paragraph} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <ol className="mt-24 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {content.timeline.map((entry, i) => (
            <li key={i} className="bg-parchment">
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
