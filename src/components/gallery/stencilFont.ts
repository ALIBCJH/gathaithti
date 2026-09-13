import { Big_Shoulders_Stencil } from 'next/font/google';

/**
 * The gallery walk's stencil face — stop numbers, the route, the painted act
 * words. It stands for the lettering the society sprays on its own walls:
 * "KCSAP/CGN/GATHAITHI FCS-SOAKING" on the tank, the same on the drier and the
 * greenhouse.
 *
 * Loaded HERE, not in the root layout, so only the gallery page downloads it.
 * Self-hosted by next/font at build time like Fraunces and Inter, so the static
 * cPanel export does not depend on Google at runtime.
 */
export const stencil = Big_Shoulders_Stencil({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-stencil',
});
