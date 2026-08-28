/**
 * KISWAHILI — shared UI strings.  Priority 1 for translation: this file is on
 * every page.  See ./README.md.  Nothing here is machine-translated.
 */
import type { Common, DeepPartial } from '../types';
import { todo } from './todo';

export const common: DeepPartial<Common> = {
  brand: {
    // Proper noun — the society's registered name stays as it is.
    name: 'Gathaithi Farmers’ Co-operative Society',
    short: 'Gathaithi',
    tagline: todo('Farmer-owned coffee from Tetu, Nyeri'),
  },

  nav: {
    home: todo('Home'),
    about: todo('About'),
    products: todo('Our Coffee'),
    farmers: todo('Our Farmers'),
    contact: todo('Contact'),
  },

  actions: {
    requestSample: todo('Request a sample'),
    forMembers: todo('For our members'),
    readStory: todo('Read our story'),
    seeLots: todo('See this season’s lots'),
    allNotices: todo('Open the noticeboard'),
    menu: todo('Menu'),
    close: todo('Close'),
    skipToContent: todo('Skip to content'),
  },

  locale: {
    label: todo('Language'),
    en: 'English',
    sw: 'Kiswahili',
    // Delete this string once the translation is complete — it is what shows
    // the "translation in progress" notice at the top of Kiswahili pages.
    pending: todo(
      'The Kiswahili translation is being prepared by a translator. Pages not yet translated are shown in English.',
    ),
  },

  footer: {
    blurb: todo(
      'Gathaithi Farmers’ Co-operative Society Ltd is owned by the {{members}} smallholder farmers who grow its coffee. One wet mill, one village, one crop taken seriously.',
    ),
    sections: {
      explore: todo('Explore'),
      contact: todo('Contact'),
      members: todo('Members'),
    },
    registration: todo('Registered co-operative society, Nyeri County, Kenya'),
    rights: todo('All rights reserved.'),
    unverifiedNotice: todo('Figures on this site are drafts pending confirmation by the society.'),
  },

  form: {
    required: todo('Required'),
    optional: todo('Optional'),
    sending: todo('Sending…'),
    errorTitle: todo('That didn’t send'),
    errorBody: todo('Something went wrong at our end. Please try again, or email us directly.'),
    successTitle: todo('Request received'),
    successBody: todo(
      'Thank you. Our marketing office will be in touch, usually within two working days, with sample availability and despatch details.',
    ),
    successAgain: todo('Send another request'),
    invalidEmail: todo('Enter an email address we can reply to.'),
    tooShort: todo('Please tell us a little more.'),
    selectOne: todo('Please choose one.'),
  },
};
