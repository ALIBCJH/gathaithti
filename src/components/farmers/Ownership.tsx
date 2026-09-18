import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SmartImage } from '@/components/media/SmartImage';
import type { FarmersContent } from '@content/types';

/**
 * What this page is for: the farmers own the society.
 *
 * It was the OPENING OF THE ABOUT PAGE — its title, its one sentence and three
 * cards under it — and then the opening of this one. It is second now: the
 * members band was moved above it at the user's request, so a visitor meets
 * the people before the constitutional claim about who owns them. This band
 * gave up the `h1` and the opener padding in that move.
 *
 * Somebody who reads only this far should still leave knowing the farmers own
 * it, that it is one mill and one catchment, and that it has run itself since
 * 2000.
 *
 * The photograph beneath is the members at a drying bed, and it is the only
 * frame on this page that is a photograph of this society. The three above it
 * in the members band were generated, and the three that replaced them on
 * 2026-09-08 read the same way.
 *
 * The cards are not numbered, because they are not a sequence and numbering
 * them would say they were. A copper rule and the space between separate them.
 */
export function Ownership({ content }: { content: FarmersContent['ownership'] }) {
  return (
    <Section tone="parchment" ariaLabelledby="ownership-heading">
      <Container width="wide">
        {/* `h2` and ordinary padding: the members band above opens the page
            and holds the h1 now. Centred, like every other head on this page:
            a heading in a left column reads as a column, not as a title. */}
        <SectionHead
          id="ownership-heading"
          eyebrow={content.eyebrow}
          heading={content.title}
          lead={content.lead}
        />

        {/* Members in their own words (2026-09-18): one card each, the quote in
            a <blockquote> and the member named in the <figcaption>, so the
            words stay tied to the person who said them. */}
        <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {content.voices.map((voice, i) => (
            <li key={voice.name} className="h-full">
              <Reveal delay={i * 60} className="h-full">
                <figure className="flex h-full flex-col gap-6 border border-line bg-parchment-2 px-7 py-8 sm:px-8">
                  <span aria-hidden="true" className="font-display text-5xl leading-[0.6] text-ochre">
                    “
                  </span>
                  <blockquote className="t-quiet flex-1 text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.5]">
                    <p>{voice.quote}</p>
                  </blockquote>
                  <figcaption className="flex flex-col gap-1 border-t border-line pt-5">
                    <span className="font-semibold">{voice.name}</span>
                    <span className="t-meta text-ink-soft">{voice.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <figure className="mx-auto mt-16 w-full max-w-[64rem] lg:mt-20">
          <Reveal className="flex flex-col gap-4">
            <SmartImage slot={content.imageSlot} />
            <figcaption className="t-meta text-ink-soft">{content.caption}</figcaption>
          </Reveal>
        </figure>
      </Container>
    </Section>
  );
}
