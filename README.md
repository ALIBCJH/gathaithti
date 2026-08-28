# Gathaithi Farmers' Co-operative Society

The society's own website. Next.js (App Router) + TypeScript + Tailwind,
deployed to Vercel. Five pages, two locales, no CMS — every word and every
number lives in a typed file under `/content` so that a price or a date can be
corrected by someone who has never opened a code editor before.

The point of the project: Gathaithi coffee is sold worldwide by roasters who
currently outrank the society for its own name. This site exists to own the top
result for **Gathaithi coffee**.

```bash
npm install
npm run dev          # http://localhost:3000  -> redirects to /en
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run facts` | List every statistic on the site and whether it is confirmed |
| `npm run images` | Which photographs have arrived, which slots are still empty |
| `npm run lint` | ESLint |
| `npm run check` | All three of the above |

---

## The five things you will actually do

### 1. Update the cherry price

`content/facts.ts` → the `cherryPriceCurrent` entry.

```ts
cherryPriceCurrent: {
  id: 'cherryPriceCurrent',
  label: 'Current cherry price',
  value: 126,               // the number, for machines
  display: 'KSh 126',       // what people see (note: non-breaking space)
  unit: 'per kg',
  verified: false,          // set to true once the office confirms it
  note: '…',
  updated: '2026-08-27',    // today's date
},
```

Change `value` **and** `display` together, update `updated`, commit, and it is
live everywhere the price appears: the members' noticeboard, the home page
preview and the footer. There is nowhere else to change it.

### 2. Add a photograph

Drop the file into `public/images/` with the exact filename from
[`public/images/IMAGES.md`](public/images/IMAGES.md). That is the whole
procedure. On the next build the designed placeholder is replaced by the
photograph, optimised, responsive, with alt text already written.

- `npm run images` lists which slots are filled and which are still empty.
- A filename that does not match is ignored and the placeholder stays — which is
  the usual cause of "I uploaded it and nothing happened".
- To add a *new* slot, add an entry to `content/images.ts` (filename, ratio,
  minimum size, art direction, alt text), reference it with
  `<SmartImage slot="yourKey" />`, and add a row to `IMAGES.md`.

### 3. Change a lot price, or turn prices off

Prices live in `content/facts.ts` (`priceAA`, `priceAB`, `pricePB`, `priceC`)
like every other number on the site, and are edited the same way.

**They are currently placeholders.** They were not supplied by the society and
they are not quotes — they exist so the catalogue has a price column, and they
are flagged `verified: false` like every other unconfirmed figure. `npm run
facts` lists them.

To remove prices from the site entirely, set one flag:

```ts
// content/en/products.ts
catalogue: {
  showPrices: false,
  …
}
```

That hides the price on every card, drops "Price, low to high" from the sort
control, and removes the pricing footnote. Nothing else needs touching.

Note that `offers` is published in the Product structured data **only** when a
price is marked `verified: true`. An indicative figure can be shown to a human
reader who can see the word "Indicative" next to it; feeding an unconfirmed
number to Google as machine-readable price data for a coffee that legally sells
through the Nairobi Coffee Exchange is a different thing, so the site will not
do it until you say the price is real.

### 4. Edit the words

| File | What is in it |
| --- | --- |
| `content/en/common.ts` | Navigation, buttons, footer, form messages |
| `content/en/home.ts` | Home page |
| `content/en/about.ts` | History, governance, terroir, member welfare |
| `content/en/products.ts` | Lot catalogue, processing steps, sample form |
| `content/en/farmers.ts` | Noticeboard, member profiles, training, pre-finance |
| `content/en/contact.ts` | The three contact routes and the office details |

They are plain objects of strings. Keep the quotes and the commas, change the
text between them, and the page changes.

**Never type a number into the copy.** Write `{{cherryPrice2024}}` instead and
the figure comes from `content/facts.ts`. That is what keeps one number from
being right in one place and stale in three others.

Typography conventions inside copy — they are what make it read as considered:
curly quotes (’ “ ”), en dashes in ranges (16–26), and a non-breaking space
between a number and its unit.

### 5. Deploy

The site is a static build with one dynamic route (the form endpoint).

1. Push to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new). Vercel
   detects Next.js; no build configuration is needed.
3. Set the environment variables from [`.env.example`](.env.example) in
   **Project → Settings → Environment Variables**.

   `NEXT_PUBLIC_SITE_URL` is the only one that affects the build. Either give
   it a real value or leave it out — **adding the variable with an empty value
   is the one thing that breaks the deployment**, and it used to fail with a
   bare `TypeError: Invalid URL`. The site now falls back to the Vercel
   deployment URL and then to the domain in `content/site.ts`, and it accepts a
   value with or without `https://` and with or without a trailing slash.
