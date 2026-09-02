import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-4 lg:self-start">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="registration-heading" className="t-section max-w-[14ch]">
              {content.heading}
            </h2>
            <p className="t-body measure text-ink-soft">{content.lead}</p>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6">
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
