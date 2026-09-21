import type { GalleryContent } from '../types';

/**
 * The gallery — A WALK THROUGH THE SOCIETY, stop by stop.
 *
 * Approved by the client 2026-09-13 from the "Gathaithi Gallery Walk" proposal,
 * replacing ten numbered circles. The ten were numbered as if they were one
 * sequence, but the gate, the greenhouse and the committees are not steps the
 * coffee takes. As a WALK they are: eleven stops (twelve until the greenhouse
 * came off on 2026-09-21, at the client's request) in the order a visitor would
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
      'Photographs of Gathaithi Farmers’ Co-operative Society: the wet mill, the drying beds, a member’s farm and the committees who run the society.',
    ogLine: 'Eleven stops, from the entrance to the people who run the society',
  },

  hero: {
    mark: 'Gathaithi FCS · Gallery',
    title: 'A walk through',
    titleEmphasis: 'the society',
    lede: 'Eleven stops around the society, from the entrance to the people who run it. All photographs were taken at Gathaithi.',
    start: 'Walk in',
  },

  route: { label: 'Stops on the walk', title: 'The route' },

  /* Stop descriptions and captions rewritten 2026-09-18 at the client's
     request ("make them descriptive"): what each photograph shows and what
     that part of the mill does, in plain terms. */
  /* No act dividers ("The mill", "The beds", "Before the harvest", "The
     people") since 2026-09-20: the client asked for those titles and their
     "Stops 03-06 ..." notes to come off. `act` is optional on a stop, so the
     walk simply runs stop to stop; adding one back is a single line. */
  stops: [
    {
      n: '01',
      id: 'gate',
      short: 'The gate',
      title: 'The gate',
      /* The society's own welcome, 2026-09-21; 1,988 via {{members}}. */
      text: 'Welcome to Gathaithi Farmers’ Co-operative Society. Our main entrance stands as a testament to collective ownership, displaying the core values that drive our {{members}} members: unity, self-help, democracy, equality, and continuous development. Guided by our founding motto—Quality Coffee, Better Livelihoods, a Sustainable Future—this gateway marks the start of every harvest journey from farm to market.',
      layout: 'opening',
      photos: [
        {
          imageSlot: 'galleryGate',
          ratio: '1024/1536',
          title: 'The gate',
          caption: 'The society entrance, with the name board and the values board beside the road up to the mill.',
        },
      ],
    },
    {
      n: '02',
      id: 'notice-board',
      short: 'Notice board',
      title: 'The notice board',
      text: 'The members’ notice board at the mill. Cherry payment dates, meeting notices and society announcements are posted here, behind glass, for every member to read.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'galleryNoticeBoard',
          ratio: '1308/816',
          title: 'The notice board',
          caption: 'The members’ notice board, a glazed case mounted on the timber store building.',
        },
      ],
    },
    {
      n: '03',
      id: 'pulper',
      short: 'Pulper',
      title: 'The pulper',
      text: 'The pulping machine is the first stage of wet processing. It removes the skin and pulp from freshly delivered cherry, releasing the beans in their parchment layer on the evening of delivery.',
      layout: 'split-flip',
      photos: [
        {
          imageSlot: 'galleryPulper',
          ratio: '1309/800',
          title: 'The pulper',
          caption: 'The pulping machine at the Gathaithi wet mill, stencilled GATHAITHI FCS – PULPER MACHINE.',
        },
      ],
    },
    {
      n: '04',
      id: 'washing-tank',
      short: 'Washing tank',
      title: 'The washing tank',
      text: 'After pulping, the parchment passes over a rotating drum screen into this tiled tank, where it is washed in clean water to remove the remaining fruit.',
      layout: 'split',
      photos: [
        {
          imageSlot: 'processWashing',
          ratio: '1191/794',
          title: 'The washing tank',
          caption: 'Freshly pulped parchment in the tiled washing tank, with the drum screen above.',
        },
      ],
    },
    {
      n: '05',
      id: 'soaking-tank',
      short: 'Soaking tank',
      title: 'The soaking tank',
      text: 'The washed parchment is soaked under clean water before drying. This soak, a hallmark of Kenyan washed coffee, gives the cup its clean, bright character.',
      layout: 'full',
      photos: [
        {
          imageSlot: 'galleryTankFull',
          ratio: '1282/816',
          title: 'The soaking tank',
          caption: 'Parchment soaking in the tiled tank, marked KCSAP/CGN/GATHAITHI FCS – SOAKING.',
        },
      ],
    },
    {
      n: '06',
      id: 'pump',
      short: 'The pump',
      title: 'The re-circulation pump',
      text: 'The pump house returns water from the washing channels back into the system, reducing the amount of fresh water the mill draws during processing.',
      layout: 'split-flip',
      photoSize: 'narrow',
      photos: [
        {
          imageSlot: 'galleryRecirculation',
          ratio: '1233/848',
          title: 'The re-circulation pump',
          caption: 'The re-circulation pump house beside the concrete washing channels.',
        },
      ],
    },
    {
      n: '07',
      id: 'drying-beds',
      short: 'Drying beds',
      title: 'The drying beds',
      text: 'Parchment is spread in a thin layer along the raised drying beds and turned by hand throughout the day, so that it dries slowly and evenly in the sun.',
      layout: 'split',
      photoSize: 'tall',
      photos: [
        {
          imageSlot: 'galleryDryingBeds',
          ratio: '960/1096',
          title: 'The drying beds',
          caption: 'Parchment drying on a long raised bed, with a worker turning the coffee at the far end.',
        },
      ],
    },
    {
      n: '08',
      id: 'solar-drier',
      short: 'Solar drier',
      title: 'The solar drier',
      text: 'During the rainy season, parchment dries on raised beds inside the solar drier, where the polythene cover keeps off the rain while letting in the heat of the sun.',
      layout: 'full',
      tag: 'KCSAP/CON/Gathaithi FCS',
      photos: [
        {
          imageSlot: 'gallerySolarDrier',
          ratio: '1264/846',
          title: 'The solar drier',
          caption: 'Inside the solar drier: rows of raised beds under polythene, covered with jute coffee sacks.',
        },
      ],
    },
    {
      n: '09',
      id: 'between-crops',
      short: 'Between crops',
      title: 'Between crops',
      text: 'Between harvests, the drying ground and the tanks are cleaned and prepared for the next season.',
      layout: 'pair',
      quiet: true,
      photos: [
        {
          imageSlot: 'galleryDryingArea',
          ratio: '1216/879',
          title: 'The drying ground',
          caption: 'The drying ground between harvests, with rows of empty bed frames below the water tower.',
        },
        {
          imageSlot: 'gallerySoakingTank',
          ratio: '1312/812',
          title: 'The soaking tank, between harvests',
          caption: 'The soaking tank, emptied and cleaned between harvests.',
        },
      ],
    },
    {
      n: '10',
      id: 'members-farm',
      short: 'A member’s farm',
      title: 'A member’s farm',
      text: 'Field support on a member’s farm: an agronomist inspects the coffee trees and records observations for the farmer.',
      layout: 'split',
      photoSize: 'tall',
      photos: [
        {
          imageSlot: 'farmersTraining',
          ratio: '768/1406',
          title: 'A member’s farm',
          caption: 'An agronomist with a clipboard and sample cup inspecting coffee trees on a member’s farm.',
        },
      ],
    },
    {
      n: '11',
      id: 'people',
      short: 'The people',
      title: 'The people',
      text: 'The management and supervisory committees, elected by our members to run and oversee the society.',
      layout: 'pair',
      photos: [
        {
          imageSlot: 'galleryCommittee',
          ratio: '1257/832',
          title: 'The committees',
          caption: 'The management and supervisory committees at the drying ground.',
        },
        {
          imageSlot: 'farmersMembers',
          ratio: '1331/784',
          title: 'Checking the parchment',
          caption: 'Committee members at a drying bed, checking the parchment by hand.',
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
