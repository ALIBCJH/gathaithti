/**
 * A small fixed-window rate limiter for the sample-request form.
 *
 * It is intentionally in-memory: one process, no dependency, no Redis. On
 * Vercel each serverless instance keeps its own window, so this slows abuse
 * rather than eliminating it — which is the right trade for a form that
 * receives a handful of genuine requests a week. If the site ever needs
 * something stronger, replace the Map with Upstash or Vercel KV; the interface
 * below is all the route handler knows about.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

const MAX_ENTRIES = 5_000; // hard ceiling so a flood cannot grow the map forever

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit = 5, windowMs = 60 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (windows.size >= MAX_ENTRIES) {
      for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
      if (windows.size >= MAX_ENTRIES) windows.clear();
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  existing.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    ok: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds,
  };
}

/** Best-effort client identity behind Vercel's proxy. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
  return `sample-request:${ip}`;
}
