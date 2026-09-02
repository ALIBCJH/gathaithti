import { getFact, segments } from '@/lib/facts';

const MARK = process.env.NEXT_PUBLIC_SHOW_UNVERIFIED === '1' ? 'on' : 'off';

/**
 * The only way a number reaches the page.
 *
 * Every figure carries data-fact and data-verified into the DOM, so unverified
 * statistics can be found with one query in the console:
 *
 *     document.querySelectorAll('[data-verified="false"]')
 *
 * and seen on screen with NEXT_PUBLIC_SHOW_UNVERIFIED=1.
 */
export function Fact({
  id,
  className = '',
  display,
}: {
  id: string;
  className?: string;
  /**
   * Render this instead of the fact's own `display`, keeping every data
   * attribute intact. For a place that needs the figure set differently —
   * "#2" on a poster where a sentence elsewhere needs the word "Second" —
   * without forking the fact and giving the audit two numbers to reconcile.
   */
  display?: string;
}) {
  const fact = getFact(id);

  if (!fact) {
    // Loud on purpose: a mistyped id must not render as an empty space.
    return (
      <span className="text-cherry" title={`Unknown fact id: ${id}`}>
        {`{{${id}}}`}
      </span>
    );
  }

  return (
    <span
      className={`tnum ${className}`}
      data-fact={fact.id}
      data-verified={fact.verified}
      data-mark={MARK}
      title={MARK === 'on' && !fact.verified ? `Unverified — ${fact.note ?? ''}` : undefined}
    >
      {display ?? fact.display}
    </span>
  );
}

/**
 * Renders a copy string, resolving any {{tokens}} inside it through <Fact />.
 * Content files never contain numbers; this is what puts them back in.
 */
export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = segments(text);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'text') return <span key={i}>{part.value}</span>;
        if (part.type === 'contact') return <span key={i}>{part.value}</span>;
        if (part.type === 'unknown')
          return (
            <span key={i} className="text-cherry" title="Unknown token">
              {part.value}
            </span>
          );
        return <Fact key={i} id={part.fact.id} className={className} />;
      })}
    </>
  );
}

/** A paragraph of copy with tokens resolved. */
export function RichParagraph({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={className}>
      <RichText text={text} />
    </p>
  );
}
