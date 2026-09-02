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

  origin: {
    heading: 'From {{established}} to independence',
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

  governance: {
    eyebrow: 'Governance',
    heading: 'How the society is run',
    lead:
      'Buyers audit this section, and members live by it. Gathaithi operates under the Co-operative Societies Act, with an elected management committee, an independent supervisory committee, and accounts presented to every member at the Annual General Meeting.',
    registration: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'Jurisdiction', value: 'Co-operative Societies Act, Republic of Kenya' },
      { label: 'County', value: 'Nyeri County' },
      { label: 'Sub-county', value: 'Tetu' },
      { label: 'Wet mills operated', value: '{{wetMills}}' },
      { label: 'Membership', value: '{{members}} smallholder farmers' },
    ],
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
    agm: {
      heading: 'Annual General Meeting',
      body:
        'The AGM is the society’s decision-making body. Audited accounts are tabled, the payment rate is explained, committee elections are held and members vote on the year ahead. Every member has one vote, regardless of how many trees they farm.',
      items: [
        { label: 'Cycle', value: 'Annual' },
        { label: 'Next AGM', value: 'Saturday 16 May, 10:00' },
        { label: 'Notice period', value: 'As provided under the society by-laws' },
        { label: 'Voting', value: 'One member, one vote' },
        { label: 'Accounts', value: 'Audited and tabled for member approval' },
      ],
    },
  },

  terroir: {
    eyebrow: 'Terroir',
    heading: 'Why the coffee tastes the way it does',
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

  welfare: {
    eyebrow: 'Members',
    heading: 'Pre-financing, in plain terms',
    lead:
      'Coffee pays once. School fees, fertiliser and emergencies do not wait for the payment schedule. The society lends against a member’s own coming crop so that the gap between harvest and payment does not force anyone to sell short.',
    body: [
      'A member applies at the society office. The amount available is set against their delivery record — what they have brought in, and what their trees are expected to produce. There is no outside guarantor and no land title involved.',
      'Recovery is made from the member’s own cherry payment when it falls due. It is deducted, recorded and shown on their statement. Nothing compounds while a member waits for the crop.',
      'This is not welfare and it is not aid. It is a co-operative doing the one thing a co-operative is for: using the collective strength of {{members}} farmers to give each of them terms no single smallholder could get alone.',
    ],
    schemes: [
      {
        name: 'School fees advance',
        body: 'Released against the coming crop at the start of each school term, when families need it and the coffee payment has not yet arrived.',
      },
      {
        name: 'Farm inputs credit',
        body: 'Fertiliser, mulch and chemicals supplied through the society at bulk-purchase rates, recovered from the cherry payment rather than paid up front.',
      },
      {
        name: 'Emergency advance',
        body: 'Medical and funeral emergencies, assessed at the office and released quickly. The tightest constraint on a farming household is timing, not size.',
      },
    ],
  },

  location: {
    heading: 'Where we are',
    body:
      'The mill and society office stand in Gathaithi village, Tetu Sub-County, about an hour’s drive north-west of Nyeri town and around three hours from Nairobi. Buyers are welcome at the mill during harvest — write ahead so the office can arrange a cupping.',
    address: [
      'Gathaithi Wet Mill',
      'Gathaithi Village, Tetu Sub-County',
      'Nyeri County, Kenya',
    ],
    directions: 'Open the location in maps',
    mapLabel: 'Map of Gathaithi, Tetu Sub-County, Nyeri County',
  },
};
