import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Stat } from '@/components/ui/Stat';
import type { HomeContent } from '@content/types';

/** Four figures, given the room to be read as claims rather than decoration. */
export function ProofBand({ content }: { content: HomeContent['proof'] }) {
  return (
    <Section tone="parchment" size="default" ariaLabelledby="proof-heading">
      <Container width="wide">
        <Eyebrow className="mb-16">
          <span id="proof-heading">{content.heading}</span>
        </Eyebrow>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {content.factIds.map((id, i) => (
            <Reveal key={id} delay={i * 60}>
              <div className="border-t border-line pt-8">
                <Stat id={id} caption={content.captions[id]} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
