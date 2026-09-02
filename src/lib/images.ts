import fs from 'node:fs';
import path from 'node:path';
import { images, type ImageKey } from '@content/images';
import type { ImageSlot } from '@content/types';
import { BLUR_DATA_URL } from './blur';

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

export { images, BLUR_DATA_URL };
export type { ImageKey };
