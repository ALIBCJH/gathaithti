# Shot list — Gathaithi Farmers' Co-operative Society

Every photograph the site can hold. **Drop a file into this folder with the
exact filename in the first column and it appears on the site — no code change,
no content change.** Until then the slot renders a designed placeholder that
prints the filename, the ratio and the art direction, so the site can be shown
before the photography exists.

## Before you shoot

- **Tone.** This is a business owned by its farmers. Confident, working,
  commercial. People at work, in charge of what they are doing. Nothing that
  reads as charity, aid or an NGO appeal; no pity framing, no hands-of-the-poor,
  no white-saviour composition, no shots that make the work look primitive.
- **Consent.** Any identifiable member is photographed with their agreement, and
  is named on the site only if they have agreed to that too.
- **Light.** Early morning or late afternoon. Midday sun on red soil throws a
  colour cast that no amount of grading fixes.
- **Colour.** The site applies one warm treatment (a slight desaturation and a
  warm lift) to every photograph so that frames from different cameras and
  different years read as one set. Shoot neutral; do not pre-grade, do not add
  filters, and do not shoot into heavy backlight expecting to recover it.
- **Format.** JPEG, sRGB, quality 85+, longest edge at least the minimum below.
  Next.js re-encodes and resizes for every breakpoint, so send the largest
  version you have rather than something pre-shrunk.
- **Filenames.** Exactly as listed, lower case, hyphens, `.jpg`. A file named
  anything else is ignored and the placeholder stays.
- **Crop.** The ratio column is the crop the site uses. Compose with room —
  the same frame is cropped tighter on narrow screens.
- **Alt text is already written** for every slot (in `content/images.ts`). If a
  photograph ends up showing something materially different, update the alt
  text to match what is actually in the frame.

## The list

