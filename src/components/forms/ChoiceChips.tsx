/**
 * A question answered by tapping one of a few choices — "What is it about?",
 * "Which size?". A native radio group drawn as pills: the arrow keys move
 * between choices, a screen reader announces a group with its question, and
 * the chosen value is submitted with the form like any other field.
 *
 * Controlled: the form owns the value, so another part of the page (the size
 * picker on Our Coffee) can set it.
 */
export function ChoiceChips({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col" aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-3 text-[0.9375rem] font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          const id = `${name}-choice-${i}`;
          return (
            <div key={option.value || 'none'}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-parchment px-4 py-2 text-[0.9375rem] text-ink transition-[border-color,background-color,color] duration-200 [transition-timing-function:var(--ease)] hover:border-ink/35 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ochre"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      <p id={`${name}-error`} aria-live="polite" className="mt-2 min-h-[1.25rem] text-[0.8125rem] text-cherry">
        {error}
      </p>
    </fieldset>
  );
}
