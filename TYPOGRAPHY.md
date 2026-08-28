# Typography and colour, measured

Every text colour pair on the site with its real contrast ratio, calculated
with the WCAG 2.1 relative-luminance formula. Two pairs failed during the build
and were changed rather than waived; the notes below say which.

## Contrast

The site has two themes. Light is white and black, as the client asked for;
dark is the society's own roasted-brown palette. Both are measured below with
the WCAG 2.1 relative-luminance formula — not estimated, and not eyeballed.

Three colour roles are kept apart so that themes are possible at all: the page
(`surface` / `text`), the deliberately dark bands that stay dark in both themes
(`inverse` / `on-inverse`), and the accent fill (`accent` / `on-accent`). A
colour that is text in one place and a background in another cannot be themed,
which is what forced the split.

### Light theme

| Foreground | Background | Ratio | Needs | Pass | Used for |
| --- | --- | --- | --- | --- | --- |
| `text` #000000 | `surface` #FFFFFF | **21.00:1** | 4.5:1 | yes | Body text on the page |
| `text` #000000 | `surface2` #F4F4F4 | **19.09:1** | 4.5:1 | yes | Body text, alternating sections |
| `text-soft` #3F3F3F | `surface` #FFFFFF | **10.53:1** | 4.5:1 | yes | Secondary text |
| `text-soft` #3F3F3F | `surface2` #F4F4F4 | **9.57:1** | 4.5:1 | yes | Secondary text, alternating sections |
| `ochre-text` #9A4F1E | `surface` #FFFFFF | **5.98:1** | 4.5:1 | yes | Links, eyebrows, small labels |
| `ochre-text` #9A4F1E | `surface2` #F4F4F4 | **5.44:1** | 4.5:1 | yes | Links on alternating sections |
| `on-accent` #FAF6EF | `accent` #9A4F1E | **5.55:1** | 4.5:1 | yes | Primary button, rest |
| `on-accent` #FAF6EF | `accent-hover` #83411A | **7.12:1** | 4.5:1 | yes | Primary button, hover and pressed |
| `cherry` #9B2226 | `surface` #FFFFFF | **7.92:1** | 4.5:1 | yes | Form errors and emphasis |
| `on-inverse` #FAF6EF | `inverse` #241611 | **16.27:1** | 4.5:1 | yes | Text on the dark bands |
| `ochre-light` #E08A46 | `inverse` #241611 | **6.59:1** | 4.5:1 | yes | Accents on the dark bands |
| `inverse` #241611 | `ochre-light` #E08A46 | **6.59:1** | 4.5:1 | yes | Button on a dark band |
| `on-inverse` #FAF6EF | `moss` #56604C | **6.14:1** | 4.5:1 | yes | Text on the members’ moss surfaces |
| `ochre` #B4622A | `surface` #FFFFFF | **4.45:1** | 3.0:1 | yes | Focus ring (non-text, needs 3:1) |

### Dark theme

| Foreground | Background | Ratio | Needs | Pass | Used for |
| --- | --- | --- | --- | --- | --- |
| `text` #FAF6EF | `surface` #241611 | **16.27:1** | 4.5:1 | yes | Body text on the page |
| `text` #FAF6EF | `surface2` #2E1E17 | **14.83:1** | 4.5:1 | yes | Body text, alternating sections |
| `text-soft` #C9BBAD | `surface` #241611 | **9.35:1** | 4.5:1 | yes | Secondary text |
| `text-soft` #C9BBAD | `surface2` #2E1E17 | **8.52:1** | 4.5:1 | yes | Secondary text, alternating sections |
| `ochre-text` #E08A46 | `surface` #241611 | **6.59:1** | 4.5:1 | yes | Links, eyebrows, small labels |
| `ochre-text` #E08A46 | `surface2` #2E1E17 | **6.01:1** | 4.5:1 | yes | Links on alternating sections |
| `on-accent` #241611 | `accent` #E08A46 | **6.59:1** | 4.5:1 | yes | Primary button, rest |
| `on-accent` #241611 | `accent-hover` #F0A468 | **8.53:1** | 4.5:1 | yes | Primary button, hover and pressed |
| `cherry` #E1666B | `surface` #241611 | **5.27:1** | 4.5:1 | yes | Form errors and emphasis |
| `on-inverse` #FAF6EF | `inverse` #16100C | **17.51:1** | 4.5:1 | yes | Text on the dark bands |
| `ochre-light` #E08A46 | `inverse` #16100C | **7.09:1** | 4.5:1 | yes | Accents on the dark bands |
| `inverse` #16100C | `ochre-light` #E08A46 | **7.09:1** | 4.5:1 | yes | Button on a dark band |
| `on-inverse` #FAF6EF | `moss` #56604C | **6.14:1** | 4.5:1 | yes | Text on the members’ moss surfaces |
| `ochre` #B4622A | `surface` #241611 | **3.94:1** | 3.0:1 | yes | Focus ring (non-text, needs 3:1) |

