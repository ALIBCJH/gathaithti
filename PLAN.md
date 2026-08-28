# Gathaithi Farmers' Cooperative Society — build plan

The brief asked for approval of the structure before code. You were asleep and
asked me to build it through, so this document stands in for that review: it is
the structure I built to. Everything below is what is actually on disk.

## 1. File structure

```
.
├─ content/                     ← all copy and data. No CMS. Non-dev editable.
│  ├─ types.ts                  ← every content shape, one file
│  ├─ facts.ts                  ← EVERY statistic on the site, verified:false
│  ├─ images.ts                 ← image registry: filename, ratio, alt, art direction
│  ├─ site.ts                   ← org identity, nav, locales, contact routes, URLs
│  ├─ en/                       ← complete English copy
│  │  ├─ common.ts              ← nav labels, buttons, form strings, footer
│  │  ├─ home.ts
│  │  ├─ about.ts
│  │  ├─ products.ts            ← lot catalogue + processing steps + form copy
│  │  ├─ farmers.ts             ← noticeboard, member profiles, training, pre-finance
│  │  └─ contact.ts
│  └─ sw/                       ← same filenames, Swahili. Scaffolded, NOT translated.
│                                 Deep-merged over English so any untranslated key
│                                 falls back to English rather than rendering blank.
├─ public/
│  └─ images/
│     └─ IMAGES.md              ← the shot list. Every slot the site can fill.
├─ scripts/
│  ├─ audit-facts.mjs           ← `npm run facts`  — lists unverified statistics
│  └─ check-images.mjs          ← `npm run images` — registry vs IMAGES.md vs files on disk
└─ src/
   ├─ app/
   │  ├─ [locale]/              ← /en/... and /sw/...  (root layout lives here)
   │  │  ├─ layout.tsx          ← <html lang>, fonts, header, footer, skip link
   │  │  ├─ page.tsx            ← Home
   │  │  ├─ about/page.tsx
   │  │  ├─ products/page.tsx
   │  │  ├─ farmers/page.tsx
   │  │  ├─ contact/page.tsx
   │  │  ├─ opengraph-image.tsx ← per-route OG/Twitter image (next/og, no photos needed)
   │  │  └─ */opengraph-image.tsx
   │  ├─ api/sample-request/route.ts   ← server validation, honeypot, rate limit, email
   │  ├─ globals.css            ← design tokens, type scale, motion, focus rings
   │  ├─ sitemap.ts             ← both locales
   │  ├─ robots.ts
   │  └─ not-found.tsx
   ├─ proxy.ts                  ← `/` → `/en`, and locale-prefixes bare paths
   │                              (Next 16 renamed the middleware convention)
   ├─ components/
   │  ├─ layout/  Header MobileMenu Footer LocaleToggle SkipLink Container Section
   │  ├─ media/   SmartImage Placeholder            ← file exists? photo : designed slot
   │  ├─ ui/      Button ProseLink Reveal Stat FactValue Field Notice Divider Eyebrow
   │  ├─ home/    Hero ProofBand SeasonPanel StoryTeaser NoticeboardPreview
   │  ├─ about/   GovernanceBlock TerroirPanel WelfareBlock LocationBlock Timeline
   │  ├─ products/ LotCard ProcessWalkthrough SampleRequestForm
   │  ├─ farmers/ MemberCard Noticeboard TrainingBlock PreFinanceBlock
   │  └─ seo/     JsonLd
   └─ lib/
      ├─ i18n.ts                ← locales, deep-merge dictionary loader
      ├─ images.ts              ← fs existence check at build time
      ├─ facts.ts               ← typed fact accessor + formatting
      ├─ format.ts              ← nbsp, en dashes, tabular figures
      ├─ seo.ts                 ← metadata builder, Organization/LocalBusiness/Product JSON-LD
      ├─ rate-limit.ts          ← fixed-window limiter for the sample form
      └─ email/
         ├─ adapter.ts          ← ★ THE ONE FILE TO EDIT TO SEND REAL EMAIL
         └─ providers.ts        ← console (default) + resend/smtp stubs
```

## 2. Component list — what each one is for

| Component | Client? | Why |
|---|---|---|
| `Header` | client | transparent over hero → opaque parchment bar past it |
| `MobileMenu` | client | full-screen panel, large type, focus trap, Esc to close |
| `LocaleToggle` | client | needs current pathname to swap the locale prefix |
| `Reveal` | **server** | markup only; one ~400-byte inline IntersectionObserver reveals it, so content never waits on hydration |
| `SampleRequestForm` | client | inline validation on blur, loading + success states |
| `Noticeboard` | server | pure content, must render with zero JS |
| everything else | server | no client JS at all |

