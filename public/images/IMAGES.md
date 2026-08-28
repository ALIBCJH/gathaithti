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
| `gathaithi-drying-beds-wide.jpg` | Home | Hero | 21:9 | 2800×1200 | Raised drying beds at golden hour, parchment spread evenly, Aberdare ridge on the horizon. No people. Shoot low and along the beds so they lead the eye. |
| `gathaithi-selective-picking.jpg` | Home | Current season | 4:5 | 1600×2000 | Close on a picker’s hands and a full bucket of ripe cherry. Skilled work, unhurried. Face optional; if included, working, not posed for the camera. |
| `gathaithi-wet-mill-morning.jpg` | Home | Story teaser | 3:2 | 2400×1600 | The wet mill in early morning working light — pulper, channels, delivery bay. Wide enough to read as a working factory, not a detail shot. |
| `gathaithi-village-ridge.jpg` | About | Hero | 16:9 | 2400×1350 | Gathaithi village and the surrounding shambas from a high point: coffee, terracing, red soil, tin roofs, cloud on the Aberdares. Landscape as evidence of terroir. |
| `gathaithi-committee-meeting.jpg` | About | Governance | 3:2 | 2000×1334 | The management committee in session at the society office — minute book, ledgers, people mid-discussion. Documentary, not a staged handshake or a row of folded arms. |
| `gathaithi-soil-and-tree.jpg` | About | Terroir | 4:5 | 1600×2000 | Base of a mature SL28 tree: deep red volcanic soil, mulch, the trunk and a branch of green cherry. Shot in shade for colour accuracy in the soil. |
| `gathaithi-cherry-delivery.jpg` | About | Member welfare | 3:2 | 2000×1334 | Evening cherry delivery: weighing scale, the clerk writing the receipt, a member watching the reading. The moment the crop becomes a number in the books. |
| `gathaithi-parchment-in-hands.jpg` | Our Coffee | Hero | 16:9 | 2400×1350 | Two hands lifting dried parchment from a bed, backlit so the beans separate. Tight, tactile, no branding in frame. |
| `lot-aa-green-beans.jpg` | Our Coffee | Lot catalogue — AA | 1:1 | 1600×1600 | Square flat-lay of AA green beans on parchment paper, raking side light so bean size and uniformity read clearly. Beans fill the frame, centred, with even margins. Identical setup, light, height and crop for all four grade shots — they sit side by side in a grid and any difference in framing shows. |
| `lot-ab-green-beans.jpg` | Our Coffee | Lot catalogue — AB | 1:1 | 1600×1600 | As lot-aa-green-beans.jpg, identical setup. AB beans. |
| `lot-pb-green-beans.jpg` | Our Coffee | Lot catalogue — PB | 1:1 | 1600×1600 | As lot-aa-green-beans.jpg, identical setup. Peaberry — the round single seeds should be obvious. |
| `lot-c-green-beans.jpg` | Our Coffee | Lot catalogue — C | 1:1 | 1600×1600 | As lot-aa-green-beans.jpg, identical setup. Grade C beans. |
| `process-01-pulping.jpg` | Our Coffee | Processing — pulping | 3:2 | 1800×1200 | Cherry entering the disc pulper, water moving, skins separating. Freeze the motion; keep the machinery legible. |
| `process-02-fermentation.jpg` | Our Coffee | Processing — fermentation | 3:2 | 1800×1200 | A fermentation tank at dusk, filled with parchment under mucilage. Overhead or high three-quarter angle. |
| `process-03-washing.jpg` | Our Coffee | Processing — washing | 3:2 | 1800×1200 | Washing channels with parchment being graded by density, a worker with a wooden paddle. Water motion is the subject. |
| `process-04-second-soak.jpg` | Our Coffee | Processing — second soak | 3:2 | 1800×1200 | Clean water soak tank, parchment fully submerged, surface still enough to read the beans through it. |
| `process-05-raised-beds.jpg` | Our Coffee | Processing — drying | 3:2 | 1800×1200 | A worker turning parchment on a raised bed, shade nets rolled back, rows receding. Late afternoon light. |
| `gathaithi-sample-preparation.jpg` | Our Coffee | Request a sample | 4:5 | 1400×1750 | Sample bags being weighed and labelled for despatch, or a cupping table mid-session. Precision and record-keeping, not romance. |
| `gathaithi-members-collection-point.jpg` | Our Farmers | Hero | 16:9 | 2400×1350 | Members at a collection point in the evening with full buckets, talking, queueing, being weighed. Owners of a business at work — not recipients of anything. |
| `member-01-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | Environmental portrait on the member’s own shamba, standing, eye level, looking at the lens. Even shade. Confident, not smiling on command. Same treatment for all six portraits. |
| `member-02-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-03-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-04-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-05-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `member-06-portrait.jpg` | Our Farmers | Member profiles | 4:5 | 1200×1500 | As member-01-portrait.jpg. Different member, same eye level and treatment. |
| `gathaithi-agronomy-training.jpg` | Our Farmers | Training | 3:2 | 2000×1334 | A field day in progress: the agronomist demonstrating pruning on a real tree, members close in around it, secateurs in hands. Teaching between equals. |
| `gathaithi-society-office.jpg` | Our Farmers | Pre-finance | 3:2 | 2000×1334 | The society office counter: member records, a clerk, an application being completed. Administrative competence, plainly shown. |
| `gathaithi-office-exterior.jpg` | Contact | Hero | 3:2 | 2000×1334 | The society office and mill entrance from the approach road, signage legible. This is the “you have arrived” photograph — shoot it in flat morning light. |
| `gathaithi-location-map.jpg` | About & Contact | Location | 4:3 | 1600×1200 | A flat, exported map still — Nyeri County with Gathaithi marked, Nyeri town and Nairobi for reference. Muted, no satellite imagery, no third-party watermark. Export at 2× for retina. |

