/**
 * Checks the built dist-cpanel folder before anybody uploads it.
 *
 * The failure this exists to catch: on Vercel a missing image size is resized
 * on demand and nobody notices. On a static host it is a 404 with nothing
 * behind it, and the first person to see it is a visitor. So every URL the
 * built HTML points at is resolved against the folder on disk.
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist-cpanel');
const pass = [];
const fail = [];
const ck = (ok, msg) => (ok ? pass : fail).push(msg);

if (!existsSync(DIST)) {
  console.error('dist-cpanel not found — run `npm run build:cpanel` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const rel = new Set(files.map((f) => '/' + relative(DIST, f).split('\\').join('/')));

ck(html.length > 0, `${html.length} html pages built`);

for (const page of ['', 'about', 'products', 'farmers', 'gallery', 'contact']) {
  const p = join(DIST, page, 'index.html');
  ck(existsSync(p), `/${page} exists as ${relative(DIST, p)}`);
}

ck(existsSync(join(DIST, '.htaccess')), '.htaccess is in the bundle');
ck(existsSync(join(DIST, 'enquiry.php')), 'enquiry.php is in the bundle');
/* The export writes its not-found page at the ROOT, not under the locale. */
ck(existsSync(join(DIST, '404.html')), '404.html exists for ErrorDocument');

/* Every local URL any page points at. */
const referenced = new Set();
const RE = /(?:src|href)="(\/[^"]*?)"|srcset="([^"]*)"/g;
for (const page of html) {
  const body = readFileSync(page, 'utf8');
  for (const m of body.matchAll(RE)) {
    if (m[1]) referenced.add(m[1]);
    if (m[2]) {
      for (const part of m[2].split(',')) {
        const url = part.trim().split(/\s+/)[0];
        if (url.startsWith('/')) referenced.add(url);
      }
    }
  }
}

const skip = (u) =>
  u.startsWith('//') || u.startsWith('/#') || u === '/' || u.startsWith('/enquiry.php');

const missing = [];
for (const url of referenced) {
  if (skip(url)) continue;
  const clean = decodeURIComponent(url.split('?')[0].split('#')[0]);
  if (rel.has(clean)) continue;
  if (rel.has(clean.replace(/\/$/, '/index.html'))) continue;
  if (existsSync(join(DIST, clean))) continue;
  missing.push(url);
}
ck(missing.length === 0, `every referenced URL resolves (${referenced.size} checked)${missing.length ? ' — MISSING: ' + missing.slice(0, 12).join(' ') : ''}`);

/* The images the pages actually use, and whether each has an AVIF sibling. */
const imgUrls = [...referenced].filter((u) => u.startsWith('/_img/'));
ck(imgUrls.length > 0, `${imgUrls.length} pre-rendered image URLs referenced`);
const noAvif = imgUrls.filter((u) => !rel.has(u.replace(/\.webp$/, '.avif')));
ck(noAvif.length === 0, `every referenced webp has an avif sibling${noAvif.length ? ' — MISSING: ' + noAvif.slice(0, 6).join(' ') : ''}`);

/* Nothing should still point at an unresized original. */
const originals = [...referenced].filter((u) => u.startsWith('/images/'));
ck(originals.length === 0, `no page links an unresized original${originals.length ? ' — ' + originals.slice(0, 6).join(' ') : ''}`);

/* The forms must post to the PHP, not to a route handler that is not there. */
const joined = html.map((f) => readFileSync(f, 'utf8')).join('');
ck(!/\/api\/(sample-request|contact)/.test(joined), 'no page still posts to /api/*');
const js = files.filter((f) => f.endsWith('.js')).map((f) => readFileSync(f, 'utf8')).join('');
ck(js.includes('/enquiry.php'), 'the bundle carries the PHP endpoint');
ck(js.includes('?form=sample') && js.includes('?form=contact'), 'both forms name themselves in the query');

/* NOT "no /api string anywhere in the JS". The endpoint is built as
     const l = "/enquiry.php".trim();
     const o = l ? `${l}?form=sample` : "/api/sample-request";
   and the minifier cannot fold `.trim()`, so the DEAD fallback branch survives
   in the bundle as a string nothing reaches. Asserting its absence failed a
   build that was working correctly. What matters is which URL is actually
   posted to, and that is proved by driving the built site in a browser —
   scripts/verify-cpanel-live.mjs — not by grepping for a substring. */

const bytes = files.reduce((a, f) => a + statSync(f).size, 0);
console.log(pass.map((m) => '  ok   ' + m).join('\n'));
if (fail.length) console.log(fail.map((m) => '  FAIL ' + m).join('\n'));
console.log(`\n${files.length} files, ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`${pass.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
