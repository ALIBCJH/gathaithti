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

/**
 * The shape a slot reserves. `9/16` and `9/19` are the phone-screen portraits
 * the mobile hero uses; for those slots the value is NOMINAL — the frame is
 * the viewport, not a reserved box, so nothing lays out from it. The exact
 * pixel size of each file is in its `minWidth`/`minHeight`.
 */
export type AspectRatio =
  | '21/9' | '16/9' | '3/2' | '4/3' | '1/1' | '4/5' | '3/4' | '2/3' | '9/16' | '9/19';

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
  /**
   * Opt OUT of the phone density cap in src/lib/images.ts.
   *
   * By default a phone is served about 2x the CSS size of a slot rather than
   * the 3x its screen reports, because on a 3x phone the difference is bytes
   * rather than something anybody can see. Set this on the frames where it CAN
   * be seen — the hero, which fills the screen, and the pack photographs,
   * which are the product.
   */
  fullDensity?: boolean;
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
  nav: { home: string; about: string; products: string; farmers: string; gallery: string; contact: string };
  actions: {
    requestSample: string;
    /** The WhatsApp control in the bar and the drawer. */
    whatsappLabel: string;
    /** Pre-filled into the message, so the office knows where it came from. */
    whatsappPrefill: string;
    forMembers: string;
    readStory: string;
    seeLots: string;
    menu: string;
    close: string;
    skipToContent: string;
  };
  locale: { label: string; en: string; sw: string; pending: string };
  footer: {
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
    /** The label on the cue out of the hero. */
    scrollMore: string;
    /** Accessible name for the small arrow at the foot of the hero on a phone. */
    scrollDown: string;
    scrollHint: string;
    slideLabel: string;
    pauseLabel: string;
    playLabel: string;
    regionLabel: string;
  };
  /**
   * The society's own Vision and Mission, in its own words.
   *
   * Supplied on the letterhead in block capitals; set here in sentence case,
   * because a paragraph of capitals is read as shouting and the words are
   * unchanged either way. Do not paraphrase them — they are the statements the
   * co-operative adopted, not copy for this site.
   */
  statements: {
    eyebrow: string;
    items: { label: string; body: string }[];
  };

  proof: {
    eyebrow: string;
    heading: string;
    /** Set when the heading is not English — the motto is Kiswahili. */
    headingLang?: string;
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
  /** The four steps under the season panel, each a photograph and a line. */
  journey: {
    eyebrow: string;
    heading: string;
    lead: string;
    steps: { title: string; body: string; imageSlot: string }[];
    cta: Cta;
  };
  /**
   * Tasting notes from roasters who have bought the coffee, as the society
   * supplied them. Quoted verbatim and attributed to the roaster by name.
   */
  acclaim: {
    eyebrow: string;
    heading: string;
    quotes: { text: string; source: string; country: string }[];
  };
  noticeboard: { eyebrow: string; heading: string; lead: string; cta: Cta };
  /**
   * The organisations Gathaithi works with, as their own marks.
   *
   * `name` is the organisation's name and nothing else. There is deliberately
   * no field for what each one does or how it is involved: those are claims
   * about third parties, and the society is the only party that can make them.
   * If a description is ever wanted, it comes from the society in writing.
   */
  partners: { eyebrow: string; heading: string; items: { id: string; name: string; imageSlot: string }[] };
}

/* ── About ──────────────────────────────────────────────────────────────── */

export interface AboutContent {
  meta: Meta;
  hero: { eyebrow: string; title: string; lead: string };
  /** The opener: the society's own overview and its four pillars. Carries the h1. */
  intro: {
    eyebrow: string;
    heading: string;
    lead: string;
    pillars: { label: string; title: string; body: string }[];
  };
  /** Milestones from 1967 to today, beside one photograph. */
  history: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageSlot: string;
    caption: string;
    milestones: { year: string; title: string; body: string; current?: boolean }[];
  };
  /** Four values, each with a line of proof drawn from elsewhere on the site. */
  values: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string; proof: string }[];
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
  terroir: { eyebrow: string; heading: string; lead: string; factIds: string[] };
}

/* ── Products ───────────────────────────────────────────────────────────── */

