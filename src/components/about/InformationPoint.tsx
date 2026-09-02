import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import type { AboutContent } from '@content/types';

/**
 * The registration table, in a section of its own.
 *
 * It used to sit inside the governance section, in the right-hand column
 * beside a lead paragraph. But an importer, an auditor or a county officer
 * arrives at this page looking for exactly these eight rows, and asking them
 * to find a table inside a wall of prose is asking them to work. It is now the
 * only thing in its band, and the band is titled after what they came for.
 */
export function InformationPoint({ content }: { content: AboutContent['registration'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="registration-heading">
      <Container width="wide">
        <SectionHead
          id="registration-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
        />

        <div className="mt-14 lg:mt-16">
          <Reveal className="mx-auto w-full max-w-[64rem]">
            <dl className="border-t border-ochre/45">
              {content.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[16rem_1fr] sm:gap-8"
                >
                  <dt className="t-meta text-ink-soft">{row.label}</dt>
                  <dd className="t-body tnum">
                    <RichText text={row.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
