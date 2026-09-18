import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import { BoardGrid } from '@/components/about/BoardGrid';
import type { AboutContent } from '@content/types';

/**
 * GOVERNANCE & TRUST — the statement and the committee photograph side by
 * side, then the committee cards.
 *
 * The photograph used to run the full width of the page under a centred head:
 * on a desktop it was a band taller than the screen, and the text above it
 * scrolled away before the picture finished. It now sits in the right-hand
 * column at its own 3/2 — every member of the committee in frame, nothing
 * cropped — so the words and the people are on screen together. On a phone it
 * follows the text at full width instead of being hidden.
 */
export function Governance({ content }: { content: AboutContent['governance'] }) {
  return (
    <Section tone="parchment-2" size="loose" id="governance" ariaLabelledby="governance-heading">
      <Container width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="governance-heading" className="t-section">
              {content.heading}
            </h2>
            <p className="t-lead text-ink-soft">{content.lead}</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <SmartImage slot="aboutGovernance" sizes="(min-width: 1024px) 55vw, 100vw" />
          </Reveal>
        </div>

        <BoardGrid content={content.board} />
      </Container>
    </Section>
  );
}
