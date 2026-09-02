/**
 * Every content shape used by the site.
 *
 * A note on typography inside content strings:
 *    is a non-breaking space. Use it between a number and its unit
 *           (1,720 m) so a line break can never separate them.
 *   –       is an en dash. Use it for ranges (16–26 °C), never a hyphen.
 *   ’ “ ”   are real curly quotes. Never use the straight ' or ".
 */

export type Locale = 'en' | 'sw';

/* ── Statistics ─────────────────────────────────────────────────────────── */

export interface Fact {
  /** Stable id used in JSX: <Fact id="members" /> */
  id: string;
  label: string;
  /** Machine-readable value. Used in JSON-LD and sorting. */
  value: string | number;
  /** What actually renders. Pre-formatted with real typographic characters. */
  display: string;
  /** Rendered next to the figure in stat blocks, e.g. “per kg”. */
  unit?: string;
  /** True where the figure is an estimate rather than a counted number. */
  approximate?: boolean;
  /** Flip to true only once the society has confirmed the figure. */
  verified: boolean;
  /** Where the number came from, once known. */
  source?: string;
  /** What to check before flipping `verified`. */
  note?: string;
  /** ISO date this entry was last touched. */
  updated: string;
}

/* ── Images ─────────────────────────────────────────────────────────────── */

export type AspectRatio = '21/9' | '16/9' | '3/2' | '4/3' | '1/1' | '4/5' | '3/4' | '2/3';

export interface ImageSlot {
  /** Filename inside /public/images. Drop a file with this exact name to fill the slot. */
  file: string;
  page: string;
  section: string;
  ratio: AspectRatio;
  minWidth: number;
  minHeight: number;
  /** Art direction. Shown inside the placeholder and listed in IMAGES.md. */
  direction: string;
  alt: string;
  /** Only the hero images. Everything else lazy-loads. */
  priority?: boolean;
  /** Passed to next/image. Keep honest or the browser over-fetches on mobile. */
  sizes?: string;
}

/* ── Shared page furniture ──────────────────────────────────────────────── */

export interface Cta {
  label: string;
  href: string;
}

export interface Meta {
  title: string;
  description: string;
  /** Short line rendered inside the generated OpenGraph image. */
  ogLine: string;
}

export interface Common {
  brand: { name: string; short: string; tagline: string };
  nav: { home: string; about: string; products: string; farmers: string; contact: string };
  actions: {
    requestSample: string;
    forMembers: string;
    readStory: string;
    seeLots: string;
    menu: string;
    close: string;
    skipToContent: string;
  };
  locale: { label: string; en: string; sw: string; pending: string };
  footer: {
    blurb: string;
    sections: { explore: string; contact: string };
    registration: string;
    rights: string;
    unverifiedNotice: string;
  };
  form: {
    required: string;
    optional: string;
    sending: string;
    errorTitle: string;
    errorBody: string;
    successTitle: string;
    successBody: string;
    successAgain: string;
    invalidEmail: string;
    tooShort: string;
    selectOne: string;
  };
}

/* ── Home ───────────────────────────────────────────────────────────────── */

export interface HomeContent {
  meta: Meta;
  hero: {
    title: string;
    positioning: string;
    /** Accessible name for the small arrow at the foot of the hero on a phone. */
    scrollDown: string;
    scrollHint: string;
    slideLabel: string;
    pauseLabel: string;
    playLabel: string;
    regionLabel: string;
  };
  proof: {
    eyebrow: string;
    heading: string;
    factIds: string[];
    /** Per-fact override for how the figure is SET here. See content/en/home.ts. */
    figures?: Record<string, string>;
    titles: Record<string, string>;
    captions: Record<string, string>;
  };
  season: {
    eyebrow: string;
    heading: string;
    lead: string;
    status: string;
    rows: { label: string; value: string }[];
    cta: Cta;
  };
  story: {
    eyebrow: string;
    heading: string;
    body: string[];
    cta: Cta;
    pullQuote: string;
    attribution: string;
    /** The editorial statement card that balances the story column. */
    card: { eyebrow: string; quote: string; support: string; footer: string };
  };
  noticeboard: { eyebrow: string; heading: string; lead: string; cta: Cta };
}

/* ── About ──────────────────────────────────────────────────────────────── */

export interface AboutContent {
  meta: Meta;
  hero: { eyebrow: string; title: string; lead: string };
  pillars: { eyebrow: string; heading: string; cards: { title: string; body: string }[] };
  origin: {
    eyebrow: string;
    heading: string;
    /** One per photograph beside the text, in order. */
    captions: string[];
    body: string[];
    timeline: { year: string; title: string; body: string }[];
  };
  registration: {
    eyebrow: string;
    heading: string;
    lead: string;
    rows: { label: string; value: string }[];
  };
  governance: {
    eyebrow: string;
    heading: string;
    lead: string;
    board: {
      eyebrow: string;
      heading: string;
      lead: string;
      /** Rendered above the grid only while any member is still `pending`. */
      pendingNote: string;
      roleLabel: string;
      members: BoardMember[];
    };
    bodies: { name: string; role: string; composition: string }[];
  };
  terroir: { eyebrow: string; heading: string; lead: string; factIds: string[]; varieties: { heading: string; body: string; list: { name: string; note: string }[] } };
}

/* ── Products ───────────────────────────────────────────────────────────── */

