export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-inverse focus:px-6 focus:py-3 focus:text-on-inverse"
    >
      {label}
    </a>
  );
}
