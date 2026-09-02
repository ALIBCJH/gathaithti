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
  /* Slides two and three of the hero. Both are LANDSCAPE, where homeHero is
     portrait, so on a phone held upright `object-cover` throws away far more
     of them than it does of the first — roughly three quarters of the width at
     390px. Neither has an empty corner for type either, which is why the crop
     on each is set separately below and why the scrim carries them rather than
     the other way round. */
  homeHeroTwo: {
    file: 'gathaithi-roasted-beans.jpg',
    page: 'Home',
    section: 'Hero — slide 2',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'A full frame of roasted beans, filling the frame edge to edge with no focal point — an all-over texture, which is the one kind of picture that survives being cropped to any shape. Warm and dark enough to carry white type anywhere in the frame.',
    alt: 'Roasted coffee beans filling the frame.',
    sizes: '100vw',
  },
  homeHeroThree: {
    file: 'gathaithi-cherry-branch.jpg',
    page: 'Home',
    section: 'Hero — slide 3',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'A branch of ripening cherry, red and green together, shot shallow so the canopy behind falls away to green bokeh. The cluster sits left of centre; the crop holds it there as the frame narrows.',
    alt: 'A branch of Gathaithi coffee carrying ripe red and unripe green cherry together.',
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

  /* ── About ──────────────────────────────────────────────────────────── */
  aboutHero: {
    file: 'gathaithi-member-at-the-tree.jpg',
    page: 'About',
    section: 'Hero',
    /* Landscape, and cropped hard to a tall panel by the layout. The frame it
       is cropped INTO is a column, not this ratio, so the ratio here is what
       the file is rather than what the page shows. */
    ratio: '3/2',
    minWidth: 2400,
    minHeight: 1600,
    direction:
      'MET, and under-sized. A member reaching up into the branch, taking ripe cherry by hand on the upper slopes, hills behind. The gesture is vertical and the crop on the page is a tall column, so the reach is what has to survive the crop — the subject must sit left of centre with room above the hands. The file in place is 1536x1024, which the panel upscales; a 2400px original of this same frame would be a straight swap.',
    alt: 'A Gathaithi member reaching up into a coffee tree to pick ripe red cherry by hand, the hills of Tetu behind.',
    priority: true,
    sizes: '(min-width: 1024px) 46vw, 100vw',
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
    file: 'gathaithi-ripening-cherry.jpg',
    page: 'About',
    section: 'Terroir',
    ratio: '4/5',
    minWidth: 1600,
    minHeight: 2000,
    direction:
      'STAND-IN, and a borrowed one — this slot currently shows the Our Coffee hero, the only frame in hand of coffee growing rather than being handled. It is landscape in a portrait box, so it is cropped hard, and it is the same photograph on two pages: it carries the section, it should not stay. The brief: base of a mature SL28 tree, deep red volcanic soil, mulch, the trunk and a branch of green cherry, shot portrait and in shade for colour accuracy — the soil is the argument this section makes.',
    alt: 'Coffee growing at Gathaithi on the eastern slopes below the Aberdare range.',
    sizes: '(min-width: 1024px) 35vw, 100vw',
  },

  /* The nine members of the management committee. Portraits are being
     collected from the committee itself, so the brief matters more than usual:
     nine frames shot by nine different hands, at nine different times of day,
     will read as nine unrelated pictures no matter how good each one is. The
     direction on board-01 is the reference; the other eight point at it. */
  boardOne: {
    file: 'board-01-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction:
      'Head-and-shoulders portrait, shot PORTRAIT orientation, eye level, looking at the lens. Even shade or an overcast sky — never direct midday sun, which puts the eyes in shadow. Plain or softly out-of-focus background: the mill wall, foliage, the office exterior. Head in the upper third with room above it. Composed, not smiling on command. THE SAME treatment for all nine: they sit in one grid and any difference in height, crop or light shows immediately. A phone camera in shade, held level, at chest height of the sitter, is enough.',
    alt: 'Portrait of the Chairperson of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardTwo: {
    file: 'board-02-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Vice-Chairperson.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardThree: {
    file: 'board-03-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Treasurer.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardFour: {
    file: 'board-04-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Secretary.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardFive: {
    file: 'board-05-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardSix: {
    file: 'board-06-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardSeven: {
    file: 'board-07-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardEight: {
    file: 'board-08-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardNine: {
    file: 'board-09-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Portrait of a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },

  /* ── Products ───────────────────────────────────────────────────────── */
  productsHero: {
    file: 'gathaithi-ripening-cherry.jpg',
    page: 'Our Coffee',
    section: 'Hero',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'STAND-IN. Currently a daylight frame of mixed-ripeness cherry on the branch — red, yellow and green together — which suits a page about grading and selective picking, but is not the shot this slot was written for. The brief still stands: two hands lifting dried parchment from a bed, backlit so the beans separate. Tight, tactile, no branding in frame.',
    alt: 'Ripe and ripening coffee cherry on the branch at Gathaithi — red, yellow and green together.',
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
  /* Step 01 of the walkthrough had no slot of its own — it borrowed the home
     page's season photograph, which meant one file doing two jobs and the only
     step in the sequence rendering 4:5 while 02–05 render 3:2. It has its own
     now, at the same ratio as the rest of the line. */
  processPicking: {
    file: 'gathaithi-picking-hands.jpg',
    page: 'Our Coffee',
    section: 'Processing — selective picking',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction:
      'Close on a picker’s hands taking ripe red cherry off the branch, one at a time, with green and unripe fruit left on the wood beside it. Skilled work, unhurried. The selectivity is the subject — the frame has to show what is being left behind as well as what is being taken.',
    alt: 'A picker’s hands taking ripe red cherry from the branch, leaving the green fruit behind.',
    sizes: '(min-width: 1024px) 45vw, 100vw',
  },

  processPulping: {
    file: 'process-01-pulping.jpg',
    page: 'Our Coffee',
    section: 'Processing — pulping',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction:
      'PARTLY MET. The frame in place shows the pulper with whole red cherry on one side and freshly pulped parchment on the other — the separation reads clearly, which is the point of the step. What it does not show is the water: the brief asked for cherry entering the disc pulper with water moving and skins separating, motion frozen. Worth reshooting for that; usable until then.',
    alt: 'A pulper at Gathaithi, whole red cherry on one side and freshly pulped parchment on the other.',
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
  /* The harvest sequence, which rotates in the champion section. Three
     frames of the same act, so they have to sit in one frame without the eye
     jumping: all three are landscape at roughly 3:2, and in all three the
     person is right of centre with the loaded branch to their left. That is
     why they cross-fade rather than slide — the subject barely moves between
     them, and a slide would throw away the one thing they have in common. */
  harvestOne: {
    file: 'harvest-01-picking.jpg',
    page: 'Our Farmers',
    section: 'The harvest',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction:
      'A member picking ripe cherry by hand, close in, mid-work and clearly enjoying it. Subject right of centre, the loaded branch filling the left of the frame. Daylight, no flash.',
    alt: 'A Gathaithi member in a red headscarf picking ripe red cherry by hand, a branch heavy with fruit beside her.',
    priority: true,
    sizes: '(min-width: 1024px) 55vw, 100vw',
  },
  harvestTwo: {
    file: 'harvest-02-reaching.jpg',
    page: 'Our Farmers',
    section: 'The harvest',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction: 'As harvest-01. A member reaching up into the branch, sky behind, selecting fruit rather than stripping it.',
    alt: 'A Gathaithi member reaching up into a coffee branch to select ripe cherry, blue sky behind.',
    sizes: '(min-width: 1024px) 55vw, 100vw',
  },
  harvestThree: {
    file: 'harvest-03-two-members.jpg',
    page: 'Our Farmers',
    section: 'The harvest',
    ratio: '3/2',
    minWidth: 2000,
    minHeight: 1334,
    direction: 'As harvest-01. Two members working the same tree from either side — the crop is family work, and this is the frame that shows it.',
    alt: 'Two Gathaithi members working the same coffee tree from either side, picking ripe cherry.',
    sizes: '(min-width: 1024px) 55vw, 100vw',
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
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
export const imageList = Object.entries(images).map(([key, value]) => ({ key, ...value }));
