import type { ContactContent } from '../types';

export const contact: ContactContent = {
  meta: {
    title: 'Contact Gathaithi Farmers’ Co-operative Society | Tetu, Nyeri',
    description:
      'Contact Gathaithi Farmers’ Co-operative Society in Tetu, Nyeri, by WhatsApp, phone or email, for buyer enquiries, samples and member services.',
    ogLine: 'Buyers · Members · Suppliers: contact the society directly',
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
    lead: 'Send a message to the society office and we will reply within two working days, or contact us directly on WhatsApp or by phone.',
  },

  /* Every number and address comes from content/site.ts; nothing here writes
     one down, so there is one place to change them. */
  direct: {
    heading: 'Contact us directly',
    lead: 'Office hours are Monday to Saturday, 8:00 – 16:00.',
    whatsapp: {
      label: 'WhatsApp',
      note: 'Usually the quickest response',
      prefill: 'Hello Gathaithi, I am getting in touch through your website.',
    },
    phone: { label: 'Call the office', note: 'Mon–Sat 8:00–16:00' },
    email: { label: 'Email', note: 'Replies within two working days' },
    memberLine: { label: 'Members’ line', note: 'Payments, statements and pre-finance' },
  },

  form: {
    eyebrow: 'Write to us',
    heading: 'Send a message',
    lead: 'Choose a topic and add your details, and our office will pass your message to the right person.',
    topics: ['Buying coffee', 'Becoming a member', 'Member services', 'Something else'],
    fields: {
      topic: 'What is your message about?',
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
    phoneHint: 'Include your number if you would like us to call you back.',
    submit: 'Send message',
    consent: 'We use your details only to respond to your enquiry. We never sell or share them.',
    successBody:
      'Thank you. Your message has been received by the society office, and we will reply during office hours, usually within two working days.',
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
