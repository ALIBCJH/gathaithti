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
  rounded = false,
}: {
  slot: string;
  className?: string;
  imageClassName?: string;
  /** Card hover zoom. The parent needs the `group/card` class. */
  zoom?: boolean;
  rounded?: boolean;
}) {
  if (!isImageKey(slot)) {
    return (
      <div className={`bg-parchment-2 p-4 text-cherry ${className}`}>Unknown image slot: {slot}</div>
    );
  }

  const image = getImage(slot);
  const [w, h] = image.ratio.split('/');
  const radius = rounded ? 'rounded-sm' : '';

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
