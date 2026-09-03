import { SmartImage } from '@/components/media/SmartImage';
import type { MemberProfile } from '@content/types';

/**
 * One member card, in either of the two shapes `MemberProfile` allows.
 *
 * A card with a `name` is a profile and renders the identity block. A card
 * without one is a photograph of a member at work and renders its caption
 * instead — because the photographs the society has supplied are of real
 * people and the profiles the page ships with are invented. Nothing here
 * attributes a name, a figure or a sentence to a face unless the content file
 * actually carries it.
 */
export function MemberCard({
  member,
  yearsLabel,
  treesLabel,
}: {
  member: MemberProfile;
  yearsLabel: string;
  treesLabel: string;
}) {
  return (
    <article className="group/card flex h-full flex-col gap-6">
      <SmartImage slot={member.imageSlot} zoom />

      {member.name ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="t-body font-medium">{member.name}</h3>
            {member.village ? <p className="t-meta text-ink-soft">{member.village}</p> : null}
          </div>

          {member.years && member.trees ? (
            <dl className="flex gap-8 border-y border-line py-4">
              <div className="flex flex-col gap-1">
                <dt className="t-meta text-ink-soft">{yearsLabel}</dt>
                <dd className="t-figure-sm text-[1.5rem]">{member.years}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="t-meta text-ink-soft">{treesLabel}</dt>
                <dd className="t-figure-sm text-[1.5rem]">{member.trees}</dd>
              </div>
            </dl>
          ) : null}

          {member.quote ? (
            <blockquote className="t-body text-[0.9375rem] italic text-ink-soft">
              {member.quote}
            </blockquote>
          ) : null}
        </div>
      ) : member.caption ? (
        <p className="t-meta text-ink-soft">{member.caption}</p>
      ) : null}
    </article>
  );
}
