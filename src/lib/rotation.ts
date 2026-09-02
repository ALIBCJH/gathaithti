/**
 * How long any rotating set of images holds each frame, in milliseconds.
 *
 * One definition, imported by every slideshow on the site. The hero and the
 * harvest section started with 4s and 3s respectively, decided separately,
 * which is how a site ends up with two numbers that were never meant to be
 * different and then drift further apart. A visitor moving between pages reads
 * the pace as a property of the site, not of the section.
 *
 * Seven seconds is long enough to look at a photograph and read its caption
 * without being hurried, which is what the shorter values were failing at.
 */
export const ROTATION_INTERVAL = 7000;
