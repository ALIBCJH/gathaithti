/** A hairline. One weight, one colour, used everywhere a division is needed. */
export function Rule({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <hr
      className={`border-0 h-px ${tone === 'dark' ? 'bg-parchment/20' : 'bg-line'} ${className}`}
    />
  );
}