/**
 * One thing the catalogue sells.
 *
 * It was written for GREEN COFFEE LOTS sold by the container — hence `moq`,
 * `incoterm` and `screen` — and the page now sells ROASTED RETAIL PACKS by the
 * bag. The wholesale fields are optional rather than deleted: they are still
 * true of the green coffee the society sells to importers, and a retail pack
 * simply has no minimum order, no incoterm and no screen size. A card renders
 * only the rows it actually has.
 *
 * `grade` carries whatever names the thing on the face of the card — the
 * screen grade for a lot, the net weight for a pack.
 */
export interface Lot {
  id: string;
  grade: string;
  name: string;
  /** Entry in content/facts.ts holding the price. Omit for “on request”. */
  priceFactId?: string;
  /** Delivery terms the price is quoted on, e.g. “FOB Mombasa”. Wholesale only. */
  incoterm?: string;
  /** Smallest quantity the society will sell. Wholesale only. */
  moq?: string;
  /** Sorting only — never rendered. Keep in step with `score`. */
  scoreValue?: number;
  /** Screen size. Wholesale only — a retail pack has none. */
  screen?: string;
  varieties: string;
  processing: string;
  cuppingNotes: string[];
  /** The cupping score, where one was awarded TO THIS THING. Optional: the 93
   *  points belong to a washed green lot, not to a bag of ground medium roast,
   *  and a retail pack must not borrow it. */
  score?: string;
  /** Wholesale only. */
  harvestWindow?: string;
  /** Wholesale only. */
  volume?: string;
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
  /** How to buy: one card per way the coffee is sold. */
  marketNote: { eyebrow: string; heading: string; options: { title: string; body: string }[] };
  catalogue: {
    eyebrow: string;
    /** The page's h1. */
    heading: string;
    /** The product itself, under the heading: one coffee, sold in sizes. */
    productName: string;
    productLine: string;
    /** false hides every price on the page in one edit. */
    showPrices: boolean;
    /** The size the page opens on — a Lot id. */
    defaultPack: string;
    sizeLabel: string;
    notesLabel: string;
    processLabel: string;
    varietiesLabel: string;
    orderLabel: string;
    /** Pre-filled WhatsApp message. {{pack}} and {{price}} are filled per size. */
    orderMessage: string;
    askLabel: string;
    /** One line under the buttons: how ordering actually works. */
    orderNote: string;
  };
  lots: Lot[];
  gem: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** `label` is the small line over each card's title. */
    cards: { label?: string; title: string; body: string; imageSlot: string }[];
    statement: string;
    cta: Cta;
  };
  /* No `lead` on `process`. The six steps below said what the sentence said,
     at length and with photographs — a summary of what the reader was about
     to read. */
  process: { eyebrow: string; heading: string; steps: ProcessStep[] };
  /**
   * The reach-out card that closes Our Coffee.
   *
   * It was a green-coffee importer's form — name, company, country, role,
   * volume of interest, lot of interest, "what are you looking for?" — eight
   * fields asked of somebody who wanted to know the price of a 250 g bag. The
   * page sells retail packs, so it asks a retail question: WhatsApp, the phone
   * number, and three fields.
   *
   * The channels come FIRST and deliberately: most people who want a bag of
   * coffee will send a WhatsApp message, not fill in a form.
   */
  sample: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** WhatsApp and the phone, in that order, above the form. */
    channels: {
      whatsapp: { label: string; note: string; prefill: string };
      phone: { label: string; note: string };
      /** Shown in place of a channel whose number is not set in site.ts. */
      missing: string;
    };
    form: {
      heading: string;
      fields: { pack: string; email: string; message: string };
      /** First option of the pack select: no particular size yet. */
      packAny: string;
      placeholders: { email: string; message: string };
      submit: string;
      consent: string;
      /** Overrides common.form, which still speaks to importers. */
      success: { title: string; body: string; again: string };
    };
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

/**
 * A member card. Two shapes, and the difference is not cosmetic.
 *
 * With `name`, it is a PROFILE: a photograph of a person, their village, how
 * long they have farmed, how many trees they hold and something they said.
 * Every one of those is an attribution, so every one of them has to be true of
 * the person in the photograph.
 *
 * Without `name`, it is a PHOTOGRAPH of a member at work and nothing more.
 * That is the shape the first three cards take: the files in them are real,
 * identifiable people, and the profiles this page ships with are invented
 * sample entries. A real face over an invented name, an invented tree count
 * and an invented quote is a false statement about someone who never agreed to
 * appear here at all.
 *
 * When the real interviews are collected, a card gains the identity fields and
 * becomes a profile again. Nothing else has to change.
 */
