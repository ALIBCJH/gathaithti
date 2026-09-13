import type { GalleryContent } from '../types';

/**
 * The gallery — A WALK THROUGH THE SOCIETY, stop by stop.
 *
 * Approved by the client 2026-09-13 from the "Gathaithi Gallery Walk" proposal,
 * replacing ten numbered circles. The ten were numbered as if they were one
 * sequence, but the gate, the greenhouse and the committees are not steps the
 * coffee takes. As a WALK they are: twelve stops in the order a visitor would
 * come to them, and the route map beside the photographs says so.
 *
 * EVERY PHOTOGRAPH HERE WAS TAKEN AT GATHAITHI. Every other photograph on the
 * site was bought, generated or is unconfirmed; these are the society's own.
 * Do not add the ripe cherry, the hands over the basket, or the harvest pickers
 * until the client confirms they were taken here — asked 2026-09-13, unanswered.
 *
 * Each photograph carries its FILE'S shape in `ratio`: the walk never crops.
 *
 * Captions corrected from the circles version: the soaking tank no longer says
 * "after fermentation" (the Fermentation step was removed, #129), and the notice
 * board no longer mentions the cherry price, which the site stopped showing.
 *
 * The KCSAP stencils — the Kenya Climate Smart Agriculture Project — are
 * recorded where they appear. Nothing here describes a partnership or its
 * terms, because nobody has told us what those are.
 */
