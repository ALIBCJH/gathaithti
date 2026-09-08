/**
 * Builds the folder that gets uploaded to cPanel.
 *
 *   npm run build:cpanel   ->   dist-cpanel/
 *
 * Four steps, in this order, and the order is the whole point:
 *
 *   1. render every image variant, and the manifest the loader reads
 *   2. move the API routes out of the way
 *   3. next build, with BUILD_TARGET=cpanel
 *   4. assemble dist-cpanel, and zip it for upload
 *
 * STEP 2 NEEDS EXPLAINING. `output: 'export'` refuses to build a project that
 * contains a route handler, because a route handler is a running server and
 * there is not going to be one. The two are not deleted — they are moved
 * aside for the length of this build and put back afterwards, including if it
 * throws. Their job on cPanel is done by deploy/enquiry.php.
 *
 * The proxy and the in-locale catch-all used to be parked here too, and both
 * are simply GONE now: the locale segment came out of the URLs on 2026-09-08,
 * so there is no /en redirect for a proxy to perform and no locale layout for
 * a catch-all to render a 404 inside. app/not-found.tsx and ErrorDocument
 * cover it between them.
 *
 * STEP 1 IS SKIPPED when public/_img already holds variants newer than every
 * file in public/images. Encoding 50 photographs at seven widths in AVIF takes
 * about twenty-five minutes, and paying that again to re-run a build that
 * failed at step 3 is how a five-minute fix becomes an afternoon. Pass
 * --force-images to render them anyway.
 *
 * Nothing here touches git. If this script is interrupted hard enough to skip
 * the restore, `git status` shows src/app/api missing and `git checkout` puts
 * it back.
 */

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, renameSync, rmSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { buildImages } from './build-images.mjs';

const root = process.cwd();
const API = join(root, 'src', 'app', 'api');
const API_PARKED = join(root, '.api-parked');
const OUT = join(root, 'out');
const DIST = join(root, 'dist-cpanel');
const ZIP = join(root, 'dist-cpanel.zip');

function folderSize(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    total += entry.isDirectory() ? folderSize(full) : statSync(full).size;
  }
  return total;
}

/** Newest mtime under a directory, or 0 if it does not exist. */
function newest(dir) {
  if (!existsSync(dir)) return 0;
  let t = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    const stat = entry.isDirectory() ? newest(full) : statSync(full).mtimeMs;
    if (stat > t) t = stat;
  }
  return t;
}

const IMG_SRC = join(root, 'public', 'images');
const IMG_OUT = join(root, 'public', '_img');
const force = process.argv.includes('--force-images');
const fresh = !force && newest(IMG_OUT) > newest(IMG_SRC);

let images;
if (fresh) {
  const count = readdirSync(IMG_OUT).length;
  console.log(`1/5  image variants are newer than the photographs — skipping (${count} files)`);
  console.log('     pass --force-images to render them again');
  images = { files: 0, written: count, bytes: 0 };
} else {
  console.log('1/5  rendering image variants');
  images = await buildImages({ quiet: true });
  console.log(`     ${images.files} photographs, ${images.written} files, ${(images.bytes / 1048576).toFixed(1)} MB`);
}

let parkedApi = false;
try {
  if (existsSync(API)) {
    console.log('2/5  parking the API routes (a static export cannot hold one)');
    if (existsSync(API_PARKED)) rmSync(API_PARKED, { recursive: true });
    renameSync(API, API_PARKED);
    parkedApi = true;
  }

  console.log('3/5  next build');
  rmSync(OUT, { recursive: true, force: true });
  execFileSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_TARGET: 'cpanel',
      /* Both forms post here. The query string tells the PHP which one. */
      NEXT_PUBLIC_ENQUIRY_ENDPOINT: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? '/enquiry.php',
    },
  });
} finally {
  if (parkedApi) {
    renameSync(API_PARKED, API);
    console.log('     API routes restored');
  }
}

console.log('4/5  assembling dist-cpanel');
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(OUT, DIST, { recursive: true });
cpSync(join(root, 'deploy', 'htaccess'), join(DIST, '.htaccess'));
cpSync(join(root, 'deploy', 'enquiry.php'), join(DIST, 'enquiry.php'));
cpSync(join(root, 'deploy', 'UPLOAD.md'), join(DIST, 'UPLOAD.md'));

/* The export writes its not-found page at the ROOT — 404.html — and
   ErrorDocument in deploy/htaccess points there. If a future Next moves it,
   fail rather than ship a 404 page that itself 404s. */
if (!existsSync(join(DIST, '404.html'))) {
  throw new Error('404.html is missing from the export — ErrorDocument in .htaccess would 404');
}

writeFileSync(
  join(DIST, 'BUILD.txt'),
  `Gathaithi static build\nbuilt: ${new Date().toISOString()}\nimages: ${images.written} files\n`,
);

/* ZIPPED FROM INSIDE, so the archive has no wrapping folder: cPanel's File
   Manager extracts an archive where it stands, and an archive containing
   `dist-cpanel/` would put the whole site at public_html/dist-cpanel/.
   Extracting THIS one in public_html puts index files where they belong.

   `zip -r . ` from within the folder also catches DOTFILES, which matters more
   than it sounds: .htaccess is the whole redirect, caching and AVIF story, and
   an archive built with a glob would silently leave it out. Asserted below. */
console.log('5/5  zipping for upload');
rmSync(ZIP, { force: true });
execFileSync('zip', ['-r', '-q', ZIP, '.'], { cwd: DIST, stdio: 'inherit' });

const listed = execFileSync('unzip', ['-Z1', ZIP], { encoding: 'utf8' }).split('\n');
if (!listed.includes('.htaccess')) {
  throw new Error('.htaccess is missing from the archive — the site would 404 on every URL');
}
if (!listed.includes('enquiry.php')) {
  throw new Error('enquiry.php is missing from the archive — both forms would fail');
}

console.log(`\ndist-cpanel  ${(folderSize(DIST) / 1048576).toFixed(1)} MB in ${listed.filter(Boolean).length} files`);
console.log(`${ZIP}  ${(statSync(ZIP).size / 1048576).toFixed(1)} MB`);
console.log('\nUpload the ZIP into public_html and Extract it there — it has no wrapping');
console.log('folder, so the files land where they belong. Then read UPLOAD.md.');
