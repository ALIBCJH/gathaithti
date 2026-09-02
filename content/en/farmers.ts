import type { FarmersContent } from '../types';

/**
 * NOTE ON THE MEMBER PROFILES
 * The six profiles below are SCAFFOLDING. Names, years, tree counts and quotes
 * are marked as drafts and must be replaced with real interviews before this
 * page goes live — we do not publish invented people. Structure, layout and
 * photo slots are final; only the content needs collecting.
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
    title: 'The society is its members',
    lead:
      '{{members}} smallholder families farm the coffee that comes through this mill. They elect the committee, they approve the accounts, and the price this page carries is the price the society pays them.',
  },

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

  profiles: {
    eyebrow: 'Members',
    heading: 'Who grows this coffee',
    lead:
      'Most members farm under a hectare, alongside food crops and a cow or two. The six profiles below are SAMPLE ENTRIES — invented names, figures and words, standing in so the page can be seen whole. The photographs and the interviews are still to be collected, and no member is published here without their agreement.',
    yearsLabel: 'Years farming',
    treesLabel: 'Trees',
    members: [
      {
        id: 'm1',
        name: 'Grace Wairimu',
        village: 'Gathaithi',
        years: '34',
        trees: '420',
        quote:
          '“My father planted the first block. I have replaced perhaps half of it with Batian, and the old SL28 still gives the best cup.”',
        imageSlot: 'memberOne',
      },
      {
        id: 'm2',
        name: 'Peter Kimani',
        village: 'Kagumo',
        years: '12',
        trees: '260',
        quote:
          '“I came back from Nairobi to farm. The pre-finance is what made it possible to prune properly in the first year.”',
        imageSlot: 'memberTwo',
      },
      {
        id: 'm3',
        name: 'Esther Nyambura',
        village: 'Ihwa',
        years: '27',
        trees: '510',
        quote:
          '“I deliver in the evening and the receipt is written in front of me. That is the part I trust.”',
        imageSlot: 'memberThree',
      },
      {
        id: 'm4',
        name: 'Samuel Githinji',
        village: 'Gathaithi',
        years: '41',
        trees: '680',
        quote:
          '“Forty years on the same slope. The mill has changed three times; the trees have not.”',
        imageSlot: 'memberFour',
      },
      {
        id: 'm5',
        name: 'Margaret Wanjiku',
        village: 'Kagumo',
        years: '19',
        trees: '340',
        quote:
          '“The field days taught me to pick only red. My price went up before my yield did.”',
        imageSlot: 'memberFive',
      },
      {
        id: 'm6',
        name: 'John Maina',
        village: 'Ihwa',
        years: '8',
        trees: '180',
        quote:
          '“The smallest farm on this list, and I am still an owner of the mill. That is the whole point of a society.”',
        imageSlot: 'memberSix',
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
