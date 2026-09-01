/**
 * One line icon per route, for the mobile navigation drawer.
 *
 * Drawn rather than installed. Five icons do not justify an icon library —
 * the smallest of them ships more kilobytes than this whole file — and a
 * borrowed set would arrive with its own stroke weight, its own corner radius
 * and its own idea of a grid, none of which are this site's. These are set on
 * the same 24px grid at the same 1.5 stroke as the close control the drawer
 * already uses, so the icons and the cross look drawn by one hand.
 *
 * `currentColor` throughout: the row decides the colour, and the current page's
 * ochre carries into its icon without the icon knowing anything about it.
 */
const paths: Record<string, React.ReactNode> = {
  /* A roof. Home is the ridge the society sits on as much as a house. */
  home: (
    <>
      <path d="M3.5 10.4 12 3.75l8.5 6.65" />
      <path d="M5.75 9.2V19.5a.75.75 0 0 0 .75.75h11a.75.75 0 0 0 .75-.75V9.2" />
    </>
  ),

  /* The society office: a building with a lower wing, as it actually stands. */
  about: (
    <>
      <path d="M4.75 20.25V5.5a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 .75.75v14.75" />
      <path d="M13.25 11.25h5a.75.75 0 0 1 .75.75v8.25" />
      <path d="M3 20.25h18" />
      <path d="M7.5 8.5h3M7.5 12h3M7.5 15.5h3" />
    </>
  ),

  /* A coffee bean, centre crease and all. */
  products: (
    <>
      <ellipse cx="12" cy="12" rx="8.25" ry="5.25" transform="rotate(-42 12 12)" />
      <path d="M8.1 15.9c1.3-2.4 4-5.1 7.8-7.8" />
    </>
  ),

  /* Two figures. The society is 1,700 of them; two is the fewest that reads
     as more than one. */
  farmers: (
    <>
      <circle cx="9.25" cy="8.25" r="3.25" />
      <path d="M3.5 20.25c0-3.18 2.57-5.75 5.75-5.75s5.75 2.57 5.75 5.75" />
      <path d="M16.25 5.6a3.25 3.25 0 0 1 0 5.3" />
      <path d="M17.4 14.8a5.75 5.75 0 0 1 3.1 5.45" />
    </>
  ),

  /* An envelope. The contact page is a form, and this is what a form is. */
  contact: (
    <>
      <rect x="3" y="5.25" width="18" height="13.5" rx="1.5" />
      <path d="m3.9 6.6 8.1 5.9 8.1-5.9" />
    </>
  ),
};

export function NavIcon({ route, className = '' }: { route: string; className?: string }) {
  const path = paths[route];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}
