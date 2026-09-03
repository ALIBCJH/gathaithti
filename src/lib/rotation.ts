/**
 * How long any rotating set of images holds each frame, in milliseconds.
 *
 * One definition, imported by every slideshow on the site. There is only one
 * left — the home hero; the harvest slideshow went with its band. This stays a
 * shared constant anyway, because the reason it exists has not changed: the
 * hero and the harvest section started on 4s and 3s, decided separately, which
 * is how a site ends up with two numbers that were never meant to differ and
 * then drift further apart. A visitor reads the pace as a property of the
 * site, not of the section, so the second slideshow to be built takes this
 * value rather than picking its own.
 *
 * Seven seconds is long enough to look at a photograph and read its caption
 * without being hurried, which is what the shorter values were failing at.
 */
export const ROTATION_INTERVAL = 7000;
