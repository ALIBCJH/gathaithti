import { RichText } from '@/components/ui/Fact';
import { getImageProps } from 'next/image';

import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/media/SmartImage';
import { GalleryViewer, type ViewerItem } from '@/components/gallery/GalleryViewer';
import { RouteMap } from '@/components/gallery/RouteMap';
import { stencil } from '@/components/gallery/stencilFont';
import { getImage, isImageKey } from '@/lib/images';
import type { GalleryContent, GalleryPhoto, GalleryStop } from '@content/types';

/**
 * THE GALLERY WALK — ten stops, from the gate to the people who run it.
 *
 * Approved by the client 2026-09-13 from the "Gathaithi Gallery Walk"
 * proposal, in place of ten numbered circles. Three decisions carry it:
 *
 *   A ROUTE. The order is a visitor's walk, and the route map beside the
 *   photographs (RouteMap) says where on it you are.
 *
 *   STENCIL LETTERING for everything that marks a place — stop numbers, the
 *   route, the painted act words — because the society stencils its own walls.
 *
 *   EVERY PHOTOGRAPH AT ITS OWN SHAPE, each carrying its file's ratio, sized by
 *   what it shows: the big scenes full width, portraits beside their text, the
 *   quiet frames small. Nothing is cropped to a circle.
 *
 * It follows the light and dark setting like every other page (the client's
 * choice over a dark-only gallery), because every colour here is a site token.
 */
