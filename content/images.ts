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
    file: 'gathaithi-sunrise-ridge.jpg',
    page: 'Home',
    section: 'Hero — slide 1',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'UNDER-SIZED, and knowingly so. Sunrise over the ridge with a branch of ripe cherry in the near foreground on the right. The frame in place is 1672x941, which is sharp on a desktop and soft on a phone — the hero fills the screen, and a portrait viewport crops this to a narrow vertical slice that has to be scaled up about 1.8x. A 2400x1350 original of the same frame is a straight swap and fixes both.',
    alt: 'Sunrise over the ridge above Gathaithi, with a branch of ripe red coffee cherry in the foreground.',
    priority: true,
    /* Not `100vw`, and this is the whole reason the hero looked soft on a
       phone. `sizes` describes the image's WIDTH, and the browser picks a
       srcset candidate from it — but a full-screen hero is cropped by HEIGHT
       on a portrait screen. At 390x844 the browser was asking for a 1200px
       file to fill a frame needing 2532 device pixels of height: a 3.75x
       upscale, chosen by the browser, with the full-size file sitting unused
       in the srcset. `178vh` is the width a 16:9 frame actually needs to cover
       a viewport of that height, so the request matches the crop. Desktop is
       width-bound and keeps 100vw. */
    sizes: '(max-width: 1023px) 178vh, 100vw',
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
    sizes: '(max-width: 1023px) 178vh, 100vw',
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
    sizes: '(max-width: 1023px) 178vh, 100vw',
  },
  homeHeroFour: {
    file: 'gathaithi-beans-falling.jpg',
    page: 'Home',
    section: 'Hero — slide 4',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'Roasted beans caught mid-fall against a deep brown ground, shallow depth of field. The darkest frame in the set, and the one the type sits most comfortably over.',
    alt: 'Roasted coffee beans falling through the air against a dark brown ground.',
    sizes: '(max-width: 1023px) 178vh, 100vw',
  },
  homeHeroFive: {
    file: 'gathaithi-cherry-sunlit.jpg',
    page: 'Home',
    section: 'Hero — slide 5',
    ratio: '16/9',
    minWidth: 2400,
    minHeight: 1350,
    direction:
      'A cluster of red, orange and green cherry on the branch with the sun flaring through the canopy behind. The flare is top-left and the type sits bottom-left, so the crop keeps the cluster right of centre and the leaves under the words.',
    alt: 'A cluster of ripening Gathaithi cherry — red, orange and green — with sunlight flaring through the canopy behind.',
    sizes: '(max-width: 1023px) 178vh, 100vw',
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
  /* PARKED — nothing renders this. The About page opened with a split hero
     built around this frame; the hero has gone and the page now opens on type.
     The file is still in /public/images and the brief below is still good, so
     the slot is kept rather than deleted: it is one line to place this
     photograph somewhere it earns its space. */
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
  /* The three photographs beside the history text. `historyOne` adopts
     gathaithi-mill-and-ridge.jpg, which had been orphaned since the About hero
     was replaced — it is the mill and the ridge behind it, which is exactly
     what this section is about, and it stops `npm run images` warning about a
     file nothing uses. */
  historyOne: {
    file: 'gathaithi-mill-and-ridge.jpg',
    page: 'About',
    section: 'History',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'The mill and the ground it stands on. The frame in place looks across the raised drying beds to the hills of Tetu behind — landscape in a portrait box, so it is cropped hard. A portrait original of the mill buildings would suit this slot better.',
    alt: 'The raised drying beds at the Gathaithi mill, with the hills of Tetu behind.',
    sizes: '(min-width: 1024px) 18vw, 45vw',
  },
  historyTwo: {
    file: 'gathaithi-society-store.jpg',
    page: 'About',
    section: 'History',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'The oldest building the society still uses — the office, the store, or the original mill shed. Shot portrait, straight on, in flat light. Age is the subject: render, doors, signwriting, whatever has been repainted over the years.',
    alt: 'The society office and store at Gathaithi.',
    sizes: '(min-width: 1024px) 18vw, 45vw',
  },
  historyThree: {
    file: 'gathaithi-collection-evening.jpg',
    page: 'About',
    section: 'History',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'Members at a collection point at the end of the day, buckets full, being weighed. Portrait. The same act the society has been doing since 1967, which is why it belongs in the history rather than in the process walkthrough.',
    alt: 'Gathaithi members delivering the day’s cherry at a village collection point in the evening.',
    sizes: '(min-width: 1024px) 18vw, 45vw',
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
  lotAA: {
    file: 'gathaithi-retail-pouch.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — AA',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction:
      'ONE PHOTOGRAPH FOR BOTH GRADES, and a retail pouch rather than the green-bean flat-lay this slot was written for. The card beside it sells green coffee per kilo, FOB Mombasa, minimum 300kg — a roasted, ground, medium-grind retail pack is a different product at a different point in the chain. The pack is portrait and the card is square, so it is cropped top and bottom; the label survives at a centred crop. The brief still stands: a square flat-lay of green beans on parchment paper, raking side light so bean size and uniformity read, one per grade, identical setup for all of them.',
    alt: 'A retail pouch of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  lotAB: {
    file: 'gathaithi-retail-pouch.jpg',
    page: 'Our Coffee',
    section: 'Lot catalogue — AB',
    ratio: '1/1',
    minWidth: 1600,
    minHeight: 1600,
    direction: 'As lotAA — the same pouch stands in for this grade too. Colour is the only thing telling the two cards apart until each has its own flat-lay.',
    alt: 'A retail pouch of Gathaithi single-origin coffee, roasted and ground.',
    sizes: '(min-width: 1024px) 30vw, 100vw',
  },
  /* The season's three standout frames. They sit between the processing
     walkthrough and the catalogue, so they must not repeat either: not a
     process step, not a grade flat-lay. What is left is the crop itself at its
     best — which is the point of the section. */
  gemOne: {
    file: 'gathaithi-ripening-cherry.jpg',
    page: 'Our Coffee',
    section: 'The season',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'STAND-IN, moved here from the page hero. A daylight frame of cherry on the branch with red, yellow and green together — which is honest about a tree that does not ripen at once, but this card is called "the cherry it started as" and wants the ripest fruit of the season: tight, portrait, uniform deep red, soft light. It is also landscape at 1413x771 in a portrait box, so it is cropped hard.',
    alt: 'Cherry on the branch at Gathaithi — red, yellow and green ripening together.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  gemTwo: {
    file: 'gathaithi-green-sack.jpg',
    page: 'Our Coffee',
    section: 'The season',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'A jute sack of milled green coffee, stencilled for the society, on a plain white ground. It is the only studio shot on the site — everything else is documentary — which is defensible here because it is the PRODUCT rather than the process, and a buyer reads it as a sample bag. It replaced a brief for dried parchment on the bed; the card was retitled to match, because a sack of green is a later stage than parchment and the two must not be captioned as each other. Portrait, 896x1200.',
    alt: 'A jute sack of milled green Gathaithi coffee, stencilled “Gathaithi Coffee, Nyeri, Kenya”.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  gemThree: {
    file: 'gathaithi-the-cup.jpg',
    page: 'Our Coffee',
    section: 'The season',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'A brewed cup on a saucer with roasted beans, lit warm and dark. NOT the cupping table the slot was briefed for — no bowls, no spoon, no score sheet — but it contradicts nothing: the card is about how the coffee tastes, and a cup is a fair picture of that. Two notes for whoever revisits it. It is the second studio shot in this row of three, so the section now leans product rather than documentary. And the society sells GREEN coffee FOB Mombasa; it does not roast or brew, so a brewed cup is the end of somebody else\u2019s chain — legitimate on a card about the cup, misleading anywhere that implies the society roasts. Portrait, 896x1200.',
    alt: 'A cup of brewed coffee on a saucer with roasted beans beside it, steam rising.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
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
    direction:
      'MET. A tank filled with parchment under water, mucilage breaking up as foam across the surface, the catchment behind it. Shot in daylight from a low three-quarter angle rather than at dusk from above as the brief asked, which reads better anyway: the hills place the tank somewhere real. Under-sized at 1264x848.',
    alt: 'A fermentation tank at the Gathaithi wet mill, filled with parchment under water and mucilage foam, the hills of Tetu behind.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processWashing: {
    file: 'process-03-washing.jpg',
    page: 'Our Coffee',
    section: 'Processing — washing',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction:
      'MET, and the best frame on the page: a line of workers moving parchment along the channels with wooden paddles, drying beds waiting behind them. It shows the WORK, not just the water. Under-sized at 1264x848. NOTE: this frame also shows density grading, which is step 05 — do not reuse it there. Two adjacent cards carrying the same photograph would read as an error.',
    alt: 'Workers moving parchment along the washing channels with wooden paddles at the Gathaithi mill, raised drying beds behind them.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processGrading: {
    file: 'process-04-grading.jpg',
    page: 'Our Coffee',
    section: 'Processing — grading and sorting',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction:
      'MET, for the SORTING half of this step. Workers in overalls hand-picking defects out of parchment spread on a raised bed, a basin beside them for what comes out. It shows people making the judgement, which the density grading in the channels cannot show — that happens under water and looks like water. The step copy names both, and the hand-sort is stated as happening on the beds so the picture and the words agree.',
    alt: 'Workers hand-sorting defects out of parchment on a raised drying bed at Gathaithi, a basin beside them for the rejects.',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processDrying: {
    file: 'process-05-raised-beds.jpg',
    page: 'Our Coffee',
    section: 'Processing — drying',
    ratio: '3/2',
    minWidth: 1800,
    minHeight: 1200,
    direction:
      'PARTLY MET. Parchment spread thin on the mesh of a raised bed, shot low and close so the beans recede to the hills behind — the thin, even layer and the mesh under it are exactly what this step is about. What it does not show is the brief\u2019s worker turning the bed, which is fine here: the step before it already has people at the beds, and the copy is not contradicted by their absence. A frame with someone turning parchment in late-afternoon light would still be the better one. Under-sized at 1376x768.',
    alt: 'Parchment coffee spread in a thin layer on a raised drying bed at Gathaithi, the hills behind.',
    sizes: '(min-width: 768px) 50vw, 100vw',
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
