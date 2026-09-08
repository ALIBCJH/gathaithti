import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { FarmersContent } from '@content/types';

export function Training({ content }: { content: FarmersContent['training'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="training-heading">
      <Container width="wide">
        {/* Across the top and centred, like every other head on this page. */}
        <SectionHead
          id="training-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        {/* The photograph is PORTRAIT, so it gets five columns rather than
            six, and the prose takes the column it gives up. At six a 2/3 frame
            stands about 820px tall on a desktop beside a text column half that
            height, and the band reads as a picture with a caption attached. */}
        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-6 lg:self-center">
            {content.body.map((paragraph, i) => (
              <p key={i} className="t-body measure text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Held slightly above centre. The frame is taller than 2/3 — 0.546
              against 0.667 — so `cover` trims top and bottom, and trimming it
              evenly clips the top of his head. */}
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <SmartImage slot="farmersTraining" imageClassName="object-[50%_38%]" />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {content.programmes.map((programme, i) => (
            <Reveal key={programme.name} delay={i * 60}>
              <div className="flex h-full flex-col gap-4 bg-parchment-2 p-8">
                <p className="t-meta text-ochre-ink">{programme.cadence}</p>
                <h3 className="t-body font-medium">{programme.name}</h3>
                <p className="t-body text-[0.9375rem] text-ink-soft">{programme.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
