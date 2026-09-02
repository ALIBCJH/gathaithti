import { Eyebrow } from '@/components/ui/Eyebrow';
import type { HomeContent } from '@content/types';

/**
 * The editorial statement that balances the story column.
 *
 * It stands where the wet-mill photograph used to, and it is deliberately not
 * a picture-shaped box with words in it: the quote is the picture. Everything
 * else on the card — the eyebrow, the supporting paragraph, the rule and the
 * imprint line under it — is set quieter than it would be anywhere else on
 * the site, so nothing competes with the sentence in the middle.
 *
 * The ground is the brand brown the hero and the footer already use, which
 * means on the dark theme the card is the same colour as the page behind it.
 * That is intended: in the dark the copper hairline and the faint wash are
 * what draw the card, and a second brown would have broken the one flat
 * surface the dark theme is built on.
 */
export function StoryCard({ content }: { content: HomeContent['story']['card'] }) {
  return (
    <article className="story-card on-ink flex flex-col border border-ochre/40 bg-inverse px-7 py-10 text-on-inverse sm:px-11 sm:py-14 lg:px-14 lg:py-16">
      <Eyebrow surface="dark">{content.eyebrow}</Eyebrow>

      <blockquote className="story-quote mt-8 sm:mt-10">
        {/* Punctuation, not content: the sentence is quoted for the eye, and a
            screen reader is already inside a blockquote. */}
        <span className="story-mark" aria-hidden="true">&ldquo;</span>
        {content.quote}
        <span className="story-mark" aria-hidden="true">&rdquo;</span>
      </blockquote>

      <p className="mt-7 max-w-[46ch] text-[0.9375rem] leading-[1.75] text-on-inverse/70 sm:mt-8">
        {content.support}
      </p>

      <p className="t-meta mt-9 border-t border-ochre/30 pt-6 text-[0.6875rem] text-on-inverse/60 sm:mt-11 sm:text-[0.75rem]">
        {content.footer}
      </p>
    </article>
  );
}
