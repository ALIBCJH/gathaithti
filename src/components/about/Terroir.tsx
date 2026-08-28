import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Stat } from '@/components/ui/Stat';
import { SmartImage } from '@/components/media/SmartImage';
import type { AboutContent } from '@content/types';

export function Terroir({ content }: { content: AboutContent['terroir'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="terroir-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="terroir-heading" className="t-section max-w-[18ch]">
              {content.heading}
            </h2>
            <p className="t-lead measure text-ink-soft">
              <RichText text={content.lead} />
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 min-[420px]:grid-cols-2 sm:grid-cols-4 sm:gap-x-12 lg:mt-12">
              {content.factIds.map((id, i) => (
                <Reveal key={id} delay={i * 60}>
                  <div className="border-t border-line pt-6">
                    <Stat id={id} size="small" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-4 lg:col-start-9">
            <SmartImage slot="aboutTerroir" />
          </Reveal>
        </div>

        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <h3 className="t-section text-[clamp(1.5rem,2.4vw,2.25rem)]">
              {content.varieties.heading}
            </h3>
            <p className="t-body measure text-ink-soft">
              <RichText text={content.varieties.body} />
            </p>
          </div>

          {/* Reveal renders each row itself: a dl may contain divs, but the dt
              and dd pair must be a direct child of that div. */}
          <dl className="lg:col-span-6 lg:col-start-7">
            {content.varieties.list.map((variety, i) => (
              <Reveal
                key={variety.name}
                delay={i * 60}
                className="grid grid-cols-1 gap-1 border-t border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <dt className="t-body font-medium">{variety.name}</dt>
                <dd className="t-body text-[0.9375rem] text-ink-soft">{variety.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
