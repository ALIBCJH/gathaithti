import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

export function Welfare({ content }: { content: AboutContent['welfare'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="welfare-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <SmartImage slot="aboutWelfare" />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="welfare-heading" className="t-section max-w-[16ch]">
              {content.heading}
            </h2>
            <p className="t-lead measure text-ink-soft">{content.lead}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-6">
            {content.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="t-body measure text-ink-soft">
                  <RichText text={paragraph} />
                </p>
              </Reveal>
            ))}
          </div>

          <ul className="flex flex-col lg:col-span-5 lg:col-start-8">
            {content.schemes.map((scheme, i) => (
              <Reveal key={scheme.name} delay={i * 60} as="li">
                <div className="flex flex-col gap-3 border-t border-ink/15 py-8">
                  <h3 className="t-body font-medium">{scheme.name}</h3>
                  <p className="t-body text-[0.9375rem] text-ink-soft">{scheme.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
