import type { GalleryContent } from '../types';

/**
 * The gallery.
 *
 * Every other photograph on this site was bought or generated: coffee in
 * general, standing in for Gathaithi in particular. These four are of the
 * society itself — its committee, its beds, its drier, its greenhouse — and
 * that is the whole reason the page exists. It is not a decorative slideshow;
 * it is the first evidence on the site that the place is real.
 *
 * Captions say what the picture SHOWS. Two of them carry the stencil
 * "KCSAP/CON/GATHAITHI FCS" — the Kenya Climate Smart Agriculture Project —
 * and the captions record that the marking is there. They do not describe a
 * partnership or its terms, because nobody has told us what those are.
 */
export const gallery: GalleryContent = {
  meta: {
    title: 'Gallery — the mill, the beds and the committee | Gathaithi',
    description:
      'Photographs of Gathaithi Farmers’ Co-operative Society: the drying beds, the solar drier, the greenhouse and the elected committees, at the wet mill in Tetu, Nyeri.',
    ogLine: 'The wet mill, the drying beds and the people who run them',
  },

  hero: {
    eyebrow: 'Gallery',
    title: 'The society, photographed',
    lead:
      'The mill, the drying beds, the solar drier and the people elected to run them — photographed at Gathaithi, in Tetu.',
  },

  items: [
    {
      id: 'committee',
      imageSlot: 'galleryCommittee',
      caption:
        'The management and supervisory committees on the drying beds, the greenhouse behind them.',
    },
    {
      id: 'drying-beds',
      imageSlot: 'galleryDryingBeds',
      caption:
        'Parchment spread the length of a raised bed, turned by hand through the day so it dries evenly.',
    },
    {
      id: 'solar-drier',
      imageSlot: 'gallerySolarDrier',
      caption:
        'Inside the solar drier: raised beds under polythene, each covered with jute sacking. The frame is stencilled KCSAP/CON/GATHAITHI FCS.',
    },
    {
      id: 'gate',
      imageSlot: 'galleryGate',
      caption:
        'The entrance to the society. The board beside the gate carries the co-operative values — unity, self help, democracy, equality, development — and the motto: quality coffee, better livelihoods, a sustainable future.',
    },
    {
      id: 'pulper',
      imageSlot: 'galleryPulper',
      caption:
        'The pulper, under its roof at the wet mill. Cherry goes in whole and comes out as parchment the same night it is delivered.',
    },
    {
      id: 'drying-area',
      imageSlot: 'galleryDryingArea',
      caption:
        'The drying ground between crops: bed frames running down the slope, waiting for the next harvest.',
    },
    {
      id: 'greenhouse',
      imageSlot: 'galleryGreenhouse',
      caption:
        'The greenhouse at the mill, its polythene stencilled KCSAP/CON/GATHAITHI FCS-GREEN HOUSE.',
    },
  ],

  prevLabel: 'Previous photograph',
  nextLabel: 'Next photograph',
  pauseLabel: 'Pause the gallery',
  playLabel: 'Play the gallery',
  regionLabel: 'Photographs of the society',
  slideLabel: 'Photograph {{n}} of {{total}}',
};
