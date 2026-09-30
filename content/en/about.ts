import type { AboutContent } from '../types';

export const about: AboutContent = {
  meta: {
    title: 'About Gathaithi Co-operative Society — history & governance',
    description:
      'Organised in {{established}} under Tetu North and independent since 2000. The society’s history, its governance, and the {{members}} families who own it.',
    ogLine: 'Founded 1967 · Independent since June 2000 · Tetu, Nyeri',
  },

  /* The page's title and its one sentence. There is no hero band any more —
     these are rendered by `Pillars`, which is now the first band on the page. */
  /* PARKED — nothing renders this. "Owned by the farmers who grow the coffee"
     and its sentence opened the About page, and they moved to Our Farmers
     along with the three ownership cards: the claim they make is that page's
     whole subject. About opens on its history now. Kept because the sentence
     is a good short statement of what the society IS, and nothing else says it
     in one breath. */
  hero: {
    eyebrow: 'About the society',
    title: 'Owned by the farmers who grow the coffee',
    lead:
      'Gathaithi Farmers’ Co-operative Society Ltd is a registered co-operative in Tetu East Sub-County, Nyeri County. Its members are its shareholders, its committee is elected from among them, and its single wet mill exists to turn their cherry into the best coffee the hillside can produce.',
  },

  /* HERITAGE & PURPOSE — the society's own copy, supplied 2026-09-18. It
     replaced the history band (three photographs and four timeline cards).
     Three points held back on the client's instruction, as on the home page:
     the mountain is the Aberdare range, not Mt. Kenya (Tetu sits in the
     Aberdare foothills); grades and varieties come from the facts (Mbuni;
     Ruiru Grafted & Batian), not AA, AB, PB and SL28, SL34; and there is no
     72-hour fermentation step. "Farmers Co-operative" takes the society's
     registered apostrophe. */
  intro: {
    /* Second version from the society, 2026-09-20. */
    eyebrow: 'Community ownership · Uncompromised quality',
    heading: 'High-Altitude Craft, Rooted in Community',
    lead:
      'Gathaithi Farmers’ Co-operative Society comprises {{members}} smallholders across the fertile highlands of Nyeri. Guided by independent ownership and generational expertise, we cultivate, wet-mill, and supply exceptional Kenyan speciality coffee directly to global roasters.',
    /* THREE pillars since 2026-09-20, the society's own copy. "When it
       started" (Established 1967 | Independent since 2000) was dropped at the
       client's request: the timeline below and the home page both carry those
       dates. */
    pillars: [
      {
        label: 'Location & terroir',
        title: 'Nyeri Highlands, Kenya',
        body: 'Situated in mineral-rich volcanic soils at 1,700–1,800 m above sea level—creating ideal high-altitude conditions for slow cherry ripening and complex flavor development.',
      },
      {
        label: 'Processing & quality',
        title: 'Precision Wet-Milling',
        body: 'Our farmers selectively hand-pick ripe cherries, which the society then processes through immediate same-day pulping and channel washing with clean water, before the parchment is taken to raised beds for drying and conditioning.',
      },
      {
        label: 'Cup profile & varietals',
        title: 'Premier Speciality Coffee',
        body: 'Cultivating prized {{varieties}} varieties—renowned for brilliant blackcurrant acidity, rich sweetness, and vibrant fruit complexity.',
      },
    ],
  },

  /* The history as a run of dated turns, "then" to "now". Every line is a
     fact already on the site; nothing here is new. */
  history: {
    eyebrow: 'Our history',
    heading: 'From 1967 to date',
    lead:
      'We began in {{established}} as coffee growers within the wider Tetu North Co-operative Union. Today we are an independent society of {{members}} active members, running our own wet mill and selling our own coffee.',
    imageSlot: 'galleryGate',
    milestones: [
      {
        year: '{{established}}',
        title: 'Roots under Tetu North',
        body: 'Gathaithi’s growers organised as a coffee-growing area of the Tetu North Co-operative Union, delivering their cherry to the union.',
      },
      {
        year: '2000',
        title: 'Our own society',
        body: 'On {{independentSince}}, the farmers of Gathaithi registered their own society, took over the wet mill, and started marketing their coffee and paying their members directly.',
      },
      {
        year: '{{cuppingYear}}',
        title: '{{cuppingScore}} points',
        body: 'A washed lot from our mill scores {{cuppingScore}} points in a review by {{cuppingReviewer}}.',
      },
      {
        year: '2024',
        title: 'Second in Kenya',
        /* No KSh figure: the society has quoted two and Climate Smart Coffee a
           third, so the price is withheld until one is confirmed. */
        body: 'From 2024 to date we are recognised for the second-highest cherry payment to farmers in the country.',
      },
      {
        year: 'Today',
        title: '{{members}} members, one mill',
        body: '{{certificationRA}} and {{eudr}}.',
        current: true,
      },
    ],
  },

  /* CORE VALUES — the society's four, as supplied. The proof line under each
     points at something the site already states, so a value is never left as
     an unsupported claim. */
  values: {
    eyebrow: 'Core values',
    heading: 'What we stand for',
    items: [
      {
        title: 'Farmer Equity',
        body: 'Delivering top-tier national payout rates so that every harvest directly enriches the families behind the crop.',
      },
      {
        title: 'Uncompromising Precision',
        body: 'Strict lot separation and zero blending ensure absolute clarity, clean processing, and consistent cup quality year after year.',
        proof: 'One wet mill',
      },
      {
        title: 'Environmental Stewardship',
        body: 'Committed to sustainable land management, Rainforest Alliance guidelines, and EUDR compliance across all member farms.',
        proof: '{{certificationRA}} · {{eudr}}',
      },
      {
        title: 'Radical Transparency',
        body: 'Direct traceability from household delivery logs to final export, building long-term, trusted relationships with global roasters.',
        proof: 'Every delivery recorded against its member',
      },
    ],
  },

  registration: {
    /* The society's own copy, 2026-09-18. */
    eyebrow: 'Transparency',
    heading: 'Verified & Traceable',
    lead:
      'Everything buyers and importers need to verify our operational standards, legal standing, and trade details—all in one place.',
    /* CERTIFICATION, on its own card each (client, 2026-09-30). Worded to
       what is actually established: Rainforest Alliance certifies, and its
       certificates are publicly searchable; EUDR is a regulation a buyer
       complies with, not a certificate anyone holds. The certificate number,
       issuing body and expiry are still not supplied — add them as rows in
       the table below the moment they are. */
    certifications: [
      {
        label: 'Certification',
        name: 'Rainforest Alliance Certified',
        body: 'Gathaithi is Rainforest Alliance certified for land stewardship. Every Rainforest Alliance certificate is listed in the Alliance’s public register, so a buyer can verify ours independently.',
      },
      {
        label: 'EU market',
        name: 'EUDR compliant',
        body: 'Our coffee is prepared for the EU Deforestation Regulation. The regulation is met by the importer rather than certified to the farmer, so we supply the farm and lot information an importer needs for its due-diligence statement.',
      },
    ],
    /* No Certification or EU market rows: the two cards above the table
       carry them since #175. */
    rows: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'Jurisdiction', value: 'Co-operative Societies Act, Republic of Kenya' },
      { label: 'County', value: 'Nyeri County' },
      { label: 'Sub-county', value: 'Tetu East' },
      { label: 'Wet mills operated', value: '{{wetMills}}' },
      /* The society's own breakdown, as it gave it on 2026-09-11. The three
         come from content/facts.ts and must keep adding up. */
      { label: 'Active members', value: '{{members}}' },
    ],
  },

  governance: {
    /* The society's own copy ("Option 1: Modern & Editorial"), 2026-09-18. */
    eyebrow: 'Governance & Trust',
    heading: 'Built on Accountability, Driven by Community',
    lead:
      'Great coffee requires complete integrity behind the scenes. Gathaithi operates as a fully democratic co-operative—governed by an elected farmer committee, reviewed by independent oversight, and committed to total financial transparency for every member and global trade partner.',
    /* The nine people who sit on the management committee, as cards.
       ═══════════════════════════════════════════════════════════════════════
       DRAFT, in the same sense as the member profiles on Our Farmers: the four
       officers' names are carried over from the `composition` line above and
       have never been confirmed against the register, and the five elected
       members have no names here at all because none were supplied. Nothing on
       this site invents a real person. Every entry below is marked so the page
       can be seen whole while the society confirms who is on it. Replace the
       names, delete the `pending` flags, and the notice above the grid stops
       rendering on its own. */
    board: {
      /* The society's own copy, 2026-09-18; 1,988 via {{members}}. */
      eyebrow: 'Leadership',
      heading: 'Who Runs the Society',
      /* Rewritten when the real names arrived. It said "Nine members … four
         hold office; five are elected to the committee without portfolio",
         which described the placeholder arrangement, not this one: the nine
         are TWO committees — six on the management committee and three on the
         supervisory committee, which is elected separately and exists to check
         the first. Every card states its own role, so a reader can tell which
         is which without the grid being split in two. */
      lead:
        'Gathaithi is led by a board elected directly by our members. They guide daily operations, oversee mill management, and make key decisions on behalf of our {{members}} growers.',
      pendingNote:
        'Names and photographs are being confirmed by the society. Entries marked below are drafts and are not yet a published statement of who holds office.',
      roleLabel: 'Management and supervisory committees',
      /* REAL PEOPLE, supplied by the client on 2026-09-07 with a photograph
         each. `pending` is cleared, so the Draft markers and the notice above
         the grid remove themselves.

         Spellings are EXACTLY as supplied — a name is not something to tidy up
         on someone's behalf. Three were flagged back to the client as possible
         transcription slips: Waehira (Wachira?), German (Germano?), Kingory
         (Kingori?). If any is wrong it is corrected here, in one line.

         WACHIRA CONFIRMED 2026-09-11: the first was a slip, and the name is
         corrected here, in the committee line below, and in the photograph's
         alt text in content/images.ts. German and Kingory stand as supplied. */
      members: [
        { id: 'b1', name: 'Samuel Gachonge', role: 'Chairman', imageSlot: 'boardOne' },
        { id: 'b2', name: 'Eugene Wachira', role: 'Vice-Chairman', imageSlot: 'boardTwo' },
        { id: 'b3', name: 'Edward Ngure', role: 'Treasurer', imageSlot: 'boardThree' },
        { id: 'b4', name: 'Ephraim Njogu', role: 'Secretary', imageSlot: 'boardFour' },
        { id: 'b5', name: 'Germano Wambiro', role: 'Committee member', imageSlot: 'boardFive' },
        { id: 'b6', name: 'Charles Wambugu', role: 'Committee member', imageSlot: 'boardSix' },
        { id: 'b7', name: 'Paul Gaita', role: 'Supervisory Chairman', imageSlot: 'boardSeven' },
        { id: 'b8', name: 'Daniel Ngatia', role: 'Supervisory Secretary', imageSlot: 'boardEight' },
        { id: 'b9', name: 'Mary Kingori', role: 'Supervisory committee member', imageSlot: 'boardNine' },
      ],
    },

    /* PARKED — nothing renders these three. Management Committee, Supervisory
       Committee and Society Office each carried a `composition` line naming
       its members, and once the nine real portraits arrived those lines were
       saying the same thing twice: every name here appears below with a face
       and a role against it.

       Kept rather than deleted because the ROLE descriptions are not written
       anywhere else — what the supervisory committee is for, what the office
       actually does day to day — and that is the part a buyer or an auditor
       would ask about. The Society Manager is still unnamed. */
    bodies: [
      {
        name: 'Management Committee',
        role: 'Elected by the members at the AGM. Responsible for the running of the society, the mill, marketing decisions and the payment schedule.',
        composition: 'Samuel Gachonge (Chairman), Eugene Wachira (Vice-Chairman), Edward Ngure (Treasurer), Ephraim Njogu (Secretary), with Germano Wambiro and Charles Wambugu',
      },
      {
        name: 'Supervisory Committee',
        role: 'Elected separately and independent of the management committee. Inspects the books, the store and the mill records, and reports its findings directly to the members.',
        /* These three were INVENTED placeholders — James Ndung'u, Margaret
           Nyokabi and Daniel Gitonga — published against a real office. They
           are the real three now. */
        composition: 'Paul Gaita (Chairman), Daniel Ngatia (Secretary) and Mary Kingori, elected at the AGM',
      },
      {
        name: 'Society Office',
        role: 'Day-to-day administration: the member register, cherry records, payments, pre-finance applications and buyer correspondence.',
        /* STILL INVENTED. No name was supplied for the society manager, so this
           one placeholder outlives the others — flagged to the client. */
        composition: 'The Society Manager, with office and mill staff',
      },
    ],
  },

  terroir: {
    /* The society's own copy, 2026-09-18. */
    eyebrow: 'Taste of Gathaithi',
    heading: 'Patience You Can Taste',
    lead:
      'High up at 1,720 meters, there are no shortcuts. The mountain air slows the fruit’s growth, allowing natural sugars and rich acids to develop fully inside the seed. The result is a clean, vibrant cup loaded with dark fruit notes and a sweet, lingering finish.',
    factIds: ['altitude', 'rainfall', 'temperature', 'trees'],
    /* "What grows here" (the two varieties and their notes) was removed
       2026-09-18 at the client's request: the home page carries the same
       grades and varieties in Origin & Craft. */
  },


};
