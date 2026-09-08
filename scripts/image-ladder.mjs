/**
 * The one list of image widths this site can ask for.
 *
 * THREE THINGS READ THIS, and they must never disagree:
 *
 *   next.config.ts            sets deviceSizes/imageSizes from it, so these are
 *                             the only widths next/image puts in a srcset
 *   scripts/build-images.mjs  renders a file at each of these widths
 *   src/lib/cpanelImageLoader.ts
 *                             names those files
 *
 * A width in the srcset with no file behind it is a 404 on a static host with
 * nothing to fall back to, which is why it is one file rather than three
 * copies of the same array.
 *
 * Seven rungs, not the eleven Next ships by default: every extra rung is 52
 * more files to encode and upload for a fit that is at most a few percent
 * better. 1920 is the top because nothing here is displayed wider, and the
 * phone density cap in src/lib/images.ts keeps a 3x phone off it.
 */
export const LADDER = [256, 384, 640, 828, 1080, 1366, 1920];

/** The smallest rung that covers `width`, or the largest rung there is. */
export function rungFor(width) {
  return LADDER.find((w) => w >= width) ?? LADDER[LADDER.length - 1];
}
