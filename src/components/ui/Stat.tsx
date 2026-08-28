import { getFact } from '@/lib/facts';
import { Fact, RichText } from './Fact';

/**
 * A statistic given the weight it deserves: the figure set as display type,
 * the label small and quiet beneath it. Numbers are tabular so a row of them
 * aligns on the decimal.
 */
export function Stat({
  id,
  caption,
  size = 'large',
  surface = 'light',
}: {
  id: string;
  caption?: string;
  size?: 'large' | 'small';
  surface?: 'light' | 'dark';
}) {
  const fact = getFact(id);
  if (!fact) return null;

  const labelTone = surface === 'dark' ? 'text-on-inverse/70' : 'text-ink-soft';
  const unitTone = surface === 'dark' ? 'text-ochre-light' : 'text-ochre-ink';

  return (
    <div className="flex flex-col gap-3">
      <p className={size === 'large' ? 't-figure' : 't-figure-sm'}>
        <Fact id={id} />
        {fact.unit ? (
          <span className={`block mt-3 t-meta ${unitTone}`}>{fact.unit}</span>
        ) : null}
      </p>
      <p className={`t-meta ${labelTone}`}>{fact.label}</p>
      {caption ? (
        <p className={`t-body text-[0.9375rem] ${labelTone} max-w-[26ch]`}>
          <RichText text={caption} />
        </p>
      ) : null}
    </div>
  );
}
