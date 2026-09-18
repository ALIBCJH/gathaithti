import { Container } from '@/components/ui/Container';
import { RichText } from '@/components/ui/Fact';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHead } from '@/components/ui/SectionHead';
import type { AboutContent } from '@content/types';

/**
 * CORE VALUES — the society's four, two by two.
 *
 * Each card closes on a PROOF line: something the site states elsewhere (the
 * 2024 cherry payment, the single mill, the certificate, the delivery
 * records), set apart under a hairline with a small copper tick. A value with
 * a fact under it reads as a practice rather than a slogan.
 */
export function Values({ content }: { content: AboutContent['values'] }) {
  return (
    <Section tone="parchment-2" ariaLabelledby="values-heading">
      <Container width="wide">
        <SectionHead id="values-heading" eyebrow={content.eyebrow} heading={content.heading} />
        <ul className="mx-auto mt-16 grid max-w-[64rem] gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8">
          {content.items.map((item, i) => (
            <li key={item.title} className="h-full">
              <Reveal delay={(i % 2) * 70} className="h-full">
                <article className="flex h-full flex-col gap-4 border border-line bg-parchment px-7 py-8 sm:px-9 sm:py-10">
                  <span aria-hidden="true" className="h-0.5 w-10 bg-ochre" />
                  <h3 className="font-display text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="t-body flex-1 text-ink-soft">{item.body}</p>
                  <p className="flex items-start gap-2 border-t border-line pt-4 text-sm font-medium">
                    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="mt-0.5 shrink-0 text-ochre" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                    <span>
                      <RichText text={item.proof} />
                    </span>
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
