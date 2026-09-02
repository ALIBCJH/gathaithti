/**
 * ══════════════════════════════════════════════════════════════════════════
 *  EVERY STATISTIC ON THIS SITE LIVES HERE.
 * ══════════════════════════════════════════════════════════════════════════
 *
 *  Nothing in the JSX contains a number. Components read from this file, so a
 *  figure is corrected in exactly one place and changes everywhere it appears.
 *
 *  ── How to update a figure ────────────────────────────────────────────────
 *  1. Change `value` (the machine-readable number) AND `display` (what people
 *     see). They must agree.
 *  2. Set `verified: true` and fill in `source` once the society has confirmed
 *     it. Leave `verified: false` and everything still renders — it is just
 *     flagged internally.
 *  3. Update `updated` to today's date.
 *
 *  ── Finding unverified figures on the page ────────────────────────────────
 *      npm run facts                     lists them in the terminal
 *      NEXT_PUBLIC_SHOW_UNVERIFIED=1 npm run dev
 *                                        underlines every one of them on screen
 *
 *  ── Typography inside `display` ───────────────────────────────────────────
 *   is a non-breaking space, so “1,720 m” can never break across lines.
 *  Ranges use an en dash (–), never a hyphen.
 *
 *  EVERY FIGURE BELOW IS CURRENTLY UNVERIFIED. They came from the project
 *  brief, not from the society's own records. Confirm before publication.
 */

import type { Fact } from './types';

const TODAY = '2026-08-27';