export const gallery: GalleryContent = {
  meta: {
    title: 'Gallery — a walk through the society | Gathaithi',
    description:
      'Twelve stops through the Gathaithi co-operative: the gate, the wet mill, the drying beds, the greenhouse and the people who run it.',
    ogLine: 'Twelve stops, from the gate to the people who run it',
  },

  hero: {
    mark: 'Gathaithi FCS · Gallery',
    title: 'A walk through',
    titleEmphasis: 'the society',
    lede: 'Twelve stops, from the gate to the people who run it. Every photograph on this page was taken at Gathaithi.',
    start: 'Walk in',
  },

  route: { label: 'Stops on the walk', title: 'The route' },

  stops: [
    {
      n: '01',
      id: 'gate',
      short: 'The gate',
      title: 'The gate',
      text: 'The values board beside the entrance: unity, self help, democracy, equality, development.',
      layout: 'opening',
      photos: [
        {
          imageSlot: 'galleryGate',
          ratio: '1024/1536',
          title: 'The gate',
          caption:
            'The board beside the entrance carries the co-operative values — unity, self help, democracy, equality, development — and the society’s motto: quality coffee, better livelihoods, a sustainable future.',
        },
      ],
    },
    {
      n: '02',
      id: 'notice-board',
      short: 'Notice board',
      title: 'The notice board',
      text: 'Where members read the payment dates and the meeting notices. Glass, a small roof of its own, and a fire extinguisher on the wall beside it.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'galleryNoticeBoard',
          ratio: '1308/816',
          title: 'The notice board',
          caption:
            'Where members read the payment dates and the meeting notices. Glass, a small roof of its own, and a fire extinguisher on the wall beside it.',
        },
      ],
    },
    {
      n: '03',
      id: 'pulper',
      short: 'Pulper',
      title: 'The pulper',
      text: 'Cherry delivered in the evening goes in whole and comes out as parchment the same night. The skin and pulp go one way, the beans the other.',
      layout: 'split-flip',
      act: { name: 'The mill', note: 'Stops 03 – 06 · cherry in, parchment out' },
      photos: [
        {
          imageSlot: 'galleryPulper',
          ratio: '1309/800',
          title: 'The pulper',
          caption:
            'Cherry delivered in the evening goes in whole and comes out as parchment the same night. The skin and pulp go one way, the beans the other.',
        },
      ],
    },
    {
      n: '04',
      id: 'washing-tank',
      short: 'Washing tank',
      title: 'The washing tank',
      text: 'Freshly pulped parchment comes off the drum screen into the tiled tank.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'processWashing',
          ratio: '1191/794',
          title: 'The washing tank',
          caption: 'Freshly pulped parchment comes off the drum screen into the tiled tank.',
        },
      ],
    },
    {
      n: '05',
      id: 'soaking-tank',
      short: 'Soaking tank',
      title: 'The soaking tank',
      text: 'Parchment held under clean water for the second soak — the step that gives Kenyan coffee much of its clarity. Look at the wall: the society stencils its name on the tank itself.',
      layout: 'full',
      photos: [
        {
          imageSlot: 'galleryTankFull',
          ratio: '1282/816',
          title: 'The soaking tank',
          caption:
            'Parchment held under clean water for the second soak — the step that gives Kenyan coffee much of its clarity. The wall is stencilled KCSAP/CGN/GATHAITHI FCS – SOAKING.',
        },
      ],
    },
    {
      n: '06',
      id: 'pump',
      short: 'The pump',
      title: 'The re-circulation pump',
      text: 'Not a stop the coffee makes, but what keeps the channels running: it sends water back through them instead of drawing it fresh each time.',
      layout: 'split-flip',
      photoSize: 'narrow',
      photos: [
        {
          imageSlot: 'galleryRecirculation',
          ratio: '1233/848',
          title: 'The re-circulation pump',
          caption:
            'Not a stop the coffee makes, but what keeps the channels running: it sends water back through them instead of drawing it fresh each time.',
        },
      ],
    },
    {
      n: '07',
      id: 'drying-beds',
      short: 'Drying beds',
      title: 'The drying beds',
      text: 'Parchment spread the length of a raised bed and turned by hand through the day, so it dries evenly and slowly rather than baking on one side.',
      layout: 'split',
      photoSize: 'tall',
      act: { name: 'The beds', note: 'Stops 07 – 09 · spread thin, turned by hand' },
      photos: [
        {
          imageSlot: 'galleryDryingBeds',
          ratio: '960/1096',
          title: 'The drying beds',
          caption:
            'Parchment spread the length of a raised bed and turned by hand through the day, so it dries evenly and slowly rather than baking on one side.',
        },
      ],
    },
    {
      n: '08',
      id: 'solar-drier',
      short: 'Solar drier',
      title: 'The solar drier',
      text: 'Beds under polythene for the wet months, each covered with jute sacking. The frame carries the same stencil as the tanks.',
      layout: 'full',
      tag: 'KCSAP/CON/Gathaithi FCS',
      photos: [
        {
          imageSlot: 'gallerySolarDrier',
          ratio: '1264/846',
          title: 'The solar drier',
          caption:
            'Beds under polythene for the wet months, each covered with jute sacking. The frame is stencilled KCSAP/CON/GATHAITHI FCS.',
        },
      ],
    },
    {
      n: '09',
      id: 'between-crops',
      short: 'Between crops',
      title: 'Between crops',
      text: 'When the harvest is in, the mill goes quiet.',
      layout: 'pair',
      quiet: true,
      photos: [
        {
          imageSlot: 'galleryDryingArea',
          ratio: '1216/879',
          title: 'The drying ground',
          caption: 'The beds empty, waiting for the next harvest. The tower carries the water and the lights.',
        },
        {
          imageSlot: 'gallerySoakingTank',
          ratio: '1312/812',
          title: 'The soaking tank, empty',
          caption: 'The same tank as stop 05, scrubbed and waiting.',
        },
      ],
    },
    {
      n: '10',
      id: 'greenhouse',
      short: 'Greenhouse',
      title: 'The greenhouse',
      text: 'Seedlings for replanting are raised here, long before any cherry reaches the mill.',
      layout: 'full',
      tag: 'Gathaithi FCS – Green house',
      act: { name: 'Before the harvest', note: 'Stops 10 – 11 · the work that comes first' },
      photos: [
        {
          imageSlot: 'galleryGreenhouse',
          ratio: '1278/816',
          title: 'The greenhouse',
          caption:
            'Seedlings for replanting are raised here. Its polythene is stencilled KCSAP/CON/GATHAITHI FCS-GREEN HOUSE.',
        },
      ],
    },
    {
      n: '11',
      id: 'members-farm',
      short: 'A member’s farm',
      title: 'A member’s farm',
      text: 'Up the hill from the mill: an agronomist scouting a tree, sample jar in one hand and clipboard in the other.',
      layout: 'split',
      photoSize: 'tall',
      photos: [
        {
          imageSlot: 'farmersTraining',
          ratio: '768/1406',
          title: 'A member’s farm',
          caption:
            'An agronomist scouting a coffee tree on a member’s farm, sample jar in one hand and clipboard in the other.',
        },
      ],
    },
    {
      n: '12',
      id: 'people',
      short: 'The people',
      title: 'The people',
      text: 'The committees the members elect, and the members themselves.',
      layout: 'pair',
      act: { name: 'The people', note: 'Stop 12 · the ones who own it' },
      photos: [
        {
          imageSlot: 'galleryCommittee',
          ratio: '1257/832',
          title: 'The committees',
          caption:
            'The management and supervisory committees, elected by the membership, standing on the drying beds they are responsible for.',
        },
        {
          imageSlot: 'farmersMembers',
          ratio: '1331/784',
          title: 'At the drying bed',
          caption: 'Members along a bed, hands in the parchment, the drying ground and the greenhouse behind them.',
        },
      ],
    },
  ],

  end: { title: 'End of the walk', back: 'Back to the gate' },

  viewer: {
    label: 'Photograph viewer',
    close: 'Close',
    previous: 'Previous photograph',
    next: 'Next photograph',
    count: 'Photo {{n}} / {{total}}',
    open: 'View larger: {{title}}',
  },
};
