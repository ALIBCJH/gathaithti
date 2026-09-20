import type { ProductsContent } from '../types';

export const products: ProductsContent = {
  meta: {
    /* SELLS WHAT THE PAGE SELLS. This said "AA & AB washed Kenya lots" — the
       green-coffee catalogue that was replaced by retail packs in #72, and
       never revisited. A search result promising a roaster two green grades,
       landing them on 100 g bags at KSh 100, is a mismatch Google notices and
       a visitor resents. The same fault it already had once, with PB and C. */
    title: 'Buy Gathaithi coffee — 100 g to 1 kg packs from the society',
    /* Under 160 characters, because that is what a search result shows.
       Everything longer is cut mid-sentence. */
    description:
      'The society\u2019s own roasted coffee in 100\u00a0g, 250\u00a0g, 500\u00a0g and 1\u00a0kg packs, from KSh\u00a0100. Washed Nyeri arabica, roasted and packed at the mill.',
    ogLine: 'Roasted and packed by the society — 100 g to 1 kg',
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
    /* The society's own copy, 2026-09-18. */
    eyebrow: 'How to buy',
    heading: 'Purchasing Our Coffee',
    options: [
      {
        title: 'Roasted Coffee (Local Sales)',
        body: 'Ready-to-brew roasted bags are sold directly at our society office. Contact us to place a local order.',
      },
      {
        title: 'Green Coffee (International Export)',
        body: 'Sun-dried green lots are exported directly to international roasters and importers. Contact our team to request samples, lot specs, and current harvest availability.',
      },
    ],
  },

  catalogue: {
    eyebrow: 'Retail packs',
    heading: 'Buy it by the bag',
    /* ONE COFFEE, FOUR SIZES — so the page shows one bag and lets the buyer
       choose the size, rather than four identical photographs side by side.
       Rebuilt 2026-09-14 ("One bag, pick a size", the client's choice). */
    productName: 'Gathaithi Specialty Coffee',
    productLine: 'Single origin · roasted and packed by the society in Tetu, Nyeri',
    /* Set to false and every price on the page disappears — the size choices,
       the price line and the WhatsApp message. The figures live in
       content/facts.ts (pack100g … pack1kg), verified 2026-09-10. */
    showPrices: true,
    /* The everyday size. The page opens on it. */
    defaultPack: 'pack-250g',
    sizeLabel: 'Choose a size',
    notesLabel: 'In the cup',
    processLabel: 'Roast and process',
    varietiesLabel: 'Varieties',
    orderLabel: 'Order on WhatsApp',
    orderMessage: 'Hello Gathaithi — I would like to order the {{pack}} pack ({{price}}). ',
    askLabel: 'Ask about this pack',
    orderNote:
      'There is no checkout on this site: the office confirms every order and delivery on WhatsApp or by phone. Prices are in Kenyan shillings.',
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
    /* The society's own copy, 2026-09-18. */
    eyebrow: 'Harvest highlights',
    heading: 'The Standout Lots',
    lead:
      'Every harvest yields distinct micro-lots. Here are our top-scoring selections from the current season, chosen for exceptional cup clarity and balance.',
    /* The three cards: the society's own copy, 2026-09-18 (a full stop added
       at the end of the third). */
    cards: [
      {
        label: 'Ripe Harvest',
        title: 'Peak Red Cherries',
        body:
          'Grown at 1,720 meters, our cherries mature slowly in cool mountain air. Hand-picked across multiple passes, only perfectly ripe fruit enters processing.',
        imageSlot: 'gemOne',
      },
      {
        /* Retitled when the photograph arrived. It shows a sack of milled
           green coffee, which is a later stage than parchment on a bed — the
           card cannot keep a parchment title over a picture of the finished
           product. The substance about even drying survives, because that is
           what made a clean grade possible. */
        label: 'Parchment & Export',
        title: 'Export-Ready Green',
        body:
          'Sun-dried on raised beds and milled with care, our green coffee is sorted for size, density, and screen purity—bagged and ready for export.',
        imageSlot: 'gemTwo',
      },
      {
        label: 'Cup Quality',
        title: 'Award-Winning Cup',
        body:
          'Recognized internationally for its distinct character, featuring bright acidity, floral aromas, vibrant black currant notes, and a clean, lingering finish.',
        imageSlot: 'gemThree',
      },
    ],
    statement:
      'We believe this year’s produce is the strongest the catchment has given us in several seasons — and we would rather you judged that from a sample than from this page.',
    cta: { label: 'Request a sample', href: '#request-a-sample' },
  },

  /* FOUR STEPS since 2026-09-20: the client removed step 05, sun-drying on
     raised beds ("we do not need it now"). Drying is still shown in the
     gallery, at the drying beds and the solar drier. The photograph slot
     processDrying is left in content/images.ts, unused. */
  process: {
    eyebrow: 'Processing',
    heading: 'The Craft Behind the Quality',
    /* FIVE STEPS from 2026-09-13. Fermentation (was 03) removed at the
       client's request — "we do not need it" — and the steps after it
       renumbered. Two lines pointed at it as a step of its own and were
       reworded: Pulping's "before fermentation even begins", and Soaking and
       washing's duration "On completion of ferment", now "After pulping".
       The `fermentHours` fact is kept in content/facts.ts, unrendered. */

    steps: [
      {
        n: '01',
        /* Steps 01 and 02: the society's own copy, 2026-09-18. */
        title: 'Selective Harvest & Factory Intake',
        duration: 'Same-day delivery',
        body:
          'Quality is established on the branch. Smallholders hand-pick only fully mature red cherries, delivering their harvest to the factory the same day. At intake, cherries undergo visual inspection and flotation sorting to remove defectives before being officially weighed and logged to the member’s account.',
        detail: 'Recorded to the member',
        imageSlot: 'processPicking',
      },
      {
        n: '02',
        title: 'Eco-Pulping & Density Grading',
        duration: 'Same-day processing',
        body:
          'To preserve cellular integrity and complex fruit sugars, pulping commences immediately on the evening of delivery. Using eco-pulpers, the outer skin is mechanically removed, and parchment is instantly channel-graded by density—channeling only the heaviest, highest-density lots into our premier specialty grades.',
        detail: 'Density-graded at the pulper',
        imageSlot: 'processPulping',
      },
      {
        n: '03',
        /* "Soaking and washing" from 2026-09-11, at the client's request, with
           their own photograph of the soaking tank. The body already covered
           both — it was written when the second soak was folded in here. */
        /* The society's own copy, 2026-09-20 (their second version). It names
           controlled fermentation, which the client confirmed should stand;
           the home page's processing line still leaves fermentation out, and
           the soak no longer quotes {{soakHours}}. */
        title: 'Washing Precision & Quality Refining',
        duration: 'Channel washing & soaking',
        /* The second soak used to be a step of its own and was replaced by
           grading. Its substance is folded in here rather than dropped: it is
           the same parchment in the same water, it happens at this point, and
           "the step most origins skip" is a real differentiator to a buyer —
           not something to lose in a reshuffle. */
        body:
          'Following eco-pulping, parchment undergoes controlled fermentation to break down remaining mucilage. It is then thoroughly channel-washed with fresh water and subjected to a clean-water soak—a signature technique that purifies the parchment to unlock exceptional cup clarity, structural acidity, and prolonged shelf-life stability. To protect our ecosystem, all process water is channeled into biological filtration pits for safe soil absorption.',
        detail: 'Clean water, fully submerged',
        imageSlot: 'processWashing',
      },
      {
        n: '04',
        /* The society's own copy, 2026-09-18 (a doubled full stop at the end
           of their text corrected to one). */
        title: 'Quality Sorting',
        /* Two separations, not one, and they happen at different points — so
           the copy says which is which rather than letting the photograph
           imply that all of it happens in the water. The frame shows the
           hand-sort on the beds, because density grading happens under water
           and photographs as water. */
        duration: 'Two-stage sorting',
        body:
          'Quality control happens in two quick steps. First, water channels separate heavy, flavor-dense beans from lighter ones. Next, as the beans dry, trained workers carefully hand-pick out any defective or broken pieces to protect lot purity.',
        detail: 'By density, then by hand',
        imageSlot: 'processGrading',
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
    lead: 'Prices, delivery, or a bigger order — ask the office. WhatsApp is usually the fastest reply.',

    channels: {
      whatsapp: {
        label: 'WhatsApp us',
        note: 'Fastest reply',
        prefill: 'Hello Gathaithi — I saw the coffee packs on your website and would like to ask about them.',
      },
      phone: { label: 'Call the office', note: 'Mon\u2013Sat 8:00\u201316:00' },
      missing: 'Number to be confirmed by the society',
    },

    form: {
      heading: 'Or send a message',
      fields: {
        pack: 'Which size?',
        email: 'Your email',
        message: 'Your message',
      },
      packAny: 'Not sure yet',
      placeholders: {
        email: 'you@example.com',
        message: 'How many packs, where you are, or anything you would like to know.',
      },
      submit: 'Send message',
      consent: 'We use what you send only to answer you. We never sell or share it.',
      /* Overrides common.form, whose success line promises "sample
         availability and despatch details" — written for an importer. */
      success: {
        title: 'Message received',
        body: 'Thank you. The office will come back to you, usually within two working days. If it is urgent, WhatsApp is faster.',
        again: 'Send another message',
      },
    },
  },
};
