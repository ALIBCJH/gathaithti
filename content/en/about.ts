import type { AboutContent } from '../types';

export const about: AboutContent = {
  meta: {
    title: 'About Gathaithi Farmers’ Co-operative Society — history & governance',
    description:
      'Founded {{established}} under Tetu and independently registered in {{independentSince}}. Governance, membership, terroir at {{altitude}}, and the pre-finance scheme that supports {{members}} farming families in Nyeri County.',
    ogLine: 'Founded 1967 · Independent since June 2000 · Tetu, Nyeri',
  },

  hero: {
    eyebrow: 'About the society',
    title: 'Owned by the farmers who grow the coffee',
    lead:
      'Gathaithi Farmers’ Co-operative Society Ltd is a registered co-operative in Tetu Sub-County, Nyeri County. Its members are its shareholders, its committee is elected from among them, and its single wet mill exists to turn their cherry into the best coffee the hillside can produce.',
  },

  /* Three cards under the hero: what this society is, before any history or
     governance. Everything here is structurally true and carries no unverified
     figure of its own — the numbers come through {{tokens}} like everywhere
     else, so a correction in content/facts.ts reaches them. */
  pillars: {
    eyebrow: 'About the society',
    heading: 'A society, not a supplier',
    cards: [
      {
        title: 'Owned by the people who grow it',
        body: '{{members}} smallholder families hold the shares. The committee is elected from among them at the Annual General Meeting, and the accounts are put to the same room that elected it.',
      },
      {
        title: 'One mill, one catchment',
        body: 'A single wet mill on {{millSite}} hectares, serving the farms around it. Cherry is delivered the evening it is picked and processed within hours. Nothing is blended in from anywhere else.',
      },
      {
        title: 'Independent since {{independentSince}}',
        body: 'Gathaithi grew coffee under the wider Tetu society from {{established}}. Since {{independentSince}} it has run its own processing, its own marketing and its own payments.',
      },
    ],
  },

  origin: {
    eyebrow: 'History',
    heading: 'History of the society',
    /* The three photographs beside the text. Captions, not filenames — the
       placeholder already prints what each file must be called. */
    /* In slot order — historyOne, historyTwo, historyThree. Written the other
       way round first, which captioned the drying beds as the office. */
    captions: [
      'The wet mill and the drying beds, looking across to Tetu.',
      'The society office and store, Gathaithi village.',
      'Members at a collection point at the end of the day.',
    ],
    body: [
      'Coffee came to these ridges as a smallholder crop in the years around independence, and Gathaithi’s growers organised as part of the larger Tetu society in {{established}}. For three decades the village delivered its cherry into a structure it did not control.',
      'In {{independentSince}} that changed. Gathaithi registered as a society in its own right, named for the village itself, and took over the running of the wet mill on its own {{millSite}} hectares. Since then every decision about processing, marketing and payment has been taken by people who live within walking distance of the beds.',
      'The society has stayed deliberately small. One mill. One catchment. A membership that knows each other’s farms.',
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
        body: 'A washed lot from the mill is cupped at {{cuppingScore}} points — confirmation of what the catchment can do in a good year.',
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
      { label: 'Membership', value: '{{members}} smallholder farmers' },
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
      heading: 'Who sits on the management committee',
      lead:
        'Nine members, elected by the membership at the Annual General Meeting. Four hold office; five are elected to the committee without portfolio.',
      pendingNote:
        'Names and photographs are being confirmed by the society. Entries marked below are drafts and are not yet a published statement of who holds office.',
      roleLabel: 'Management committee',
      members: [
        { id: 'b1', name: 'Peter Mwangi', role: 'Chairperson', imageSlot: 'boardOne', pending: true },
        { id: 'b2', name: 'Esther Njeri', role: 'Vice-Chairperson', imageSlot: 'boardTwo', pending: true },
        { id: 'b3', name: 'Samuel Kariuki', role: 'Treasurer', imageSlot: 'boardThree', pending: true },
        { id: 'b4', name: 'Alice Wambui', role: 'Secretary', imageSlot: 'boardFour', pending: true },
        { id: 'b5', name: 'Name to come', role: 'Elected committee member', imageSlot: 'boardFive', pending: true },
        { id: 'b6', name: 'Name to come', role: 'Elected committee member', imageSlot: 'boardSix', pending: true },
        { id: 'b7', name: 'Name to come', role: 'Elected committee member', imageSlot: 'boardSeven', pending: true },
        { id: 'b8', name: 'Name to come', role: 'Elected committee member', imageSlot: 'boardEight', pending: true },
        { id: 'b9', name: 'Name to come', role: 'Elected committee member', imageSlot: 'boardNine', pending: true },
      ],
    },

    bodies: [
      {
        name: 'Management Committee',
        role: 'Elected by the members at the AGM. Responsible for the running of the society, the mill, marketing decisions and the payment schedule.',
        composition: 'Peter Mwangi (Chairperson), Esther Njeri (Vice-Chairperson), Samuel Kariuki (Treasurer), Alice Wambui (Secretary), and five elected committee members',
      },
      {
        name: 'Supervisory Committee',
        role: 'Elected separately and independent of the management committee. Inspects the books, the store and the mill records, and reports its findings directly to the members.',
        composition: 'James Ndung’u, Margaret Nyokabi and Daniel Gitonga, elected at the AGM',
      },
      {
        name: 'Society Office',
        role: 'Day-to-day administration: the member register, cherry records, payments, pre-finance applications and buyer correspondence.',
        composition: 'Joseph Kamau (Society Manager), with four office and mill staff',
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
        'The catchment is planted to the classic Kenyan selections alongside the newer disease-resistant releases, which is what allows the society to keep quality high while managing coffee berry disease and leaf rust across {{trees}} trees.',
      list: [
        { name: 'SL28', note: 'The backbone of the catchment. Deep, structured, blackcurrant acidity.' },
        { name: 'SL34', note: 'Heavier body, tolerant of the wetter years on the upper slopes.' },
        { name: 'Ruiru 11', note: 'Compact and disease-resistant. Protects yield through bad seasons.' },
        { name: 'Batian', note: 'Newer release, resistant and cup-clean, planted into gaps and renewals.' },
      ],
    },
  },


};