4. Add the domain under **Settings → Domains**, and point the DNS at Vercel.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

Every push to `main` deploys. Pull requests get their own preview URL, which is
the sensible way to show the committee a change before it is public.

---

## The two forms

| Form | Where | Endpoint | Goes to |
| --- | --- | --- | --- |
| Sample request | `/products#request-a-sample` | `/api/sample-request` | `SAMPLE_REQUEST_TO` |
| General enquiry | `/contact#enquiry` | `/api/contact` | `CONTACT_ENQUIRY_TO`, or `SAMPLE_REQUEST_TO` if that is not set |

Both share one definition of what a valid enquiry is
([`src/lib/enquiry.ts`](src/lib/enquiry.ts)), checked in the browser for
immediate feedback and again on the server, where it counts. Both carry a
honeypot, a minimum fill time and a per-IP rate limit, and both deliver through
the same adapter.

The contact form asks what the enquiry is about and adapts: members are asked
for a member number, everyone else for a company. Each contact route on the
page has a "Write to us instead" link that jumps to the form with that topic
already chosen.

Out of the box both are fully working: they validate server-side, rate-limit,
block bots, and print the enquiry to the server log. They do not send email
until you give them credentials.

**One file to edit: [`src/lib/email/adapter.ts`](src/lib/email/adapter.ts).**
In practice you will not even edit it — set these and restart:

```bash
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxx
SAMPLE_REQUEST_TO=marketing@gathaithicoffee.co.ke
SAMPLE_REQUEST_FROM=Gathaithi website <website@gathaithicoffee.co.ke>
```

For the society's own mail server instead of Resend, `smtpProvider` in
`src/lib/email/providers.ts` is a marked stub: install `nodemailer` and fill it
in. Nothing else in the app needs to change.

The endpoint (`src/app/api/sample-request/route.ts`) applies, in order: a
five-per-hour rate limit per IP, a honeypot field, a minimum fill time, and
full server-side validation. The browser's validation is a courtesy; that one
is the check that counts.

---

## How it is put together

```
content/            all copy and data — the CMS-shaped hole, filled with files
  facts.ts          EVERY statistic on the site, each flagged verified:false
  images.ts         every image slot: filename, ratio, alt text, art direction
  site.ts           the society's identity, address, contact details, routes
  types.ts          the shape of all of the above
  en/ sw/           page copy per locale
public/images/      photographs go here; IMAGES.md is the shot list
src/app/[locale]/   the five pages, per locale
src/components/     layout · media · ui · home · about · products · farmers
src/lib/            i18n · facts · images · seo · rate-limit · email
scripts/            the two audit commands
```

**Statistics.** Nothing in the JSX contains a number. Components read
`content/facts.ts` through `<Fact id="…" />`, so every figure is corrected in
one place. Every figure carries `data-fact` and `data-verified` into the HTML:

```js
document.querySelectorAll('[data-verified="false"]')   // find them in the browser
```

```bash
npm run facts                                    # find them in the terminal
NEXT_PUBLIC_SHOW_UNVERIFIED=1 npm run dev        # see them marked on the page
```

**Images.** `<SmartImage slot="homeHero" />` looks for the file in
`public/images` at build time. Present → `next/image`, optimised, blur-up,
lazy below the fold. Absent → a designed placeholder printing the filename,
ratio and art direction. Both reserve the same space, so layout shift is zero
either way.

**Two themes.** A switch in the header, remembered per visitor in
`localStorage`, defaulting to the reader's operating system on a first visit.

- **Light** is white with black text, with the ochre accent darkened to
  `#9A4F1E` so it still passes AA as body text.
- **Dark** is the society's own roasted-brown palette — the colours the site
  was designed in.

The colour system is in `src/app/globals.css` and keeps three roles apart,
which is what makes theming possible: the page (`surface` / `text`), the bands
that are dark in *both* themes — hero, footer, members' noticeboard
(`inverse` / `on-inverse`), and the accent fill (`accent` / `on-accent`). To
change a colour, edit the two blocks at the top of that file; every component
follows.

The theme is set by a small inline script before the first paint, so a
dark-mode device never sees a white flash, and the toggle renders identical
markup in both themes so nothing can mismatch during hydration.

**One language.** The site ships English only — there is no language toggle,
`/sw` 308-redirects to `/en`, the sitemap lists English pages alone and no
hreflang alternates are emitted.

