/**
 * Where the two enquiry forms post.
 *
 * On Vercel these are Next route handlers. On cPanel there is no Node process,
 * so the same forms post to a PHP file that does the same work — see
 * deploy/enquiry.php. The build sets NEXT_PUBLIC_ENQUIRY_ENDPOINT; nothing in
 * a component knows which host it is running on.
 *
 * NEXT_PUBLIC_ is not decoration: this value is read in the browser, so it has
 * to be inlined at build time. Anything else is `undefined` in a client
 * component and the form posts to "undefined".
 */
const configured = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();

/* On cPanel BOTH forms post to the one PHP file, so the form names itself in
   the query string. The two payloads differ (`pack` against `topic`) and the
   handler could sniff that, but a request that says what it is beats a
   handler that guesses — particularly when the guess decides which subject
   line and which mailbox an enquiry lands in. */

/** The Our Coffee pack enquiry. */
export const SAMPLE_ENDPOINT = configured ? `${configured}?form=sample` : '/api/sample-request';

/** The general enquiry on Contact. */
export const CONTACT_ENDPOINT = configured ? `${configured}?form=contact` : '/api/contact';
