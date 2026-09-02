import Image from 'next/image';
import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { BLUR_DATA_URL, getImage } from '@/lib/images';
import type { HomeContent } from '@content/types';

/**
 * The first five seconds. Without scrolling a visitor must learn who this is
 * and that the coffee is exceptional — the name and the proof, with nothing
 * competing with them.
 *
 * There are no buttons here any more. The hero states who the society is and
 * lets the page carry the visitor on; the routes out are the navigation, the
 * scroll cue, and the calls to action further down the page, which is where
 * they now live alone rather than being announced twice.
 *
 * The hero is still sized to a SCREEN rather than a width, and the type scale
 * is driven by `vw`. A phone turned on its side keeps its width and loses two
 * thirds of its height, so the headline would stay at desktop size and push the
 * lead off the bottom. `hero-fit` / `hero-body` / `hero-foot` are the hooks the
 * short-viewport rules in globals.css use to keep the whole thing on one
 * screen.
 */
export function Hero({ content }: { content: HomeContent['hero'] }) {
  const image = getImage('homeHero');

  return (
    /* Exactly one viewport tall. The old hero was 92svh with everything pushed
       to the bottom edge, which left a void above the type and a sliver of the
       next section peeking below — it read as a page that had not quite fitted.
       Now the type sits centred in the space under the header, and the foot of
       the frame carries the scroll cue. */
    <section className="hero-fit relative isolate flex min-h-svh flex-col overflow-hidden bg-inverse text-on-inverse on-ink">
      {image.exists ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={74}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="photo object-cover"
        />
      ) : null}

      {/* Scrim. Strong under the type, opening out to the right so the
          photograph is still a photograph and not a dark rectangle. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-inverse/95 via-inverse/80 to-inverse/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inverse/90 to-transparent"
      />

      <div className="hero-body relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-6 pb-10 pt-[calc(var(--header-h)+2.5rem)] sm:px-10 lg:px-16">
        <div className="flex max-w-[68rem] flex-col gap-6 sm:gap-8">
          <p className="t-meta text-ochre-light">{content.eyebrow}</p>

          <h1 className="t-hero max-w-[16em] text-on-inverse">{content.title}</h1>

          <p className="t-lead max-w-[46ch] text-on-inverse/85">
            <RichText text={content.positioning} />
          </p>
        </div>
      </div>

      <div className="hero-foot relative mx-auto flex w-full max-w-[100rem] items-end justify-between gap-10 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10">
        <p className="t-meta flex items-center gap-3 text-on-inverse/50">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-on-inverse/35" />
          {content.scrollHint}
        </p>

        {!image.exists && (
          <div className="hidden w-[min(24rem,32vw)] lg:block">
            <div style={{ aspectRatio: '21 / 9' }}>
              <Placeholder slot={image} tone="dark" compact />
            </div>
          </div>
        )}
      </div>

      {/* Watched by the header: while this is on screen the bar is transparent. */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
