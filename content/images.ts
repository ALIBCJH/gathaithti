/**
 * ══════════════════════════════════════════════════════════════════════════
 *  IMAGE REGISTRY — every photograph the site can hold.
 * ══════════════════════════════════════════════════════════════════════════
 *
 *  To add a photo: drop the file into /public/images with the exact `file`
 *  name below. Nothing else. The site swaps the designed placeholder for the
 *  real photograph on the next build.
 *
 *  To add a NEW slot: add an entry here, then reference it in a page with
 *  <SmartImage slot="yourKey" />, and add a row to /public/images/IMAGES.md.
 *  `npm run images` checks that this file, IMAGES.md and the folder agree.
 *
 *  Alt text is written here, in full, for every slot. Never leave it blank.
 *  Art direction is written here too — it is what the placeholder prints on
 *  screen and what the photographer gets in the shot list.
 */

import type { ImageSlot } from './types';

export const images = {
  /* ── Home ───────────────────────────────────────────────────────────── */
  homeHero: {
    file: 'gathaithi-cherry-sunrise.jpg',
    page: 'Home',
    section: 'Hero',
    /* Portrait, not the 21:9 this slot was originally specified as. The hero
       is full-bleed and cropped by `object-cover`, so the frame it is cropped
       INTO is the viewport, not this ratio — a tall original gives the crop
       room to breathe on a phone held upright, which is how most of this site
       is read. The ratio is recorded honestly for the placeholder. */
    ratio: '2/3',
    minWidth: 1600,
    minHeight: 2400,
    direction:
      'Ripe cherry on the branch at sunrise, the hills behind going gold. Shot portrait and shallow, so the branch runs on the diagonal and the sky stays open on one side — the headline sits in that open sky, so it must not be filled with detail.',
    alt: 'Ripe red coffee cherry on the branch at sunrise, with the hills of Nyeri behind.',
    priority: true,
    sizes: '100vw',
  },
  homeSeason: {
    file: 'gathaithi-selective-picking.jpg',
    page: 'Home',
    section: 'Current season',
    ratio: '4/5',
    minWidth: 1600,
    minHeight: 2000,
    direction:
      'Close on a picker’s hands and a full bucket of ripe cherry. Skilled work, unhurried. Face optional; if included, working, not posed for the camera.',
    alt: 'A Gathaithi member picking ripe red cherry by hand from the branch, a full basket beside her.',
    sizes: '(min-width: 1024px) 40vw, 100vw',
  },
  homeStory: {
    file: 'gathaithi-wet-mill-morning.jpg',
    page: 'Home',
    section: 'Story teaser',
    ratio: '3/2',
    minWidth: 2400,
    minHeight: 1600,
    direction:
      'The wet mill in early morning working light — pulper, channels, delivery bay. Wide enough to read as a working factory, not a detail shot.',
    alt: 'The Gathaithi wet mill at first light, with pulping channels and the cherry delivery bay.',
    sizes: '(min-width: 1024px) 55vw, 100vw',
  },

  /* ── About ──────────────────────────────────────────────────────────── */
  aboutHero: {
    file: 'gathaithi-village-ridge.jpg',
    page: 'About',
    section: 'Hero',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'Gathaithi village and the surrounding shambas from a high point: coffee, terracing, red soil, tin roofs, cloud on the Aberdares. Landscape as evidence of terroir.',
    alt: 'Gathaithi village and the surrounding coffee farms on the slopes of Tetu, Nyeri County.',
    priority: true,
    sizes: '100vw',
  },
  aboutGovernance: {
    file: 'gathaithi-committee-meeting.jpg',
    page: 'About',
    section: 'Governance',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'The management committee in session at the society office — minute book, ledgers, people mid-discussion. Documentary, not a staged handshake or a row of folded arms.',
    alt: 'Members of the Gathaithi management committee in session at the society office.',
    sizes: '(min-width: 1024px) 45vw, 100vw',
  },
  aboutTerroir: {
    file: 'gathaithi-soil-and-tree.jpg',
    page: 'About',
    section: 'Terroir',
    ratio: '4/5',
    minWidth: 1600,
    minHeight: 2000,
    direction:
      'Base of a mature SL28 tree: deep red volcanic soil, mulch, the trunk and a branch of green cherry. Shot in shade for colour accuracy in the soil.',
    alt: 'The base of a mature SL28 coffee tree in deep red volcanic soil on a Gathaithi member’s farm.',
    sizes: '(min-width: 1024px) 35vw, 100vw',
  },
  aboutWelfare: {
    file: 'gathaithi-cherry-delivery.jpg',
    page: 'About',
    section: 'Member welfare',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'Evening cherry delivery: weighing scale, the clerk writing the receipt, a member watching the reading. The moment the crop becomes a number in the books.',
    alt: 'A Gathaithi member’s cherry being weighed and recorded at the mill delivery bay.',
    sizes: '(min-width: 1024px) 50vw, 100vw',
  },

  /* ── Products ───────────────────────────────────────────────────────── */
  productsHero: {
    file: 'gathaithi-parchment-in-hands.jpg',
    page: 'Our Coffee',
    section: 'Hero',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'Two hands lifting dried parchment from a bed, backlit so the beans separate. Tight, tactile, no branding in frame.',
    alt: 'Dried coffee parchment lifted from a raised bed at the Gathaithi wet mill.',
    priority: true,
    sizes: '100vw',
  },
  lotAA: {
    file: 'gathaithi-retail-pack.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — AA',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction:
      'STAND-IN. One photograph currently serves all four grade cards — a retail pack, not the green-bean flat-lay this slot was written for. Replace with the flat-lay described below and give each grade its own file: Square flat-lay of AA green beans on parchment paper, raking side light so bean size and uniformity read clearly. Beans fill the frame, centred, with even margins. Identical setup, light, height and crop for all four grade shots — they sit side by side in a grid and any difference in framing shows.',
    alt: 'A 250 g retail pack of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  lotAB: {
    file: 'gathaithi-retail-pack.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — AB',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction: 'STAND-IN. One photograph currently serves all four grade cards — a retail pack, not the green-bean flat-lay this slot was written for. Replace with the flat-lay described below and give each grade its own file: As the AA flat-lay, identical setup. AB beans.',
    alt: 'A 250 g retail pack of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  lotPB: {
    file: 'gathaithi-retail-pack.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — PB',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction: 'STAND-IN. One photograph currently serves all four grade cards — a retail pack, not the green-bean flat-lay this slot was written for. Replace with the flat-lay described below and give each grade its own file: As the AA flat-lay, identical setup. Peaberry — the round single seeds should be obvious.',
    alt: 'A 250 g retail pack of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  lotC: {
    file: 'gathaithi-retail-pack.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — C',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction: 'STAND-IN. One photograph currently serves all four grade cards — a retail pack, not the green-bean flat-lay this slot was written for. Replace with the flat-lay described below and give each grade its own file: As the AA flat-lay, identical setup. Grade C beans.',
    alt: 'A 250 g retail pack of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  processPulping: {
    file: 'process-01-pulping.jpg',
    page: 'Our Coffee',
    section: 'Processing — pulping',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction: 'Cherry entering the disc pulper, water moving, skins separating. Freeze the motion; keep the machinery legible.',
    alt: 'Ripe cherry passing through the disc pulper at the Gathaithi wet mill.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processFermentation: {
    file: 'process-02-fermentation.jpg',
    page: 'Our Coffee',
    section: 'Processing — fermentation',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction: 'A fermentation tank at dusk, filled with parchment under mucilage. Overhead or high three-quarter angle.',
    alt: 'Parchment coffee fermenting overnight in a tank at the Gathaithi wet mill.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processWashing: {
    file: 'process-03-washing.jpg',
    page: 'Our Coffee',
    section: 'Processing — washing',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction: 'Washing channels with parchment being graded by density, a worker with a wooden paddle. Water motion is the subject.',
    alt: 'Parchment being washed and density-graded in the channels at Gathaithi.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processSoaking: {
    file: 'process-04-second-soak.jpg',
    page: 'Our Coffee',
    section: 'Processing — second soak',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction: 'Clean water soak tank, parchment fully submerged, surface still enough to read the beans through it.',
    alt: 'Washed parchment resting under clean water during the second soak at Gathaithi.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processDrying: {
    file: 'process-05-raised-beds.jpg',
    page: 'Our Coffee',
    section: 'Processing — drying',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction: 'A worker turning parchment on a raised bed, shade nets rolled back, rows receding. Late afternoon light.',
    alt: 'Parchment being turned by hand on raised drying beds at the Gathaithi wet mill.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  sampleForm: {
    file: 'gathaithi-sample-preparation.jpg',
    page: 'Our Coffee',
    section: 'Request a sample',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction: 'Sample bags being weighed and labelled for despatch, or a cupping table mid-session. Precision and record-keeping, not romance.',
    alt: 'Green coffee samples being weighed and labelled for despatch at Gathaithi.',
    sizes: '(min-width: 1024px) 35vw, 100vw',
  },

  /* ── Farmers ────────────────────────────────────────────────────────── */
  farmersHero: {
    file: 'gathaithi-members-collection-point.jpg',
    page: 'Our Farmers',
    section: 'Hero',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'Members at a collection point in the evening with full buckets, talking, queueing, being weighed. Owners of a business at work — not recipients of anything.',
    alt: 'Gathaithi members delivering the day’s cherry at a village collection point.',
    priority: true,
    sizes: '100vw',
  },
  memberOne: {
    file: 'member-01-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction:
      'Environmental portrait on the member’s own shamba, standing, eye level, looking at the lens. Even shade. Confident, not smiling on command. Same treatment for all six portraits.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberTwo: {
    file: 'member-02-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-01-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberThree: {
    file: 'member-03-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-01-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberFour: {
    file: 'member-04-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-01-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberFive: {
    file: 'member-05-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-01-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberSix: {
    file: 'member-06-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-01-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  farmersTraining: {
    file: 'gathaithi-agronomy-training.jpg',
    page: 'Our Farmers',
    section: 'Training',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'A field day in progress: the agronomist demonstrating pruning on a real tree, members close in around it, secateurs in hands. Teaching between equals.',
    alt: 'Gathaithi members at a field day, learning pruning technique on a mature coffee tree.',
    sizes: '(min-width: 1024px) 50vw, 100vw',
  },
  farmersPrefinance: {
    file: 'gathaithi-society-office.jpg',
    page: 'Our Farmers',
    section: 'Pre-finance',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'The society office counter: member records, a clerk, an application being completed. Administrative competence, plainly shown.',
    alt: 'A member completing a pre-finance application at the Gathaithi society office.',
    sizes: '(min-width: 1024px) 45vw, 100vw',
  },

  /* ── Contact ────────────────────────────────────────────────────────── */
  contactOffice: {
    file: 'gathaithi-office-exterior.jpg',
    page: 'Contact',
    section: 'Hero',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'The society office and mill entrance from the approach road, signage legible. This is the “you have arrived” photograph — shoot it in flat morning light.',
    alt: 'The entrance to the Gathaithi Farmers’ Co-operative Society office and wet mill.',
    sizes: '(min-width: 1024px) 50vw, 100vw',
  },
  locationMap: {
    file: 'gathaithi-location-map.jpg',
    page: 'About & Contact',
    section: 'Location',
    ratio: '4/3',
    minWidth: 1600,
    minHeight: 1200,
    direction:
      'A flat, exported map still — Nyeri County with Gathaithi marked, Nyeri town and Nairobi for reference. Muted, no satellite imagery, no third-party watermark. Export at 2× for retina.',
    alt: 'Map showing the location of Gathaithi in Tetu sub-county, Nyeri County, Kenya.',
    sizes: '(min-width: 1024px) 45vw, 100vw',
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
export const imageList = Object.entries(images).map(([key, value]) => ({ key, ...value }));
