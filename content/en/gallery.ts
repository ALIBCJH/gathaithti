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
    title: 'Gallery | A walk through Gathaithi',
    description:
      'Twelve stops around Gathaithi Farmers’ Co-operative Society: the gate, the wet mill, the drying beds, the greenhouse and the people who run the society.',
    ogLine: 'Twelve stops, from the gate to the people who run the society',
  },

  hero: {
    mark: 'Gathaithi FCS · Gallery',
    title: 'A walk through',
    titleEmphasis: 'the society',
    lede: 'Twelve stops, from the gate to the people who run the society. All photographs were taken at Gathaithi.',
    start: 'Walk in',
  },

  route: { label: 'Stops on the walk', title: 'The route' },

  stops: [
    {
      n: '01',
      id: 'gate',
      short: 'The gate',
      title: 'The gate',
      text: 'Our values board at the entrance: unity, self-help, democracy, equality and development.',
      layout: 'opening',
      photos: [
        {
          imageSlot: 'galleryGate',
          ratio: '1024/1536',
          title: 'The gate',
          caption:
            'The board at our entrance sets out the co-operative values of unity, self-help, democracy, equality and development, together with our motto: quality coffee, better livelihoods, a sustainable future.',
        },
      ],
    },
    {
      n: '02',
      id: 'notice-board',
      short: 'Notice board',
      title: 'The notice board',
      text: 'Members check payment dates and meeting notices on the society notice board.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'galleryNoticeBoard',
          ratio: '1308/816',
          title: 'The notice board',
          caption:
            'Members check payment dates and meeting notices on the society notice board.',
        },
      ],
    },
    {
      n: '03',
      id: 'pulper',
      short: 'Pulper',
      title: 'The pulper',
      text: 'Cherry delivered in the evening is pulped the same night. The pulper separates the skin and pulp from the beans.',
      layout: 'split-flip',
      act: { name: 'The mill', note: 'Stops 03–06 · from cherry to parchment' },
      photos: [
        {
          imageSlot: 'galleryPulper',
          ratio: '1309/800',
          title: 'The pulper',
          caption:
            'Cherry delivered in the evening is pulped the same night. The pulper separates the skin and pulp from the beans.',
        },
      ],
    },
    {
      n: '04',
      id: 'washing-tank',
      short: 'Washing tank',
      title: 'The washing tank',
      text: 'Freshly pulped parchment flows from the drum screen into the tiled washing tank.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'processWashing',
          ratio: '1191/794',
          title: 'The washing tank',
          caption: 'Freshly pulped parchment flows from the drum screen into the tiled washing tank.',
        },
      ],
    },
    {
      n: '05',
      id: 'soaking-tank',
      short: 'Soaking tank',
      title: 'The soaking tank',
      text: 'After washing, the parchment is soaked under clean water, a step that gives Kenyan washed coffee much of its clarity.',
      layout: 'full',
      photos: [
        {
          imageSlot: 'galleryTankFull',
          ratio: '1282/816',
          title: 'The soaking tank',
          caption:
            'After washing, the parchment is soaked under clean water, a step that gives Kenyan washed coffee much of its clarity. The tank is marked KCSAP/CGN/GATHAITHI FCS – SOAKING.',
        },
      ],
    },
    {
      n: '06',
      id: 'pump',
      short: 'The pump',
      title: 'The re-circulation pump',
      text: 'The re-circulation pump returns water through the channels, reducing the amount of fresh water the mill uses.',
      layout: 'split-flip',
      photoSize: 'narrow',
      photos: [
        {
          imageSlot: 'galleryRecirculation',
          ratio: '1233/848',
          title: 'The re-circulation pump',
          caption:
            'The re-circulation pump returns water through the channels, reducing the amount of fresh water the mill uses.',
        },
      ],
    },
    {
      n: '07',
      id: 'drying-beds',
      short: 'Drying beds',
      title: 'The drying beds',
      text: 'Parchment is spread along the raised beds and turned by hand throughout the day, so that it dries slowly and evenly.',
      layout: 'split',
      photoSize: 'tall',
      act: { name: 'The beds', note: 'Stops 07–09 · drying the parchment' },
      photos: [
        {
          imageSlot: 'galleryDryingBeds',
          ratio: '960/1096',
          title: 'The drying beds',
          caption:
            'Parchment is spread along the raised beds and turned by hand throughout the day, so that it dries slowly and evenly.',
        },
      ],
    },
    {
      n: '08',
      id: 'solar-drier',
      short: 'Solar drier',
      title: 'The solar drier',
      text: 'During the rainy season, parchment dries under polythene in the solar drier, with each bed covered in jute sacking.',
      layout: 'full',
      tag: 'KCSAP/CON/Gathaithi FCS',
      photos: [
        {
          imageSlot: 'gallerySolarDrier',
          ratio: '1264/846',
          title: 'The solar drier',
          caption:
            'During the rainy season, parchment dries under polythene in the solar drier, with each bed covered in jute sacking. The frame is marked KCSAP/CON/GATHAITHI FCS.',
        },
      ],
    },
    {
      n: '09',
      id: 'between-crops',
      short: 'Between crops',
      title: 'Between crops',
      text: 'Once the harvest is complete, the mill is cleaned and prepared for the next season.',
      layout: 'pair',
      quiet: true,
      photos: [
        {
          imageSlot: 'galleryDryingArea',
          ratio: '1216/879',
          title: 'The drying ground',
          caption: 'The drying beds between harvests. The tower supplies water and lighting.',
        },
        {
          imageSlot: 'gallerySoakingTank',
          ratio: '1312/812',
          title: 'The soaking tank, empty',
          caption: 'The soaking tank from stop 05, cleaned and ready for the next harvest.',
        },
      ],
    },
    {
      n: '10',
      id: 'greenhouse',
      short: 'Greenhouse',
      title: 'The greenhouse',
      text: 'Seedlings for replanting are raised in the society greenhouse.',
      layout: 'full',
      tag: 'Gathaithi FCS – Green house',
      act: { name: 'Before the harvest', note: 'Stops 10–11 · before the harvest' },
      photos: [
        {
          imageSlot: 'galleryGreenhouse',
          ratio: '1278/816',
          title: 'The greenhouse',
          caption:
            'Seedlings for replanting are raised here. The greenhouse is marked KCSAP/CON/GATHAITHI FCS – GREEN HOUSE.',
        },
      ],
    },
    {
      n: '11',
      id: 'members-farm',
      short: 'A member’s farm',
      title: 'A member’s farm',
      text: 'An agronomist inspects a coffee tree on a member’s farm as part of the society’s field support.',
      layout: 'split',
      photoSize: 'tall',
      photos: [
        {
          imageSlot: 'farmersTraining',
          ratio: '768/1406',
          title: 'A member’s farm',
          caption:
            'An agronomist inspects a coffee tree on a member’s farm, collecting samples and recording observations.',
        },
      ],
    },
    {
      n: '12',
      id: 'people',
      short: 'The people',
      title: 'The people',
      text: 'The elected committees and the members they serve.',
      layout: 'pair',
      act: { name: 'The people', note: 'Stop 12 · the members who own the society' },
      photos: [
        {
          imageSlot: 'galleryCommittee',
          ratio: '1257/832',
          title: 'The committees',
          caption:
            'The management and supervisory committees, elected by the members, at the drying beds.',
        },
        {
          imageSlot: 'farmersMembers',
          ratio: '1331/784',
          title: 'At the drying bed',
          caption: 'Members working the parchment at a drying bed, with the drying ground and greenhouse behind them.',
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
