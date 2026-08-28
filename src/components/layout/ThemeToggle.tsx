'use client';

/**
 * Light / dark switch.
 *
 * Deliberately stateless. The theme is already on <html data-theme> before this
 * component exists — THEME_SCRIPT below sets it ahead of first paint — and this
 * button renders exactly the same markup whichever theme is active, with CSS
 * deciding which icon and which label are shown.
 *
 * That matters more than it looks. An earlier version read the theme and
 * rendered the matching icon, which meant the server (which cannot know the
 * reader's preference) and the client disagreed on any device set to dark.
 * React recovers from that by re-rendering the tree, and the re-render left the
 * header's hero observer holding a detached node — so the navigation bar stayed
 * transparent over a white page and effectively disappeared. Markup that does
 * not depend on the theme cannot mismatch.
 */
export function ThemeToggle({ surface = 'light' }: { surface?: 'light' | 'dark' }) {
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private browsing, storage disabled — the theme still applies to this page */
    }
  }

  const tone =
    surface === 'dark'
      ? 'border-on-inverse/25 text-on-inverse/75 hover:border-on-inverse/50 hover:text-on-inverse'
      : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-[color,border-color,background-color,transform] duration-200 [transition-timing-function:var(--ease)] active:scale-[0.94] ${tone}`}
    >
      {/* Only one of these is ever rendered to the accessibility tree, because
          the other is display:none — so the button's name is right in both
          themes without an attribute that could mismatch on hydration. */}
      <span className="sr-only theme-when-light">Switch to the dark theme</span>
      <span className="sr-only theme-when-dark">Switch to the light theme</span>

      {/* Sun and moon, drawn inline. An icon font for two glyphs would cost more
          than the rest of this component put together. */}
      <svg
        className="theme-when-light"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="3.1" />
        <path d="M8 1.2v1.4M8 13.4v1.4M14.8 8h-1.4M2.6 8H1.2M12.8 3.2l-1 1M4.2 11.8l-1 1M12.8 12.8l-1-1M4.2 4.2l-1-1" />
      </svg>

      <svg
        className="theme-when-dark"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M13.5 9.7A5.6 5.6 0 0 1 6.3 2.5a5.6 5.6 0 1 0 7.2 7.2Z" />
      </svg>
    </button>
  );
}

/**
 * Runs before the page paints: reads the saved choice, falls back to the
 * operating system, and stamps <html data-theme> so the very first frame is
 * already the right colour. Anything slower is a white flash on a dark device.
 *
 * It also keeps other tabs in step, which costs three lines and no React.
 */
export const THEME_SCRIPT = `(function(){
function set(t){document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}
try{
var s=localStorage.getItem('theme');
set(s==='dark'||s==='light'?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
window.addEventListener('storage',function(e){if(e.key==='theme'&&e.newValue)set(e.newValue);});
}catch(e){set('light');}
})();`;
