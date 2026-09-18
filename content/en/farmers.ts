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
    title: 'Our Farmers | Members and training | Gathaithi',
    /* NO LONGER PROMISES THE NOTICEBOARD. It offered "current cherry price,
       payment dates and collection times" — the members' noticeboard, removed
       in #70. The page carries none of the three, and a description that
       advertises what is not there is why somebody leaves in two seconds. Cut
       under 160 characters as well, which is all a search result shows. */
    description:
      'Meet the {{members}} smallholder members who own Gathaithi, learn how the society works for them, and see the agronomy training we provide.',
    ogLine: 'The members who own the society',
  },

  /* PARKED — nothing renders this. It was the page header: "Every kilo starts
     with somebody's hands", over the 1,700-families lead. The user asked for
     the card removed, and the members band carries the page's h1 now. Kept
     because it is good copy and the only place that sentence exists. */
  /* THE OWNERSHIP BAND, moved here from About.

     "Owned by the farmers who grow the coffee" was the About page's title and
     its three cards sat under it. But the claim it makes — that the members
     are the shareholders, that the committee is elected from among them — is
     what THIS page is for. On About it was a statement about the society; here
     it is the page's subject, so it opens the page and carries the h1.

     The photograph under it is the members themselves at a drying bed. Until
     it arrived, the one claim on this site that most needed a picture of real
     members had none. */
  ownership: {
    eyebrow: 'Our farmers',
    title: 'Owned by the farmers who grow the coffee',
    lead:
      'Gathaithi Farmers’ Co-operative Society Ltd is a registered co-operative in Tetu Sub-County, Nyeri County. Our members are our shareholders, our committee is elected from among them, and our wet mill exists to turn their cherry into the finest coffee our hillside can produce.',
    cards: [
      {
        title: 'Shareholder-owned',
        body: '{{members}} smallholder farmers hold the shares. They elect the committee at the Annual General Meeting, where the accounts are also presented to them.',
      },
      {
        title: 'One mill, one catchment',
        body: 'A single wet mill on {{millSite}} hectares serves the surrounding farms. Cherry is delivered on the evening it is picked and processed within hours. Nothing is blended in from elsewhere.',
      },
      {
        title: 'Independent since {{independentSince}}',
        body: 'Gathaithi farmers grew coffee under the wider Tetu society from {{established}}. Since {{independentSince}}, we have managed our own processing, marketing and payments.',
      },
    ],
    imageSlot: 'farmersMembers',
    caption:
      'Members at the drying beds. As shareholders, they elect the committee and approve the accounts.',
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
      'Only ripe cherry is picked; green cherry is left for a later pass.',
      'Cherry is picked by hand and selected by colour.',
      'Two members, one tree. Most of the crop is family work.',
    ],
    slideLabel: 'Slide {{n}} of {{total}}',
    pauseLabel: 'Pause the harvest photographs',
    playLabel: 'Play the harvest photographs',
    regionLabel: 'Photographs from the harvest',
  },

  profiles: {
    eyebrow: 'Members',
    heading: 'Our members',
    /* Rewritten twice, both times because the cards below it changed. It said
       all six profiles were sample entries; then that the three named ones
       were; now there are no named ones at all, so it says what is actually
       true of the band — three photographs, and interviews still to come. */
    lead:
      'Most of our members farm less than one hectare, alongside food crops and livestock. Member profiles will be added over time, and no member is featured without their consent.',
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
        caption: 'Only ripe cherry is picked; green cherry is left for a later pass.',
      },
      {
        id: 'm2',
        imageSlot: 'memberTwo',
        caption: 'Cherry is picked by hand and selected by colour.',
      },
      {
        id: 'm3',
        imageSlot: 'memberThree',
        /* Was "Two members, one tree." The photograph behind this card was
           replaced on 2026-09-08 and the new one has three people working
           down a row, so the caption had to follow it. A caption that counts
           the people in the frame is a caption that has to be checked every
           time the frame changes. */
        caption: 'Pickers work along each row over several passes.',
      },
    ],
  },

  training: {
    eyebrow: 'Agronomy',
    heading: 'Training and good agricultural practice',
    lead:
      'Coffee quality begins on the farm, long before the cherry reaches the mill. The society runs field training throughout the year so that the {{trees}} trees in our catchment are pruned, fertilised and picked to the same standard.',
    body: [
      'Field days are held on members’ farms rather than in a hall, so that practices such as pruning can be demonstrated on real trees. Training follows the season: pruning and stumping after harvest, nutrition before flowering, pest and disease scouting during the rains, and selective picking as the crop ripens.',
      'We also demonstrate the sustainable practices that buyers ask about, including mulching and ground cover to protect the soil on our slopes, the safe handling and disposal of chemicals, and record-keeping on every farm.',
    ],
    programmes: [
      {
        name: 'Pruning and canopy management',
        cadence: 'After harvest, annually',
        body: 'Cycle pruning, stumping of exhausted trees and canopy management to keep trees productive and reduce disease.',
      },
      {
        name: 'Soil and nutrition',
        cadence: 'Before flowering and after fruit set',
        body: 'Soil sampling, correct fertiliser rates and timing, mulching and organic matter, suited to the red volcanic soils of our area.',
      },
      {
        name: 'Pest and disease scouting',
        cadence: 'Through the wet season',
        body: 'Identifying coffee berry disease and leaf rust early, spraying correctly and safely, and choosing resistant varieties for replanting.',
      },
      {
        name: 'Picking and delivery discipline',
        cadence: 'Through harvest',
        body: 'Selective picking of ripe red cherry only, multiple passes and same-day delivery: the practices that determine cup quality and, therefore, the price.',
      },
    ],
  },

  /* PARKED — nothing renders this. The pre-finance band — "Money before the
     crop pays", the four steps and the terms table — was removed at the user's
     request. The SCHEME still exists and is still referred to on Contact and
     About, so nothing else on the site became untrue; only this description of
     it is gone. `PreFinance.tsx` is deleted; this is the copy it read. */
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
