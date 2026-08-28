import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RichText } from '@/components/ui/Fact';
import { Placeholder } from '@/components/media/Placeholder';
import { BLUR_DATA_URL, getImage } from '@/lib/images';
import type { HomeContent } from '@content/types';
import type { Locale } from '@content/site';

/**
 * The first five seconds. Without scrolling a visitor must learn who this is,
 * that the coffee is exceptional, and where to go next — so the name, the
 * proof and the two routes forward all sit above the fold, and nothing else
 * competes with them.
 */
export function Hero({ locale, content }: { locale: Locale; content: HomeContent['hero'] }) {
  const image = getImage('homeHero');

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-parchment on-ink">
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
        className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-[100rem] flex-col gap-12 px-6 pb-20 pt-40 sm:px-10 sm:pb-24 lg:px-16 lg:pb-32 lg:pt-48">
        <div className="flex max-w-[68rem] flex-col gap-8">
          <p className="t-meta text-ochre-light">{content.eyebrow}</p>

          <h1 className="t-hero max-w-[16em] text-parchment">{content.title}</h1>

          <p className="t-lead max-w-[46ch] text-parchment/85">
            <RichText text={content.positioning} />
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={`/${locale}/${content.primary.href}`} surface="dark" variant="primary">
              {content.primary.label}
            </Button>
            <Button href={`/${locale}/${content.secondary.href}`} surface="dark" variant="secondary">
              {content.secondary.label}
            </Button>
          </div>
        </div>

        {!image.exists && (
          <div className="pointer-events-none absolute bottom-8 right-6 hidden w-[min(26rem,40vw)] lg:block">
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
