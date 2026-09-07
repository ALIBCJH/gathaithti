import Image from 'next/image';
import { BLUR_DATA_URL, getImage, isImageKey } from '@/lib/images';
import { Placeholder } from './Placeholder';

/**
 * Every photograph on the site goes through here.
 *
 *   /public/images/<file> exists  ->  next/image, optimised, blur-up, warm treatment
 *   it does not                   ->  the designed <Placeholder />
 *
 * The wrapper always reserves the slot's aspect ratio, so the page never
 * shifts whichever of the two renders. Cumulative layout shift stays at zero
 * before the photographs arrive and after.
 */
export function SmartImage({
  slot,
  className = '',
  imageClassName = '',
  zoom = false,
  square = false,
  ratio,
}: {
  slot: string;
  className?: string;
  imageClassName?: string;
  /** Card hover zoom. The parent needs the `group/card` class. */
  zoom?: boolean;
  /** Opt OUT of the corner radius. For a frame that meets an edge. */
  square?: boolean;
  /**
   * Override the slot's shape, e.g. `1/1`.
   *
   * The ratio is applied as an INLINE STYLE so the reserved box is exact, and
   * an inline style beats any class — so `className="aspect-square"` on this
   * component does nothing at all, silently. The gallery wants circles from
   * frames that are 0.67 to 1.64 in the registry, so it says so here.
   */
  ratio?: string;
}) {
  if (!isImageKey(slot)) {
    return (
      <div className={`bg-parchment-2 p-4 text-cherry ${className}`}>Unknown image slot: {slot}</div>
    );
  }

  const image = getImage(slot);
  const [w, h] = (ratio ?? image.ratio).split('/');
  /* Rounded by DEFAULT. There was a `rounded` prop here that defaulted to
     false, and in the whole codebase nothing ever passed it — so every
     photograph on the site had square corners against a design that rounds its
     buttons, its pills and its focus ring. The default is inverted and the
     radius comes from the shared token. */
  const radius = square ? '' : 'rounded-[var(--radius-photo)]';

  return (
    <div
      className={`relative overflow-hidden bg-parchment-2 ${radius} ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {image.exists ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes ?? '100vw'}
          priority={image.priority}
          loading={image.priority ? undefined : 'lazy'}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          quality={72}
          className={`photo object-cover ${zoom ? 'photo-zoom' : ''} ${imageClassName}`}
        />
      ) : (
        <Placeholder slot={image} />
      )}
    </div>
  );
}
