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
      'Three routes in, depending on who you are. Buyers reach the marketing office, members reach member services, and suppliers reach administration. All of them are in the same building next to the mill.',
  },

  routes: [
    {
      id: 'buyers',
      eyebrow: 'For buyers',
      heading: 'Roasters, importers and green buyers',
      body:
        'Sample requests, lot availability, cupping visits and direct-sale paperwork. If you are cupping Gathaithi under a roaster’s label and want to source it from the society itself, this is the way in.',
      person: { name: 'To be confirmed', role: 'Marketing & Sales' },
      rows: [
        { label: 'Best route', value: 'Request a sample', href: 'products#request-a-sample' },
        { label: 'Email', value: '{{buyerEmail}}' },
        { label: 'Response time', value: 'Within two working days' },
        { label: 'Mill visits', value: 'Welcome during harvest, by arrangement' },
      ],
    },
    {
      id: 'members',
      eyebrow: 'For members',
      heading: 'Member services',
      body:
        'Cherry payments, statements, pre-finance applications, input credit and register updates. Come to the office with your member number, or call the member line during office hours.',
      rows: [
        { label: 'Member line', value: '{{memberLine}}' },
        { label: 'Office hours', value: 'Monday – Friday, 8:00 – 17:00' },
        { label: 'Saturday', value: '8:00 – 13:00' },
        { label: 'Noticeboard', value: 'Cherry price & payment dates', href: 'farmers#noticeboard' },
      ],
    },
    {
      id: 'suppliers',
      eyebrow: 'For suppliers and partners',
      heading: 'Suppliers, agronomy and institutions',
      body:
        'Input suppliers, transporters, dry mills, agronomy partners, county and sector bodies. Written proposals to the society office, addressed to the Society Manager.',
      rows: [
        { label: 'Office email', value: '{{officeEmail}}' },
        { label: 'Office phone', value: '{{officePhone}}' },
        { label: 'Address to', value: 'The Society Manager' },
      ],
    },
  ],

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
    mapLabel: 'Map of Gathaithi, Tetu Sub-County, Nyeri County',
    directions: 'Open the location in maps',
  },
};
