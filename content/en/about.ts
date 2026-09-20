import type { AboutContent } from '../types';

export const about: AboutContent = {
  meta: {
    title: 'About Gathaithi Co-operative Society — history & governance',
    description:
      'Organised in {{established}} under North Tetu and independent since 2000. The society’s history, its governance, and the {{members}} families who own it.',
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
      'Gathaithi Farmers’ Co-operative Society Ltd is a registered co-operative in Tetu Sub-County, Nyeri County. Its members are its shareholders, its committee is elected from among them, and its single wet mill exists to turn their cherry into the best coffee the hillside can produce.',
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
      'Gathaithi Farmers’ Co-operative Society unites {{members}} smallholders across the fertile highlands of Nyeri. Guided by independent ownership and generational expertise, we cultivate, wet-mill, and supply exceptional Kenyan specialty coffee directly to global roasteries.',
    pillars: [
      {
        label: 'Location',
        title: 'Nyeri County, Kenya',
        body: 'Situated on the high-altitude, mineral-rich volcanic soils of the Aberdare mountain range (1,700–1,800 m above sea level).',
      },
      {
        label: 'When it started',
        title: 'Established {{established}} | Independent since 2000',
        body: 'Rooted in decades of traditional farming, Gathaithi became a fully self-managed, independent society on {{independentSince}}.',
      },
      {
        label: 'What we do',
        title: 'Precision Wet-Milling & Export',
        body: 'We oversee selective hand-picking, immediate same-day pulping and raised-bed sun drying to ensure complete lot traceability and cup clarity.',
      },
      {
        label: 'What we produce',
        title: 'Premier Specialty Coffee',
        body: '{{grades}} grade coffee from {{varieties}} varieties, celebrated for deep blackcurrant acidity and vibrant fruit complexity.',
      },
    ],
  },

  /* The history as a run of dated turns, "then" to "now". Every line is a
     fact already on the site; nothing here is new. */
  history: {
    eyebrow: 'Our history',
    heading: 'From 1967 to today',
    lead:
      'We began in {{established}} as coffee growers within the wider Tetu society. Today we are an independent society of {{members}} active members, running our own wet mill and selling our own coffee.',
    imageSlot: 'galleryGate',
    caption: 'The society gate and values board at Gathaithi.',
    milestones: [
      {
        year: '{{established}}',
        title: 'Roots under Tetu',
        body: 'Gathaithi’s growers organise as a coffee-growing area of the Tetu Farmers’ Co-operative Society, delivering their cherry to the wider society.',
      },
      {
        year: '2000',
        title: 'Our own society',
        body: 'On {{independentSince}}, the farmers of Gathaithi register their own society and take over the wet mill, the marketing of their coffee and the payments to members.',
      },
      {
        year: '{{cuppingYear}}',
        title: '{{cuppingScore}} points',
        body: 'A washed lot from our mill scores {{cuppingScore}} points in a review by {{cuppingReviewer}}.',
      },
      {
        year: '2024',
        title: 'Second in Kenya',
        body: 'We pay our members {{cherryPrice2024}} per kilo of cherry, the second-highest cherry payment in the country that year.',
      },
      {
        year: 'Today',
        title: '{{members}} members, one mill',
        body: '{{certificationRA}} and {{eudr}}, with every delivery recorded against the member who grew it.',
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
        proof: '{{cherryPrice2024}} per kilo of cherry in 2024',
      },
      {
        title: 'Uncompromising Precision',
        body: 'Strict lot separation and zero blending ensure absolute clarity, clean processing, and consistent cup quality year after year.',
        proof: 'One wet mill · nothing blended in',
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
    rows: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'Jurisdiction', value: 'Co-operative Societies Act, Republic of Kenya' },
      { label: 'County', value: 'Nyeri County' },
      { label: 'Sub-county', value: 'Tetu' },
      { label: 'Wet mills operated', value: '{{wetMills}}' },
      { label: 'Certification', value: '{{certificationRA}}' },
      { label: 'EU market', value: '{{eudr}}' },
      /* The society's own breakdown, as it gave it on 2026-09-11. The three
         come from content/facts.ts and must keep adding up. */
      { label: 'Active members', value: '{{members}}' },
      { label: 'Dormant members', value: '{{membersDormant}}' },
      { label: 'Total membership', value: '{{membersTotal}}' },
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
        { id: 'b5', name: 'German Wambiru', role: 'Committee member', imageSlot: 'boardFive' },
        { id: 'b6', name: 'Charles Wambugu', role: 'Committee member', imageSlot: 'boardSix' },
        { id: 'b7', name: 'Paul Gaita', role: 'Supervisory Chairman', imageSlot: 'boardSeven' },
        { id: 'b8', name: 'Daniel Ngatia', role: 'Supervisory Secretary', imageSlot: 'boardEight' },
        { id: 'b9', name: 'Mary Kingory', role: 'Supervisory committee member', imageSlot: 'boardNine' },
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
        composition: 'Samuel Gachonge (Chairman), Eugene Wachira (Vice-Chairman), Edward Ngure (Treasurer), Ephraim Njogu (Secretary), with German Wambiru and Charles Wambugu',
      },
      {
        name: 'Supervisory Committee',
        role: 'Elected separately and independent of the management committee. Inspects the books, the store and the mill records, and reports its findings directly to the members.',
        /* These three were INVENTED placeholders — James Ndung'u, Margaret
           Nyokabi and Daniel Gitonga — published against a real office. They
           are the real three now. */
        composition: 'Paul Gaita (Chairman), Daniel Ngatia (Secretary) and Mary Kingory, elected at the AGM',
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
