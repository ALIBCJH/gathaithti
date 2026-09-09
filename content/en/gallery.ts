import type { GalleryContent } from '../types';

/**
 * The gallery — and it is a walk through the mill, not a pile of pictures.
 *
 * Every other photograph on this site was bought or generated: coffee in
 * general, standing in for Gathaithi in particular. These ten are of the
 * society itself, and they happen to cover the whole of it — the gate you
 * arrive at, the board members read, the machines the cherry passes through in
 * order, the beds it dries on, the greenhouse, and the people who run it.
 *
 * So they are ORDERED as the coffee moves and numbered accordingly. Someone
 * who scrolls the page and reads nothing else should still come away knowing
 * roughly how a wet mill works.
 *
 * Three of them carry the stencil "KCSAP/…/GATHAITHI FCS" — the Kenya Climate
 * Smart Agriculture Project. The captions record that the marking is there.
 * They do not describe a partnership or its terms, because nobody has told us
 * what those are.
 */
export const gallery: GalleryContent = {
  meta: {
    title: 'Gallery — a walk through the wet mill | Gathaithi',
    description:
      'Photographs of the Gathaithi wet mill: the gate, the pulper, the washing channels, the drying beds, the greenhouse and the elected committees.',
    ogLine: 'The gate, the pulper, the beds and the people who run them',
  },

  hero: {
    eyebrow: 'Gallery',
    title: 'A walk through the mill',
  },

  items: [
    {
      id: 'gate',
      imageSlot: 'galleryGate',
      title: 'The gate',
      caption:
        'The board beside the entrance carries the co-operative values — unity, self help, democracy, equality, development — and the society’s motto: quality coffee, better livelihoods, a sustainable future.',
    },
    {
      id: 'notice-board',
      imageSlot: 'galleryNoticeBoard',
      title: 'The notice board',
      caption:
        'Where members read the cherry price, the payment dates and the meeting notices. Glass, a small roof of its own, and a fire extinguisher on the wall beside it.',
    },
    {
      id: 'pulper',
      imageSlot: 'galleryPulper',
      title: 'The pulper',
      caption:
        'Cherry delivered in the evening goes in whole and comes out as parchment the same night. The skin and pulp go one way, the beans the other.',
    },
    {
      id: 'recirculation',
      imageSlot: 'galleryRecirculation',
      title: 'The re-circulation pump',
      caption:
        'It moves water back through the washing channels instead of drawing it fresh each time, which is most of what keeps a wet mill’s water use down.',
      position: 'object-[60%_50%]',
    },
    {
      id: 'soaking-tank',
      imageSlot: 'gallerySoakingTank',
      title: 'The soaking tank',
      caption:
        'The second soak, tiled and photographed empty between crops. Parchment sits under clean water overnight after fermentation — the step that gives Kenyan coffee much of its clarity.',
      position: 'object-[65%_50%]',
    },
    {
      id: 'drying-beds',
      imageSlot: 'galleryDryingBeds',
      title: 'The drying beds',
      caption:
        'Parchment spread the length of a raised bed and turned by hand through the day, so it dries evenly and slowly rather than baking on one side.',
    },
    {
      id: 'solar-drier',
      imageSlot: 'gallerySolarDrier',
      title: 'The solar drier',
      caption:
        'Beds under polythene for the wet months, each covered with jute sacking. The frame is stencilled KCSAP/CON/GATHAITHI FCS.',
    },
    {
      id: 'drying-area',
      imageSlot: 'galleryDryingArea',
      title: 'Between crops',
      caption:
        'The drying ground with the beds empty, waiting for the next harvest. The tower carries the water and the lights.',
    },
    {
      id: 'greenhouse',
      imageSlot: 'galleryGreenhouse',
      title: 'The greenhouse',
      caption:
        'Seedlings for replanting are raised here. Its polythene is stencilled KCSAP/CON/GATHAITHI FCS-GREEN HOUSE.',
    },
    {
      id: 'committee',
      imageSlot: 'galleryCommittee',
      title: 'The committees',
      caption:
        'The management and supervisory committees, elected by the membership, standing on the drying beds they are responsible for.',
    },
  ],
};
