import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { FarmersContent } from '@content/types';

export function PreFinance({ content }: { content: FarmersContent['prefinance'] }) {
  return (
    <Section tone="parchment" size="loose" id="pre-finance" ariaLabelledby="prefinance-heading">
      <Container width="wide">
        {/* Across the top and centred, like every other head on this page. */}
        <SectionHead
          id="prefinance-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        {/* No photograph. There was a `farmersPrefinance` slot here and no file
            in it, so half the band was an empty box printing the filename it
            was waiting for, beside two paragraphs squeezed into five columns.
            The two paragraphs run as two columns under the head instead — the
            same shape the rest of this page uses. The brief is parked in
            content/images.ts if the photograph is ever taken. */}
        <div className="mx-auto mt-14 grid w-full max-w-[64rem] gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {content.body.map((paragraph, i) => (
            <p key={i} className="t-body text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-24 grid gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-20">
          <ol className="flex flex-col lg:col-span-7">
            {content.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 60} as="li">
                <div className="grid grid-cols-[4rem_1fr] gap-6 border-t border-line py-8">
                  <span className="t-figure-sm text-[1.75rem] text-ochre/70 tnum" aria-hidden="true">
                    {step.n}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="t-body font-medium">{step.title}</h3>
                    <p className="t-body text-[0.9375rem] text-ink-soft">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border border-line p-8">
              {content.terms.map((term) => (
                <div key={term.label} className="flex flex-col gap-1 border-b border-line py-4 last:border-b-0">
                  <dt className="t-meta text-ink-soft">{term.label}</dt>
                  <dd className="t-body">{term.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
