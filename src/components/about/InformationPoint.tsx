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

        {/* The certifications first, a card each: they are what an importer
            looks for, and a row in a register table is the wrong weight for
            them. The table under them carries the paperwork. */}
        <ul className="mx-auto mt-14 grid w-full max-w-[64rem] gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {content.certifications.map((cert, i) => (
            <li key={cert.name} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <article className="flex h-full flex-col gap-3 border border-line bg-parchment px-7 py-8 sm:px-8">
                  <span aria-hidden="true" className="h-0.5 w-10 bg-ochre" />
                  <p className="t-meta text-ochre-ink">{cert.label}</p>
                  <h3 className="font-display text-xl font-semibold leading-snug">{cert.name}</h3>
                  <p className="t-body text-[0.9375rem] text-ink-soft">{cert.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 lg:mt-14">
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