| Filename | Page | Section | Ratio | Min. resolution | What the photograph shows |
| --- | --- | --- | --- | --- | --- |
| `gathaithi-retail-pack.jpg` | Our Coffee | Lot catalogue — stand-in for both grades | 1:1 | 1600×1600 | The 250 g retail pack, front on. Standing in for the two green-bean flat-lays until those are shot. |
| `gathaithi-sunrise-ridge.jpg` | Home | Hero — slide 1 | 16:9 | 2400×1350 | Sunrise over the ridge with a branch of ripe cherry in the near foreground on the right. UNDER-SIZED at 1672×941: sharp on a desktop, soft on a phone, where the portrait crop scales it up ~1.8×. |
| `gathaithi-roasted-beans.jpg` | Home | Hero — slide 2 | 16:9 | 2400×1350 | A full frame of roasted beans, no focal point — an all-over texture, the one kind of picture that survives being cropped to any shape. |
| `gathaithi-cherry-branch.jpg` | Home | Hero — slide 3 | 16:9 | 2400×1350 | A branch of ripening cherry, red and green together, shot shallow so the canopy falls away to bokeh. Cluster left of centre. |
| `gathaithi-beans-falling.jpg` | Home | Hero — slide 4 | 16:9 | 2400×1350 | Roasted beans caught mid-fall against a deep brown ground. The darkest frame in the set. |
| `gathaithi-cherry-sunlit.jpg` | Home | Hero — slide 5 | 16:9 | 2400×1350 | Red, orange and green cherry with the sun flaring through the canopy behind. Flare top-left, type bottom-left. |
| `gathaithi-selective-picking.jpg` | Home | Current season | 4:5 | 1600×2000 | Close on a picker’s hands and a full bucket of ripe cherry. Skilled work, unhurried. Face optional; if included, working, not posed for the camera. |
| `gathaithi-member-at-the-tree.jpg` | About | Hero | 3:2 | 2400×1600 | A member reaching up into the branch, taking ripe cherry by hand on the upper slopes. Cropped to a tall column by the page, so the reach must survive the crop: subject left of centre, room above the hands. |
| `gathaithi-committee-meeting.jpg` | About | Governance | 3:2 | 2000×1334 | The management committee in session at the society office — minute book, ledgers, people mid-discussion. Documentary, not a staged handshake or a row of folded arms. |
| `gathaithi-mill-and-ridge.jpg` | About | History | 4:5 | 1400×1750 | The mill and the ground it stands on. Currently a landscape frame in a portrait box; a portrait original of the mill buildings would suit it better. |
| `gathaithi-society-store.jpg` | About | History | 4:5 | 1400×1750 | The oldest building the society still uses. Portrait, straight on, flat light. Age is the subject. |
| `gathaithi-collection-evening.jpg` | About | History | 4:5 | 1400×1750 | Members at a collection point at the end of the day, buckets full, being weighed. Portrait. |
| `board-01-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | Head-and-shoulders portrait, portrait orientation, eye level, looking at the lens. Even shade, plain or softly out-of-focus background, head in the upper third. THE SAME treatment for all nine — they sit in one grid and any difference in height, crop or light shows. |
| `board-02-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-03-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-04-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-05-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-06-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-07-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-08-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `board-09-portrait.jpg` | About | Governance — management committee | 4:5 | 1200×1500 | As board-01-portrait.jpg — same height, same crop, same light. |
| `gathaithi-soil-and-tree.jpg` | About | Terroir | 4:5 | 1600×2000 | Base of a mature SL28 tree: deep red volcanic soil, mulch, the trunk and a branch of green cherry. Shot in shade for colour accuracy in the soil. |
| `lot-aa-green-beans.jpg` | Our Coffee | Lot catalogue — AA | 1:1 | 1600×1600 | **Stand-in in place.** `gathaithi-retail-pack.jpg` (a retail pack) currently fills both grade cards, tinted a different colour per grade. Replace with the two flat-lays below. Square flat-lay of AA green beans on parchment paper, raking side light so bean size and uniformity read clearly. Beans fill the frame, centred, with even margins. Identical setup, light, height and crop for both grade shots — they sit side by side and any difference in framing shows. |
| `lot-ab-green-beans.jpg` | Our Coffee | Lot catalogue — AB | 1:1 | 1600×1600 | **Stand-in in place.** `gathaithi-retail-pack.jpg` (a retail pack) currently fills both grade cards, tinted a different colour per grade. Replace with the two flat-lays below. As lot-aa-green-beans.jpg, identical setup. AB beans. |
| `gathaithi-picking-hands.jpg` | Our Coffee | Processing — selective picking | 3:2 | 1800×1200 | Close on a picker's hands taking ripe red cherry off the branch, one at a time, with green and unripe fruit left on the wood beside it. The selectivity is the subject. |
| `gathaithi-ripening-cherry.jpg` | Our Coffee | The season | 4:5 | 1400×1750 | **Stand-in, moved from the page hero.** Wants the ripest fruit of the season instead: tight, portrait, uniform deep red, soft light. Currently landscape in a portrait box. |
| `gathaithi-gem-parchment.jpg` | Our Coffee | The season | 4:5 | 1400×1750 | Dried parchment at the point it comes off the bed — even colour and size, a hand lifting some for scale. |
| `gathaithi-gem-cupping.jpg` | Our Coffee | The season | 4:5 | 1400×1750 | The cupping table mid-session: bowls in a row, a spoon lifted, the score sheet in frame. |
| `process-01-pulping.jpg` | Our Coffee | Processing — pulping | 3:2 | 1800×1200 | Cherry entering the disc pulper, water moving, skins separating. Freeze the motion; keep the machinery legible. |
| `process-02-fermentation.jpg` | Our Coffee | Processing — fermentation | 3:2 | 1800×1200 | **Met.** Tank of parchment under water, mucilage foaming across the surface, hills behind. Under-sized at 1264×848. |
| `process-03-washing.jpg` | Our Coffee | Processing — washing | 3:2 | 1800×1200 | **Met.** Workers moving parchment along the channels with wooden paddles, drying beds behind. Under-sized at 1264×848. Do not reuse for step 05. |
| `process-04-grading.jpg` | Our Coffee | Processing — grading and sorting | 3:2 | 1800×1200 | **Met, for the sorting half.** Workers hand-picking defects from parchment on a raised bed, basin beside them. Density grading happens under water and photographs as water. |
| `process-05-raised-beds.jpg` | Our Coffee | Processing — drying | 3:2 | 1800×1200 | **Partly met.** Parchment thin on the mesh, shot low so the rows recede to the hills. No worker turning the bed — a frame with one, in late light, would still be better. Under-sized at 1376×768. |
| `harvest-01-picking.jpg` | Our Farmers | The harvest | 3:2 | 2000×1334 | A member picking ripe cherry by hand, close in, mid-work and clearly enjoying it. Subject right of centre, loaded branch filling the left. |
| `harvest-02-reaching.jpg` | Our Farmers | The harvest | 3:2 | 2000×1334 | As harvest-01. A member reaching up into the branch, sky behind, selecting rather than stripping. |
| `harvest-03-two-members.jpg` | Our Farmers | The harvest | 3:2 | 2000×1334 | As harvest-01. Two members working the same tree from either side — the crop is family work. |
| `member-01-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | Environmental portrait on the member’s own shamba, standing, eye level, looking at the lens. Even shade. Confident, not smiling on command. Same treatment for all six portraits. |
| `member-02-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-03-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-04-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-05-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-06-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `gathaithi-agronomy-training.jpg` | Our Farmers | Training | 3:2 | 2000×1334 | A field day in progress: the agronomist demonstrating pruning on a real tree, members close in around it, secateurs in hands. Teaching between equals. |
| `gathaithi-society-office.jpg` | Our Farmers | Pre-finance | 3:2 | 2000×1334 | The society office counter: member records, a clerk, an application being completed. Administrative competence, plainly shown. |

## Priority

