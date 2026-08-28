/**
 * Shared UI strings — navigation, buttons, footer, form messages.
 *
 * Anywhere you see {{factId}} in a string, the matching entry from
 * content/facts.ts is rendered in its place. Never type a number directly
 * into copy: add or edit it in facts.ts and reference it with {{...}}.
 */

import type { Common } from '../types';

export const common: Common = {
  brand: {
    name: 'Gathaithi Farmers’ Co‑operative Society',
    short: 'Gathaithi',
    tagline: 'Farmer-owned coffee from Tetu, Nyeri',
  },

  nav: {
    home: 'Home',
    about: 'About',
    products: 'Our Coffee',
    farmers: 'Our Farmers',
    contact: 'Contact',
  },

  actions: {
    requestSample: 'Request a sample',
    forMembers: 'For our members',
    readStory: 'Read our story',
    seeLots: 'See this season’s lots',
    allNotices: 'Open the noticeboard',
    menu: 'Menu',
    close: 'Close',
    skipToContent: 'Skip to content',
  },

  locale: {
    label: 'Language',
    en: 'English',
    sw: 'Kiswahili',
    pending:
      'The Kiswahili translation is being prepared by a translator. Pages not yet translated are shown in English.',
  },

  footer: {
    blurb:
      'Gathaithi Farmers’ Co‑operative Society Ltd is owned by the {{members}} smallholder farmers who grow its coffee. One wet mill, one village, one crop taken seriously.',
    sections: { explore: 'Explore', contact: 'Contact', members: 'Members' },
    registration: 'Registered co-operative society, Nyeri County, Kenya',
    rights: 'All rights reserved.',
    unverifiedNotice:
      'Figures on this site are drafts pending confirmation by the society.',
  },

  form: {
    required: 'Required',
    optional: 'Optional',
    sending: 'Sending…',
    errorTitle: 'That didn’t send',
    errorBody: 'Something went wrong at our end. Please try again, or email us directly.',
    successTitle: 'Request received',
    successBody:
      'Thank you. Our marketing office will be in touch, usually within two working days, with sample availability and despatch details.',
    successAgain: 'Send another request',
    invalidEmail: 'Enter an email address we can reply to.',
    tooShort: 'Please tell us a little more.',
    selectOne: 'Please choose one.',
  },
};