## Priority

If the shoot has to be done in stages, this is the order that matters.

1. `gathaithi-drying-beds-wide.jpg` — the home page hero. One photograph carries
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

- `gathaithi-drying-beds-wide.jpg` — Coffee parchment drying on raised beds at the Gathaithi wet mill, with the Aberdare ridge behind.
- `gathaithi-selective-picking.jpg` — Ripe red coffee cherry being picked selectively into a bucket on a Gathaithi member’s farm.
- `gathaithi-wet-mill-morning.jpg` — The Gathaithi wet mill at first light, with pulping channels and the cherry delivery bay.
- `gathaithi-village-ridge.jpg` — Gathaithi village and the surrounding coffee farms on the slopes of Tetu, Nyeri County.
- `gathaithi-committee-meeting.jpg` — Members of the Gathaithi management committee in session at the society office.
- `gathaithi-soil-and-tree.jpg` — The base of a mature SL28 coffee tree in deep red volcanic soil on a Gathaithi member’s farm.
- `gathaithi-cherry-delivery.jpg` — A Gathaithi member’s cherry being weighed and recorded at the mill delivery bay.
- `gathaithi-parchment-in-hands.jpg` — Dried coffee parchment lifted from a raised bed at the Gathaithi wet mill.
- `lot-aa-green-beans.jpg` — Grade AA green coffee beans from Gathaithi, screen 17 and above.
- `lot-ab-green-beans.jpg` — Grade AB green coffee beans from Gathaithi, screen 15 to 16.
- `lot-pb-green-beans.jpg` — Peaberry green coffee beans from Gathaithi.
- `lot-c-green-beans.jpg` — Grade C green coffee beans from Gathaithi.
- `process-01-pulping.jpg` — Ripe cherry passing through the disc pulper at the Gathaithi wet mill.
- `process-02-fermentation.jpg` — Parchment coffee fermenting overnight in a tank at the Gathaithi wet mill.
- `process-03-washing.jpg` — Parchment being washed and density-graded in the channels at Gathaithi.
- `process-04-second-soak.jpg` — Washed parchment resting under clean water during the second soak at Gathaithi.
- `process-05-raised-beds.jpg` — Parchment being turned by hand on raised drying beds at the Gathaithi wet mill.
- `gathaithi-sample-preparation.jpg` — Green coffee samples being weighed and labelled for despatch at Gathaithi.
- `gathaithi-members-collection-point.jpg` — Gathaithi members delivering the day’s cherry at a village collection point.
- `member-01-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-02-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-03-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-04-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-05-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `member-06-portrait.jpg` — A Gathaithi member photographed among their coffee trees.
- `gathaithi-agronomy-training.jpg` — Gathaithi members at a field day, learning pruning technique on a mature coffee tree.
- `gathaithi-society-office.jpg` — A member completing a pre-finance application at the Gathaithi society office.
- `gathaithi-office-exterior.jpg` — The entrance to the Gathaithi Farmers’ Co-operative Society office and wet mill.
- `gathaithi-location-map.jpg` — Map showing the location of Gathaithi in Tetu sub-county, Nyeri County, Kenya.
