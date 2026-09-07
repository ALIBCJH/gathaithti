import { SmartImage } from '@/components/media/SmartImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import type { AboutContent } from '@content/types';

/**
 * The nine people on the management committee, as portraits.
 *
 * Buyers audit governance and members recognise faces, so this is the one
 * place on the site where the two audiences want exactly the same thing. It
 * is the whole of the governance band below the statement now: the three
 * cards that used to sit above it named these same people in prose, which was
 * the same information twice.
 *
 * Every card renders whether or not its photograph exists. Until the files
 * land, SmartImage draws the designed placeholder carrying the filename each
 * one needs — so the grid holds its exact final shape, the page never shifts
 * when the photographs arrive, and collecting them is a matter of dropping
 * nine correctly named files into /public/images and rebuilding.
 */
export function BoardGrid({ content }: { content: AboutContent['governance']['board'] }) {
  const anyPending = content.members.some((member) => member.pending);

  return (
    <div className="mt-24 lg:mt-32">
      <div className="mx-auto flex max-w-[52rem] flex-col items-center gap-6 text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h3 className="t-section max-w-[20ch] text-balance text-[clamp(1.5rem,2.4vw,2.25rem)]">
          {content.heading}
        </h3>
        <p className="t-body max-w-[56ch] text-ink-soft">{content.lead}</p>

        {/* Renders only while something is still a draft. Clear the `pending`
            flags in the content file and this disappears by itself, rather
            than being a note someone has to remember to delete. */}
        {anyPending ? (
          <p className="t-body max-w-[62ch] border-l-2 border-ochre bg-ochre/6 py-3 pl-4 text-left text-[0.9375rem] text-ink-soft">
            {content.pendingNote}
          </p>
        ) : null}
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:mt-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
        {content.members.map((member, i) => (
          <li key={member.id}>
            <Reveal delay={(i % 3) * 60}>
              <article className="group/card flex h-full flex-col gap-5">
                {/* `object-top`: the supplied portraits are full length with
                    the face in the upper third, and a centre crop takes the
                    top of the head off the tallest of them. Anchoring to the
                    top is what keeps nine faces in nine frames. */}
                <SmartImage slot={member.imageSlot} zoom imageClassName="object-top" />

                <div className="flex flex-col gap-1.5">
                  <h4 className="t-body font-medium leading-snug">
                    {member.name}
                    {member.pending ? (
                      <span className="t-meta ml-2 align-middle text-ochre-ink" title="Draft — not yet confirmed by the society">
                        Draft
                      </span>
                    ) : null}
                  </h4>
                  <p className="t-meta text-ink-soft">{member.role}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
