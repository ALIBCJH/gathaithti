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
    fullDensity: true,
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
    fullDensity: true,
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
    fullDensity: true,
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
    fullDensity: true,
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
    fullDensity: true,
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
  /* The one photograph beside the history text. It was a row of three tall
     frames and only ever one file; the other two are parked below. The ratio
     here is now what gathaithi-mill-and-ridge.jpg IS — 1672x941 — rather than
     the portrait box it was being cropped into, because a single frame can be
     the shape of its subject where a row of three has to agree on one. */
  /* PARKED — nothing renders this. gathaithi-mill-and-ridge.jpg came from the
     bought-and-generated set: a picture of a wet mill standing in for THIS wet
     mill, on the one band that is entirely about this society taking over its
     own. The history band carries three real photographs now. Kept because the
     brief is still a good brief if anyone ever wants a single wide frame of
     the mill and the ridge behind it. */
  historyOne: {
    file: 'gathaithi-mill-and-ridge.jpg',
    page: 'About',
    section: 'History — PARKED, nothing renders it',
    ratio: '16/9',
    minWidth: 1600,
    minHeight: 900,
    direction:
      'The mill and the ground it stands on: across the raised drying beds to the hills of Tetu behind. This is the section’s only photograph, so it has to carry it — the beds, the buildings and the ridge in one frame. Landscape.',
    alt: 'The raised drying beds at the Gathaithi mill, with the hills of Tetu behind.',
    sizes: '(min-width: 1024px) 46vw, 100vw',
  },

  /* PARKED — nothing renders these two. They were the second and third frames
     of the history strip, and neither file was ever supplied, so the section
     showed one photograph beside two boxes printing the names they were
     waiting for. The briefs are kept: if either photograph is taken, it is a
     small change to give it a place rather than a brief to write again. */
  historyTwo: {
    file: 'gathaithi-society-store.jpg',
    page: 'About',
    section: 'History — parked',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'The oldest building the society still uses — the office, the store, or the original mill shed. Shot portrait, straight on, in flat light. Age is the subject: render, doors, signwriting, whatever has been repainted over the years.',
    alt: 'The society office and store at Gathaithi.',
    sizes: '(min-width: 1024px) 46vw, 100vw',
  },
  historyThree: {
    file: 'gathaithi-collection-evening.jpg',
    page: 'About',
    section: 'History — parked',
    ratio: '4/5',
    minWidth: 1400,
    minHeight: 1750,
    direction:
      'Members at a collection point at the end of the day, buckets full, being weighed. Portrait. The same act the society has been doing since 1967, which is why it belongs in the history rather than in the process walkthrough.',
    alt: 'Gathaithi members delivering the day’s cherry at a village collection point in the evening.',
    sizes: '(min-width: 1024px) 46vw, 100vw',
  },
  /* FILLED at last, and by something better than the brief asked for. The
     slot wanted "the management committee in session — minute book, ledgers,
     people mid-discussion". What the society sent is the whole committee
     standing on their own drying beds, with the greenhouse behind them: it
     says the same thing about the people and rather more about the place. The
     brief is rewritten to what the photograph IS, not left describing a
     picture nobody took. */
  aboutGovernance: {
    file: 'gathaithi-committee-group.jpg',
    page: 'About',
    section: 'Governance',
    ratio: '3/2',
    minWidth: 1250,
    minHeight: 830,
    direction: 'Supplied. The management and supervisory committees together on the drying beds at the wet mill, the greenhouse behind them.',
    alt: 'The Gathaithi management and supervisory committees standing together on the drying beds at the wet mill.',
    sizes: '(min-width: 1024px) 45vw, 100vw',
  },

  /* The nine committee members. ALL NINE PORTRAITS ARE IN PLACE, supplied by
     the society on 2026-09-07.

     Ratio is 2/3, not the 4/5 the slots were written for. What arrived are
     FULL-LENGTH portraits with the face in the upper third — 0.64 to 0.92 in
     ratio — and a 4/5 centre crop cuts the top of the head off the tallest of
     them. At 2/3 the tall frames lose almost nothing and the wide ones crop at
     the sides, where the subject is not. The grid also anchors the crop to the
     TOP, which is what actually protects the faces; see BoardGrid.

     The brief below still stands for any replacement. */
  boardOne: {
    file: 'board-01-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction:
      'Head-and-shoulders portrait, shot PORTRAIT orientation, eye level, looking at the lens. Even shade or an overcast sky — never direct midday sun, which puts the eyes in shadow. Plain or softly out-of-focus background: the mill wall, foliage, the office exterior. Head in the upper third with room above it. Composed, not smiling on command. THE SAME treatment for all nine: they sit in one grid and any difference in height, crop or light shows immediately. A phone camera in shade, held level, at chest height of the sitter, is enough.',
    alt: 'Samuel Gachonge, Chairman of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardTwo: {
    file: 'board-02-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Vice-Chairperson.',
    alt: 'Eugene Waehira, Vice-Chairman of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardThree: {
    file: 'board-03-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Treasurer.',
    alt: 'Edward Ngure, Treasurer of Gathaithi Farmers’ Co-operative Society.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardFour: {
    file: 'board-04-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Secretary.',
    alt: 'Ephraim Njogu, Secretary of Gathaithi Farmers’ Co-operative Society.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardFive: {
    file: 'board-05-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'German Wambiru, a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardSix: {
    file: 'board-06-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Charles Wambugu, a member of the Gathaithi management committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardSeven: {
    file: 'board-07-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Paul Gaita, Chairman of the Gathaithi supervisory committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardEight: {
    file: 'board-08-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Daniel Ngatia, Secretary of the Gathaithi supervisory committee.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  boardNine: {
    file: 'board-09-portrait.jpg',
    page: 'About',
    section: 'Governance — management committee',
    ratio: '2/3',
    minWidth: 800,
    minHeight: 1200,
    direction: 'As board-01-portrait.jpg — same height, same crop, same light. Elected committee member.',
    alt: 'Mary Kingory, a member of the Gathaithi supervisory committee.',
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

  /* THE SOCIETY'S OWN PULPER, replacing a generated picture of a pulper.
     This step describes what happens at THIS mill, so a photograph of some
     other mill's machine — or of no mill at all — was the weakest kind of
     illustration: plausible and untrue. The frame is stencilled
     "KCSAP...GATHAITHI FCS-PULPER MACHINE", which is as much provenance as a
     photograph can carry. process-01-pulping.jpg is superseded. */
  processPulping: {
    file: 'gathaithi-pulper.jpg',
    page: 'Our Coffee',
    section: 'Processing — 01',
    ratio: '16/9',
    minWidth: 1300,
    minHeight: 800,
    direction: 'Supplied. The pulper under its roof at the wet mill, hopper above, channels running off to the left.',
    alt: 'The pulping machine at the Gathaithi wet mill, its frame stencilled GATHAITHI FCS-PULPER MACHINE.',
    sizes: '(min-width: 1620px) 696px, (min-width: 1024px) 43vw, 90vw',
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
    sizes: '(min-width: 1620px) 696px, (min-width: 1024px) 43vw, 90vw',
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
    sizes: '(min-width: 1620px) 696px, (min-width: 1024px) 43vw, 90vw',
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
    sizes: '(min-width: 1620px) 696px, (min-width: 1024px) 43vw, 90vw',
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
    sizes: '(min-width: 1620px) 696px, (min-width: 1024px) 43vw, 90vw',
  },

  /* ── Farmers ────────────────────────────────────────────────────────── */
  /* The harvest sequence, which rotates in the champion section. Three
     frames of the same act, so they have to sit in one frame without the eye
     jumping: all three are landscape at roughly 3:2, and in all three the
     person is right of centre with the loaded branch to their left. That is
     why they cross-fade rather than slide — the subject barely moves between
     them, and a slide would throw away the one thing they have in common. */
  /* PARKED — nothing renders these three. The harvest band is gone; the SAME
     three files are carried by memberOne/Two/Three, which is where they are
     served from now, at that section's ratio and sizes. Kept rather than
     deleted so the brief for each frame survives, but do not add a second
     slot for a file that already has one — it would fetch at two different
     sizes on one page. */
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
    sizes: '(min-width: 1424px) 1280px, 92vw',
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
    sizes: '(min-width: 1424px) 1280px, 92vw',
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
    sizes: '(min-width: 1424px) 1280px, 92vw',
  },
  /* The first three cards carry the harvest photographs — the same files as
     the slideshow above, and deliberately NOT portraits. They are 3/2 because
     that is what the files are: a 4/5 crop keeps only 53% of the width, and on
     harvest-03 the two members stand at opposite edges, so a portrait crop
     would cut both of them out and make the caption untrue.

     These three carry no name, no village, no figures and no quote. The people
     in them are real; the profiles this page ships with are invented. See the
     note at the top of content/en/farmers.ts. */
  /* THE THREE FRAMES IN THE MEMBERS BAND, replaced 2026-09-08.
     They used to be harvest-0*.jpg, shared with the parked harvest slideshow.
     They have their own files now, so changing one band cannot silently change
     the other, and the harvest slots keep the pictures their briefs describe.

     PORTRAIT, all three 768x1376. The slots were 3/2 landscape at a 2000px
     minimum; a 3/2 crop of a 768x1376 frame keeps 37% of its height, which
     takes the heads off two of these and the baskets off all three. The ratio
     follows the photographs.

     STILL NOT PHOTOGRAPHS OF NAMED MEMBERS. The three they replaced were
     generated and these read the same way — a like-for-like swap, not a step
     towards evidence. That is why the cards below still carry NO name, no
     village, no figures and no quote: see content/en/farmers.ts. The real
     thing on this page remains gathaithi-members-drying.jpg in the ownership
     band. */
  memberOne: {
    file: 'member-01-picking.jpg',
    page: 'Our Farmers',
    section: 'Members',
    ratio: '2/3',
    minWidth: 768,
    minHeight: 1376,
    direction:
      'A picker working a branch by hand, basket at the waist, more pickers along the rows behind her.',
    alt: 'A coffee picker in a red headscarf taking ripe cherry from a branch by hand, a basket at her waist and more pickers along the rows behind.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberTwo: {
    file: 'member-02-selecting.jpg',
    page: 'Our Farmers',
    section: 'Members',
    ratio: '2/3',
    minWidth: 768,
    minHeight: 1376,
    direction:
      'A picker selecting cherry a berry at a time under shade netting, basket slung at the hip.',
    alt: 'A coffee picker in a cap selecting ripe cherry a berry at a time, a woven basket slung at his hip, shade netting overhead.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberThree: {
    file: 'member-03-row.jpg',
    page: 'Our Farmers',
    section: 'Members',
    /* THREE pickers, not two. The frame this replaced held two people at
       opposite edges and carried a warning never to crop it narrower than 3/2
       for that reason. This one has them along a row with the hills behind, so
       the warning is gone and the caption in content/en/farmers.ts was
       corrected to match — it used to say "Two members, one tree". */
    ratio: '2/3',
    minWidth: 768,
    minHeight: 1376,
    direction:
      'Three pickers working down the same row, baskets in hand, the ridge behind them.',
    alt: 'Three coffee pickers working down the same row with baskets in hand, the Nyeri hills behind them.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  /* PARKED — nothing renders these three. They held the three invented sample
     profiles, which were removed outright: the band publishes no names now,
     only photographs of members at work. The brief is kept because it is the
     brief for a real member portrait, and the day an interview is collected
     the card needs both a photograph and the shape of one. */
  memberFour: {
    file: 'member-04-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles — parked',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction:
      'Environmental portrait on the member’s own shamba, standing, eye level, looking at the lens. Even shade. Confident, not smiling on command. The same treatment for all three remaining portraits.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberFive: {
    file: 'member-05-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles — parked',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-04-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  memberSix: {
    file: 'member-06-portrait.jpg',
    page: 'Our Farmers',
    section: 'Member profiles — parked',
    ratio: '4/5',
    minWidth: 1200,
    minHeight: 1500,
    direction: 'As member-04-portrait.jpg. Different member, same eye level and treatment.',
    alt: 'A Gathaithi member photographed among their coffee trees.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  },
  /* SUPPLIED, and it is not the photograph this slot was written for.
     The brief asked for a field day — the agronomist demonstrating pruning,
     members close in around the tree, secateurs in hands. What arrived is one
     agronomist scouting a tree: sample jar in hand, clipboard headed Gathaiti
     Farmers Co-op, cherry at every stage of ripeness on the branch beside him.
     Both are training; they are not the same picture, so the direction and the
     alt below describe WHAT IS IN THE FRAME rather than what was asked for.
     The band's copy still covers it — "pest and disease scouting through the
     wet months" is exactly this.

     PORTRAIT, 768x1406. The slot was 3/2 landscape at a 2000px minimum, which
     would have cropped a horizontal band out of the middle of a standing man
     and taken his head off. The ratio follows the photograph instead, and the
     Training band gives the frame a narrower column to suit it.

     It is SMALLER than any other photograph here — 768px wide against a 2000px
     brief. At the width it is drawn that is enough: about 440 CSS px on a
     desktop, and 784 device px on a 3x phone under the density cap. It is thin
     for a 2x desktop. Ask for the original if the society still has it.

     TWO THINGS ARE VISIBLE IN IT that nobody has explained, both recorded here
     rather than described on the page: the coat carries the KALRO mark (Kenya
     Agricultural & Livestock Research Organisation), and the clipboard reads
     "Gathaiti Farmers Co-op" — a FOURTH spelling of the society's name. The
     alt text says neither, because neither has been confirmed. */
  farmersTraining: {
    file: 'gathaithi-agronomy-training.jpg',
    page: 'Our Farmers',
    section: 'Training',
    ratio: '2/3',
    minWidth: 768,
    minHeight: 1406,
    direction:
      'Supplied. An agronomist scouting a coffee tree on a member\u2019s farm: sample jar in one hand, clipboard in the other, ripe and unripe cherry on the branch beside him, shade netting overhead.',
    alt: 'An agronomist inspecting a coffee branch on a member\u2019s farm at Gathaithi, a sample jar in one hand and a clipboard in the other.',
    sizes: '(min-width: 1024px) 36vw, 100vw',
  },
  /* PARKED — nothing renders this. The pre-finance band had this frame beside
     its two paragraphs and the file was never supplied, so half the band was an
     empty box printing the name it was waiting for. The brief is kept: if the
     photograph is taken, the band can have it back. */
  /* The four partner marks on the home page. Each file is 1376x768 with the
     logo centred on its own pale ground, so the slot is 16/9 and the image
     fills the card edge to edge: the supplied background BECOMES the tile.

     WEBP, not PNG. They were supplied as PNG and were 3.45 MB between them —
     a quarter of every image byte in this repo, for four logos that render at
     about 300 CSS px. They are photographic renders (6-12k colours, gradients,
     no alpha), which is the one thing PNG is bad at. Re-encoded at q92 they
     are 273 KB and differ from the originals by at most 14/255 per channel;
     a q92 JPEG was both bigger and three times further off, because JPEG rings
     on exactly the hard type these carry.
     That is why they are not knocked out to transparent — four logos on four
     slightly different pale grounds read as one row of tiles, where four
     transparent logos on this site's dark parchment would read as four
     different-coloured stains.

     These are other organisations' trademarks. Do not restyle, recolour, crop
     or stretch them, and do not add one without being told it is a partner. */
  /* THE MOBILE HERO — a second, portrait photograph for each of the first four
     hero frames, chosen because a phone was being shown a narrow vertical
     slice of a landscape picture. The desktop frames stay exactly as they are;
     these are only ever fetched below 1024px, through a `<picture>` element,
     so neither set is downloaded on the other's viewport.

     `sizes` is expressed in vh on purpose. The hero is a full-height frame and
     every one of these is TALLER in ratio than a phone, so `object-cover`
     scales them by HEIGHT and the rendered WIDTH is ratio x viewport height —
     which is what `sizes` describes. 46vh is not a typo for 46vw.

     NOTE FOR WHOEVER TOUCHES THESE: each file has the words GATHAITHI COFFEE
     burned into the photograph, in a different place in each one. That is why
     no crop offset is applied to them and why the page does not print the name
     over the top. */
  heroMobileOne: {
    file: 'hero-mobile-01.jpg',
    page: 'Home',
    section: 'Hero — mobile',
    ratio: '2/3',
    minWidth: 1000,
    minHeight: 1500,
    direction: 'Portrait. Roasted beans and a wooden scoop on dark timber. Supplied with the wordmark set into the lower left of the frame.',
    alt: 'Roasted Gathaithi coffee beans spilling from a wooden scoop across dark timber.',
    sizes: '(max-width: 1023px) 56vh, 100vw',
    fullDensity: true,
  },
  heroMobileTwo: {
    file: 'hero-mobile-02.jpg',
    page: 'Home',
    section: 'Hero — mobile',
    ratio: '9/16',
    minWidth: 940,
    minHeight: 1650,
    direction: 'Portrait. Ripe red cherry on the branch, close in, leaves behind. Wordmark set into the upper left.',
    alt: 'Ripe red coffee cherry on the branch at Gathaithi, leaves behind.',
    sizes: '(max-width: 1023px) 57vh, 100vw',
    fullDensity: true,
  },
  heroMobileThree: {
    file: 'hero-mobile-03.jpg',
    page: 'Home',
    section: 'Hero — mobile',
    ratio: '9/19',
    minWidth: 850,
    minHeight: 1840,
    direction: 'Portrait, and almost exactly a phone screen in shape. Cherry cluster with sun through the leaves. Wordmark set into the lower left.',
    alt: 'A cluster of ripe Gathaithi cherry with morning sun through the leaves above.',
    sizes: '(max-width: 1023px) 46vh, 100vw',
    fullDensity: true,
  },
  heroMobileFour: {
    file: 'hero-mobile-04.jpg',
    page: 'Home',
    section: 'Hero — mobile',
    ratio: '9/19',
    minWidth: 850,
    minHeight: 1840,
    direction: 'Portrait, phone-shaped. A bed of green parchment coffee filling the frame. Wordmark set into the upper centre.',
    alt: 'A bed of green Gathaithi coffee beans filling the frame.',
    sizes: '(max-width: 1023px) 46vh, 100vw',
    fullDensity: true,
  },

  /* The four retail packs. Portrait photographs of the pack on a bench; the
     cards are 3/4 so all four crop the same way and the row keeps one height.

     The ratio is 9/16, not the 3/4 first tried: three of the four files are
     0.558 and a 3/4 box crops them top and bottom — which takes the LABEL off
     the foot of the pack, the one part of the photograph that has to survive.

     NOTE FOR WHOEVER REPLACES THESE: the label on the supplied artwork reads
     "100% ARABICA ROBUSTA". Arabica and Robusta are two different species and
     a coffee cannot be both; everything else on this site says the society
     grows SL28, SL34, Ruiru 11 and Batian, which are all Arabica. Flagged to
     the client; the photographs are used as supplied, unaltered. */
  pack100g: {
    file: 'pack-100g.jpg',
    page: 'Our Coffee',
    section: 'Retail packs',
    ratio: '9/16',
    minWidth: 760,
    minHeight: 1350,
    direction: 'Supplied. The 100 g pack standing on a bench, beans and a burlap sack behind.',
    alt: 'A 100 g pack of Gathaithi Specialty Coffee standing on a wooden bench.',
    sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw',
    fullDensity: true,
  },
  pack250g: {
    file: 'pack-250g.jpg',
    page: 'Our Coffee',
    section: 'Retail packs',
    ratio: '9/16',
    minWidth: 850,
    minHeight: 1530,
    direction: 'Supplied. The 250 g pack standing on a bench, coffee plant behind.',
    alt: 'A 250 g pack of Gathaithi Specialty Coffee standing on a wooden bench.',
    sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw',
    fullDensity: true,
  },
  pack500g: {
    file: 'pack-500g.jpg',
    page: 'Our Coffee',
    section: 'Retail packs',
    ratio: '9/16',
    minWidth: 760,
    minHeight: 1350,
    direction: 'Supplied. The 500 g pack standing on a bench.',
    alt: 'A 500 g pack of Gathaithi Specialty Coffee standing on a wooden bench.',
    sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw',
    fullDensity: true,
  },
  /* REPLACED 2026-09-08 at the user's request, on the second asking, and the
     two things that are wrong with the new frame are recorded here rather than
     rediscovered later.

     1. THE PACK FILLS 32% OF THE WIDTH. The other three fill 71, 78 and 75 —
        #82 exists purely to have evened those up — so the 1 kg reads smaller
        in the row than the 100 g does. It is NOT cropped to match: bringing it
        to 74% leaves a 332x595 crop, which is 0.80x of what a 1x desktop card
        needs and 0.33x on a 3x phone, softer than anything else on the site.

     2. THE LABEL PRINTING IS CORRUPTED. Beside the file it replaced, at the
        same scale, it reads "1BB% ABARIEA ROBUSTA", "NIEDUM RUCST", "Nat 1hg"
        and a bottom line that is noise, where the old one read "100% ARABICA
        ROBUSTA / MEDIUM ROAST / Net 1kg / PRODUCT OF KENYA | GATHAITHI
        CO-OPERATIVE SOCIETY LIMITED". The user was shown this side by side,
        chose to keep the old photograph, then asked again for the new one.

     Those two facts settle each other: leaving the pack small in the frame is
     what keeps the garbled printing too small to read. A crop that fixed the
     framing would enlarge the defect. So it ships as supplied, uncropped.

     A usable replacement is the same scene with the pack filling most of the
     frame, 1400px wide or more, and the printing legible. */
  pack1kg: {
    file: 'pack-1kg.jpg',
    page: 'Our Coffee',
    section: 'Retail packs',
    ratio: '9/16',
    minWidth: 760,
    minHeight: 1350,
    direction:
      'Supplied. The 1 kg pack standing on a table, a bowl of roasted beans to one side and a brass grinder to the other.',
    alt: 'A 1 kg pack of Gathaithi Specialty Coffee standing on a wooden table, a bowl of roasted beans beside it.',
    sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw',
    fullDensity: true,
  },

  /* THE GALLERY. Real photographs of the society, supplied by the society —
     the drying beds, the solar drier, the greenhouse and the committee. They
     are the first pictures on this site that are demonstrably of Gathaithi
     rather than of coffee in general, which is why the gallery exists at all.

     `gallerySolarDrier` and `galleryGreenhouse` both carry the stencil
     "KCSAP/CON/GATHAITHI FCS" — the Kenya Climate Smart Agriculture Project.
     The captions say the marking is there; they do NOT describe a partnership,
     because nobody has told us the terms of one. */
  galleryCommittee: {
    file: 'gathaithi-committee-group.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1250,
    minHeight: 830,
    direction: 'Supplied. Shared with the About governance band.',
    alt: 'The Gathaithi management and supervisory committees standing together on the drying beds at the wet mill.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  galleryDryingBeds: {
    file: 'gathaithi-drying-beds-long.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '4/5',
    minWidth: 950,
    minHeight: 1090,
    direction: 'Supplied. A full-length drying bed of parchment running away from the camera, a worker turning it at the far end, the mill buildings on the left.',
    alt: 'Parchment coffee spread the length of a raised drying bed at Gathaithi, a worker turning it at the far end.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  gallerySolarDrier: {
    file: 'gathaithi-solar-drier.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1250,
    minHeight: 840,
    direction: 'Supplied. Inside the solar drier: rows of raised beds under polythene, each covered with jute sacking, one stencilled PRODUCE OF KENYA.',
    alt: 'Inside the solar drier at Gathaithi — rows of raised beds under polythene, covered with jute coffee sacking.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  galleryGreenhouse: {
    file: 'gathaithi-greenhouse.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1270,
    minHeight: 810,
    direction: 'Supplied. The greenhouse from outside, stencilled KCSAP/CON/GATHAITHI FCS-GREEN HOUSE.',
    alt: 'The greenhouse at Gathaithi, its polythene stencilled KCSAP/CON/GATHAITHI FCS-GREEN HOUSE.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },

  /* Three more real photographs, and the gate is the most useful thing on
     this whole image list.

     It carries the society's OWN signage: the name in full, the co-operative
     values board — Unity, Self Help, Democracy, Equality, Development — and
     the motto "Quality Coffee, Better Livelihoods, A Sustainable Future".
     Those are the society's words about itself, photographed, which is a
     different class of evidence from anything written for it.

     NOTE: the mark on the gate is a GREEN LEAF with "GATHAITHI COFFEE
     CO-OPERATIVE SOCIETY LIMITED". The retail packs and the mobile hero use a
     GOLD BEAN-AND-LEAF roundel reading "GATHAITHI SPECIALTY COFFEE". Two
     different logos. Flagged to the client; neither has been altered. */
  galleryGate: {
    file: 'gathaithi-gate.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '2/3',
    minWidth: 1020,
    minHeight: 1530,
    direction: 'Supplied. The entrance to the society: the name board, the co-operative values board and the motto, the track running up to the mill.',
    alt: 'The entrance to Gathaithi Coffee Co-operative Society, its name board and co-operative values board beside the track up to the mill.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  galleryPulper: {
    file: 'gathaithi-pulper.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '16/9',
    minWidth: 1300,
    minHeight: 800,
    direction: 'Supplied. Shared with the processing walkthrough.',
    alt: 'The pulping machine at the Gathaithi wet mill, its frame stencilled GATHAITHI FCS-PULPER MACHINE.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  galleryDryingArea: {
    file: 'gathaithi-drying-area.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1210,
    minHeight: 875,
    direction: 'Supplied. The drying ground between crops — empty bed frames running down the slope, the water tower above them.',
    alt: 'The drying ground at Gathaithi between crops, rows of empty bed frames running down the slope below the water tower.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },

  /* THE WET-MILL MACHINERY, and the members' notice board.

     `gathaithi-soaking-tank.jpg` is filed under the name the client sent it by
     — "soaking-pump" — but it is not a pump: it is the tiled SOAKING TANK,
     stencilled KCSAP/CGN/GATHAITHI FCS-SOAKING, photographed empty between
     crops. The caption says what the picture shows, not what the file was
     called. This is the second soak the processing walkthrough describes. */
  galleryRecirculation: {
    file: 'gathaithi-recirculation-pump.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1230,
    minHeight: 845,
    direction: 'Supplied. The re-circulation pump housing beside the washing channels, drying beds and greenhouse behind.',
    alt: 'The re-circulation pump at the Gathaithi wet mill, beside the empty washing channels.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  gallerySoakingTank: {
    file: 'gathaithi-soaking-tank.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1310,
    minHeight: 810,
    direction: 'Supplied. The tiled soaking tank, empty between crops, stencilled KCSAP/CGN/GATHAITHI FCS-SOAKING.',
    alt: 'The tiled soaking tank at the Gathaithi wet mill, empty between crops.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },
  galleryNoticeBoard: {
    file: 'gathaithi-notice-board.jpg',
    page: 'Gallery',
    section: 'Gallery',
    ratio: '3/2',
    minWidth: 1300,
    minHeight: 815,
    direction: 'Supplied. The members\u2019 notice board on the timber mill building, notices behind glass under its own little roof.',
    alt: 'The members’ notice board at Gathaithi, a green glazed case on the timber mill building with notices pinned inside.',
    sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw',
  },

  /* Members at a drying bed, hands in the parchment, the whole drying ground
     and the greenhouse behind them. It sits under the band that says the
     farmers own this — which is the one claim on the site that most needed a
     photograph of actual members, and until now had none that was real. */
  farmersMembers: {
    file: 'gathaithi-members-drying.jpg',
    page: 'Our Farmers',
    section: 'Ownership',
    ratio: '16/9',
    minWidth: 1330,
    minHeight: 780,
    direction: 'Supplied. Members along a drying bed, some reaching into the parchment, the drying ground and greenhouse behind.',
    alt: 'Gathaithi members standing along a raised drying bed, hands in the parchment, the drying ground and greenhouse behind them.',
    sizes: '(min-width: 1024px) 70vw, 92vw',
  },

  /* The retail pack, as the fifth PHONE hero frame.

     Slide five was the one with no portrait counterpart: on a phone it fell
     back to its landscape frame and a hard crop. The pack is portrait, it is
     the thing the society actually sells, and it puts a product in a rotation
     that was otherwise all field and fruit.

     It shares `pack-250g.jpg` with the Our Coffee catalogue. That is safe
     because they are DIFFERENT PAGES — the rule this would otherwise break is
     that no single page should fetch one file at two sizes. */
  heroMobileFive: {
    file: 'pack-250g.jpg',
    page: 'Home',
    section: 'Hero — mobile',
    ratio: '9/16',
    minWidth: 850,
    minHeight: 1530,
    direction: 'Supplied. The 250 g pack standing on a bench, coffee plant behind. Shared with the Our Coffee catalogue.',
    alt: 'A 250 g pack of Gathaithi Specialty Coffee standing on a wooden bench.',
    sizes: '(max-width: 1023px) 67vh, 100vw',
    fullDensity: true,
  },

  partnerCms: {
    file: 'partner-cms.webp',
    page: 'Home',
    section: 'Partners',
    ratio: '16/9',
    minWidth: 1200,
    minHeight: 675,
    direction: 'Supplied mark. The organisation\u2019s own logo, centred, on its own ground.',
    alt: 'Coffee Management Services',
    sizes: '(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw',
  },
  partnerDormans: {
    file: 'partner-dormans.webp',
    page: 'Home',
    section: 'Partners',
    ratio: '16/9',
    minWidth: 1200,
    minHeight: 675,
    direction: 'Supplied mark. The organisation\u2019s own logo, centred, on its own ground.',
    alt: 'Dormans',
    sizes: '(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw',
  },
  partnerEaBean: {
    file: 'partner-ea-bean.webp',
    page: 'Home',
    section: 'Partners',
    ratio: '16/9',
    minWidth: 1200,
    minHeight: 675,
    direction: 'Supplied mark. The organisation\u2019s own logo, centred, on its own ground.',
    alt: 'EA Bean Co.',
    sizes: '(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw',
  },
  partnerE4impact: {
    file: 'partner-e4impact.webp',
    page: 'Home',
    section: 'Partners',
    ratio: '16/9',
    minWidth: 1200,
    minHeight: 675,
    direction: 'Supplied mark. The organisation\u2019s own logo, centred, on its own ground.',
    alt: 'E4Impact Foundation',
    sizes: '(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw',
  },
  farmersPrefinance: {
    file: 'gathaithi-society-office.jpg',
    page: 'Our Farmers',
    section: 'PARKED — Pre-finance',
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