If the shoot has to be done in stages, this is the order that matters.

1. `gathaithi-sunrise-ridge.jpg` — the home page hero. One photograph carries
   the entire first impression.
2. `member-01-portrait.jpg` … `member-06-portrait.jpg` — the member profiles.
   The site says the society is its members; without faces it is a claim.
3. `process-01-pulping.jpg` … `process-05-raised-beds.jpg` — the processing
   walkthrough. Buyers read this section closely.
4. `lot-aa-green-beans.jpg` … `lot-c-green-beans.jpg` — the four grade shots.
   One setup, one afternoon, four frames.
5. Everything else.

## Alt text

Written already, in `content/images.ts`, next to each slot. Reproduced here so
the shot list is self-contained:

- `gathaithi-sunrise-ridge.jpg` — Sunrise over the ridge above Gathaithi, with a branch of ripe red coffee cherry in the foreground.
- `gathaithi-roasted-beans.jpg` — Roasted coffee beans filling the frame.
- `gathaithi-cherry-branch.jpg` — A branch of Gathaithi coffee carrying ripe red and unripe green cherry together.
- `gathaithi-beans-falling.jpg` — Roasted coffee beans falling through the air against a dark brown ground.
- `gathaithi-cherry-sunlit.jpg` — A cluster of ripening Gathaithi cherry — red, orange and green — with sunlight flaring through the canopy behind.
- `gathaithi-selective-picking.jpg` — Ripe red coffee cherry being picked selectively into a bucket on a Gathaithi member’s farm.
- `gathaithi-member-at-the-tree.jpg` — A Gathaithi member reaching up into a coffee tree to pick ripe red cherry by hand, the hills of Tetu behind.
- `gathaithi-committee-meeting.jpg` — Members of the Gathaithi management committee in session at the society office.
- `gathaithi-mill-and-ridge.jpg` — The raised drying beds at the Gathaithi mill, with the hills of Tetu behind.
- `gathaithi-society-store.jpg` — The society office and store at Gathaithi.
- `gathaithi-collection-evening.jpg` — Gathaithi members delivering the day's cherry at a village collection point in the evening.
- `board-01-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-02-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-03-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-04-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-05-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-06-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-07-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-08-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `board-09-portrait.jpg` — Portrait of a member of the Gathaithi management committee.
- `gathaithi-soil-and-tree.jpg` — The base of a mature SL28 coffee tree in deep red volcanic soil on a Gathaithi member’s farm.
- `gathaithi-ripening-cherry.jpg` — Dried coffee parchment lifted from a raised bed at the Gathaithi wet mill.
- `gathaithi-retail-pack.jpg` — A 250 g retail pack of Gathaithi single-origin coffee, roasted and ground.
- `lot-aa-green-beans.jpg` — Grade AA green coffee beans from Gathaithi, screen 17 and above.
- `lot-ab-green-beans.jpg` — Grade AB green coffee beans from Gathaithi, screen 15 to 16.
- `lot-pb-green-beans.jpg` — Peaberry green coffee beans from Gathaithi.
- `lot-c-green-beans.jpg` — Grade C green coffee beans from Gathaithi.
- `process-01-pulping.jpg` — Ripe cherry passing through the disc pulper at the Gathaithi wet mill.
- `process-02-fermentation.jpg` — A fermentation tank at the Gathaithi wet mill, filled with parchment under water and mucilage foam, the hills of Tetu behind.
- `process-03-washing.jpg` — Workers moving parchment along the washing channels with wooden paddles at the Gathaithi mill, raised drying beds behind them.
- `process-04-grading.jpg` — Workers hand-sorting defects out of parchment on a raised drying bed at Gathaithi, a basin beside them for the rejects.
- `process-05-raised-beds.jpg` — Parchment coffee spread in a thin layer on a raised drying bed at Gathaithi, the hills behind.
- `harvest-01-picking.jpg` — A Gathaithi member in a red headscarf picking ripe red cherry by hand, a branch heavy with fruit beside her.
- `harvest-02-reaching.jpg` — A Gathaithi member reaching up into a coffee branch to select ripe cherry, blue sky behind.
- `harvest-03-two-members.jpg` — Two Gathaithi members working the same coffee tree from either side, picking ripe cherry.
- `member-01-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-02-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-03-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-04-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-05-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-06-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `gathaithi-agronomy-training.jpg` — Gathaithi members at a field day, learning pruning technique on a mature coffee tree.
- `gathaithi-society-office.jpg` — A member completing a pre-finance application at the Gathaithi society office.
- `gathaithi-ripening-cherry.jpg` — Cherry on the branch at Gathaithi — red, yellow and green ripening together.
- `gathaithi-gem-parchment.jpg` — Dried parchment coffee being lifted from a raised bed at the Gathaithi mill.
- `gathaithi-gem-cupping.jpg` — A cupping session in progress at Gathaithi, bowls laid out with a score sheet.
