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
          'The gate. From 2000 the name on it has been the village’s own, not the society it used to deliver into.',
      },
      {
        imageSlot: 'galleryDryingArea',
        caption:
          'The drying ground, between crops. Three hectares of it came under the society’s own management in that year.',
      },
      {
        imageSlot: 'galleryPulper',
        caption:
          'The pulper. Taking over the mill meant taking over the machinery, the water and every decision about how the cherry is handled.',
      },
    ],

    timeline: [
      {
        year: '{{established}}',
        title: 'Organised under Tetu',
        body: 'Gathaithi’s growers join the wider Tetu Farmers’ Co-operative Society as a coffee-growing catchment.',
      },
      {
        year: '{{independentSince}}',
        title: 'Registered independently',
        body: 'The village registers Gathaithi Farmers’ Co-operative Society Ltd and takes control of its own wet mill, marketing and payments.',
      },
      {
        year: '{{cuppingYear}}',
        title: 'Scored {{cuppingScore}} points',
        /* Names the reviewer now that there is one. A score with no
           publishing body is not a claim a buyer accepts, and for two years
           this timeline entry made one without saying who scored it. */
        body: 'A washed lot from the mill scores {{cuppingScore}} points in a review by {{cuppingReviewer}} — confirmation of what the catchment can do in a good year.',
      },
      {
        year: '2024',
        title: '{{nationalRank2024}} nationally on cherry payment',
        body: 'The society pays members {{cherryPrice2024}} per kilo of cherry, placing it {{nationalRank2024}} in Kenya on farmgate return.',
      },
    ],
  },

  /* The registration table, lifted out of Governance into a section of its own.
     Buyers arrive at this page looking for exactly these eight rows and should
     not have to find them inside a wall of prose. */
  registration: {
    eyebrow: 'Information point',
    heading: 'The society on paper',
    lead:
      'The details an importer, an auditor or a county officer is most often looking for, in one place. Everything here is checkable against the Co-operative Societies register.',
    rows: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'Jurisdiction', value: 'Co-operative Societies Act, Republic of Kenya' },
      { label: 'County', value: 'Nyeri County' },
      { label: 'Sub-county', value: 'Tetu' },
      { label: 'Wet mills operated', value: '{{wetMills}}' },
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
      'Buyers audit this section, and members live by it. Gathaithi operates under the Co-operative Societies Act, with an elected management committee, an independent supervisory committee, and accounts presented to every member at the Annual General Meeting.',
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
      eyebrow: 'The committee',
      heading: 'Who runs the society',
      /* Rewritten when the real names arrived. It said "Nine members … four
         hold office; five are elected to the committee without portfolio",
         which described the placeholder arrangement, not this one: the nine
         are TWO committees — six on the management committee and three on the
         supervisory committee, which is elected separately and exists to check
         the first. Every card states its own role, so a reader can tell which
         is which without the grid being split in two. */
      lead:
        'Nine people, elected by the membership at the Annual General Meeting. Six sit on the management committee, which runs the society day to day. Three sit on the supervisory committee, which is elected separately and inspects the books, the store and the mill records on the members’ behalf.',
      pendingNote:
        'Names and photographs are being confirmed by the society. Entries marked below are drafts and are not yet a published statement of who holds office.',
      roleLabel: 'Management and supervisory committees',
      /* REAL PEOPLE, supplied by the client on 2026-09-07 with a photograph
         each. `pending` is cleared, so the Draft markers and the notice above
         the grid remove themselves.

         Spellings are EXACTLY as supplied — a name is not something to tidy up
         on someone's behalf. Three were flagged back to the client as possible
         transcription slips: Waehira (Wachira?), German (Germano?), Kingory
         (Kingori?). If any is wrong it is corrected here, in one line. */
      members: [
        { id: 'b1', name: 'Samuel Gachonge', role: 'Chairman', imageSlot: 'boardOne' },
        { id: 'b2', name: 'Eugene Waehira', role: 'Vice-Chairman', imageSlot: 'boardTwo' },
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
        composition: 'Samuel Gachonge (Chairman), Eugene Waehira (Vice-Chairman), Edward Ngure (Treasurer), Ephraim Njogu (Secretary), with German Wambiru and Charles Wambugu',
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
    eyebrow: 'Terroir',
    heading: 'Why it tastes the way it does',
    lead:
      'Gathaithi sits on the eastern slopes below the Aberdare range, on deep red volcanic soil at around {{altitude}}. Cool nights slow the cherry down; the long ripening is what puts the acidity and the blackcurrant weight into the cup.',
    factIds: ['altitude', 'rainfall', 'temperature', 'trees'],
    varieties: {
      heading: 'What grows here',
      body:
        'The catchment is planted to the classic Kenyan selections alongside Ruiru 11, the disease-resistant release, which is what allows the society to keep quality high while managing coffee berry disease and leaf rust across {{trees}} trees.',
      list: [
        { name: 'SL28', note: 'The backbone of the catchment. Deep, structured, blackcurrant acidity.' },
        { name: 'SL34', note: 'Heavier body, tolerant of the wetter years on the upper slopes.' },
        { name: 'Ruiru 11', note: 'Compact and disease-resistant. Protects yield through bad seasons.' },
        /* BATIAN REMOVED 2026-09-08. The society lists three varieties —
           SL28, SL34 and Ruiru 11 — and Batian came from the project brief. */
      ],
    },
  },


};