Client JavaScript is three small components — the header, the language toggle
and the sample form. No animation library, no UI library, no icon font, no
analytics, no third-party map embed.

## 3. Content schema (the contract a non-developer edits)

**A statistic** — `content/facts.ts`, one entry per number on the site:

```ts
{
  id: 'cherryPrice2024',
  label:   { en: 'Cherry payment, 2024' },
  value:   126,                    // machine-readable
  display: 'KSh 126',              // what renders, with real typographic characters
  unit:    'per kg',
  approximate: false,
  verified: false,                 // ← flip to true once confirmed with the society
  note:  'Confirm against the 2024 payment schedule before publication.',
  updated: '2026-08-27',
}
```

Nothing renders a number directly. JSX uses `<Fact id="cherryPrice2024" />` or
`<Stat id="cherryPrice2024" />`. Unverified facts carry `data-verified="false"`,
and setting `NEXT_PUBLIC_SHOW_UNVERIFIED=1` draws a dotted ochre underline under
every one of them so they can be found on screen in a single pass.

**An image slot** — `content/images.ts`:

```ts
{
  file: 'gathaithi-drying-beds-wide.jpg',
  page: 'Home', section: 'Hero',
  ratio: '21/9', minWidth: 2800, minHeight: 1200,
  direction: 'Raised drying beds at golden hour, parchment spread, Aberdare ridge …',
  alt: { en: 'Raised drying beds at Gathaithi …' },
}
```

`<SmartImage slot="heroDryingBeds" />` checks `/public/images/<file>` on the
server. Present → `next/image`. Absent → the designed `<Placeholder />`.
Adding a photo is dropping a file into the folder with that name. Nothing else.

**Page copy** — `content/en/<page>.ts`, plain typed objects, prose as strings.
Swahili lives in `content/sw/<page>.ts` with the same shape, and is deep-merged
over English at request time, so a half-finished translation degrades to English
key by key instead of breaking the page.

## 4. Verified, not asserted

