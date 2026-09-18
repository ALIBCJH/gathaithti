import type { AboutContent } from '../types';

export const about: AboutContent = {
  meta: {
    title: 'About Gathaithi Farmers’ Co-operative Society | History and governance',
    description:
      'Established in {{established}} under North Tetu and independent since 2000. Our history, our governance and the {{members}} members who own the society.',
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
      'Gathaithi Farmers’ Co-operative Society Ltd is a registered co-operative in Tetu Sub-County, Nyeri County. Our members are our shareholders, our committee is elected from among them, and our wet mill exists to turn their cherry into the finest coffee our hillside can produce.',
  },

  origin: {
    eyebrow: 'History',
    heading: 'History of the society',
    /* THREE PHOTOGRAPHS, and all three are real. The single frame here was
       gathaithi-mill-and-ridge.jpg, from the bought-and-generated set — a
       picture of a wet mill standing in for THIS wet mill, on the one band
       that is entirely about this society taking over its own.

       Each one carries a paragraph of the history: the gate is the society in
       its own name, the drying ground is what it took over in 2000, and the
       pulper is the running of it. The captions say so rather than describing
       the picture twice. */
    /* NO WRITTEN ACCOUNT. Three paragraphs sat here — the smallholder crop
       around independence and the years under Tetu, the 2000 registration and
       the mill on its own hectares, and a closing line about staying
       deliberately small. The user asked for all three removed.

       Nothing factual is lost with them. The timeline below carries 1967, the
       2000 registration and the 93-point review as dated entries, and the
       three photographs carry the same turns in their captions. What went was
       the prose telling of it.

       `body` is optional in the type, so the component renders no block at all
       rather than an empty grid. */
    frames: [
      {
        imageSlot: 'galleryGate',
        caption:
          'The society gate. Since 2000, it has carried our own name as an independent society.',
      },
      {
        imageSlot: 'galleryDryingArea',
        caption:
          'The drying ground between harvests. The society took over the management of these three hectares in 2000.',
      },
      {
        imageSlot: 'galleryPulper',
        caption:
          'The pulper. Independence gave the society full control of its machinery, its water and the way its cherry is processed.',
      },
    ],

    timeline: [
      {
        year: '{{established}}',
        title: 'Organised under Tetu',
        body: 'Gathaithi’s growers join the Tetu Farmers’ Co-operative Society as one of its coffee-growing areas.',
      },
      {
        year: '{{independentSince}}',
        title: 'Registered independently',
        body: 'Gathaithi Farmers’ Co-operative Society Ltd is registered and takes control of its own wet mill, marketing and payments.',
      },
      {
        year: '{{cuppingYear}}',
        title: 'Scored {{cuppingScore}} points',
        /* Names the reviewer now that there is one. A score with no
           publishing body is not a claim a buyer accepts, and for two years
           this timeline entry made one without saying who scored it. */
        body: 'A washed lot from our mill scores {{cuppingScore}} points in a review by {{cuppingReviewer}}.',
      },
      {
        year: '2024',
        title: '{{nationalRank2024}} nationally on cherry payment',
        body: 'The society pays members {{cherryPrice2024}} per kilo of cherry, one of the highest farm-gate rates in Kenya.',
      },
    ],
  },

  /* The registration table, lifted out of Governance into a section of its own.
     Buyers arrive at this page looking for exactly these eight rows and should
     not have to find them inside a wall of prose. */
  registration: {
    eyebrow: 'Registration',
    heading: 'Registration details',
    lead:
      'Key details for buyers, auditors and county officials. All of them can be verified against the register of co-operative societies.',
    rows: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'Jurisdiction', value: 'Co-operative Societies Act, Republic of Kenya' },
      { label: 'County', value: 'Nyeri County' },
      { label: 'Sub-county', value: 'Tetu' },
      { label: 'Wet mills operated', value: '{{wetMills}}' },
      { label: 'Certification', value: '{{certificationRA}}' },
      { label: 'EU compliance', value: '{{eudr}}' },
      /* The society's own breakdown, as it gave it on 2026-09-11. The three
         come from content/facts.ts and must keep adding up. */
      { label: 'Active members', value: '{{members}}' },
      { label: 'Dormant members', value: '{{membersDormant}}' },
      { label: 'Total membership', value: '{{membersTotal}}' },
    ],
  },

  governance: {
    eyebrow: 'Governance',
    heading: 'How the society runs',
    lead:
      'Gathaithi operates under the Co-operative Societies Act, with an elected management committee, an independent supervisory committee and accounts presented to members at every Annual General Meeting.',
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
      eyebrow: 'Leadership',
      heading: 'Our committees',
      /* Rewritten when the real names arrived. It said "Nine members … four
         hold office; five are elected to the committee without portfolio",
         which described the placeholder arrangement, not this one: the nine
         are TWO committees — six on the management committee and three on the
         supervisory committee, which is elected separately and exists to check
         the first. Every card states its own role, so a reader can tell which
         is which without the grid being split in two. */
      lead:
        'Our nine committee members are elected by the membership at the Annual General Meeting. The six members of the management committee run the society day to day. The three members of the supervisory committee are elected separately and inspect the books, the store and the mill records on behalf of the members.',
      pendingNote:
        'Names and photographs are awaiting final confirmation by the society.',
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
        role: 'Elected by the members at the AGM and responsible for running the society and the mill, making marketing decisions and setting the payment schedule.',
        composition: 'Samuel Gachonge (Chairman), Eugene Wachira (Vice-Chairman), Edward Ngure (Treasurer), Ephraim Njogu (Secretary), with German Wambiru and Charles Wambugu',
      },
      {
        name: 'Supervisory Committee',
        role: 'Elected separately and independent of the management committee. It inspects the books, the store and the mill records, and reports its findings directly to the members.',
        /* These three were INVENTED placeholders — James Ndung'u, Margaret
           Nyokabi and Daniel Gitonga — published against a real office. They
           are the real three now. */
        composition: 'Paul Gaita (Chairman), Daniel Ngatia (Secretary) and Mary Kingory, elected at the AGM',
      },
      {
        name: 'Society Office',
        role: 'Handles day-to-day administration, including the member register, cherry records, payments, pre-finance applications and correspondence with buyers.',
        /* STILL INVENTED. No name was supplied for the society manager, so this
           one placeholder outlives the others — flagged to the client. */
        composition: 'The Society Manager, supported by office and mill staff',
      },
    ],
  },

  terroir: {
    eyebrow: 'Terroir',
    heading: 'Our growing conditions',
    lead:
      'Gathaithi lies on the eastern slopes below the Aberdare range, on deep red volcanic soil at around {{altitude}}. Cool nights slow the ripening of the cherry, which develops the bright acidity and blackcurrant notes found in the cup.',
    factIds: ['altitude', 'rainfall', 'temperature', 'trees'],
    varieties: {
      heading: 'Our varieties',
      body:
        'Our members grow grafted Ruiru 11 and Batian. Both varieties are disease-resistant, which allows the society to maintain quality while managing coffee berry disease and leaf rust across {{trees}} trees.',
      list: [
        /* THE SOCIETY'S LIST, 2026-09-11: Ruiru Grafted & Batian, "remove all
           the other varieties". SL28 and SL34 are gone from here and from
           the `varieties` fact; Batian is back. The notes say only what is
           generally true of each variety — nothing specific to this
           catchment that the society has not supplied. */
        { name: 'Ruiru Grafted', note: 'Ruiru 11, grafted. A compact, disease-resistant variety that helps protect yields in difficult seasons.' },
        { name: 'Batian', note: 'A tall, disease-resistant Kenyan variety, bred to withstand coffee berry disease and leaf rust.' },
      ],
    },
  },


};