export function GalleryWalk({ content }: { content: GalleryContent }) {
  /* Every photograph on the walk, in walk order, numbered once — the viewer
     steps through this list and each link names its place in it. */
  const viewerItems: ViewerItem[] = [];
  const photoIndex = new Map<GalleryPhoto, number>();
  for (const stop of content.stops) {
    for (const photo of stop.photos) {
      photoIndex.set(photo, viewerItems.length);
      viewerItems.push({ ...largest(photo), title: photo.title, caption: photo.caption });
    }
  }

  const photo = (item: GalleryPhoto, sizes: string, options: { tag?: string; priority?: boolean } = {}) => (
    <WalkPhoto
      photo={item}
      index={photoIndex.get(item) ?? 0}
      href={viewerItems[photoIndex.get(item) ?? 0]?.src ?? '#'}
      label={content.viewer.open.replace('{{title}}', item.title)}
      sizes={sizes}
      tag={options.tag}
      priority={options.priority}
    />
  );

  const [opening, ...rest] = content.stops;

  return (
    <div className={`${stencil.variable} bg-parchment pt-[var(--header-h)] text-ink`}>
      <Container width="wide">
        <div className="lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <RouteMap
            stops={content.stops.map(({ id, n, short }) => ({ id, n, short }))}
            label={content.route.label}
            title={content.route.title}
          />

          <div className="min-w-0">
            {opening ? (
              <section
                id={`stop-${opening.id}`}
                aria-labelledby="walk-title"
                className="scroll-mt-16 pb-16 pt-10 sm:pb-20 lg:scroll-mt-0 lg:pb-28 lg:pt-12"
              >
                <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-12">
                  <div className="grid content-end gap-5">
                    <p className="stencil text-[clamp(1.1rem,1.6vw,1.375rem)] text-ochre-ink">{content.hero.mark}</p>
                    <h1 id="walk-title" className="t-hero max-w-[12ch]">
                      {content.hero.title}{' '}
                      <em className="font-normal italic text-ochre-ink">{content.hero.titleEmphasis}</em>
                    </h1>
                    <p className="t-lead max-w-[36ch] text-ink-soft">{content.hero.lede}</p>
                    {rest[0] ? (
                      <a
                        href={`#stop-${rest[0].id}`}
                        className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.9375rem] font-medium text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ochre"
                      >
                        {content.hero.start} <span aria-hidden="true">↓</span>
                      </a>
                    ) : null}
                  </div>
                  <div className="grid gap-3.5 md:max-w-[28rem] md:justify-self-end">
                    {opening.photos[0] ? photo(opening.photos[0], '(min-width: 768px) 28rem, 100vw', { tag: `Stop ${opening.n}`, priority: true }) : null}
                    {/* The opening card carries the society's welcome and no title
                        (the client, 2026-09-21): "The gate" still names the stop
                        in the route and in the photo viewer. */}
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                      <RichText text={opening.text} />
                    </p>
                  </div>
                </div>
              </section>
            ) : null}

            {rest.map((stop) => (
              <div key={stop.id}>
                {stop.act ? <Act act={stop.act} /> : null}
                <Stop stop={stop} photo={photo} />
              </div>
            ))}

            <footer className="grid justify-items-start gap-5 border-t border-line pb-24 pt-10 lg:pb-32">
              <p className="stencil text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-ochre-ink">{content.end.title}</p>
              {opening ? (
                <a
                  href={`#stop-${opening.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  {content.end.back} <span aria-hidden="true">↑</span>
                </a>
              ) : null}
            </footer>
          </div>
        </div>
      </Container>

      <GalleryViewer items={viewerItems} labels={content.viewer} />
    </div>
  );
}

type PhotoRenderer = (item: GalleryPhoto, sizes: string, options?: { tag?: string; priority?: boolean }) => React.ReactNode;

function Stop({ stop, photo }: { stop: GalleryStop; photo: PhotoRenderer }) {
  const heading = (
    <div className="grid content-end gap-3.5">
      <p className="stencil text-[1.125rem] text-ochre-ink">Stop {stop.n}</p>
      <h2 id={`walk-${stop.id}`} className="t-section text-[clamp(1.625rem,2.6vw,2.375rem)]">
        {stop.title}
      </h2>
      {stop.layout !== 'full' ? <p className="t-body max-w-[44ch] text-ink-soft">{stop.text}</p> : null}
    </div>
  );
  const section = (children: React.ReactNode) => (
    <section id={`stop-${stop.id}`} aria-labelledby={`walk-${stop.id}`} className="scroll-mt-16 py-16 sm:py-20 lg:scroll-mt-0 lg:py-28">
      {children}
    </section>
  );
  const [first, second] = stop.photos;

  if (stop.layout === 'full' && first) {
    return section(
      <div className="grid gap-6">
        {photo(first, '(min-width: 1024px) 72vw, 100vw', { tag: stop.tag })}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
          {heading}
          <p className="t-body max-w-[48ch] self-end text-ink-soft">{stop.text}</p>
        </div>
      </div>,
    );
  }

  if (stop.layout === 'pair') {
    return section(
      <div className="grid gap-7">
        {heading}
        <div className={`flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-5 ${stop.quiet ? 'lg:w-[82%]' : ''}`}>
          {[first, second].filter((p): p is GalleryPhoto => Boolean(p)).map((p) => {
            const [w, h] = p.ratio.split('/').map(Number);
            return (
              <div key={p.imageSlot} className="grid min-w-[min(14rem,100%)] gap-3 sm:basis-0" style={{ flexGrow: w / h }}>
                {photo(p, '(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw')}
                <p className="grid gap-1">
                  <span className="font-display text-[1.0625rem] font-semibold">{p.title}</span>
                  <span className="text-[0.9375rem] text-ink-soft">{p.caption}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>,
    );
  }

  /* split / split-flip. The photograph column is wider than the text unless
     the photograph is marked narrow; a tall portrait is held to a width that
     keeps it from towering over its words. */
  const flip = stop.layout === 'split-flip';
  const columns =
    stop.photoSize === 'narrow'
      ? flip ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]' : 'md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'
      : flip ? 'md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]' : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]';
  const tall = stop.photoSize === 'tall';

  return section(
    <div className={`grid gap-6 md:items-end md:gap-12 lg:gap-16 ${columns}`}>
      <div className={flip ? 'md:order-2' : ''}>{heading}</div>
      <div className={`${flip ? 'md:order-1' : ''} ${tall ? `w-full md:max-w-[30rem] ${flip ? 'md:justify-self-start' : 'md:justify-self-end'}` : ''}`}>
        {first ? photo(first, tall ? '(min-width: 768px) 30rem, 100vw' : '(min-width: 1024px) 44vw, (min-width: 768px) 58vw, 100vw', { tag: stop.tag }) : null}
      </div>
    </div>,
  );
}

function Act({ act }: { act: { name: string; note: string } }) {
  return (
    <div className="mt-6 grid gap-2 border-t border-line pt-10 lg:pt-14">
      <p className="walk-act">{act.name}</p>
      <p className="t-meta text-ink-soft">{act.note}</p>
    </div>
  );
}

function WalkPhoto({
  photo,
  index,
  href,
  label,
  sizes,
  tag,
  priority,
}: {
  photo: GalleryPhoto;
  index: number;
  href: string;
  label: string;
  sizes: string;
  tag?: string;
  priority?: boolean;
}) {
  return (
    <a href={href} data-walk-photo={index} aria-label={label} className="walk-photo">
      <SmartImage slot={photo.imageSlot} ratio={photo.ratio} sizes={sizes} priority={priority} />
      <span aria-hidden="true" className="walk-develop" />
      {tag ? (
        <span aria-hidden="true" className="walk-tag stencil">
          {tag}
        </span>
      ) : null}
    </a>
  );
}

/** The largest file the image pipeline holds for a photograph, for the viewer. */
function largest(photo: GalleryPhoto): { src: string; alt: string } {
  if (!isImageKey(photo.imageSlot)) return { src: '#', alt: photo.title };
  const image = getImage(photo.imageSlot);
  if (!image.exists) return { src: image.src, alt: image.alt };
  const [w, h] = photo.ratio.split('/').map(Number);
  const { props } = getImageProps({ src: image.src, alt: image.alt, width: 1920, height: Math.round((1920 * h) / w), quality: 80 });
  return { src: props.src, alt: image.alt };
}
