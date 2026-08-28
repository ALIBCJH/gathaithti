import { notFound } from 'next/navigation';

/**
 * Catches any unmatched path inside a locale so that a 404 still renders
 * inside the locale layout — header, footer, correct <html lang> and all.
 */
export default function CatchAll(): never {
  notFound();
}