export interface Lot {
  id: string;
  grade: string;
  name: string;
  /** Entry in content/facts.ts holding the indicative price. Omit for “on request”. */
  priceFactId?: string;
  /** Delivery terms the price is quoted on, e.g. “FOB Mombasa”. */
  incoterm: string;
  /** Smallest quantity the society will sell of this lot. */
  moq: string;
  /** Sorting only — never rendered. Keep in step with `score`. */
  scoreValue?: number;
  screen: string;
  varieties: string;
  processing: string;
  cuppingNotes: string[];
  score: string;
  harvestWindow: string;
  volume: string;
  packaging: string;
  availability: 'available' | 'allocated' | 'forward';
  availabilityLabel: string;
  description: string;
  imageSlot: string;
}

export interface ProcessStep {
  n: string;
  title: string;
  duration: string;
  body: string;
  detail: string;
  imageSlot: string;
}

export interface ProductsContent {
  meta: Meta;
  hero: { eyebrow: string; title: string; lead: string };
  marketNote: { heading: string; body: string[] };
  catalogue: {
    eyebrow: string;
    heading: string;
    lead: string;
    legend: Record<string, string>;
    /** false hides every price on the page in one edit. */
    showPrices: boolean;
    priceCaption: string;
    priceNote: string;
    indicativeLabel: string;
    moqLabel: string;
    filterLabel: string;
    filterAll: string;
    sortLabel: string;
    sortOptions: { id: 'grade' | 'price' | 'score' | 'availability'; label: string }[];
    resultCount: string;
    resultCountOne: string;
    emptyState: string;
    clearFilters: string;
    detailsLabel: string;
    requestLotLabel: string;
  };
  lots: Lot[];
  process: { eyebrow: string; heading: string; lead: string; steps: ProcessStep[] };
  sample: {
    eyebrow: string;
    heading: string;
    lead: string;
    note: string;
    fields: {
      name: string; company: string; email: string; country: string;
      role: string; volume: string; message: string; lot: string;
    };
    /** First option of the lot select: no particular lot. */
    lotAny: string;
    placeholders: { name: string; company: string; email: string; country: string; message: string };
    roles: string[];
    volumes: string[];
    submit: string;
    consent: string;
  };
}

/* ── Farmers ────────────────────────────────────────────────────────────── */

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageSlot: string;
  /** True while the name is unconfirmed or absent. Drives the draft marker. */
  pending?: boolean;
}

export interface MemberProfile {
  id: string;
  name: string;
  village: string;
  years: string;
  trees: string;
  quote: string;
  imageSlot: string;
}

export interface Notice {
  id: string;
  kind: 'price' | 'payment' | 'agm' | 'collection' | 'notice';
  label: string;
  value: string;
  detail: string;
  date: string;
  urgent?: boolean;
}

export interface FarmersContent {
  meta: Meta;
  hero: { eyebrow: string; title: string; lead: string };
  noticeboard: {
    eyebrow: string;
    heading: string;
    lead: string;
    updated: string;
    priceLabel: string;
    priceUnit: string;
    priceFootnote: string;
    notices: Notice[];
    collection: { heading: string; note: string; rows: { point: string; time: string }[] };
    help: { heading: string; body: string; phoneLabel: string };
  };
  harvest: {
    eyebrow: string;
    heading: string;
    body: string[];
    /** One per slide, in slide order. Length defines the number of slides. */
    captions: string[];
    slideLabel: string;
    pauseLabel: string;
    playLabel: string;
    regionLabel: string;
  };
  profiles: { eyebrow: string; heading: string; lead: string; members: MemberProfile[]; yearsLabel: string; treesLabel: string };
  training: { eyebrow: string; heading: string; lead: string; body: string[]; programmes: { name: string; cadence: string; body: string }[] };
  prefinance: { eyebrow: string; heading: string; lead: string; body: string[]; steps: { n: string; title: string; body: string }[]; terms: { label: string; value: string }[] };
}

/* ── Contact ────────────────────────────────────────────────────────────── */

export interface ContactRoute {
  id: string;
  /** "For buyers" — who this row is for, not what it does. */
  label: string;
  heading: string;
  body: string;
  /** Which of the three direct actions this row should use. */
  channel: 'whatsapp' | 'phone' | 'email';
}

export interface ContactForm {
  eyebrow: string;
  heading: string;
  lead: string;
  note: string;
  /** Shown on each contact route, jumping to the form with that topic chosen. */
  writeToUs: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    organisation: string;
    topic: string;
    memberNumber: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    organisation: string;
    message: string;
    topic: string;
  };
  memberHint: string;
  submit: string;
  consent: string;
  successBody: string;
  successAgain: string;
}

export interface ContactContent {
  meta: Meta;
  hero: { eyebrow: string; title: string; lead: string };
  /** The three ways to reach the society, stated once and used everywhere. */
  direct: {
    heading: string;
    lead: string;
    whatsapp: { label: string; note: string; prefill: string };
    phone: { label: string; note: string };
    email: { label: string; note: string };
    memberLine: { label: string; note: string };
  };
  routes: ContactRoute[];
  form: ContactForm;
  office: { heading: string; address: string[]; hours: { day: string; time: string }[]; registration: { label: string; value: string }[] };
}

/* ── The full dictionary ────────────────────────────────────────────────── */

export interface Dictionary {
  common: Common;
  home: HomeContent;
  about: AboutContent;
  products: ProductsContent;
  farmers: FarmersContent;
  contact: ContactContent;
}

/** Recursive Partial — the shape a translation-in-progress file may take. */
export type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
