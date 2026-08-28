import { SmartImage } from '@/components/media/SmartImage';
import type { MemberProfile } from '@content/types';

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

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="t-body font-medium">{member.name}</h3>
          <p className="t-meta text-ink-soft">{member.village}</p>
        </div>

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

        <blockquote className="t-body text-[0.9375rem] italic text-ink-soft">
          {member.quote}
        </blockquote>
      </div>
    </article>
  );
}