Measured on the production build, simulated throttled mobile:

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/en` | 99 | 100 | 100 | 100 |
| `/en/about` | 95 | 100 | 100 | 100 |
| `/en/products` | 99 | 100 | 100 | 100 |
| `/en/farmers` | 96 | 100 | 100 | 100 |
| `/en/contact` | 99 | 100 | 100 | 100 |

CLS 0 everywhere, and those figures need an idle machine — Lighthouse's
performance score tracks real main-thread timings, so the same build reads 99
idle, 86 at load average 4 and 78 at load average 8. Accessibility, best
practices and SEO are unaffected by load.

Two colour pairs failed WCAG AA during the build and were changed rather than
waived — the measured table is in `TYPOGRAPHY.md`. The form endpoint was
exercised end to end: valid, invalid, honeypot, too-fast and rate-limited
requests all behave as intended.

## 5. What the demo-readiness pass found

Driven through a real browser over the DevTools protocol — client-side
navigation, five viewport widths, both locales — rather than fresh page loads
only. Everything below was found and fixed:

| Found | Why it mattered |
| --- | --- |
| Header stayed transparent after clicking from the home page to a parchment page | Parchment type on parchment: the navigation bar disappeared. This is the one that was reported. |
| Sections rendered blank after client-side navigation | The reveal observer only ever scanned the first page loaded, so every page reached through the menu was empty below the fold |
| Header went solid over the hero on Kiswahili pages | A 1px sentinel cannot tell "below the viewport" from "scrolled past"; the observer now checks direction |
| Hydration mismatch on every revealed element | React discards pre-hydration mutations to nodes it owns — the content could have stayed invisible |
| 4px horizontal overflow at 320px | A two-column statistic grid on About; the page could be scrolled sideways |
| Duplicate React keys on the noticeboard | Two collection points share the same placeholder name |
| `robots.txt` scored invalid by Lighthouse | A non-standard `host:` directive cost 8 SEO points |
| Reveal-hidden sections printed blank | The noticeboard is meant to be printed and pinned up in the office |

Verified working in the browser and left alone: the mobile menu (opens, locks
scroll, traps focus, closes on navigation, escape returns focus), the sample
form (blur-only validation, submission, success state), the language toggle
keeping you on the same page, the skip link and focus ring, reduced-motion,
and cross-page anchor links landing clear of the fixed header.

## 6. Theme switch, and the hero fit

The sample-request button has left the navigation bar; a light/dark switch sits
in its place. The call to action is still on every page — in the hero, on each
lot card, and as the whole of the request section — so nothing was lost by
taking it out of the bar.

Rebuilding the palette for two themes meant separating three roles that the
original design had conflated. "Ink" was both the primary text colour *and* the
background of the dark bands; a colour used for both cannot be themed, because
inverting the page would have inverted the bands with it. They are now
`surface`/`text`, `inverse`/`on-inverse` and `accent`/`on-accent`, measured in
both themes in `TYPOGRAPHY.md`.

Two bugs came out of this work and are worth recording:

- **The toggle caused a hydration mismatch.** It rendered the icon for the
  current theme, which the server cannot know. On any device set to dark, the
  server and client disagreed, React recovered by re-rendering the tree — and
  the re-render left the header's hero observer holding a detached node, so the
  navigation bar stayed transparent over a white page and effectively vanished.
  The toggle now renders the same markup in both themes and lets CSS choose the
  icon, so there is nothing to mismatch.
- **The header measurement was fragile by design.** It captured the sentinel
  once. It now re-queries the DOM on each measurement and falls back to the
  solid bar if the element is missing, which is the safe direction: a solid bar
  is always readable, a transparent one is not.

The hero was also rebuilt to fit. It was 92svh with everything pushed to the
bottom edge, which left a void above the type and a sliver of the next section
showing below. It is now exactly one viewport tall, with the type centred in
the space under the header and the scroll cue at the foot of the frame.

## 7. Decisions worth flagging in the morning



- **URLs keep the `/en` prefix** (`/` 308-redirects to `/en`). I left this
  alone rather than flattening to `/`, `/about`, … because it is not what you
  asked for and it changes every URL on the site. Say the word and it is a
  contained change — worth doing before anything is indexed, not after.
- **Routing was `/en` and `/sw`.** The root layout lives in
  `app/[locale]/layout.tsx` so `<html lang>` is correct per locale — this is the
  pattern in the Next.js i18n docs.
- **Now English only, at your request.** The language toggle is gone from the
  header and the mobile menu, `locales` lists English alone, `/sw` redirects to
  `/en` so old links do not 404, and the sitemap and hreflang follow suit. The
  Kiswahili scaffolding is kept intact and dormant — three steps to restore,
  listed in `content/site.ts`. Originally:
- **No Swahili copy was written.** The brief said do not machine-translate, and I
  am not a substitute for a Kikuyu-Swahili speaker who knows the trade. The
  scaffolding, routing, fallback and TODO markers are all in place; a translator
  fills `content/sw/*.ts` and nothing else changes. A visible notice on `/sw`
  says the translation is in progress rather than pretending it is done.
- **Facts I refused to invent.** Registration number, board members' names, the
  AGM date, phone numbers and the buyer contact person render as
  “to be confirmed” rather than plausible fiction. They are all in `facts.ts`
  and `site.ts` with notes. See `npm run facts`.
- **Prices were added after the brief, at your request.** The brief said no
  prices, because Kenyan coffee sells through the Nairobi Coffee Exchange or a
  direct-sales licence. The catalogue now shows an indicative price per lot,
  labelled "Indicative", with a footnote saying the contract price is the one
  that binds. Still no cart and no checkout — the action is a sample request.
  The four figures are invented placeholders flagged `verified: false`; the
  structured data withholds `offers` until a price is marked verified, and
  `showPrices: false` in `content/en/products.ts` removes the lot prices in one
  edit.
- **The catalogue is filterable and sortable.** Grade chips, a sort control
  (grade, price, cupping score, availability), a per-card specification behind
  a native `<details>`, and a "Request this lot" button that jumps to the form
  and pre-selects the lot. The cards stay server components — they read the
  filesystem to choose between a photograph and a placeholder — and are handed
  to the client-side filter as props, so the only new client JavaScript is the
  filter bar itself.
- **The six member profiles are scaffolding.** Names, years, tree counts and
  quotes are labelled as drafts on the page itself. Publishing invented farmers
  under real photographs seemed worse than showing the shape and saying so.
  They need interviews, and each member's agreement to be named.
- **No third-party map embed.** A Google or Mapbox frame is several hundred
  kilobytes of JavaScript and a cross-origin connection for a pin that never
  moves, on a site whose audience is often on mobile data. There is an image
  slot for a flat exported map still and a real link into the reader's own maps
  app.