export interface MemberProfile {
  id: string;
  imageSlot: string;
  /** Says what the photograph shows. Never who. */
  caption?: string;
  name?: string;
  village?: string;
  years?: string;
  trees?: string;
  quote?: string;
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
  /**
   * The ownership band, moved here from About. It is the claim this page
   * exists to make — the farmers own the society — so it opens the page and
   * carries its `h1`.
   */
  ownership: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: { title: string; body: string }[];
    imageSlot: string;
    caption: string;
  };
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

export interface ContactForm {
  eyebrow: string;
  heading: string;
  lead: string;
  /**
   * The answers to "What is it about?", offered as choices to tap. The chosen
   * one is sent as the enquiry's topic. It replaced a free-text box that gave
   * no clue what a useful answer looked like.
   */
  topics: string[];
  /* No company or member-number fields: removed 2026-09-14 at the client's
     request — "totally unnecessary". */
  fields: { topic: string; name: string; email: string; phone: string; message: string };
  placeholders: { name: string; email: string; phone: string; message: string };
  /** Under the phone field: why someone would give it. */
  phoneHint: string;
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
  form: ContactForm;
  office: { heading: string; address: string[]; hours: { day: string; time: string }[]; registration: { label: string; value: string }[] };
}

/* ── The full dictionary ────────────────────────────────────────────────── */

/**
 * The gallery: photographs of the society itself.
 *
 * `items` is A WALK THROUGH THE FACTORY, in order — the gate, the notice
 * board, then cherry through pulping, washing, soaking and drying, then the
 * greenhouse and the people. That order is why the cards are numbered: the
 * numbers encode the sequence the coffee actually moves in, so a stranger
 * scrolling the page learns how the mill works. Reorder the array and the
 * numbering follows; it is never written down twice.
 *
 * A caption says what the picture SHOWS — never who is in it, and never a
 * claim the photograph does not support.
 */
/** One photograph on the gallery walk. */
export interface GalleryPhoto {
  imageSlot: string;
  /**
   * The photograph's OWN shape, as `width/height` of the file. The walk never
   * crops, so this — not the slot's registry ratio — sizes the frame.
   */
  ratio: string;
  /** Two or three words. The thing itself, not a sentence. */
  title: string;
  /** Shown in the viewer when the photograph is opened large. */
  caption: string;
}

/** One stop on the walk. The order of the array IS the route. */
export interface GalleryStop {
  /** Two digits, as painted on the route: '01'. */
  n: string;
  /** Anchor, `#stop-<id>`, and the key the route map watches. */
  id: string;
  /** The stop's name on the route map — short enough for a phone bar. */
  short: string;
  title: string;
  text: string;
  /**
   * opening — the page's first screen: the title beside the first photograph
   * split / split-flip — text beside one photograph, photograph right / left
   * full — one photograph across the whole column, text under it
   * pair — two photographs side by side at their own shapes
   */
  layout: 'opening' | 'split' | 'split-flip' | 'full' | 'pair';
  /** narrow: a smaller landscape photograph. tall: a portrait, kept from towering. */
  photoSize?: 'narrow' | 'tall';
  /** Stencil lettering set on the photograph's corner, as the society marks its walls. */
  tag?: string;
  /** Smaller photographs, for a quiet stop. */
  quiet?: boolean;
  /** A section word painted before this stop: THE MILL, THE BEDS. */
  act?: { name: string; note: string };
  photos: GalleryPhoto[];
}

export interface GalleryContent {
  meta: Meta;
  hero: {
    /** Stencilled above the title. */
    mark: string;
    title: string;
    /** The end of the title, set in italic. */
    titleEmphasis: string;
    lede: string;
    /** The button that starts the walk at stop 02. */
    start: string;
  };
  route: { label: string; title: string };
  stops: GalleryStop[];
  end: { title: string; back: string };
  viewer: {
    label: string;
    close: string;
    previous: string;
    next: string;
    /** 'Photo {{n}} / {{total}}' */
    count: string;
    /** 'View larger: {{title}}' */
    open: string;
  };
}

export interface Dictionary {
  common: Common;
  home: HomeContent;
  about: AboutContent;
  products: ProductsContent;
  farmers: FarmersContent;
  gallery: GalleryContent;
  contact: ContactContent;
}

/** Recursive Partial — the shape a translation-in-progress file may take. */
export type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
