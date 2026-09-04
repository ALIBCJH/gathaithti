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
    /* The society's own line, supplied by the user. It also settles a
       standing snag: the line it replaced spelled "Flavors" the American way
       on a site that is British throughout. */
    positioning: 'Coffee that makes you glow.',
    scrollMore: 'More',
    /* The button this replaced went to /about. A downward arrow at the foot of
       a hero means "there is more below", so it scrolls rather than navigates —
       About is a tap away in the drawer. The label is what a screen reader
       announces; nothing draws it. */
    scrollDown: 'Scroll to the next section',
    scrollHint: 'Scroll',
    slideLabel: 'Slide {{n}} of {{total}}',
    pauseLabel: 'Pause the hero photographs',
    playLabel: 'Play the hero photographs',
    regionLabel: 'Photographs of Gathaithi coffee',
  },

  proof: {
    eyebrow: 'By the numbers',
    heading: 'A coffee society built on quality, ownership and time.',
    factIds: ['cuppingScore', 'nationalRank2024', 'established', 'members'],
    /* Set differently here from the fact's own `display`, and nowhere else.
       `nationalRank2024` displays as the word "Second" because the About page
       puts it inside sentences — "Second nationally on cherry payment" — where
       a glyph would not read. On a poster the glyph is the point. Same fact,
       same audit trail; only the setting differs. */
    figures: {
      nationalRank2024: '#2',
    },
    titles: {
      cuppingScore: 'A cup worth noticing',
      nationalRank2024: 'Among Kenya’s best',
      established: 'More than five decades of coffee',
      members: 'Farmers. One society.',
    },
    captions: {
      cuppingScore: 'Points, from a washed Nyeri lot cupped in {{cuppingYear}}.',
      nationalRank2024: 'Ranked second in Kenya on cherry payment to farmers, 2024.',
      established: 'Our story began under Tetu; the mill has been ours since {{independentSince}}.',
      members: 'Each one holds a stake in what the society sells.',
    },
  },

  season: {
    eyebrow: 'This season',
    heading: 'What is on the beds now',
    lead:
      'The main crop runs from October, with the fly crop earlier in the year. Availability moves week to week — this panel is updated by the marketing office as lots come off the drying beds and through milling.',
    status: 'Main crop — samples available',
    rows: [
      { label: 'Grades offered', value: 'AA · AB' },
      { label: 'Varieties', value: '{{varieties}}' },
      { label: 'Process', value: 'Fully washed, second soak, sun-dried on raised beds' },
      { label: 'Cherry intake this year', value: '{{cherryAnnual}} kg' },
      { label: 'Sample despatch', value: '250 g and 1 kg, by courier, from the society office' },
    ],
    cta: { label: 'See this season’s lots', href: 'products' },
  },

  story: {
    eyebrow: 'The society',
    heading: 'Every kilo has a name attached',
    body: [
      'Gathaithi has grown coffee since {{established}}, first as part of the wider Tetu society. In {{independentSince}} the farmers of this village registered their own society, took over their own wet mill, and became responsible for their own returns.',
      'That decision is the whole story. Cherry is picked selectively by the household that grew it, delivered the same evening, and processed within hours at a single mill on {{millSite}} hectares. Nothing is blended in from elsewhere, and the books record which household every delivery came from.',
      'What the society sells is the work of {{members}} families on the eastern slopes above Nyeri — and what it returns to them is the reason the work stays good.',
    ],
    /* The statement card in the right-hand column, where the wet-mill
       photograph used to sit. The year is written out rather than taken from
       {{independentSince}}: that fact displays as “June 2000”, and the
       sentence is built around the bare year. If the registration date is
       ever corrected, correct it here too. */
    card: {
      eyebrow: 'Our story',
      quote:
        'In 2000, the farmers of Gathaithi made a simple decision: to own what they had spent generations building.',
      support:
        'They took responsibility for their coffee, their factory, and their future. More than two decades later, that decision still shapes every cherry delivered to the mill.',
      footer: 'Gathaithi Farmers Co-operative Society • Est. 2000',
    },
    pullQuote:
      'We are not suppliers to this business. We are the ones who own it.',
    attribution: 'Grace Wairimu, member since 1991 — sample quotation, not yet collected',
    cta: { label: 'Read our story', href: 'about' },
  },

  /* PARKED — nothing renders this. It previewed the members' noticeboard on
     the home page and linked to it. The noticeboard is gone, which made this
     card's own copy untrue: it said the noticeboard "carries the current
     cherry rate, payment dates, collection times and AGM notices". A card
     describing a page that no longer exists is worse than no card. */
  noticeboard: {
    eyebrow: 'Members',
    heading: 'Cherry price and payment dates',
    lead:
      'The noticeboard carries the current cherry rate, payment dates, collection times and AGM notices. It is built to load fast and read clearly on a phone in the sun.',
    cta: { label: 'Open the noticeboard', href: 'farmers#noticeboard' },
  },

  /* The marks of four organisations the society works with, supplied by the
     society. Names only — no line about what any of them does, and no claim
     about the nature of the relationship. Those are statements about other
     companies and none of them is ours to write; if the society wants them,
     it supplies the words. The names are read off the marks themselves. */
  partners: {
    eyebrow: 'Partners',
    heading: 'Who we work with',
    items: [
      { id: 'cms', name: 'Coffee Management Services', imageSlot: 'partnerCms' },
      { id: 'dormans', name: 'Dormans', imageSlot: 'partnerDormans' },
      { id: 'ea-bean', name: 'EA Bean Co.', imageSlot: 'partnerEaBean' },
      { id: 'e4impact', name: 'E4Impact Foundation', imageSlot: 'partnerE4impact' },
    ],
  },
};
