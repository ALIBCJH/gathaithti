import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import { BoardGrid } from '@/components/about/BoardGrid';
import type { AboutContent } from '@content/types';

/**
 * International buyers audit this section, so it is built like a document:
 * a registration table that can be read at a glance, the three bodies that
 * run the society, and the AGM. Weight comes from structure, not decoration.
 */
export function Governance({ content }: { content: AboutContent['governance'] }) {
  return (
    <Section tone="parchment-2" size="loose" id="governance" ariaLabelledby="governance-heading">
      <Container width="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="governance-heading" className="t-section max-w-[16ch]">
              {content.heading}
            </h2>
            <p className="t-body measure text-ink-soft">{content.lead}</p>
            <div className="mt-4 hidden lg:block">
              <SmartImage slot="aboutGovernance" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <dl className="border-t border-ink/15">
                {content.registration.map((row) => (
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
        </div>

        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-3">
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