Every pair passes. The rendered pages were also swept element by element in a
real browser, in both themes, comparing each text node against its composited
background — the only thing that came up was a false positive on the
transparent header sitting over the hero photograph, which the sweep cannot see
behind.

### The two that failed during the original build, and what happened

**Ochre as body text.** `#B4622A` on parchment measured 4.13:1 — fine for large
display type and rules, short of the 4.5:1 AA needs for body copy. Ochre as
text is therefore `--ochre-text`, which is `#9A4F1E` on light and `#E08A46` on
dark. Ochre keeps the fills, the rules and the focus ring, where it is either
large or not text at all.

**Ochre as a button fill on dark.** Parchment on `#B4622A` is the same 4.13:1.
Buttons now use the themed `accent` / `on-accent` pair, which inverts with the
theme: dark ochre with light type on white, light ochre with dark type on brown.

## Type scale

Fluid throughout, `clamp()` rather than breakpoints, so type is never
mid-jump at an awkward width.

| Role | Size | Line height | Tracking | Face |
| --- | --- | --- | --- | --- |
| Hero | `clamp(3rem, 8vw, 6.75rem)` | 0.95 | −0.03em | Fraunces 600 |
| Page title | `clamp(2.5rem, 5vw, 4.5rem)` | 1.0 | −0.02em | Fraunces 600 |
| Section head | `clamp(1.75rem, 3vw, 2.75rem)` | 1.1 | −0.015em | Fraunces 600 |
| Large figure | `clamp(3rem, 7vw, 5.5rem)` | 0.9 | −0.035em | Fraunces 600, tabular |
| Quiet statement | fluid, per use | — | −0.01em | Fraunces 400 |
| Lead | `clamp(1.25rem, 2vw, 1.5rem)` | 1.55 | — | Inter 400 |
| Body | 1.0625rem | 1.7 | — | Inter 400 |
| Small / meta | 0.8125rem | 1.5 | 0.12em, uppercase | Inter 500 |

Measure is capped at 68ch. Headings use `text-wrap: balance`, body copy uses
`text-wrap: pretty`. Every figure, price and time is set in tabular numerals so
columns of numbers align. Ranges take en dashes (16–26 °C), units are joined to
their number with a non-breaking space (1,720 m, KSh 126), and quotation marks
are real ones.

Fraunces is loaded with the optical-size axis only. SOFT and WONK are lovely
and this design never moves them off their defaults, so they were dropped —
worth about 40 kB on a font that sits in the critical path of the largest
contentful paint on every page.

## Spacing

An 8px scale, without exception: 8, 16, 24, 32, 48, 64, 80, 96, 128, 160, 192.
Section padding is deliberately generous on desktop (`py-20` to `py-48`) — the
single most reliable difference between a site that looks considered and one
that looks cheap is how much room it leaves around the things that matter.

## Motion

One easing curve everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`.
200ms for hover, focus and press. 500ms for entrances, staggered 60ms across
siblings. Entrances fire once, via a single IntersectionObserver, and never
re-run on scroll back. All of it is disabled under `prefers-reduced-motion`,
and the photograph treatment and card zoom are also dropped under
`prefers-reduced-data`.
