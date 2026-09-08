/**
 * Pre-renders every photograph at every width the site can ask for, in AVIF
 * and WebP, into public/_img.
 *
 * WHY THIS EXISTS. On Vercel, next/image resizes on demand at the edge and
 * caches the result. cPanel has no such thing: Apache serves files, and that
 * is all it does. Without this step a static export either ships the original
 * 1,700px JPEGs to a phone or needs a Node process on the host — and a Node
 * process on shared cPanel hosting is the thing least likely to survive the
 * traffic this is being moved for.
 *
 * So the resizing happens here, once, on a laptop, and the host is left doing
 * the one thing it is good at.
 *
 * NO UPSCALING, AND NO DUPLICATES. Nothing here is wider than 1,717px and half
 * the files are under 1,000px, so most of the ladder sits above most of the
 * sources. Writing every rung anyway meant board-01 (848px) shipped four
 * identical copies of itself under four names — a third of the whole bundle
 * was duplicates.
 *
 * So a source is rendered only at rungs it can actually fill, and the top rung
 * it reached is recorded in image-max.json. The loader reads that file and
 * never names a rung above it. Regenerating the variants regenerates the
 * manifest in the same pass, which is why `npm run build:cpanel` runs this
 * BEFORE next build and not as a separate chore somebody can forget.
 *
 * JPEG IS NOT GENERATED. WebP is the base format and AVIF the upgrade, chosen
 * by Apache in .htaccess from the Accept header. Every browser that can run
 * this site reads WebP; the ones that cannot predate it by years.
 */

import { mkdirSync, readdirSync, statSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';
import { LADDER } from './image-ladder.mjs';

const SRC = join(process.cwd(), 'public', 'images');
const OUT = join(process.cwd(), 'public', '_img');
const MANIFEST = join(process.cwd(), 'scripts', 'image-max.json');

/* Quality, CALIBRATED AGAINST WHAT VERCEL ALREADY SERVES rather than guessed.
   The payload review measured the live optimiser's output for two frames, and
   these settings reproduce it to within a kilobyte:

     gathaithi-gate  @640    Vercel 59 KB    avif q45  59 KB
     gathaithi-pulper @640   Vercel 24 KB    avif q45  23 KB

   So the static bundle is not a compromise against the hosted optimiser; it
   is the same pictures at the same weight, decided on a laptop instead of in
   a data centre. q58 was the first guess and was 60% heavier for a difference
   nothing measured.

   WebP is the fallback, taken by browsers that cannot read AVIF and by
   everyone if the .htaccess rewrite is ever missing — so it is set to a
   sensible 68 rather than trimmed hard. */
const WEBP_Q = 68;
const AVIF_Q = 45;

const isImage = (f) => /\.(jpe?g|png|webp|avif)$/i.test(f);

export async function buildImages({ quiet = false } = {}) {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  const files = readdirSync(SRC).filter(isImage);
  const maxRung = {};
  let written = 0;
  let bytes = 0;
  let sourceBytes = 0;

  for (const file of files) {
    const stem = basename(file, extname(file));
    const input = join(SRC, file);
    sourceBytes += statSync(input).size;

    const { width: sourceWidth } = await sharp(input).metadata();

    /* Every rung the source can fill, plus the first one it cannot — that last
       one is the source at its own width, and it is what a large screen gets.
       Stopping at the last rung BELOW the source would throw away resolution
       the file actually has. */
    const rungs = LADDER.filter((w) => w < sourceWidth);
    rungs.push(LADDER.find((w) => w >= sourceWidth) ?? LADDER[LADDER.length - 1]);
    maxRung[stem] = rungs[rungs.length - 1];

    for (const width of rungs) {
      const resized = sharp(input).resize({ width, withoutEnlargement: true });

      const [webp, avif] = await Promise.all([
        resized.clone().webp({ quality: WEBP_Q, effort: 5, smartSubsample: true }).toBuffer(),
        resized.clone().avif({ quality: AVIF_Q, effort: 4, chromaSubsampling: '4:2:0' }).toBuffer(),
      ]);

      writeFileSync(join(OUT, `${stem}-${width}.webp`), webp);
      writeFileSync(join(OUT, `${stem}-${width}.avif`), avif);
      written += 2;
      bytes += webp.length + avif.length;
    }
    if (!quiet) process.stdout.write('.');
  }

  writeFileSync(MANIFEST, JSON.stringify(maxRung, null, 2) + '\n');

  if (!quiet) {
    console.log(
      `\n${files.length} photographs -> ${written} files in public/_img` +
        `\nsources ${(sourceBytes / 1048576).toFixed(1)} MB, variants ${(bytes / 1048576).toFixed(1)} MB`,
    );
  }
  return { files: files.length, written, bytes, maxRung };
}

if (import.meta.url === `file://${process.argv[1]}`) await buildImages();
