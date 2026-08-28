# Typography and colour, measured

Every text colour pair on the site with its real contrast ratio, calculated
with the WCAG 2.1 relative-luminance formula. Two pairs failed during the build
and were changed rather than waived; the notes below say which.

## Contrast

| Foreground | Background | Ratio | Needs | Pass | Used for |
| --- | --- | --- | --- | --- | --- |
| `--ink` #241611 | `--parchment` #FAF6EF | **16.27:1** | 4.5:1 | yes | Body text on the page |
| `--ink` #241611 | `--parchment2` #F1E9DC | **14.55:1** | 4.5:1 | yes | Body text, alternating sections |
| `--ink-soft` #574238 | `--parchment` #FAF6EF | **8.70:1** | 4.5:1 | yes | Secondary text |
| `--ink-soft` #574238 | `--parchment2` #F1E9DC | **7.78:1** | 4.5:1 | yes | Secondary text, alternating sections |
| `--ochre-ink` #9A4F1E | `--parchment` #FAF6EF | **5.55:1** | 4.5:1 | yes | Links, eyebrows, small labels |
| `--ochre-ink` #9A4F1E | `--parchment2` #F1E9DC | **4.96:1** | 4.5:1 | yes | Links on alternating sections |
| `--ochre` #B4622A | `--parchment` #FAF6EF | **4.13:1** | 3.0:1 | yes | Large display figures and rules only |
| `--parchment` #FAF6EF | `--ochre-ink` #9A4F1E | **5.55:1** | 4.5:1 | yes | Primary button, rest state |
| `--parchment` #FAF6EF | `--ochre-deep` #83411A | **7.12:1** | 4.5:1 | yes | Primary button, hover and pressed |
| `--parchment` #FAF6EF | `--ink` #241611 | **16.27:1** | 4.5:1 | yes | Text on dark sections |
| `--ochre-light` #E08A46 | `--ink` #241611 | **6.59:1** | 4.5:1 | yes | Accents and links on dark sections |
| `--ink` #241611 | `--ochre-light` #E08A46 | **6.59:1** | 4.5:1 | yes | Primary button on dark sections |
| `--parchment` #FAF6EF | `--moss` #56604C | **6.14:1** | 4.5:1 | yes | Text on the members’ moss surfaces |
| `--cherry` #9B2226 | `--parchment` #FAF6EF | **7.35:1** | 4.5:1 | yes | Emphasis and form errors |
| `--ochre` #B4622A | `--parchment` #FAF6EF | **4.13:1** | 3.0:1 | yes | Focus ring (non-text) |

### The two that failed, and what happened

**Ochre as body text.** `--ochre` #B4622A on parchment measures 4.13:1 — fine
for large display type and for rules, short of the 4.5:1 AA needs for body
copy. Links and small labels therefore use `--ochre-ink` #9A4F1E (5.55:1),
which is the same hue carried deeper. Ochre keeps the fills, the rules, the
focus ring and the big figures, where it is either large or non-text.

**Ochre as a button fill on dark.** Parchment on #B4622A is the same 4.13:1.
On ink sections the primary button is therefore `--ochre-light` #E08A46 with
ink type (6.59:1), which also gives the dark sections a brighter call to
action than the light ones — appropriate, since they are the two places the
page is asking for a decision.

Both were caught by measurement, not by eye. Lighthouse now reports 100 for
accessibility on all five pages.

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
