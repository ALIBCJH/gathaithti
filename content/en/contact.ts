import type { ContactContent } from '../types';

export const contact: ContactContent = {
  meta: {
    title: 'Contact Gathaithi Farmers’ Co-operative Society — Tetu, Nyeri',
    description:
      'Talk to Gathaithi Farmers’ Co-operative Society in Tetu, Nyeri — by WhatsApp, phone or email. Buyer enquiries, samples and member services.',
    ogLine: 'Buyers · Members · Suppliers — reach the society directly',
  },

  /* REBUILT 2026-09-14 so that sending a message is the easiest thing on the
     page. It used to open on a title, then "Talk to the society", then three
     contact rows, then a Buyers / Members / Suppliers explainer, and only
     then a seven-field form — about 1,500px down on a desktop and 2,900px on a
     phone. Now the page is one screen: the ways to reach the office on the
     left, the form beside them, and only four things to fill in. */
  hero: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    lead: 'Send the society office a message and we will reply within two working days — or reach us straight away on WhatsApp or by phone.',
  },

  /* Every number and address comes from content/site.ts; nothing here writes
     one down, so there is one place to change them. */
  direct: {
    heading: 'Reach us now',
    lead: 'Office hours are Monday to Saturday, 8:00 – 16:00.',
    whatsapp: {
      label: 'WhatsApp',
      note: 'Usually the fastest reply',
      prefill: 'Hello Gathaithi — I found you through the website.',
    },
    phone: { label: 'Call the office', note: 'Mon–Sat 8:00–16:00' },
    email: { label: 'Email', note: 'Replies within two working days' },
    memberLine: { label: 'Members’ line', note: 'Payments, statements and pre-finance' },
  },

  form: {
    eyebrow: 'Write to us',
    heading: 'Send a message',
    lead: 'Choose what it is about, add your details, and the office will get it to the right person.',
    topics: ['Buying coffee', 'Becoming a member', 'Member services', 'Something else'],
    fields: {
      topic: 'What is it about?',
      name: 'Your name',
      email: 'Your email',
      phone: 'Phone number (optional)',
      message: 'Your message',
    },
    placeholders: {
      name: 'Jane Wanjiku',
      email: 'you@example.com',
      phone: '+254 …',
      message: 'How can we help?',
    },
    phoneHint: 'Add it if you would like the office to call you back.',
    submit: 'Send message',
    consent: 'We use what you send only to answer you. We never sell or share it.',
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
      { day: 'Monday – Saturday', time: '8:00 – 16:00' },
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
