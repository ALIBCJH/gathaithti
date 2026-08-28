import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'quiet';
type Surface = 'light' | 'dark';

/**
 * Rest, hover, focus, active and disabled — all five, on every button.
 * The press response is a real scale change: the click should feel physical.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium ' +
  'transition-[background-color,color,border-color,transform,box-shadow] duration-200 ' +
  '[transition-timing-function:var(--ease)] active:scale-[0.985] ' +
  'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45';

const styles: Record<Surface, Record<Variant, string>> = {
  light: {
    primary:
      'bg-accent text-on-accent shadow-[0_1px_0_rgba(36,22,17,0.12)] hover:bg-accent-hover active:bg-accent-hover',
    secondary:
      'border border-ink/25 text-ink hover:border-ink/60 hover:bg-parchment-2 active:bg-line/60',
    quiet: 'text-ochre-ink hover:text-ink underline-offset-4 hover:underline',
  },
  dark: {
    /* On an inverse band the fill has to be the light ochre carrying dark
       type: parchment on #B4622A measures 4.1:1, under AA at this size. The
       type colour is `inverse`, which is dark in both themes — never `ink`,
       which flips to a light colour when the page does. */
    primary:
      'bg-ochre-light text-inverse hover:bg-on-inverse hover:text-inverse active:bg-on-inverse',
    secondary:
      'border border-on-inverse/35 text-on-inverse hover:border-on-inverse hover:bg-on-inverse/10 active:bg-on-inverse/15',
    quiet: 'text-ochre-light hover:text-on-inverse underline-offset-4 hover:underline',
  },
};

export function Button({
  href,
  children,
  variant = 'primary',
  surface = 'light',
  className = '',
  type,
  disabled,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  surface?: Surface;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classes = `${base} ${styles[surface][variant]} ${className}`;

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a className={classes} href={href} rel="noopener">
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type ?? 'button'} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
