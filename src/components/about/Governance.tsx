import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import { BoardGrid } from '@/components/about/BoardGrid';
import type { AboutContent } from '@content/types';

/**
 * How the society runs: one plain statement of the arrangement, the three
 * bodies that make it up, and then the nine people on the committee.
 *
 * The registration table used to sit here in the right-hand column. It has its
 * own section now — buyers arrive looking for those eight rows and should not
 * have to find them inside a wall of prose — which leaves this band doing one
 * job instead of two, and lets the statement run at full width above the
 * bodies rather than being squeezed into five columns beside a table.
 */
export function Governance({ content }: { content: AboutContent['governance'] }) {
  return (
    <Section tone="parchment-2" size="loose" id="governance" ariaLabelledby="governance-heading">
      <Container width="wide">
        <SectionHead
          id="governance-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        <div className="mt-8 hidden lg:block">
          <SmartImage slot="aboutGovernance" />
        </div>

        <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-3">
          {content.bodies.map((body, i) => (
            <Reveal key={body.name} delay={i * 60}>
              <article className="flex h-full flex-col gap-4 border-t-2 border-ochre pt-8">
                <h3 className="t-body font-medium">{body.name}</h3>
                <p className="t-body text-[0.9375rem] text-ink-soft">{body.role}</p>
                <p className="t-meta mt-auto pt-4 text-ink-soft">{body.composition}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <BoardGrid content={content.board} />
      </Container>
    </Section>
  );
}
