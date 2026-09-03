import type { ProductsContent } from '../types';

export const products: ProductsContent = {
  meta: {
    /* Says AA and AB because the catalogue is AA and AB. It still advertised
       PB and C after those lots were withdrawn — a search result promising two
       grades the page does not carry. */
    title: 'Our Coffee — Gathaithi AA & AB washed Kenya lots',
    description:
      'Washed Kenya lots from Gathaithi: AA and AB. SL28, SL34, Ruiru 11 and Batian, fermented overnight, second-soaked and dried {{dryingDays}} on raised beds. Request a sample from the society.',
    ogLine: 'AA · AB — fully washed, second soak, raised-bed dried',
  },

  /* The page's own opening — no longer parked, and no longer a hero band.
     Between #40 and now the page began on PROCESSING / step 01, so clicking
     "Our Coffee" landed you on something that read as the middle of a page:
     nothing at the top named the page or said what every lot on it has in
     common. These three lines are rendered at the top of the first band, above
     the processing head, by ProcessWalkthrough. */
  hero: {
    eyebrow: 'Our coffee',
    title: 'This season’s lots',
    lead:
      'Every lot on this page comes from one wet mill and one catchment of {{members}} smallholders. Grades are separated after milling; nothing is bought in, blended in, or bulked up.',
  },

  marketNote: {
    eyebrow: 'How it is sold',
    heading: 'How to buy Gathaithi',
    body: [
      'Kenyan green coffee is sold either through the Nairobi Coffee Exchange auction or under a direct-sales licence. This page is a catalogue, not a shop — there are no prices and no checkout here, because that is not how this coffee legally moves.',
      'If you are a roaster or importer, request a sample. The marketing office will send it with the lot details, current availability and the route we can sell it to you by. That conversation is the beginning of every direct relationship the society has.',
    ],
  },

  catalogue: {
    eyebrow: 'Catalogue',
    heading: 'Grades and lots',
    lead:
      'Grading is by screen size and bean form, done at the dry mill after the parchment leaves us. Cup character across the grades is consistent — the differences are in body, clarity and how the lot behaves in the roaster.',
    legend: {
      available: 'Samples available',
      allocated: 'Allocated for this season',
      forward: 'Forward — enquire',
    },

    /* ── Prices ──────────────────────────────────────────────────────────
     * Set showPrices to false and every price on this page disappears — the
     * cards, the sorting option and the Product structured data all follow.
     * The figures themselves live in content/facts.ts (priceAA … priceC) and
     * are PLACEHOLDERS until the society confirms its own indicative list.
     */
    showPrices: true,
    priceCaption: 'per kg, FOB Mombasa',
    priceNote:
      'Prices are indicative, quoted per kilo FOB Mombasa on the current crop, and confirmed on enquiry. Kenyan coffee is sold through the Nairobi Coffee Exchange or under a direct-sales licence, so the figure that binds is the one on the contract, not the one on this page.',
    indicativeLabel: 'Indicative',
    moqLabel: 'Minimum',
    filterLabel: 'Grade',
    filterAll: 'All lots',
    sortLabel: 'Sort by',
    sortOptions: [
      { id: 'grade', label: 'Grade' },
      { id: 'price', label: 'Price, low to high' },
      { id: 'score', label: 'Cupping score' },
      { id: 'availability', label: 'Availability' },
    ],
    resultCount: '{count} lots',
    resultCountOne: '1 lot',
    emptyState: 'No lots match that combination this season.',
    clearFilters: 'Show all lots',
    detailsLabel: 'Full specification',
    requestLotLabel: 'Request this lot',
  },

  lots: [
    {
      id: 'aa',
      grade: 'AA',
      name: 'Gathaithi AA',
      priceFactId: 'priceAA',
      incoterm: 'FOB Mombasa',
      moq: '5 bags · 300 kg',
      scoreValue: 93,
      screen: 'Screen 17/18',
      varieties: 'SL28, SL34, with Ruiru 11 and Batian',
      processing: 'Fully washed · overnight ferment · second soak · raised beds',
      cuppingNotes: ['Blackcurrant', 'Grapefruit zest', 'Brown sugar', 'Dense, juicy body'],
      score: '{{cuppingScore}}',
      harvestWindow: 'Main crop: October – January',
      volume: 'By allocation — enquire for current availability',
      packaging: '60 kg GrainPro-lined sisal, or vacuum-packed on request',
      availability: 'available',
      availabilityLabel: 'Samples available',
      description:
        'The society’s flagship separation and the lot that carries the {{cuppingScore}}-point score. Large, uniform beans from the oldest SL28 blocks on the upper slopes. Structured, sweet and unmistakably Nyeri.',
      imageSlot: 'lotAA',
    },
    {
      id: 'ab',
      grade: 'AB',
      name: 'Gathaithi AB',
      priceFactId: 'priceAB',
      incoterm: 'FOB Mombasa',
      moq: '5 bags · 300 kg',
      screen: 'Screen 15/16',
      varieties: 'SL28, SL34, Ruiru 11, Batian',
      processing: 'Fully washed · overnight ferment · second soak · raised beds',
      cuppingNotes: ['Plum', 'Blood orange', 'Cocoa', 'Rounded acidity'],
      score: 'Cupped each season — score on request',
      harvestWindow: 'Main crop: October – January',
      volume: 'The largest volume the society offers',
      packaging: '60 kg GrainPro-lined sisal, or vacuum-packed on request',
      availability: 'available',
      availabilityLabel: 'Samples available',
      description:
        'The workhorse grade and the bulk of what Gathaithi produces. Marginally softer than the AA and, in most seasons, the better value in the cup — many of our repeat buyers take AB by preference, not by compromise.',
      imageSlot: 'lotAB',
    },
  ],

  /* The season's standout, between the processing walkthrough and the
     catalogue: what the mill produced this year, before the grades it was
     sorted into.
     ═══════════════════════════════════════════════════════════════════════
     DRAFT. Every figure comes through a {{token}} and is therefore as
     verified as the rest of content/facts.ts — which is to say not yet. The
     judgement in the closing line is the society's to make, not this site's;
     it is written the way the society would say it and needs their sign-off
     before the page is shown to a buyer. */
  gem: {
    eyebrow: 'Rare gem',
    heading: 'The best of this season',
    lead:
      'One catchment does not produce the same coffee twice. This is what came off the beds this year, and why the marketing office is putting it forward.',
    cards: [
      {
        title: 'The cherry it started as',
        body:
          'A long, cool ripening at {{altitude}} and several passes through each tree. Only fully red fruit went into the buckets, which is what a density grading at the pulper can actually work with.',
        imageSlot: 'gemOne',
      },
      {
        /* Retitled when the photograph arrived. It shows a sack of milled
           green coffee, which is a later stage than parchment on a bed — the
           card cannot keep a parchment title over a picture of the finished
           product. The substance about even drying survives, because that is
           what made a clean grade possible. */
        title: 'The coffee it became',
        body:
          'Turned by hand on the beds and taken off at even moisture, then hulled and sorted at the dry mill. Uniform drying is what lets a mill pull a clean grade out of a lot, and this is what came back: green coffee, screened and bagged, ready to ship from Mombasa.',
        imageSlot: 'gemTwo',
      },
      {
        title: 'The cup it scored',
        body:
          'A washed lot from this mill cupped at {{cuppingScore}} points in {{cuppingYear}}: blackcurrant, a dense structured acidity, and a finish that holds as it cools.',
        imageSlot: 'gemThree',
      },
    ],
    statement:
      'We believe this year’s produce is the strongest the catchment has given us in several seasons — and we would rather you judged that from a sample than from this page.',
    cta: { label: 'Request a sample', href: '#request-a-sample' },
  },

  process: {
    eyebrow: 'Processing',
    heading: 'From cherry to parchment',
    lead:
      'Kenyan washed processing is exacting and Gathaithi does not shortcut it. Cherry delivered in the evening is pulped the same night and does not leave the mill until it has been fermented, washed, soaked and dried under supervision.',
    steps: [
      {
        n: '01',
        title: 'Selective picking and delivery',
        duration: 'Same day',
        body:
          'Members pick only ripe red cherry, by hand, over several passes through the season. It is delivered to the mill or a collection point the same evening, weighed, recorded against the member’s account and floated to remove floaters and underripes.',
        detail: 'Recorded to the member',
        imageSlot: 'processPicking',
      },
      {
        n: '02',
        title: 'Pulping',
        duration: 'Within hours of delivery',
        body:
          'The disc pulper removes the skin and most of the fruit the same night, and the parchment is separated by density as it leaves the machine. Heavier, denser beans go forward as the top grade before fermentation even begins.',
        detail: 'Density-graded at the pulper',
        imageSlot: 'processPulping',
      },
      {
        n: '03',
        title: 'Fermentation',
        duration: '{{fermentHours}}',
        body:
          'Parchment ferments under supervision in tanks so that the remaining mucilage breaks down cleanly. Cool nights at {{altitude}} make this slower and more even here than at lower altitude, which is a large part of why the cup is clean.',
        detail: 'Dry ferment, tank by tank',
        imageSlot: 'processFermentation',
      },
      {
        n: '04',
        title: 'Washing',
        duration: 'On completion of ferment',
        /* The second soak used to be a step of its own and was replaced by
           grading. Its substance is folded in here rather than dropped: it is
           the same parchment in the same water, it happens at this point, and
           "the step most origins skip" is a real differentiator to a buyer —
           not something to lose in a reshuffle. */
        body:
          'The parchment is washed through channels in clean water, then held under clean water a second time for {{soakHours}}. That second soak is the step most origins skip. It settles and stabilises the coffee before drying, and it is the signature of Kenyan washed processing — the reason for the clarity and the acidity that follows. Water is used deliberately and returned through soak pits rather than into the river.',
        detail: 'Clean water, fully submerged',
        imageSlot: 'processWashing',
      },
      {
        n: '05',
        title: 'Grading and sorting',
        /* Two separations, not one, and they happen at different points — so
           the copy says which is which rather than letting the photograph
           imply that all of it happens in the water. The frame shows the
           hand-sort on the beds, because density grading happens under water
           and photographs as water. */
        duration: 'In the channels, then by hand',
        body:
          'The parchment is graded by density in the washing channels — the heavier, denser beans travel differently from the light ones, and the lights are separated out and kept apart. That is the second density grading of the process; the first happened at the pulper. Then, as the parchment dries on the beds, it is gone through by hand: defects, discoloured beans and anything broken are picked out and set aside. Grading by screen size and bean form comes later still, at the dry mill, after the parchment has left us.',
        detail: 'By density, then by hand',
        imageSlot: 'processGrading',
      },
      {
        n: '06',
        title: 'Drying on raised beds',
        duration: '{{dryingDays}}',
        body:
          'Parchment is skin-dried in shade, then moved onto raised beds in thin layers, turned by hand through the day and covered at midday and overnight. It comes off at 10–12 % moisture and rests in the conditioning store before milling.',
        detail: 'Turned by hand, covered at midday',
        imageSlot: 'processDrying',
      },
    ],
  },

  sample: {
    eyebrow: 'Direct enquiry',
    heading: 'Request a sample',
    lead:
      'Tell us what you roast and what volume you work with. The marketing office replies with current availability, the lot details and a sample by courier — usually within two working days.',
    fields: {
      name: 'Your name',
      company: 'Company',
      email: 'Email',
      country: 'Country',
      role: 'Your role',
      volume: 'Volume of interest',
      lot: 'Lot of interest',
      message: 'What are you looking for?',
    },
    lotAny: 'No particular lot yet',
    placeholders: {
      name: 'Jane Wanjiku',
      company: 'Roastery or importer',
      email: 'you@company.com',
      country: 'United Kingdom',
      message: 'Grades you are interested in, your season, and how you plan to roast the coffee.',
    },
    roles: ['Roaster', 'Importer', 'Exporter', 'Green buyer', 'Retailer', 'Other'],
    volumes: [
      'Under 5 bags (60 kg)',
      '5 – 20 bags',
      '20 – 100 bags',
      'Over 100 bags',
      'Not yet known',
    ],
    submit: 'Send request',
    consent:
      'We use what you send here to answer your enquiry and nothing else. We do not sell or share it.',
  },
};
