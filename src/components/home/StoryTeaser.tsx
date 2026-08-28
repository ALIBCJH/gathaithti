import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { HomeContent } from '@content/types';
import type { Locale } from '@content/site';

export function StoryTeaser({
  locale,
  content,
}: {
  locale: Locale;
  content: HomeContent['story'];
}) {
  return (
    <Section tone="parchment" size="loose" ariaLabelledby="story-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Reveal className="flex flex-col gap-6">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h2 id="story-heading" className="t-section max-w-[16ch]">
                {content.heading}
              </h2>
            </Reveal>

            <Reveal delay={60} className="flex flex-col gap-6">
              {content.body.map((paragraph, i) => (
                <p key={i} className="t-body measure text-ink-soft">
                  <RichText text={paragraph} />
                </p>
              ))}
            </Reveal>

            <Reveal delay={120}>
              <Button href={`/${locale}/${content.cta.href}`} variant="secondary">
                {content.cta.label}
              </Button>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SmartImage slot="homeStory" />
            </Reveal>

            <Reveal delay={60}>
              <figure className="flex flex-col gap-6 border-l-2 border-ochre pl-8">
                <blockquote className="pull-quote max-w-[24ch] text-ink">
                  “{content.pullQuote}”
                </blockquote>
                <figcaption className="t-meta text-ink-soft">{content.attribution}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
