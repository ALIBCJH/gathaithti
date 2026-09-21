import type { HomeContent } from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Gathaithi Coffee — farmer-owned washed Kenya coffee, Tetu, Nyeri',
    description:
      'Farmer-owned washed Kenya coffee from Tetu, Nyeri. {{members}} smallholder members, one wet mill, {{varieties}}, sold direct by the society.',
    ogLine: 'Farmer-owned washed coffee from Tetu, Nyeri County, Kenya',
  },

  hero: {
    title: 'Gathaithi Farmers’ Co‑operative Society',
    /* The same name, split for the phone: one word at display size and the
       rest under it in small capitals. Kept here rather than split in the
       component, where an apostrophe or a hyphen would decide where it broke. */
    titleLead: 'Gathaithi',
    titleRest: 'Farmers’ Co‑operative Society',
    /* No line under the name: the society asked on 2026-09-18 for "Coffee
       that makes you glow." to come off the hero, and nothing replaces it. */
    scrollMore: 'More',
    /* The button this replaced went to /about. A downward arrow at the foot of
       a hero means "there is more below", so it scrolls rather than navigates —
       About is a tap away in the drawer. The label is what a screen reader
       announces; nothing draws it. */
    scrollDown: 'Scroll to the next section',
    scrollHint: 'Scroll',
    slideLabel: 'Slide {{n}} of {{total}}',
    pauseLabel: 'Pause the hero photographs',
    playLabel: 'Play the hero photographs',
    regionLabel: 'Photographs of Gathaithi coffee',
  },

  /* THE SOCIETY'S OWN WORDS, supplied 2026-09-08 on its letterhead:

       Vision:  A LEADER IN PRODUCTION AND MARKETING OF SPECIALITY COFFEE IN
                KENYA
       Mission: TO ENHANCE SOCIAL ECONOMIC PROGRESS OF OUR MEMBERS THROUGH
                PRODUCTION OF QUANTITY AND QUALITY SPECIALITY COFFEE

     Set in sentence case here and otherwise untouched. "Speciality" is their
     spelling, and "social economic" is their phrase rather than
     "socio-economic" — neither is corrected, because these are the statements
     the co-operative adopted and not copy for this site to improve.

     The motto, KILIMO BIASHARA, was supplied at the same time. It is not in
     this band: it heads By the numbers (`proof.heading` below). It was also
     on the hero, over the photographs, from 2026-09-11 until the client asked
     for it off on 2026-09-13. */
  statements: {
    eyebrow: 'What drives us',
    items: [
      {
        label: 'Vision',
        body: 'A leader in production and marketing of speciality coffee in Kenya.',
      },
      {
        label: 'Mission',
        body: 'To enhance social economic progress of our members through production of quantity and quality speciality coffee.',
      },
    ],
  },

  proof: {
    eyebrow: 'By the numbers',
    /* The society's motto, asked for here 2026-09-11 in place of "A coffee
       society built on quality, ownership and time." Kiswahili, so the
       heading is marked `lang="sw"` for screen readers. */
    heading: 'Kilimo Biashara',
    headingLang: 'sw',
    /* THREE, not four. `cuppingScore` — 93 points, "A cup worth noticing" —
       was the first of them and was removed at the user's request.

       It is only gone from HERE. The fact still exists in content/facts.ts and
       is still cited on About (the timeline entry for that year) and on Our
       Coffee (the "cup it scored" card), because those two put it in a
       sentence with its lot and its date attached. On this band it was a bare
       93 above the fold, which is the setting a score is least defensible in —
       it is still `verified: false` and has no named cupping body. */
    factIds: ['nationalRank2024', 'established', 'members'],
    /* Set differently here from the fact's own `display`, and nowhere else.
       `nationalRank2024` displays as the word "Second" because the About page
       puts it inside sentences — "Second nationally on cherry payment" — where
       a glyph would not read. On a poster the glyph is the point. Same fact,
       same audit trail; only the setting differs. */
    figures: {
      nationalRank2024: '#2',
    },
    titles: {
      /* The society's own wording, supplied 2026-09-18. */
      nationalRank2024: 'Kenya’s #2 Farmer Payout',
      established: 'Heritage & Independence',
      members: 'Farmer-Owned',
    },
    captions: {
      nationalRank2024: 'Ranked among Kenya’s highest-paying coffee societies in 2024.',
      /* 1967 and 1,988 come from the facts so they cannot drift from the big
         figures above them. "2000" is written out because the
         `independentSince` fact displays the full date, 21 January 2000. */
      /* The society's own copy, 2026-09-20; "Tetu Farmers Cooperative" set in
         the site's spelling, Tetu Farmers’ Co-operative Society. */
      established: 'Originally founded in {{established}} under the larger Tetu Farmers’ Co-operative Society, Gathaithi officially branched off in 2000 to operate as a fully independent, member-owned society.',
      members: 'A collective of {{members}} smallholder farmers producing coffee with shared ownership.',
    },
  },

  /* ORIGIN & CRAFT — the society's own copy, supplied 2026-09-18, with two
     parts of it held back on the client's instruction:

       - Grades and varieties stay as the facts say (Mbuni; Ruiru Grafted &
         Batian). The supplied table listed AA, AB, PB and SL28, SL34 as well,
         which contradicts what the society confirmed on 2026-09-11.
       - "72h fermentation" is left out of the processing line. The
         Fermentation step was removed from Our Coffee on 2026-09-13.

     The rest is as written. */
  season: {
    eyebrow: 'Varieties',
    heading: 'Origin & Craft',
    lead:
      /* Second version of this lead, from the society 2026-09-20. */
      'Exceptional coffee starts with dedicated stewardship. Our smallholders selectively harvest cherries at peak ripeness, processing every lot through precise channel-washing and meticulous raised-bed drying. The result is a clean, vibrant Kenyan cup profile delivered with full supply-chain transparency.',
    status: 'Active harvest — samples available',
    rows: [
      { label: 'Available grades', value: '{{grades}}' },
      { label: 'Varieties', value: '{{varieties}}' },
      { label: 'Certifications', value: '{{certificationRA}} | {{eudr}}' },
      { label: 'Processing method', value: 'Fully washed, sun-dried on raised beds' },
      { label: 'Annual cherry intake', value: '{{cherryAnnual}} kg' },
      { label: 'Sample dispatch', value: '250 g / 1 kg green samples, sold both locally and internationally' },
    ],
    cta: { label: 'See this season’s lots', href: 'products' },
  },

  /* The heading is the society's; the four step lines are ours, written to
     the photographs they sit under. Retail coffee is roasted and packed by
     the society (see Our Coffee), which is what step three says. */
  journey: {
    /* The society's own copy, 2026-09-20, replacing the headings and step
       lines written for the photographs on 2026-09-18. */
    eyebrow: 'Farm to cup',
    heading: 'From the Highlands of Nyeri to the Global Cup',
    lead: 'Trace our harvest from high-altitude farms across Nyeri to exceptional coffees enjoyed worldwide.',
    steps: [
      {
        label: 'Selective Picking',
        title: 'Ripe Cherry',
        body: 'Smallholders hand-select only fully mature, crimson cherries and deliver them to our wet mill the same day.',
        imageSlot: 'journeyCherry',
      },
      {
        label: 'Wet Milling & Grading',
        title: 'Green Coffee',
        body: 'Channel-washed and sun-dried on raised beds, our parchment is hulled and graded into uniform green lots.',
        imageSlot: 'journeyGreen',
      },
      {
        label: 'Craft Roasting',
        title: 'Local Roast',
        body: 'Roasted and packed at our society headquarters to unlock the vibrant fruit sweetness of the classic Nyeri origin.',
        imageSlot: 'journeyRoasted',
      },
      {
        label: 'The Final Brew',
        title: 'The Experience',
        body: 'Exceptional coffee grown with care in Nyeri, enjoyed at home, in cafes, or across global markets.',
        imageSlot: 'journeyCup',
      },
    ],
    cta: { label: 'Order a pack', href: 'products' },
  },

  /* GLOBAL ROASTER ACCLAIM — replaced the "Every kilo has a name attached"
     story section and its photograph on 2026-09-18. The three quotations were
     supplied by the society and are published verbatim, attributed to the
     roaster that wrote them. */
  acclaim: {
    eyebrow: 'What roasters say',
    heading: 'Global Roaster Acclaim',
    quotes: [
      {
        text: 'Gathaithi produces stunning coffees that exemplify the complexity, sweetness, and vibrancy of the Nyeri profile.',
        source: 'Passenger Coffee',
        country: 'USA',
      },
      {
        text: 'A classic representation of a Kenyan profile—extremely bright, juicy mouthfeel, and rich fructose sweetness.',
        source: 'Sample Coffee Roasters',
        country: 'Australia',
      },
      {
        text: 'Bright, sweet, and full of energy, but still polished enough to drink every day.',
        source: 'Moustache Coffee Club',
        country: 'USA',
      },
    ],
  },

  /* PARKED — nothing renders this. It previewed the members' noticeboard on
     the home page and linked to it. The noticeboard is gone, which made this
     card's own copy untrue: it said the noticeboard "carries the current
     cherry rate, payment dates, collection times and AGM notices". A card
     describing a page that no longer exists is worse than no card. */
  noticeboard: {
    eyebrow: 'Members',
    heading: 'Cherry price and payment dates',
    lead:
      'The noticeboard carries the current cherry rate, payment dates, collection times and AGM notices. It is built to load fast and read clearly on a phone in the sun.',
    cta: { label: 'Open the noticeboard', href: 'farmers#noticeboard' },
  },

  /* The marks of four organisations the society works with, supplied by the
     society. Names only — no line about what any of them does, and no claim
     about the nature of the relationship. Those are statements about other
     companies and none of them is ours to write; if the society wants them,
     it supplies the words. The names are read off the marks themselves. */
  partners: {
    eyebrow: 'Partners',
    heading: 'Who we work with',
    items: [
      { id: 'cms', name: 'Coffee Management Services', imageSlot: 'partnerCms' },
      { id: 'dormans', name: 'Dormans', imageSlot: 'partnerDormans' },
      { id: 'ea-bean', name: 'EA Bean Co.', imageSlot: 'partnerEaBean' },
      { id: 'e4impact', name: 'E4Impact Foundation', imageSlot: 'partnerE4impact' },
    ],
  },
};
