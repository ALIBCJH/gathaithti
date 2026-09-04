import type { FarmersContent } from '../types';

/**
 * NOTE ON THE MEMBER PROFILES
 * There are no invented people on this page any more. The three sample
 * profiles — names, villages, years, tree counts and first-person quotes, none
 * of them real — were removed outright; the three cards that remain are
 * photographs of members at work, captioned with what the picture shows and
 * carrying no identity at all.
 *
 * That is deliberate and it is the safe default. A card gains a `name` only
 * when there is a real interview behind it, and gaining one turns it back into
 * a full profile with no change to the component. Until then this band claims
 * nothing about anybody.
 */

export const farmers: FarmersContent = {
  meta: {
    title: 'Our Farmers — members, training & pre-finance | Gathaithi',
    description:
      'The {{members}} smallholder members who own Gathaithi Farmers’ Co-operative Society. Current cherry price, payment dates and collection times, plus agronomy training and the pre-finance scheme.',
    ogLine: 'The members who own the society — noticeboard, training, pre-finance',
  },

  hero: {
    eyebrow: 'Our farmers',
    title: 'Every kilo starts with somebody’s hands',
    lead:
      '{{members}} smallholder families farm the coffee that comes through this mill — and they own it. They elect the committee, they approve the accounts, and the price on this page is the price the society pays them.',
  },

  /* PARKED — nothing renders this. The members' noticeboard was the whole
     first band of Our Farmers: the cherry price, the next payment date, the
     AGM, fertiliser orders, the collection times and the member line. The user
     asked for the card removed outright.

     Kept rather than deleted because it is the only place any of that is
     written down, and it is the members' half of the site — if the society
     wants a noticeboard again, this is it, not a rewrite. `Noticeboard.tsx`
     and `NoticeboardPreview.tsx` are deleted; this is the copy they read. */
  noticeboard: {
    eyebrow: 'Members’ noticeboard',
    heading: 'Cherry price & payments',
    lead: 'Updated by the society office. Check here before you deliver.',
    updated: 'Last updated: 2 September',
    priceLabel: 'Cherry price now',
    priceUnit: 'per kilo of cherry',
    priceFootnote:
      'The rate shown is the current advance rate paid on delivery. The final rate is confirmed when the season’s sales close and the balance is paid.',
    notices: [
      {
        id: 'payment',
        kind: 'payment',
        label: 'Next payment date',
        value: 'Friday 27 March',
        detail: 'Payments are made to the M-Pesa number or bank account registered against your member number. Update your details at the office if they have changed.',
        date: '',
        urgent: true,
      },
      {
        id: 'agm',
        kind: 'agm',
        label: 'Annual General Meeting',
        value: 'Saturday 16 May, 10:00',
        detail: 'Bring your member card. Audited accounts will be tabled, and committee elections will be held. One member, one vote.',
        date: '',
      },
      {
        id: 'inputs',
        kind: 'notice',
        label: 'Fertiliser orders',
        value: 'Order at the office',
        detail: 'Input credit is available against your coming crop. Place orders early — the society buys in bulk once per cycle and late orders wait for the next one.',
        date: '',
      },
      {
        id: 'quality',
        kind: 'notice',
        label: 'Deliver ripe cherry only',
        value: 'Red cherry, same day',
        detail: 'Green and overripe cherry is rejected at the weighing point. Picking selectively is what holds the price up for everyone.',
        date: '',
      },
    ],
    collection: {
      heading: 'Collection times',
      note: 'Draft times — confirm with the society office before publication.',
      rows: [
        { point: 'Main wet mill, Gathaithi', time: '15:00 – 19:00' },
        { point: 'Kagumo collection point', time: '15:00 – 18:00' },
        { point: 'Ihwa collection point', time: '15:00 – 18:00' },
        { point: 'Saturday, all points', time: '13:00 – 17:00' },
      ],
    },
    help: {
      heading: 'Something wrong with your payment?',
      body: 'Come to the society office with your member number, or call the member line. Payment queries are dealt with the same week.',
      phoneLabel: 'Member line',
    },
  },

  /* PARKED — nothing renders this. The harvest band was a rotating slideshow of
     harvest-01..03 with the argument for selective picking beside it. Those
     three photographs moved into the first three member cards in #55, which
     left the page showing them twice; the user asked for the band to go.

     The three captions here are duplicated verbatim on those cards. The three
     paragraphs of argument are NOT anywhere else on the site — if the picking
     is worth arguing for again, the words are here rather than needing to be
     written a second time. The slideshow component is deleted; the home hero
     still has its own. */
  harvest: {
    eyebrow: 'The harvest',
    heading: 'Picked one cherry at a time, by people who own the result',
    body: [
      'A coffee tree does not ripen all at once. On the same branch, on the same morning, there is fruit that is ready and fruit that is a week away — and the difference between them is the difference between a lot that scores and a lot that does not.',
      'So Gathaithi picks selectively. Every red cherry is taken by hand and every green one is left on the wood for the next pass. Nobody strips a branch here. Across the catchment that is thousands of individual decisions a day, made by the people whose names are on the delivery books, and it is the single largest reason this coffee cups the way it does.',
      'It is unglamorous, it is done bent over in the sun, and it cannot be mechanised. It is also the work the society exists to pay properly for.',
    ],
    /* One line per slide, in slide order. */
    captions: [
      'Ripe taken, green left — the branch is worked again in a week.',
      'Selecting by colour, not by handful. Nothing is stripped.',
      'Two members, one tree. Most of the crop is family work.',
    ],
    slideLabel: 'Slide {{n}} of {{total}}',
    pauseLabel: 'Pause the harvest photographs',
    playLabel: 'Play the harvest photographs',
    regionLabel: 'Photographs from the harvest',
  },

  profiles: {
    eyebrow: 'Members',
    heading: 'The people behind the picking',
    /* Rewritten twice, both times because the cards below it changed. It said
       all six profiles were sample entries; then that the three named ones
       were; now there are no named ones at all, so it says what is actually
       true of the band — three photographs, and interviews still to come. */
    lead:
      'Most members farm under a hectare, alongside food crops and a cow or two. The interviews and portraits are still to be collected, and no member is published here without their agreement.',
    yearsLabel: 'Years farming',
    treesLabel: 'Trees',
    members: [
      /* Three photographs of members at work, carrying NO identity — no name,
         no village, no figures, no quote. The three invented sample profiles
         that used to follow them are gone.

         The people in these frames are real and recognisable, which is the
         whole reason the cards are shaped this way: a real face over an
         invented name would have told a visitor that the member in the red
         headscarf has farmed 34 years, holds 420 trees and said a sentence she
         has never said. When a real interview is collected, add the identity
         fields to a card and it becomes a profile again; nothing in the
         component has to change. */
      {
        id: 'm1',
        imageSlot: 'memberOne',
        caption: 'Ripe taken, green left — the branch is worked again in a week.',
      },
      {
        id: 'm2',
        imageSlot: 'memberTwo',
        caption: 'Selecting by colour, not by handful. Nothing is stripped.',
      },
      {
        id: 'm3',
        imageSlot: 'memberThree',
        caption: 'Two members, one tree. Most of the crop is family work.',
      },
    ],
  },

  training: {
    eyebrow: 'Agronomy',
    heading: 'Training and good agricultural practice',
    lead:
      'Quality is decided on the farm long before it reaches the mill. The society runs field training through the year so that {{trees}} trees across the catchment are pruned, fed and picked to one standard.',
    body: [
      'Field days are held on members’ own farms rather than in a hall, because pruning is taught with secateurs in hand on a real tree. Sessions follow the season: pruning and stumping after harvest, nutrition before flowering, pest and disease scouting through the wet months, picking discipline as the crop ripens.',
      'The society also demonstrates the practices buyers ask about — mulching and cover to hold the soil on these slopes, correct handling and disposal of chemicals, and record-keeping on each farm.',
    ],
    programmes: [
      {
        name: 'Pruning and canopy management',
        cadence: 'After harvest, annually',
        body: 'Cycle pruning, stumping of exhausted blocks and canopy management to keep bearing wood productive and disease pressure down.',
      },
      {
        name: 'Soil and nutrition',
        cadence: 'Before flowering and after fruit set',
        body: 'Soil sampling, correct fertiliser rates and timing, mulching and organic matter — matched to the red volcanic soils of the catchment.',
      },
      {
        name: 'Pest and disease scouting',
        cadence: 'Through the wet season',
        body: 'Identifying coffee berry disease and leaf rust early, spraying correctly and safely, and choosing resistant varieties for replanting.',
      },
      {
        name: 'Picking and delivery discipline',
        cadence: 'Through harvest',
        body: 'Selective picking of ripe red cherry only, multiple passes, and same-day delivery — the practices that decide the cup and therefore the price.',
      },
    ],
  },

  prefinance: {
    eyebrow: 'Pre-finance',
    heading: 'Money before the crop pays',
    lead:
      'Coffee pays once a year. School fees, fertiliser and hospital bills do not. The society advances members money against their own coming crop so that nobody has to sell their coffee cheaply to somebody at the roadside.',
    body: [
      'The amount available is based on a member’s own delivery record — what they have brought to the mill before, and what their trees should produce this season. No land title is taken, and no outside guarantor is required.',
      'Repayment is deducted from that member’s cherry payment when it is made, and shown on their statement. The society is lending against coffee it will itself receive, which is why the terms can be what they are.',
    ],
    steps: [
      { n: '01', title: 'Apply at the office', body: 'Bring your member number. Staff check your delivery record and confirm what is available to you.' },
      { n: '02', title: 'Committee approval', body: 'Applications are approved under the limits set by the management committee, not at anyone’s personal discretion.' },
      { n: '03', title: 'Money released', body: 'Funds are sent to your registered M-Pesa number or bank account, or inputs are issued from the store.' },
      { n: '04', title: 'Recovered from your payment', body: 'The advance is deducted from your cherry payment when it falls due, and appears on your statement.' },
    ],
    terms: [
      { label: 'Secured against', value: 'Your own coming crop' },
      { label: 'Guarantor required', value: 'None' },
      { label: 'Land title required', value: 'None' },
      { label: 'Available for', value: 'School fees · farm inputs · emergencies' },
      { label: 'Recovery', value: 'Deducted from your cherry payment' },
      { label: 'Rates and limits', value: 'Up to 40% of last season’s delivery value, at 1% a month' },
    ],
  },
};
