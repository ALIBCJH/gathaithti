/**
 * Rebuilds the four retail-pack frames as LANDSCAPE, from the portrait
 * originals.
 *
 * WHY THEY ARE COMPOSED AND NOT CROPPED. The supplied photographs are tight
 * portraits: the pack fills each frame top to bottom. A landscape crop of a
 * 705x1264 frame keeps 470px of height, which is a horizontal band of
 * packaging with no pack in it. So each photograph is set at FULL HEIGHT on a
 * 1400x1050 canvas whose sides are the same photograph, scaled to cover,
 * blurred and darkened slightly, with the join feathered over 34px.
 *
 * Nothing is invented: the fill is the picture's own colour and light, and the
 * whole pack stays visible. It reads as depth of field rather than as bars.
 *
 * THIS IS NOT IDEMPOTENT. It reads public/images and writes back to it, so
 * running it twice composes a composition. Restore the portrait originals from
 * git first:  git checkout <commit> -- public/images/pack-*.jpg
 */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const DIR = join(process.cwd(), 'public', 'images');
/** 4:3, and tall enough that a 1400px card never asks for more than it has. */
const H = 1050;
const W = 1400;
const FEATHER = 34;

async function build() {
  for (const f of ['pack-100g.jpg', 'pack-250g.jpg', 'pack-500g.jpg', 'pack-1kg.jpg']) {
    const src = join(DIR, f);
    const backdrop = await sharp(src)
      .resize({ width: W, height: H, fit: 'cover', position: 'centre' })
      .blur(38).modulate({ brightness: 0.94 }).toBuffer();

    /* FULL HEIGHT, NOT CROPPED TO THE BAG. Cropping to the bag first was
       tried, to win back some width — a flatter photograph puts the bag wider
       in a landscape frame. It clipped the top seal on all four: the bag
       narrows towards its top, so the topmost rows fall under any sensible
       brightness threshold and the crop began below them. The whole
       photograph, at full height, cannot clip anything. */
    const front = await sharp(src).resize({ height: H }).toBuffer();
    const fm = await sharp(front).metadata();

    /* Feather the two vertical edges of the sharp panel. Without it the join
       reads as a seam; with it the photograph fades into its own blur and the
       whole frame looks like depth of field. */
    const mask = Buffer.alloc(fm.width * fm.height);
    for (let x = 0; x < fm.width; x++) {
      const dl = x, dr = fm.width - 1 - x;
      const d = Math.min(dl, dr);
      const a = d >= FEATHER ? 255 : Math.round(255 * (d / FEATHER) ** 0.85);
      for (let y = 0; y < fm.height; y++) mask[y * fm.width + x] = a;
    }
    const feathered = await sharp(front)
      .ensureAlpha()
      .joinChannel(await sharp(mask, { raw: { width: fm.width, height: fm.height, channels: 1 } }).png().toBuffer())
      .png().toBuffer();

    const buf = await sharp(backdrop)
      .composite([{ input: feathered, top: 0, left: Math.round((W - fm.width) / 2) }])
      .jpeg({ quality: 88, mozjpeg: true }).toBuffer();

    writeFileSync(join(DIR, f), buf);
    console.log(`${f} -> ${W}x${H}, pack panel ${fm.width}px, ${(buf.length / 1024).toFixed(0)}K`);
  }
}

await build();
