import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { HomeContent } from '@content/types';
import type { Locale } from '@content/site';

export function SeasonPanel({
  locale,
  content,
}: {
  locale: Locale;
  content: HomeContent['season'];
}) {
  return (
    <Section tone="parchment-2" ariaLabelledby="season-heading">
      <Container width="wide">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          {/* image breaks out of the text column and sits low */}
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:mt-24">
            <SmartImage slot="homeSeason" />
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <Reveal className="flex flex-col gap-6">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h2 id="season-heading" className="t-section">
                {content.heading}
              </h2>
              <p className="t-lead measure text-ink-soft">{content.lead}</p>
            </Reveal>

            <Reveal delay={60}>
              <p className="inline-flex items-center gap-3 border border-ochre/40 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-cherry" aria-hidden="true" />
                <span className="t-meta text-ochre-ink">{content.status}</span>
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="flex flex-col">
                {content.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-t border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
                  >
                    <dt className="t-meta text-ink-soft">{row.label}</dt>
                    <dd className="t-body tnum">
                      <RichText text={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={180}>
              <Button href={`/${locale}/${content.cta.href}`} variant="secondary">
                {content.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
