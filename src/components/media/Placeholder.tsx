import type { ResolvedImage } from '@/lib/images';

/**
 * What stands in for a photograph that has not been taken yet.
 *
 * It is a designed object, not a broken image: a warm parchment field, a thin
 * ochre rule, the filename the photograph must have, its aspect ratio and
 * minimum size, and the art direction. The site can be shown on a projector
 * before a single frame exists and every empty slot reads as
 * “photograph goes here”.
 */
export function Placeholder({
  slot,
  tone = 'light',
  compact = false,
}: {
  slot: ResolvedImage;
  /** `dark` sits inside ink sections — the hero, the footer, the noticeboard. */
  tone?: 'light' | 'dark';
  /** Drops the art-direction note where the slot is physically small. */
  compact?: boolean;
}) {
  const dark = tone === 'dark';

  return (
    <div
      /* @container: the note is hidden when the SLOT is small, not when the
         window is — a 21:9 hero on a phone and a small card on a desktop have
         the same problem, and a viewport media query only catches one of them. */
      className={`@container relative h-full w-full overflow-hidden rounded-[inherit] ${dark ? 'bg-inverse' : 'bg-parchment-2'}`}
      role="img"
      aria-label={`Photograph to come: ${slot.alt}`}
    >
      {/* hairline frame, inset so it reads as a mount rather than a border */}
      <div
        /* The mount follows the frame's curve, one step tighter because it is
           inset by 8px inside a 12px corner. A square mount inside a rounded
           frame has its corners clipped and reads as a mistake. */
        className={`pointer-events-none absolute inset-2 rounded-[calc(var(--radius-photo)-0.5rem)] border ${dark ? 'border-on-inverse/25' : 'border-ochre/45'}`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-2" aria-hidden="true">
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map(
          (position) => (
            <span
              key={position}
              className={`absolute h-3 w-3 ${position} ${dark ? 'border-on-inverse/60' : 'border-ochre'}`}
            />
          ),
        )}
      </div>

      <div
        className={`relative flex h-full w-full flex-col justify-between gap-3 overflow-hidden ${compact ? 'p-4' : 'p-5 @[26rem]:p-6 @[34rem]:p-8'}`}
      >
        <p className={`t-meta ${dark ? 'text-ochre-on-inverse' : 'text-ochre-ink'}`}>Photograph to come</p>

        <div className="flex flex-col gap-2">
          <p
            className={`font-mono text-[0.75rem] leading-relaxed tracking-tight break-all ${dark ? 'text-on-inverse' : 'text-ink'}`}
          >
            {slot.file}
          </p>
          <p className={`t-meta tnum ${dark ? 'text-on-inverse/60' : 'text-ink-soft'}`}>
            {slot.ratio.replace('/', ' : ')} · min {slot.minWidth}×{slot.minHeight}
          </p>
          {!compact && (
            <p
              className={`t-body hidden max-w-[46ch] text-[0.875rem] leading-relaxed @[26rem]:line-clamp-4 @[26rem]:block @[34rem]:line-clamp-none ${dark ? 'text-on-inverse/70' : 'text-ink-soft'}`}
            >
              {slot.direction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
