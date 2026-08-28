import fs from 'node:fs';
import path from 'node:path';
import { images, type ImageKey } from '@content/images';
import type { ImageSlot } from '@content/types';

/**
 * Server-only. Resolves an image slot against /public/images at build time.
 *
 *   file present  ->  render the photograph through next/image
 *   file missing  ->  render the designed <Placeholder />
 *
 * Adding a photograph therefore means dropping a correctly named file into
 * public/images and rebuilding. No code change, no content change.
 */

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');

function fileExists(file: string): boolean {
  try {
    return fs.statSync(path.join(IMAGE_DIR, file)).isFile();
  } catch {
    return false;
  }
}

export interface ResolvedImage extends ImageSlot {
  key: ImageKey;
  src: string;
  exists: boolean;
}

export function getImage(key: ImageKey): ResolvedImage {
  const slot = images[key] as ImageSlot;
  return { ...slot, key, src: `/images/${slot.file}`, exists: fileExists(slot.file) };
}

export function isImageKey(key: string): key is ImageKey {
  return key in images;
}

/**
 * A 4×5 warm parchment gradient, inlined as the blur-up placeholder for every
 * photograph. Photographs resolve out of a warm field rather than popping in
 * from grey — and it costs 220 bytes instead of a per-image LQIP pipeline.
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#EFE4D2"/><stop offset="60%" stop-color="#DCC9AE"/><stop offset="100%" stop-color="#B99C7C"/></linearGradient></defs><rect width="8" height="10" fill="url(#g)"/></svg>',
  ).toString('base64');

export { images };
export type { ImageKey };