export const facts = {
  /* ── Identity and history ─────────────────────────────────────────────── */
  established: {
    id: 'established',
    label: 'Established',
    value: 1967,
    display: '1967',
    verified: false,
    note: 'Founding year under the wider Tetu society. Confirm against the original registration.',
    updated: TODAY,
  },
  independentSince: {
    id: 'independentSince',
    label: 'Independent since',
    value: '2000-06',
    display: 'June 2000',
    verified: false,
    note: 'Month and year of independent registration. Confirm exact date and certificate number.',
    updated: TODAY,
  },
  registrationNumber: {
    id: 'registrationNumber',
    label: 'Registration number',
    value: 'CS/2891',
    display: 'CS/2891',
    verified: false,
    note: 'NOT INVENTED. Supply the Co-operative Societies registration number — international buyers audit this.',
    updated: TODAY,
  },

  /* ── Scale ────────────────────────────────────────────────────────────── */
  members: {
    id: 'members',
    label: 'Farmer members',
    value: 1700,
    display: '1,700',
    approximate: true,
    verified: false,
    note: 'Active membership at last count. Confirm against the current register.',
    updated: TODAY,
  },
  trees: {
    id: 'trees',
    label: 'Coffee trees',
    value: 230000,
    display: '230,000',
    approximate: true,
    verified: false,
    note: 'Total across member farms. Confirm against the last agronomy census.',
    updated: TODAY,
  },
  cherryAnnual: {
    id: 'cherryAnnual',
    label: 'Cherry delivered each year',
    value: 870000,
    display: '870,000',
    unit: 'kg',
    approximate: true,
    verified: false,
    note: 'Annual cherry intake. Confirm the season this refers to — volume swings with the crop cycle.',
    updated: TODAY,
  },
  wetMills: {
    id: 'wetMills',
    label: 'Wet mill',
    value: 1,
    display: 'One',
    verified: false,
    note: 'Single factory. Confirm the factory name for buyer paperwork.',
    updated: TODAY,
  },
  millSite: {
    id: 'millSite',
    label: 'Mill site',
    value: 3,
    display: '3',
    unit: 'hectares',
    approximate: true,
    verified: false,
    note: 'Land area of the wet mill site.',
    updated: TODAY,
  },

  /* ── Terroir ──────────────────────────────────────────────────────────── */
  altitude: {
    id: 'altitude',
    label: 'Altitude',
    value: 1720,
    display: '1,720 m',
    approximate: true,
    verified: false,
    note: 'Altitude at the wet mill. Member farms sit across a range — confirm the spread if you want to publish it.',
    updated: TODAY,
  },
  rainfall: {
    id: 'rainfall',
    label: 'Annual rainfall',
    value: 1100,
    display: '1,100 mm',
    approximate: true,
    verified: false,
    note: 'Mean annual rainfall. Confirm the reference period.',
    updated: TODAY,
  },
  temperature: {
    id: 'temperature',
    label: 'Temperature range',
    value: '16-26',
    display: '16–26 °C',
    verified: false,
    note: 'Annual range. Confirm the source station.',
    updated: TODAY,
  },
  soil: {
    id: 'soil',
    label: 'Soil',
    value: 'Red volcanic',
    display: 'Red volcanic',
    verified: false,
    note: 'Deep red volcanic (nitisol) soils. Confirm classification if a soil survey exists.',
    updated: TODAY,
  },
  varieties: {
    id: 'varieties',
    label: 'Varieties',
    value: 'SL28, SL34, Ruiru 11, Batian',
    display: 'SL28, SL34, Ruiru 11, Batian',
    verified: false,
    note: 'Confirm the approximate share of each variety across member farms — buyers ask.',
    updated: TODAY,
  },

  /* ── Quality and returns ──────────────────────────────────────────────── */
  cuppingScore: {
    id: 'cuppingScore',
    label: 'Cupping score',
    value: 93,
    display: '93',
    unit: 'points',
    verified: false,
    note: 'Confirm the cupping body, the protocol, the lot and the exact date. A score without a source is not a claim a buyer will accept.',
    updated: TODAY,
  },
  cuppingYear: {
    id: 'cuppingYear',
    label: 'Year scored',
    value: 2022,
    display: '2022',
    verified: false,
    note: 'Year the 93-point score was awarded.',
    updated: TODAY,
  },
  nationalRank2024: {
    id: 'nationalRank2024',
    label: 'National ranking, 2024',
    value: 2,
    display: 'Second',
    unit: 'nationally',
    verified: false,
    note: 'Second in Kenya on cherry payment to farmers, 2024. Confirm the publishing body.',
    updated: TODAY,
  },
  cherryPrice2024: {
    id: 'cherryPrice2024',
    label: 'Cherry payment, 2024',
    value: 126,
    display: 'KSh 126',
    unit: 'per kg',
    verified: false,
    note: 'The 2024 payment rate to members. Confirm against the payment schedule.',
    updated: TODAY,
  },
  cherryPriceCurrent: {
    id: 'cherryPriceCurrent',
    label: 'Current cherry price',
    value: 126,
    display: 'KSh 126',
    unit: 'per kg',
    verified: false,
    note: 'SHOWN ON THE MEMBER NOTICEBOARD. Placeholder — currently the 2024 rate. This is the figure members check most; keep it current.',
    updated: TODAY,
  },

  /* ── Indicative prices ────────────────────────────────────────────────
   *  ⚠ PLACEHOLDERS. These four figures are NOT quotes and NOT from the
   *  society. They exist so the catalogue can show a price column, and they
   *  are in the plausible range for washed Nyeri lots — nothing more.
   *
   *  Replace them with the society's own indicative FOB list before the site
   *  is public, or set `showPrices: false` in content/en/products.ts and the
   *  price column disappears from every card.
   */
  priceAA: {
    id: 'priceAA',
    label: 'Indicative price, AA',
    value: 8.6,
    display: 'US$ 8.60',
    unit: 'per kg FOB',
    approximate: true,
    verified: false,
    note: 'PLACEHOLDER — invented for layout, not a quote. Replace with the society\u2019s indicative FOB price or hide the price column.',
    updated: '2026-08-28',
  },
  priceAB: {
    id: 'priceAB',
    label: 'Indicative price, AB',
    value: 8.1,
    display: 'US$ 8.10',
    unit: 'per kg FOB',
    approximate: true,
    verified: false,
    note: 'PLACEHOLDER — invented for layout, not a quote.',
    updated: '2026-08-28',
  },
  pricePB: {
    id: 'pricePB',
    label: 'Indicative price, PB',
    value: 8.4,
    display: 'US$ 8.40',
    unit: 'per kg FOB',
    approximate: true,
    verified: false,
    note: 'PLACEHOLDER — invented for layout, not a quote.',
    updated: '2026-08-28',
  },
  priceC: {
    id: 'priceC',
    label: 'Indicative price, C',
    value: 6.2,
    display: 'US$ 6.20',
    unit: 'per kg FOB',
    approximate: true,
    verified: false,
    note: 'PLACEHOLDER — invented for layout, not a quote.',
    updated: '2026-08-28',
  },

  /* ── Processing ───────────────────────────────────────────────────────── */
  fermentHours: {
    id: 'fermentHours',
    label: 'Fermentation',
    value: 'overnight',
    display: 'Overnight',
    verified: false,
    note: 'Brief says “overnight”. Supply the hour range the mill actually works to (Kenyan mills typically 12–24 hours, varying with temperature).',
    updated: TODAY,
  },
  soakHours: {
    id: 'soakHours',
    label: 'Second soak',
    value: 18,
    display: '18 hours',
    verified: false,
    note: 'NOT INVENTED. Supply the second-soak duration in clean water.',
    updated: TODAY,
  },
  dryingDays: {
    id: 'dryingDays',
    label: 'Drying on raised beds',
    value: '7-15',
    display: '7–15 days',
    verified: false,
    note: 'Sun drying window on raised beds, weather dependent.',
    updated: TODAY,
  },
} as const satisfies Record<string, Fact>;

export type FactId = keyof typeof facts;

export const factList: Fact[] = Object.values(facts);

export const unverifiedFacts: Fact[] = factList.filter((f) => !f.verified);
