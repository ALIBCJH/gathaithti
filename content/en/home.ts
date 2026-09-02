import type { HomeContent } from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Gathaithi Coffee — farmer-owned washed Kenya coffee, Tetu, Nyeri',
    description:
      'Gathaithi Farmers’ Co‑operative Society: {{members}} smallholder members, one wet mill in Tetu, Nyeri County. Washed SL28, SL34, Ruiru 11 and Batian. Request a sample direct from the society that grows it.',
    ogLine: 'Farmer-owned washed coffee from Tetu, Nyeri County, Kenya',
  },

  hero: {
    title: 'Gathaithi Farmers’ Co‑operative Society',
    /* No {{fact}} tokens here on purpose. Every figure in content/facts.ts is
       still `verified: false`, and the line this replaced put two of them —
       the membership and the cupping score — in the first sentence a visitor
       reads. Everything asserted below is structurally true of the society
       whatever the numbers turn out to be. The figures still have their place
       on the page: the proof band carries them directly under this. */
    positioning: 'One hill in Nyeri. One society. Sold by the people who picked it.',
    scrollHint: 'Scroll',
  },

  proof: {
    heading: 'The record',
    factIds: ['cuppingScore', 'nationalRank2024', 'established', 'members'],
    captions: {
      cuppingScore: 'Cupped in {{cuppingYear}} — washed lot, Nyeri.',
      nationalRank2024: 'In Kenya on cherry payment to farmers, 2024.',
      established: 'Under Tetu; independent since {{independentSince}}.',
      members: 'Smallholder members, each one an owner of this society.',
    },
  },

  season: {
    eyebrow: 'This season',
    heading: 'What is on the beds now',
    lead:
      'The main crop runs from October, with the fly crop earlier in the year. Availability moves week to week — this panel is updated by the marketing office as lots come off the drying beds and through milling.',
    status: 'Main crop — samples available',
    rows: [
      { label: 'Grades offered', value: 'AA · AB · PB · C' },
      { label: 'Varieties', value: '{{varieties}}' },
      { label: 'Process', value: 'Fully washed, second soak, sun-dried on raised beds' },
      { label: 'Cherry intake this year', value: '{{cherryAnnual}} kg' },
      { label: 'Sample despatch', value: '250 g and 1 kg, by courier, from the society office' },
    ],
    cta: { label: 'See this season’s lots', href: 'products' },
  },

  story: {
    eyebrow: 'The society',
    heading: 'A village that decided to run its own factory',
    body: [
      'Gathaithi has grown coffee since {{established}}, first as part of the wider Tetu society. In {{independentSince}} the farmers of this village registered their own society, took over their own wet mill, and became responsible for their own returns.',
      'That decision is the whole story. Cherry is picked selectively by the household that grew it, delivered the same evening, and processed within hours at a single mill on {{millSite}} hectares. Nothing is blended in from elsewhere. Every kilo has a name attached to it in the books.',
      'What the society sells is the work of {{members}} families on the eastern slopes above Nyeri — and what it returns to them is the reason the work stays good.',
    ],
    pullQuote:
      'We are not suppliers to this business. We are the ones who own it.',
    attribution: 'A member of the society — quotation to be confirmed',
    cta: { label: 'Read our story', href: 'about' },
  },

  noticeboard: {
    eyebrow: 'Members',
    heading: 'Cherry price and payment dates',
    lead:
      'The noticeboard carries the current cherry rate, payment dates, collection times and AGM notices. It is built to load fast and read clearly on a phone in the sun.',
    cta: { label: 'Open the noticeboard', href: 'farmers#noticeboard' },
  },
};
