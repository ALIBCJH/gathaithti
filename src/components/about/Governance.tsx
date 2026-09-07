import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import { BoardGrid } from '@/components/about/BoardGrid';
import type { AboutContent } from '@content/types';

/**
 * How the society runs: one plain statement of the arrangement, then the nine
 * people who run it.
 *
 * There were three cards between them — Management Committee, Supervisory
 * Committee, Society Office — each naming its members in a `composition` line.
 * They went when the real portraits arrived, because by then they were saying
 * the same thing twice: the nine cards below already carry every one of those
 * names with a face and a role against it, and a list of names above a grid of
 * the same names is a list nobody reads.
 *
 * The registration table used to sit here too, in the right-hand column. It
 * has its own section now — buyers arrive looking for those eight rows and
 * should not have to find them inside a wall of prose.
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


        <BoardGrid content={content.board} />
      </Container>
    </Section>
  );
}
