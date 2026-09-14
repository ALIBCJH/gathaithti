import { EmailMark, PhoneMark, WhatsAppMark } from '@/components/icons/Channels';

const icons = { whatsapp: WhatsAppMark, phone: PhoneMark, email: EmailMark };

/**
 * One way to reach the society, as a single thing to tap: an icon, what it is,
 * the number or address, and when it is answered. Used on Contact and at the
 * foot of Our Coffee, so the two cannot drift apart.
 *
 * A channel with no number in content/site.ts renders as plain text carrying
 * `missing`, never as a link — a dead tel: or wa.me link is worse than an
 * honest gap, because somebody acts on it.
 */
export function ChannelTile({
  kind,
  href,
  label,
  value,
  note,
  missing,
  primary = false,
}: {
  kind: keyof typeof icons;
  href: string;
  label: string;
  value: string;
  note?: string;
  missing?: string;
  primary?: boolean;
}) {
  const Icon = icons[kind];
  const tone = primary
    ? 'border-accent bg-accent text-on-accent hover:bg-accent-hover'
    : 'border-line bg-parchment text-ink hover:border-ink/35';
  const soft = primary ? 'opacity-85' : 'text-ink-soft';

  const body = (
    <>
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-full ${primary ? 'bg-on-accent/15' : 'bg-parchment-2 text-ochre-ink'}`}
      >
        <Icon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[1rem] font-medium leading-snug">{label}</span>
        <span className={`tnum truncate text-[0.875rem] ${soft}`}>{href ? value : missing}</span>
      </span>
      {note ? <span className={`hidden shrink-0 text-right text-[0.8125rem] sm:block ${soft}`}>{note}</span> : null}
      {href ? (
        <span
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 [transition-timing-function:var(--ease)] group-hover/tile:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  const shape = `group/tile flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-[background-color,border-color] duration-200 [transition-timing-function:var(--ease)] ${tone}`;

  if (!href) return <p className={`${shape} opacity-70`}>{body}</p>;
  return (
    <a
      href={href}
      className={`tap ${shape}`}
      {...(kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {body}
    </a>
  );
}
