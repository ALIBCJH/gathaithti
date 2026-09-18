import type { HomeContent } from '../types';

export const home: HomeContent = {
  meta: {
    title: 'Gathaithi Coffee | Farmer-owned washed coffee from Tetu, Nyeri',
    description:
      'Farmer-owned washed Kenyan coffee from Tetu, Nyeri, grown by {{members}} smallholder members, processed at one wet mill and sold directly by the society.',
    ogLine: 'Farmer-owned washed coffee from Tetu, Nyeri County, Kenya',
  },

  hero: {
    title: 'Gathaithi Farmers’ Co‑operative Society',
    /* No line under the name: the society asked on 2026-09-18 for "Coffee
       that makes you glow." to come off the hero, and nothing replaces it. */
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

  /* THE SOCIETY'S OWN WORDS, supplied 2026-09-08 on its letterhead:

       Vision:  A LEADER IN PRODUCTION AND MARKETING OF SPECIALITY COFFEE IN
                KENYA
       Mission: TO ENHANCE SOCIAL ECONOMIC PROGRESS OF OUR MEMBERS THROUGH
                PRODUCTION OF QUANTITY AND QUALITY SPECIALITY COFFEE

     Set in sentence case here and otherwise untouched. "Speciality" is their
     spelling, and "social economic" is their phrase rather than
     "socio-economic" — neither is corrected, because these are the statements
     the co-operative adopted and not copy for this site to improve.

     The motto, KILIMO BIASHARA, was supplied at the same time. It is not in
     this band: it heads By the numbers (`proof.heading` below). It was also
     on the hero, over the photographs, from 2026-09-11 until the client asked
     for it off on 2026-09-13. */
  statements: {
    eyebrow: 'Our purpose',
    items: [
      {
        label: 'Vision',
        body: 'A leader in production and marketing of speciality coffee in Kenya.',
      },
      {
        label: 'Mission',
        body: 'To enhance social economic progress of our members through production of quantity and quality speciality coffee.',
      },
    ],
  },

  proof: {
    eyebrow: 'By the numbers',
    /* The society's motto, asked for here 2026-09-11 in place of "A coffee
       society built on quality, ownership and time." Kiswahili, so the
       heading is marked `lang="sw"` for screen readers. */
    heading: 'Kilimo Biashara',
    headingLang: 'sw',
    /* THREE, not four. `cuppingScore` — 93 points, "A cup worth noticing" —
       was the first of them and was removed at the user's request.

       It is only gone from HERE. The fact still exists in content/facts.ts and
       is still cited on About (the timeline entry for that year) and on Our
       Coffee (the "cup it scored" card), because those two put it in a
       sentence with its lot and its date attached. On this band it was a bare
       93 above the fold, which is the setting a score is least defensible in —
       it is still `verified: false` and has no named cupping body. */
    factIds: ['nationalRank2024', 'established', 'members'],
    /* Set differently here from the fact's own `display`, and nowhere else.
       `nationalRank2024` displays as the word "Second" because the About page
       puts it inside sentences — "Second nationally on cherry payment" — where
       a glyph would not read. On a poster the glyph is the point. Same fact,
       same audit trail; only the setting differs. */
    figures: {
      nationalRank2024: '#2',
    },
    titles: {
      nationalRank2024: 'Among Kenya’s best',
      established: 'Over five decades of coffee farming',
      members: 'Active members',
    },
    captions: {
      nationalRank2024: 'Ranked second in Kenya for cherry payments to farmers in 2024.',
      established: 'Founded under the Tetu society, we have run our own mill since {{independentSince}}.',
      members: 'Every member is a shareholder in the society.',
    },
  },

  season: {
    eyebrow: 'This season',
    heading: 'This season at a glance',
    lead:
      'Main crop: {{mainCrop}}. Fly crop: {{flyCrop}}. Availability changes from week to week, and our marketing office updates these details as each lot is dried and milled.',
    status: 'Main crop: samples available',
    rows: [
      /* Was "Grades offered: AA · AB", which was the two green-coffee lots
         the catalogue used to carry. The society reports the grades its
         parchment is actually separated into, so the label says produced —
         what is FOR SALE in a given season is a different question and one
         nobody has answered. */
      { label: 'Grades produced', value: '{{grades}}' },
      { label: 'Varieties', value: '{{varieties}}' },
      /* From the society 2026-09-13. See `certificationRA` and `eudr` in
         content/facts.ts for why the two are worded differently. */
      { label: 'Certification', value: '{{certificationRA}} · {{eudr}}' },
      { label: 'Process', value: 'Fully washed, soaked, and sun-dried on raised beds' },
      { label: 'Cherry intake this year', value: '{{cherryAnnual}} kg' },
      { label: 'Samples', value: '250 g and 1 kg, sent by courier from our office' },
    ],
    cta: { label: 'View our coffee', href: 'products' },
  },

  story: {
    eyebrow: 'The society',
    heading: 'A society owned by its farmers',
    body: [
      'Gathaithi has grown coffee since {{established}}, first as part of the wider Tetu society. On {{independentSince}}, our farmers registered their own society, took over the wet mill and assumed responsibility for their own returns.',
      'Today, members pick their cherry selectively, deliver it the same evening, and have it processed within hours at our mill on {{millSite}} hectares. Nothing is blended in from elsewhere, and every delivery is recorded against the member who grew it.',
      'Every bag we sell represents the work of {{members}} farming families on the eastern slopes above Nyeri, and the returns go back to them.',
    ],
    /* The right-hand column is a photograph (images.ts `homeStory`). The
       "Our story" statement card and the Grace Wairimu pull quote — marked
       "sample quotation, not yet collected" and published anyway — were both
       removed 2026-09-13 at the client's request. */
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
