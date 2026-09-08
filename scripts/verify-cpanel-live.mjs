/**
 * Serves dist-cpanel as a dumb static host and drives it in a browser.
 *
 * scripts/verify-cpanel.mjs reads the built files; this one RUNS them. It is
 * the only check that proves the thing the whole bundle exists to do: that the
 * forms post to /enquiry.php and not to a route handler that is not there.
 *
 * The POST is intercepted rather than answered — there is no PHP here, and the
 * question is which URL the browser aims at, not what comes back.
 *
 * A plain static server is deliberate. It has no .htaccess, so this cannot
 * prove the redirects or the AVIF negotiation; those need Apache and are
 * checked on the host. What it can prove, it proves honestly.
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '/home/jumaai/.nvm/versions/node/v20.20.2/lib/node_modules/playwright/index.mjs';

const DIST = join(process.cwd(), 'dist-cpanel');
const PORT = 4399;
if (!existsSync(DIST)) {
  console.error('dist-cpanel not found — run `npm run build:cpanel` first.');
  process.exit(1);
}

const pass = [];
const fail = [];
const ck = (ok, msg) => (ok ? pass : fail).push(msg);

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], {
  cwd: DIST,
  stdio: 'ignore',
});
const base = `http://127.0.0.1:${PORT}`;

try {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`${base}/`);
      if (r.ok) break;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  const browser = await chromium.launch();

  for (const [name, width] of [['phone', 390], ['desktop', 1440]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const missing = [];
    page.on('response', (r) => {
      if (r.status() >= 400) missing.push(`${r.status()} ${r.url().replace(base, '')}`);
    });

    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(1500);
    ck(missing.length === 0, `${name}: home loads with nothing missing${missing.length ? ' — ' + missing.slice(0, 5).join(', ') : ''}`);

    const imgs = await page.$$eval('img', (els) => els.filter((i) => i.complete && i.naturalWidth > 0).length);
    ck(imgs > 0, `${name}: ${imgs} images decoded from the pre-rendered set`);
    await ctx.close();
  }

  /* Every page, and the one thing that matters: where the form posts. */
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const broken = [];
  page.on('response', (r) => {
    if (r.status() >= 400) broken.push(`${r.status()} ${r.url().replace(base, '')}`);
  });

  for (const path of ['/', '/about/', '/products/', '/farmers/', '/gallery/', '/contact/']) {
    const r = await page.goto(base + path, { waitUntil: 'networkidle' });
    ck(r.status() === 200, `${path} serves 200`);
  }
  ck(broken.length === 0, `no page requested anything missing${broken.length ? ' — ' + broken.slice(0, 6).join(', ') : ''}`);

  /* The pack enquiry. Intercepted, not answered. */
  let posted = null;
  await page.route('**/enquiry.php*', async (route) => {
    posted = route.request().url();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });

  await page.goto(`${base}/products/`, { waitUntil: 'networkidle' });
  await page.fill('#email', 'someone@example.com');
  await page.fill('#message', 'Please tell me about the 250 g pack.');
  await page.waitForTimeout(2600); /* the endpoint rejects anything faster than a person */
  await page.click('#request-a-sample button[type="submit"]');
  await page.waitForTimeout(1200);

  ck(posted !== null, 'the pack form posts somewhere');
  ck(posted !== null && posted.includes('/enquiry.php'), `it posts to the PHP handler — ${posted?.replace(base, '')}`);
  ck(posted !== null && posted.includes('form=sample'), 'it names itself as the sample form');

  await browser.close();
} finally {
  server.kill();
}

console.log(pass.map((m) => '  ok   ' + m).join('\n'));
if (fail.length) console.log(fail.map((m) => '  FAIL ' + m).join('\n'));
console.log(`\n${pass.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