The Kiswahili scaffolding is still on disk and still working, because it costs
nothing to keep: `content/sw/*` with its `todo()` markers, the deep-merge
fallback to English, the translator's brief in
[`content/sw/README.md`](content/sw/README.md), and the two unmounted
components. Turning it back on is three steps, listed in `content/site.ts`:
add `'sw'` to `locales`, restore `<LocaleToggle />` in the header, and render
`<TranslationNotice />` in the layout. Everything else — routing, the sitemap,
hreflang, static generation — follows that array on its own.

**SEO.** Per-page titles and descriptions via the Metadata API; canonical URLs
and hreflang alternates for both locales; Organization and LocalBusiness JSON-LD
on every page and Product JSON-LD on each lot; generated `sitemap.xml` and
`robots.txt`; a generated OpenGraph image per page per locale; one `h1` per page
and heading order that follows the document.

**Performance.** The audience is largely on mobile data in rural Kenya, so the
whole site is statically generated, there is no animation library, no icon
font, no third-party map embed and no analytics. The only client-side
JavaScript is the header, the language toggle and the sample form; scroll
reveals are ~400 bytes of inline script rather than a React component, so
content is never waiting on hydration to become visible.

Lighthouse, simulated throttled mobile, measured on the production build
(`npm run build && npm run start`) on an idle machine:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/en` | 99 | 100 | 100 | 100 |
| `/en/about` | 95 | 100 | 100 | 100 |
| `/en/products` | 99 | 100 | 100 | 100 |
| `/en/farmers` | 96 | 100 | 100 | 100 |
| `/en/contact` | 99 | 100 | 100 | 100 |

Cumulative layout shift is 0 on every page.

Two caveats worth knowing before you re-run it:

- **Measure on an idle machine, or against the Vercel preview URL.** Lighthouse
  derives total blocking time from real main-thread timings, so a busy laptop
  drags the performance score down badly — the same build measured 99 idle, 86
  under a load average of 4, and 78 under a load average of 8. Accessibility,
  best practices and SEO are unaffected.
- **Measure the production build, never `npm run dev`.** Dev serves unminified
  code and a development React with extra instrumentation.

Re-run after adding photographs — that is the change most likely to cost real
points rather than measurement noise.

**Accessibility.** Every text/background pair was checked against WCAG AA and
the failures fixed (see `TYPOGRAPHY.md` for the measured ratios). Keyboard
navigable throughout, a designed 2px focus ring rather than the browser
default, real labels on every field, errors announced politely, a skip link,
and all entrance motion disabled under `prefers-reduced-motion`.

---

## Showing it to people

Run the production build for a demo, not the dev server — it is several times
faster and it is what the numbers above describe:

```bash
npm run build && npm run start        # http://localhost:3000
```

The site was checked end to end in a real browser at 320, 360, 390, 768 and
1440px, in both locales, and through client-side navigation rather than just
fresh page loads. Fixed in that pass: the header staying transparent (and
therefore invisible) when you clicked from the home page onto a parchment page;
sections rendering blank after client-side navigation; the header turning solid
over the hero on Kiswahili pages; a 4px horizontal overflow at 320px; duplicate
React keys on the noticeboard; a hydration mismatch; and a `robots.txt` that
Lighthouse scored invalid. The mobile menu, escape-to-close, focus return, the
skip link, the language toggle, reduced-motion, print output and the sample
form were all exercised in the browser too.

## Before this goes live

1. **Confirm every statistic.** `npm run facts` lists them. They came from the
   brief, not from the society's records, and each is flagged `verified: false`.
   `npm run facts -- --strict` exits non-zero while any remain — useful in CI.
2. **Fill in what was deliberately left blank.** The registration number, the
   AGM date, the next payment date, the phone numbers, the buyer contact and
   the collection points all read "to be confirmed" rather than a plausible
   invention. They are in `content/facts.ts` and `content/site.ts`.
3. **Replace the member profiles.** The six on `/farmers` are scaffolding:
   names, years, tree counts and quotes are marked as drafts. They need real
   interviews, and each member's agreement to be named and photographed.
4. **Commission the photography.** [`public/images/IMAGES.md`](public/images/IMAGES.md)
   is the shot list — 29 frames, with art direction and a priority order.
5. **Commission the Kiswahili translation.**
   [`content/sw/README.md`](content/sw/README.md) is written for the translator.
6. **Point the geo coordinates at the surveyed position of the mill**
   (`content/site.ts` → `geo`). They are currently approximate.
