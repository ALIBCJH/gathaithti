import type { ProductsContent } from '../types';

export const products: ProductsContent = {
  meta: {
    /* SELLS WHAT THE PAGE SELLS. This said "AA & AB washed Kenya lots" — the
       green-coffee catalogue that was replaced by retail packs in #72, and
       never revisited. A search result promising a roaster two green grades,
       landing them on 100 g bags at KSh 100, is a mismatch Google notices and
       a visitor resents. The same fault it already had once, with PB and C. */
    title: 'Buy Gathaithi Coffee | 100 g to 1 kg packs from the society',
    /* Under 160 characters, because that is what a search result shows.
       Everything longer is cut mid-sentence. */
    description:
      'Our own roasted coffee in 100\u00a0g, 250\u00a0g, 500\u00a0g and 1\u00a0kg packs, from KSh\u00a0100. Washed Nyeri Arabica, roasted and packed by the society.',
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
    title: 'Coffee from our own mill',
    lead:
      'All our coffee comes from a single wet mill, supplied by {{members}} smallholder farmers. Grades are separated after milling, and nothing is bought in or blended.',
  },

  marketNote: {
    eyebrow: 'Buying options',
    heading: 'How to buy Gathaithi',
    /* Rewritten when the catalogue changed from green-coffee lots to retail
       packs. It used to say "there are no prices and no checkout here", which
       stopped being true the moment the packs went up with a price on each.
       There is still no checkout — that part stands — and everything about
       how the GREEN coffee moves is unchanged, because that has not. */
    body: [
      'We sell roasted coffee and green coffee, and each is bought differently. Our roasted packs are priced in Kenyan shillings and ordered directly from our office; there is no online checkout.',
      'Green coffee is sold through the Nairobi Coffee Exchange auction or under a direct-sales licence. Roasters and importers are welcome to request a sample, which our marketing office will send with the lot details, current availability and purchasing options.',
    ],
  },

  catalogue: {
    eyebrow: 'Retail packs',
    heading: 'Order a pack',
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
    orderMessage: 'Hello Gathaithi, I would like to order the {{pack}} pack ({{price}}). ',
    askLabel: 'Ask about this pack',
    orderNote:
      'Orders are not paid online. Our office confirms each order and delivery by WhatsApp or phone. Prices are in Kenyan shillings.',
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
        'Our smallest pack, ideal for trying our coffee before choosing a larger size.',
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
        'A convenient everyday size, small enough to enjoy while the coffee is at its freshest.',
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
        'Suited to households that drink coffee daily, and to small offices.',
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
        'Our largest pack, suited to cafés, shops and larger households.',
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
    eyebrow: 'This season',
    heading: 'This season’s highlights',
    lead:
      'Every harvest is different. These are the qualities of this year’s coffee, and the reasons our marketing office recommends it.',
    cards: [
      {
        title: 'From the cherry',
        body:
          'Slow ripening at {{altitude}} and several picking passes through each tree. Only fully ripe cherry is picked, which allows accurate density grading at the pulper.',
        imageSlot: 'gemOne',
      },
      {
        /* Retitled when the photograph arrived. It shows a sack of milled
           green coffee, which is a later stage than parchment on a bed — the
           card cannot keep a parchment title over a picture of the finished
           product. The substance about even drying survives, because that is
           what made a clean grade possible. */
        title: 'To green coffee',
        body:
          'Turned by hand on the drying beds and taken off at an even moisture level, then hulled and sorted at the dry mill. Even drying produces clean, consistent grades: green coffee, screened and bagged, ready for export through Mombasa.',
        imageSlot: 'gemTwo',
      },
      {
        title: 'In the cup',
        body:
          /* The tasting note is the REVIEWER'S now, not ours. This card used to say
           "blackcurrant, a dense structured acidity, and a finish that holds as
           it cools", which was written for the layout before anybody knew who
           had scored the coffee or what they said about it. */
          'A washed lot from our mill scored {{cuppingScore}} points in a {{cuppingYear}} review by {{cuppingReviewer}}, which described a balanced, floral-toned cup with distinct blackcurrant, a pleasing savoury fruit character and classic Kenyan characteristics.',
        imageSlot: 'gemThree',
      },
    ],
    statement:
      'We believe this is one of the strongest harvests our members have produced in several seasons, and we invite you to judge it for yourself by requesting a sample.',
    cta: { label: 'Request a sample', href: '#request-a-sample' },
  },

  process: {
    eyebrow: 'Processing',
    heading: 'From cherry to parchment',
    /* FIVE STEPS from 2026-09-13. Fermentation (was 03) removed at the
       client's request — "we do not need it" — and the steps after it
       renumbered. Two lines pointed at it as a step of its own and were
       reworded: Pulping's "before fermentation even begins", and Soaking and
       washing's duration "On completion of ferment", now "After pulping".
       The `fermentHours` fact is kept in content/facts.ts, unrendered. */

    steps: [
      {
        n: '01',
        title: 'Selective picking and delivery',
        duration: 'Same day',
        body:
          'Members hand-pick only ripe red cherry, making several passes through the season. The cherry is delivered to the mill or a collection point the same evening, where it is weighed, recorded against the member’s account and floated to remove light and unripe cherry.',
        detail: 'Recorded per member',
        imageSlot: 'processPicking',
      },
      {
        n: '02',
        title: 'Pulping',
        duration: 'Within hours of delivery',
        body:
          'A disc pulper removes the skin and most of the fruit on the night of delivery. As the parchment leaves the machine, it is separated by density, and the heaviest beans go forward as the top grade.',
        detail: 'Density-graded at the pulper',
        imageSlot: 'processPulping',
      },
      {
        n: '03',
        /* "Soaking and washing" from 2026-09-11, at the client's request, with
           their own photograph of the soaking tank. The body already covered
           both — it was written when the second soak was folded in here. */
        title: 'Soaking and washing',
        duration: 'After pulping',
        /* The second soak used to be a step of its own and was replaced by
           grading. Its substance is folded in here rather than dropped: it is
           the same parchment in the same water, it happens at this point, and
           "the step most origins skip" is a real differentiator to a buyer —
           not something to lose in a reshuffle. */
        body:
          'The parchment is washed through channels of clean water, then soaked under clean water a second time for {{soakHours}}. This second soak, a hallmark of Kenyan washed processing, stabilises the coffee before drying and contributes to its clarity and bright acidity. Waste water is returned through soak pits rather than released into the river.',
        detail: 'Clean water, fully submerged',
        imageSlot: 'processWashing',
      },
      {
        n: '04',
        title: 'Grading and sorting',
        /* Two separations, not one, and they happen at different points — so
           the copy says which is which rather than letting the photograph
           imply that all of it happens in the water. The frame shows the
           hand-sort on the beds, because density grading happens under water
           and photographs as water. */
        duration: 'In the channels, then by hand',
        body:
          'The parchment is graded by density in the washing channels, where the heavier beans separate from the lighter ones. This is the second density grading, after the first at the pulper. As the parchment dries on the beds, it is sorted by hand to remove defective, discoloured and broken beans. Grading by screen size and bean shape follows later, at the dry mill.',
        detail: 'By density, then by hand',
        imageSlot: 'processGrading',
      },
      {
        n: '05',
        title: 'Drying on raised beds',
        duration: '{{dryingDays}}',
        body:
          'The parchment is first skin-dried in the shade, then spread in thin layers on raised beds. It is turned by hand throughout the day and covered at midday and overnight. Once it reaches 10–12% moisture, it rests in the conditioning store before milling.',
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
    lead: 'For prices, delivery or larger orders, please contact our office. WhatsApp is usually the quickest way to reach us.',

    channels: {
      whatsapp: {
        label: 'WhatsApp us',
        note: 'Quickest response',
        prefill: 'Hello Gathaithi, I saw your coffee packs on your website and would like to ask about them.',
      },
      phone: { label: 'Call the office', note: 'Mon\u2013Sat 8:00\u201316:00' },
      missing: 'Number to be confirmed by the society',
    },

    form: {
      heading: 'Or send a message',
      fields: {
        pack: 'Pack size',
        email: 'Your email',
        message: 'Your message',
      },
      packAny: 'Not sure yet',
      placeholders: {
        email: 'you@example.com',
        message: 'For example, the number of packs, your location or any questions you have.',
      },
      submit: 'Send message',
      consent: 'We use your details only to respond to your enquiry. We never sell or share them.',
      /* Overrides common.form, whose success line promises "sample
         availability and despatch details" — written for an importer. */
      success: {
        title: 'Message received',
        body: 'Thank you. Our office will reply, usually within two working days. For urgent enquiries, please contact us on WhatsApp.',
        again: 'Send another message',
      },
    },
  },
};
