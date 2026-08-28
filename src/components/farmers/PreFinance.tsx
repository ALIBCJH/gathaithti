import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { FarmersContent } from '@content/types';

export function PreFinance({ content }: { content: FarmersContent['prefinance'] }) {
  return (
    <Section tone="parchment" size="loose" id="pre-finance" ariaLabelledby="prefinance-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SmartImage slot="farmersPrefinance" />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="prefinance-heading" className="t-section max-w-[16ch]">
              {content.heading}
            </h2>
            <p className="t-lead measure text-ink-soft">{content.lead}</p>
            {content.body.map((paragraph, i) => (
              <p key={i} className="t-body measure text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
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
