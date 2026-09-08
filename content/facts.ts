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

/* The day the society answered a written list of questions about itself. Every
   figure carrying this date came from the factory rather than from the project
   brief, and is the first verified data this file has held. */
const FROM_SOCIETY = '2026-09-08';
const SOURCE = 'Supplied by Gathaithi Farmers Co-op Society Ltd, 2026-09-08.';

export const facts = {
  /* ── Identity and history ─────────────────────────────────────────────── */
  /* ⚠ STILL UNVERIFIED, AND NOW IN DOUBT. Asked "year formed", the society
     answered 21 January 2000 — the date this co-operative was registered — and
     said nothing about 1967. 1967 came from the project brief and is the claim
     that "Gathaithi grew coffee under the wider Tetu society from 1967", which
     is a different statement from when the society was formed and was NOT
     confirmed either way.

     It matters because the home page prints it under "More than five decades of
     coffee". If the society only dates itself from 2000, that heading and the
     opening line of the story on the home page both go. Raised with the client;
     unanswered. Do not mark this verified on the strength of the 2000 date. */
  established: {
    id: 'established',
    label: 'Established',
    value: 1967,
    display: '1967',
    verified: false,
    note: 'NOT CONFIRMED. The society gave 21 January 2000 as the year formed and did not mention 1967. This figure claims coffee was grown here under the wider Tetu society from 1967 — confirm it separately or remove the claim.',
    updated: FROM_SOCIETY,
  },
  independentSince: {
    id: 'independentSince',
    label: 'Independent since',
    value: '2000-01-21',
    display: '21 January 2000',
    verified: true,
    source: SOURCE,
    note: 'The society’s own answer to "year formed". The registration certificate number is still not supplied.',
    updated: FROM_SOCIETY,
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
  /* ACTIVE members. The society also reports 632 dormant — see membersDormant.
     Everything on the site that says "{{members}} smallholders own this
     society" means the active register, which is the honest number for a
     sentence about who holds the shares and delivers the cherry. */
  members: {
    id: 'members',
    label: 'Farmer members',
    value: 1988,
    display: '1,988',
    verified: true,
    source: SOURCE,
    note: 'Active members. A further 632 are dormant.',
    updated: FROM_SOCIETY,
  },
  membersDormant: {
    id: 'membersDormant',
    label: 'Dormant members',
    value: 632,
    display: '632',
    verified: true,
    source: SOURCE,
    note: 'On the register but not currently delivering. Nothing renders this yet.',
    updated: FROM_SOCIETY,
  },
  trees: {
    id: 'trees',
    label: 'Coffee trees',
    value: 330000,
    display: '330,000',
    verified: true,
    source: SOURCE,
    note: 'Total across member farms.',
    updated: FROM_SOCIETY,
  },
  /* A FLOOR, NOT A POINT. The society answered "from 1,000,000 kgs and above",
     so the display says "Over" and the value holds the floor. Do not quietly
     turn this into a single number in a sentence that implies precision. */
  cherryAnnual: {
    id: 'cherryAnnual',
    label: 'Cherry delivered each year',
    value: 1000000,
    display: 'Over 1,000,000',
    unit: 'kg',
    verified: true,
    source: SOURCE,
    note: 'The society\u2019s answer was "from 1,000,000 Kgs and above". Volume swings with the crop cycle.',
    updated: FROM_SOCIETY,
  },
  /* ── Governance ───────────────────────────────────────────────────────
   * The society reports SEVEN board members and THREE supervisory. The About
   * page carries NINE portraits — six management and three supervisory — so
   * one board member has no portrait and no name on this site. Raised with the
   * client; unanswered. */
  boardMembers: {
    id: 'boardMembers',
    label: 'Board members',
    value: 7,
    display: 'Seven',
    verified: true,
    source: SOURCE,
    note: 'The society corrected an earlier answer of ten. Only six management portraits are published — one board member is missing a name and a photograph.',
    updated: FROM_SOCIETY,
  },
  supervisoryMembers: {
    id: 'supervisoryMembers',
    label: 'Supervisory committee',
    value: 3,
    display: 'Three',
    verified: true,
    source: SOURCE,
    updated: FROM_SOCIETY,
  },
  agmMonth: {
    id: 'agmMonth',
    label: 'Annual General Meeting',
    value: 'February',
    display: 'February',
    verified: true,
    source: SOURCE,
    note: 'Held mostly in February; the last was 24 February 2026.',
    updated: FROM_SOCIETY,
  },

  /* ── The coffee year ──────────────────────────────────────────────────
   * The site said the main crop "runs from October", which was the brief's
   * guess. The society gives August to December, with the fly crop April to
   * July — a materially longer and earlier main crop than was published. */
  mainCrop: {
    id: 'mainCrop',
    label: 'Main crop',
    value: '2026-08/2026-12',
    display: 'August – December',
    verified: true,
    source: SOURCE,
    updated: FROM_SOCIETY,
  },
  flyCrop: {
    id: 'flyCrop',
    label: 'Fly crop',
    value: '2026-04/2026-07',
    display: 'April – July',
    verified: true,
    source: SOURCE,
    updated: FROM_SOCIETY,
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
  /* BATIAN IS GONE. The brief listed four varieties; the society lists three,
     so anything describing "the newer disease-resistant releases" in the
     plural now rests on Ruiru 11 alone. */
  varieties: {
    id: 'varieties',
    label: 'Varieties',
    value: 'SL28, SL34, Ruiru 11',
    display: 'SL28, SL34 & Ruiru 11',
    verified: true,
    source: SOURCE,
    note: 'The approximate share of each across member farms is still not supplied — buyers ask.',
    updated: FROM_SOCIETY,
  },
  grades: {
    id: 'grades',
    label: 'Grades produced',
    value: 'AA, AB, C, PB, T, TT, UG',
    display: 'AA, AB, C, PB, T, TT & UG',
    verified: true,
    source: SOURCE,
    note: 'Every grade the dry mill separates out of this society’s parchment — not the same as what is offered for sale in a given season.',
    updated: FROM_SOCIETY,
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
  /* The brief's "KSh 126 in 2024" was never right: the society's own schedule
     gives 130.37 for 2023–2024 and 138.50 for 2024–2025. Kept as the
     2024–2025 rate, which is what a sentence about "last season" means. */
  cherryPrice2024: {
    id: 'cherryPrice2024',
    label: 'Cherry payment, 2024 – 2025',
    value: 138.5,
    display: 'KSh 138.50',
    unit: 'per kg',
    verified: true,
    source: SOURCE,
    note: 'Replaces a brief figure of KSh 126, which matched no season the society reports.',
    updated: FROM_SOCIETY,
  },
  cherryPriceCurrent: {
    id: 'cherryPriceCurrent',
    label: 'Cherry payment, 2025 – 2026',
    value: 147,
    display: 'KSh 147',
    unit: 'per kg',
    verified: true,
    source: SOURCE,
    note: 'The 2025–2026 season rate, and the figure members check most. Update it each season from `cherryPayments` at the foot of this file.',
    updated: FROM_SOCIETY,
  },
  mbuniPriceCurrent: {
    id: 'mbuniPriceCurrent',
    label: 'Mbuni payment, 2025 – 2026',
    value: 465,
    display: 'KSh 465',
    unit: 'per kg',
    verified: true,
    source: SOURCE,
    note: 'Mbuni is the dried natural, hulled from cherry dried whole rather than washed. Paid per kilo of MBUNI, which is why the rate is several times the cherry rate — it takes roughly five to six kilos of cherry to make one.',
    updated: FROM_SOCIETY,
  },

  /* ── Retail pack prices ───────────────────────────────────────────────
   * Supplied by the client on 2026-09-07 for the four roasted retail packs.
   * `verified` stays FALSE like every other figure on this site: it is the
   * flag that lets `productLd` publish an `offers` block, and publishing a
   * price to a search engine is a different act from printing one on a page.
   * Flip these four to true, with a source, once the society confirms them
   * as its published retail list.
   *
   * Note for whoever confirms them: the four are a flat KSh 1,000/kg at every
   * size — the 100g costs the same per gram as the 1kg. That is unusual for
   * retail, where the small pack normally carries a premium, so it is worth
   * checking it is deliberate rather than a rounding of the list.
   */
  pack100g: {
    id: 'pack100g',
    label: 'Retail price, 100 g',
    value: 100,
    display: 'KSh 100',
    unit: 'per 100 g pack',
    verified: false,
    note: 'Supplied by the client 2026-09-07. Confirm against the society\u2019s published retail list.',
    updated: '2026-09-07',
  },
  pack250g: {
    id: 'pack250g',
    label: 'Retail price, 250 g',
    value: 250,
    display: 'KSh 250',
    unit: 'per 250 g pack',
    verified: false,
    note: 'Supplied by the client 2026-09-07. Confirm against the society\u2019s published retail list.',
    updated: '2026-09-07',
  },
  pack500g: {
    id: 'pack500g',
    label: 'Retail price, 500 g',
    value: 500,
    display: 'KSh 500',
    unit: 'per 500 g pack',
    verified: false,
    note: 'Supplied by the client 2026-09-07. Confirm against the society\u2019s published retail list.',
    updated: '2026-09-07',
  },
  pack1kg: {
    id: 'pack1kg',
    label: 'Retail price, 1 kg',
    value: 1000,
    display: 'KSh 1,000',
    unit: 'per 1 kg pack',
    verified: false,
    note: 'Supplied by the client 2026-09-07. Confirm against the society\u2019s published retail list.',
    updated: '2026-09-07',
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

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  WHAT THE SOCIETY HAS PAID ITS MEMBERS, SEASON BY SEASON.
 * ══════════════════════════════════════════════════════════════════════════
 *
 *  Supplied by the society on 2026-09-08 and the most checkable thing on this
 *  site: a co-operative's payment history is the number its own members judge
 *  it by, and the one a buyer can ask it to stand behind.
 *
 *  Both rates are KSh PER KILO, and they are not comparable to each other.
 *  Cherry is the fresh fruit as delivered to the wet mill. Mbuni is the dried
 *  natural — cherry dried whole and hulled rather than washed — so a kilo of
 *  mbuni is several kilos of cherry, which is why the rate is several times
 *  higher and why the two are never added together.
 *
 *  These are NOT in `facts` above. A Fact is one figure with one label; this
 *  is a table, and flattening it into twenty entries would lose the thing that
 *  makes it worth publishing, which is the shape of the line.
 */
export interface SeasonPayment {
  /** As the society writes it. */
  season: string;
  /** KSh per kilo of fresh cherry delivered. */
  cherry: number;
  /** KSh per kilo of mbuni, the dried natural. */
  mbuni: number;
}

export const cherryPayments: SeasonPayment[] = [
  { season: '2021 – 2022', cherry: 119.5, mbuni: 160 },
  { season: '2022 – 2023', cherry: 80, mbuni: 149 },
  { season: '2023 – 2024', cherry: 130.37, mbuni: 179 },
  { season: '2024 – 2025', cherry: 138.5, mbuni: 334 },
  { season: '2025 – 2026', cherry: 147, mbuni: 465 },
];

/** The season the two `…PriceCurrent` facts above refer to. */
export const currentSeason = cherryPayments[cherryPayments.length - 1];

export const factList: Fact[] = Object.values(facts);

export const unverifiedFacts: Fact[] = factList.filter((f) => !f.verified);
