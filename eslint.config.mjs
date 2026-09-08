import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // The cPanel bundle. `npm run build:cpanel` writes minified JS into
    // dist-cpanel, and eslint linted it: 2,069 warnings and 11 errors about
    // `this` aliasing inside somebody else's minifier output, which failed
    // `npm run lint` and therefore `npm run check` on any machine that had
    // built the bundle. Gitignored is not the same as lint-ignored.
    "dist-cpanel/**",

    // Parked while a static export builds, and restored afterwards — but a
    // build interrupted mid-flight leaves them, and they are copies of files
    // already linted in place.
    ".api-parked/**",
    ".catchall-parked/**",
    ".proxy-parked.ts",
  ]),
]);

export default eslintConfig;
