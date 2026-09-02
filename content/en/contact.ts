import type { ContactContent } from '../types';

export const contact: ContactContent = {
  meta: {
    title: 'Contact Gathaithi Farmers’ Co-operative Society — Tetu, Nyeri',
    description:
      'Contact the society directly: buyer enquiries and samples, member services, and supplier or partner enquiries. Gathaithi wet mill, Tetu Sub-County, Nyeri County, Kenya.',
    ogLine: 'Buyers · Members · Suppliers — reach the society directly',
  },

  hero: {
    eyebrow: 'Contact',
    title: 'Talk to the society directly',
    lead:
      /* Short on purpose. This sentence used to explain the three routes in
         full — the same three the section below states as three lines — and it
         filled the whole first screen of a phone, which pushed the WhatsApp
         button and the phone number under the fold on the one page whose job
         is to get somebody in touch. */
      'One office, next to the mill. WhatsApp is answered fastest.',
  },

  /* The three ways in, stated once. Every number and address on this page
     comes from content/site.ts — the page never writes one down itself, so
     there is one place to change when the society's details are confirmed. */
  direct: {
    heading: 'Talk to the society',
    lead: 'WhatsApp is answered fastest during office hours. Anything that needs a paper trail is better by email.',
    whatsapp: {
      label: 'WhatsApp',
      note: 'Fastest, office hours',
      prefill: 'Hello Gathaithi — I found you through the website.',
    },
    phone: { label: 'Call the office', note: 'Mon–Fri 8:00–17:00, Sat 8:00–13:00' },
    email: { label: 'Email the office', note: 'Answered within two working days' },
    memberLine: { label: 'Members’ line', note: 'Payments, statements and pre-finance' },
  },

  routes: [
    {
      id: 'buyers',
      label: 'Buyers',
      heading: 'Roasters, importers and green buyers',
      body: 'Samples, lot availability, cupping visits and direct-sale paperwork.',
      channel: 'whatsapp',
    },
    {
      id: 'members',
      label: 'Members',
      heading: 'Cherry payments and member services',
      body: 'Payments, statements, pre-finance, input credit and register updates. Bring your member number.',
      channel: 'phone',
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      heading: 'Suppliers, agronomy and institutions',
      body: 'Written proposals to the society office, addressed to the Society Manager.',
      channel: 'email',
    },
  ],

  form: {
    eyebrow: 'Write to us',
    heading: 'Send the society a message',
    lead:
      'For anything that does not need a phone call. Tell us who you are and what you need, and the message reaches the right desk in the office — buyers to marketing, members to member services, suppliers to administration.',
    note:
      'We answer during office hours, Monday to Saturday. Buyers asking for samples are usually better served by the sample request form, which collects the lot details we need up front.',
    writeToUs: 'Write to us instead',
    fields: {
      name: 'Your name',
      email: 'Email',
      phone: 'Phone',
      organisation: 'Company or organisation',
      topic: 'What is this about?',
      memberNumber: 'Member number',
      message: 'Your message',
    },
    placeholders: {
      name: 'Jane Wanjiku',
      email: 'you@example.com',
      phone: '+254 …',
      organisation: 'Roastery, importer, supplier — if it applies',
      message: 'Tell us what you need and we will get it to the right person.',
      /* The four options this field used to offer, kept as guidance now that
         it is typed rather than chosen. Without them the box gives no clue
         what a useful answer looks like. */
      topic: 'Buying coffee, membership, supplying us…',
    },
    memberHint: 'On your member card and your payment statement. It helps us find your record before we reply.',
    submit: 'Send message',
    consent:
      'We use what you send here to answer your enquiry and nothing else. We do not sell or share it.',
    successBody:
      'Thank you. Your message has reached the society office, and someone will reply during office hours — usually within two working days.',
    successAgain: 'Send another message',
  },

  office: {
    heading: 'The society office',
    address: [
      'Gathaithi Farmers’ Co-operative Society Ltd',
      'Gathaithi Wet Mill',
      'Gathaithi Village, Tetu Sub-County',
      'Nyeri County, Kenya',
    ],
    hours: [
      { day: 'Monday – Friday', time: '8:00 – 17:00' },
      { day: 'Saturday', time: '8:00 – 13:00' },
      { day: 'Sunday & public holidays', time: 'Closed' },
    ],
    registration: [
      { label: 'Registered name', value: 'Gathaithi Farmers’ Co-operative Society Ltd' },
      { label: 'Registration number', value: '{{registrationNumber}}' },
      { label: 'Registered', value: '{{independentSince}}' },
      { label: 'County', value: 'Nyeri County, Kenya' },
    ],
  },
};
