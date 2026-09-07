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

/**
 * How much resolution a PHONE is served, as a fraction of what its screen
 * reports.
 *
 * A 390px phone at devicePixelRatio 3 asks for 1,170 device pixels of any
 * full-width image. The measured cost of honouring that: the Gallery page
 * pulled 654 KB of photographs on a 3x phone against 283 KB on a 1440px
 * desktop — a phone, on mobile data, paying more than twice what a desktop on
 * fixed line pays for the same page.
 *
 * 2/3 serves about 2x instead. On a photograph, at a 300px slot, held at
 * arm's length, that is not a difference anybody sees; it is a difference the
 * bill sees. Frames where it WOULD be seen — the full-screen hero, the pack
 * photographs that are the product — set `fullDensity: true` and are left
 * alone.
 */
const PHONE_DENSITY = 2 / 3;

/**
 * Scales down the LAST branch of a `sizes` list — the fallback with no media
 * query, which is the one phones use. Every other branch is left exactly as
 * written, so tablets and desktops are unaffected.
 *
 * Only a plain `vw` value is touched. A `vh` (the hero, which is cropped by
 * height) or a fixed `px` is returned unchanged, because the arithmetic below
 * would not mean the same thing.
 */
export function capPhoneDensity(sizes: string): string {
  const parts = sizes.split(',').map((p) => p.trim());
  const last = parts[parts.length - 1];
  const vw = /^(\d+(?:\.\d+)?)vw$/.exec(last);
  if (!vw) return sizes;

  const scaled = Math.max(1, Math.round(Number(vw[1]) * PHONE_DENSITY));
  parts[parts.length - 1] = `${scaled}vw`;
  return parts.join(', ');
}

export function getImage(key: ImageKey): ResolvedImage {
  const slot = images[key] as ImageSlot;
  const sizes = slot.sizes && !slot.fullDensity ? capPhoneDensity(slot.sizes) : slot.sizes;

  return { ...slot, key, sizes, src: `/images/${slot.file}`, exists: fileExists(slot.file) };
}

export function isImageKey(key: string): key is ImageKey {
  return key in images;
}

export { images, BLUR_DATA_URL };
export type { ImageKey };
