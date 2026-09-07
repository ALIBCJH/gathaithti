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

  /* PARKED, and parked by a decision rather than by accident. #52 rendered
     these three lines as a masthead above the processing head, because the
     page's h1 was otherwise a chapter title ("From cherry to parchment") and
     the page named itself nowhere. The user saw it and asked for it removed:
     Our Coffee opens on the processing band, and the first thing under the
     header is the work. Do not re-render this without being asked.

     The lead is still a real claim with no home — "Every lot on this page
     comes from one wet mill and one catchment of {{members}} smallholders" —
     and the catalogue band is where it would sit if it is ever wanted. That
     band opens the page now and carries its h1, so anything from here would be
     a second title directly above the first. */
  hero: {
    eyebrow: 'Our coffee',
    title: 'This season’s lots',
    lead:
      'Every lot on this page comes from one wet mill and one catchment of {{members}} smallholders. Grades are separated after milling; nothing is bought in, blended in, or bulked up.',
  },

  marketNote: {
    eyebrow: 'How it is sold',
    heading: 'How to buy Gathaithi',
    /* Rewritten when the catalogue changed from green-coffee lots to retail
       packs. It used to say "there are no prices and no checkout here", which
       stopped being true the moment the packs went up with a price on each.
       There is still no checkout — that part stands — and everything about
       how the GREEN coffee moves is unchanged, because that has not. */
    body: [
      'Two different things are sold here, and they do not move the same way. The roasted packs above are the society\u2019s own retail line, priced in shillings and ordered from the office — there is no checkout on this page.',
      'Green coffee is another matter. It is sold either through the Nairobi Coffee Exchange auction or under a direct-sales licence, so if you are a roaster or importer, request a sample: the marketing office will send it with the lot details, current availability and the route we can sell it to you by.',
    ],
  },

  catalogue: {
    eyebrow: 'Retail packs',
    heading: 'Buy it by the bag',
    /* NO LEAD. There was one — "The society roasts and packs its own coffee in
       four sizes. It is one coffee — the same washed Nyeri lots that go to the
       dry mill — roasted medium and ground, packed under the society's own
       name." The user asked for it removed. The band opens the page, and the
       four cards say the sizes themselves; the sentence about one coffee in
       four sizes was explaining what the row below it already shows. The
       claim about the roast and the mill survives on each card, under Full
       specification (Process: fully washed, medium roast, ground). */
    legend: {
      available: 'In stock',
      allocated: 'Out of stock',
      forward: 'To order',
    },

    /* ── Prices ──────────────────────────────────────────────────────────
     * Set showPrices to false and every price on this page disappears — the
     * cards, the sorting option and the Product structured data all follow.
     * The figures live in content/facts.ts (pack100g … pack1kg) and were
     * supplied by the client on 2026-09-07. They are still `verified: false`,
     * which is what keeps them OUT of the structured data: printing a price on
     * a page and publishing it to a search engine are different acts.
     */
    showPrices: true,
    priceCaption: 'per pack',
    priceNote:
      'Prices are in Kenyan shillings and were supplied by the society. Confirm the current list with the office before ordering — the figure that binds is the one the office quotes, not the one on this page.',
    indicativeLabel: 'Retail',
    moqLabel: 'Minimum',
    filterLabel: 'Size',
    filterAll: 'All sizes',
    sortLabel: 'Sort by',
    sortOptions: [
      { id: 'grade', label: 'Size' },
      { id: 'price', label: 'Price, low to high' },
      { id: 'availability', label: 'Availability' },
    ],
    resultCount: '{count} sizes',
    resultCountOne: '1 size',
    emptyState: 'No packs match that combination.',
    clearFilters: 'Show all sizes',
    detailsLabel: 'Full specification',
    requestLotLabel: 'Enquire about this pack',
  },

  /* FOUR RETAIL PACKS, replacing the AA and AB green-coffee lots.
     Same coffee in four sizes, so everything except weight, price and
     photograph is identical between them — which is the honest way to write
     it. The wholesale fields (minimum order, incoterm, screen size, harvest
     window, volume) are OMITTED rather than filled with something plausible:
     a 100 g bag on a shelf has no incoterm.

     `grade` carries the net weight, because it is the thing that names the
     card, and the card sets it large.

     NO CUPPING SCORE. The 93 points were awarded to a washed GREEN lot; a bag
     of ground medium roast is a different product and cannot inherit it. */
  lots: [
    {
      id: 'pack-100g',
      grade: '100g',
      name: 'Gathaithi 100 g',
      priceFactId: 'pack100g',
      varieties: '{{varieties}}',
      processing: 'Fully washed, medium roast, ground',
      cuppingNotes: ['Floral', 'Chocolate', 'Caramel'],
      packaging: '100 g resealable pack',
      availability: 'available',
      availabilityLabel: 'In stock',
      description:
        'The smallest pack — a week of mornings, or a way to try the society\u2019s own roast before committing to a larger bag.',
      imageSlot: 'pack100g',
    },
    {
      id: 'pack-250g',
      grade: '250g',
      name: 'Gathaithi 250 g',
      priceFactId: 'pack250g',
      varieties: '{{varieties}}',
      processing: 'Fully washed, medium roast, ground',
      cuppingNotes: ['Floral', 'Chocolate', 'Caramel'],
      packaging: '250 g resealable pack',
      availability: 'available',
      availabilityLabel: 'In stock',
      description:
        'The everyday size. Enough for a fortnight of a two-cup morning, and small enough to finish while it is still fresh.',
      imageSlot: 'pack250g',
    },
    {
      id: 'pack-500g',
      grade: '500g',
      name: 'Gathaithi 500 g',
      priceFactId: 'pack500g',
      varieties: '{{varieties}}',
      processing: 'Fully washed, medium roast, ground',
      cuppingNotes: ['Floral', 'Chocolate', 'Caramel'],
      packaging: '500 g resealable pack',
      availability: 'available',
      availabilityLabel: 'In stock',
      description:
        'For a household that drinks it daily, or an office that goes through a bag a month.',
      imageSlot: 'pack500g',
    },
    {
      id: 'pack-1kg',
      grade: '1kg',
      name: 'Gathaithi 1 kg',
      priceFactId: 'pack1kg',
      varieties: '{{varieties}}',
      processing: 'Fully washed, medium roast, ground',
      cuppingNotes: ['Floral', 'Chocolate', 'Caramel'],
      packaging: '1 kg resealable pack',
      availability: 'available',
      availabilityLabel: 'In stock',
      description:
        'The largest pack. For a café, a shop, or anyone buying for more than one kitchen.',
      imageSlot: 'pack1kg',
    },
  ],

  /* The season's standout: what the mill produced this year. It sits after
     the processing walkthrough and immediately above the sample request, which
     is the action it argues for.
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

  /* THE REACH-OUT CARD. Rewritten from an eight-field importer form — name,
     company, country, role, volume of interest, lot of interest, "what are you
     looking for?" — which was asking a stranger for a CV before it would tell
     them the price of a bag of coffee.

     WhatsApp is first because that is how the enquiry actually arrives. The
     numbers themselves live in content/site.ts and are NOT written here; a
     channel whose number is unset renders as plain text rather than as a dead
     link, so nothing on this page can dial the wrong person.

     An importer is not shut out — the market note two bands up still points
     roasters here, and the message box is where they say who they are. */
  sample: {
    eyebrow: 'Get in touch',
    heading: 'Ask us about the coffee',
    lead:
      'The office answers WhatsApp fastest during working hours. If you would rather write, the form below reaches the same desk.',

    channels: {
      whatsapp: {
        label: 'WhatsApp us',
        note: 'Fastest — office hours',
        prefill: 'Hello Gathaithi — I saw the coffee packs on your website and would like to ask about them.',
      },
      phone: { label: 'Call the office', note: 'Mon\u2013Fri 8:00\u201317:00, Sat 8:00\u201313:00' },
      missing: 'Number to be confirmed by the society',
    },

    form: {
      heading: 'Or write to us here',
      fields: {
        pack: 'Which size are you interested in?',
        email: 'Your email',
        message: 'Your message',
      },
      packAny: 'Not sure yet',
      placeholders: {
        email: 'you@example.com',
        message: 'How much you are after, and where you are — anything that helps the office answer you properly.',
      },
      submit: 'Send message',
      consent:
        'We use what you send here to answer your enquiry and nothing else. We do not sell or share it.',
      /* Overrides common.form, whose success line promises "sample
         availability and despatch details" — written for an importer, and the
         wrong thing to tell somebody asking the price of a 250 g bag. */
      success: {
        title: 'Message received',
        body: 'Thank you. The office will come back to you, usually within two working days. If it is urgent, WhatsApp is faster.',
        again: 'Send another message',
      },
    },
  },
};
