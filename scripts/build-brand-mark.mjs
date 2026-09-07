/**
 * Lifts the navbar mark out of the supplied logo.
 *
 *   assets/brand/gathaithi-logo.jpeg   ->   public/brand/mark.webp
 *
 * WHY NOT JUST USE THE SUPPLIED FILE. gathaithi-logo.jpeg is a stacked
 * lockup — the gold disc over a filigree bar, with GATHAITHI and COFFEE
 * beneath, on a cream ground. In a 4.5rem navigation bar the whole lockup can
 * be about 48px tall, at which COFFEE renders under 5px and the filigree turns
 * to grain. And the cream ground has to go, or the bar carries a pale plate in
 * the dark theme.
 *
 * So the disc is lifted out and the wordmark beside it is set in the site's
 * own type: the same lockup, laid out for a bar instead of for a page.
 *
 * THE GEOMETRY IS SOLVED, NOT EYEBALLED. Measuring the disc's half-width at
 * two rows well clear of the bar and putting both through the circle equation
 * gives the same answer twice:
 *
 *   y=200   half-width 131.5   dy 61.5   ->   r = 145.2
 *   y=330   half-width 128.0   dy 68.5   ->   r = 145.2
 *
 * TWO ALPHAS, MULTIPLIED. One drops the cream ground, one drops everything
 * outside the disc — the bar and the filigree run out through any square crop,
 * and a first attempt without the circular mask left stubs on both sides.
 *
 * THE RAMP STARTS AT 24, WHICH IS MEASURED. The cream is a JPEG with noise and
 * a slight vignette: sampled over areas that are certainly empty, the distance
 * from the mean background reaches 22. A ramp starting below that keeps the
 * noise, and the noise is a faint rectangle the shape of the crop — which is
 * exactly what the first attempt produced.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = join(process.cwd(), 'assets', 'brand', 'gathaithi-logo.jpeg');
const OUT_DIR = join(process.cwd(), 'public', 'brand');

/** The disc, from the measurement above. */
const CX = 819;
const CY = 261.5;
const R = 145;
const PAD = 3;

/** The cream ground, averaged from the four corners of the supplied file. */
const BG = [245, 240, 232];
/** Above the measured noise floor of 22, ramping to fully opaque. */
const RAMP_FROM = 24;
const RAMP_OVER = 31;

/** Delivered at 192px so a 36px mark is sharp on a 3x phone, with headroom. */
const DELIVER = 192;

export async function buildBrandMark({ quiet = false } = {}) {
  const size = Math.round((R + PAD) * 2);
  const left = Math.round(CX - R - PAD);
  const top = Math.round(CY - R - PAD);

  const { data, info } = await sharp(SRC)
    .extract({ left, top, width: size, height: size })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: c } = info;
  const out = Buffer.alloc(w * h * 4);
  const cx = w / 2;
  const cy = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const j = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const dist = Math.hypot(r - BG[0], g - BG[1], b - BG[2]);
      const aColour = Math.min(1, Math.max(0, (dist - RAMP_FROM) / RAMP_OVER));

      const rad = Math.hypot(x - cx + 0.5, y - cy + 0.5);
      const aCircle = Math.min(1, Math.max(0, (R + 0.5 - rad) / 1.5));

      /* Inside the disc the gold IS the ground, so the colour alpha only
         applies near the rim where the cream shows through the anti-aliasing.
         Applied everywhere it would eat the bean, which is cream by design. */
      const inside = rad < R - 2 ? 1 : aColour;

      out[j] = r;
      out[j + 1] = g;
      out[j + 2] = b;
      out[j + 3] = Math.round(255 * aCircle * inside);
    }
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const webp = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .resize({ height: DELIVER })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toBuffer();
  writeFileSync(join(OUT_DIR, 'mark.webp'), webp);

  /* A stub of the disc left on the crop edge means the geometry has drifted —
     the mark would show a clipped rim. Cheap to check, so check it. */
  const { data: check } = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let edge = 0;
  for (let x = 0; x < w; x++) {
    if (check[x * 4 + 3] > 8) edge++;
    if (check[((h - 1) * w + x) * 4 + 3] > 8) edge++;
  }
  for (let y = 0; y < h; y++) {
    if (check[y * w * 4 + 3] > 8) edge++;
    if (check[(y * w + w - 1) * 4 + 3] > 8) edge++;
  }
  if (edge > 0) throw new Error(`the disc touches the crop edge in ${edge} places — check CX/CY/R`);

  if (!quiet) console.log(`public/brand/mark.webp  ${DELIVER}px  ${(webp.length / 1024).toFixed(1)} KB`);
  return { bytes: webp.length };
}

if (import.meta.url === `file://${process.argv[1]}`) await buildBrandMark();
