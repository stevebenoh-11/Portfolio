// Sliding-window rate limiter, in-memory per server instance.
// On serverless each instance keeps its own counters, which still blunts
// bursts from a single client hammering one warm instance.

const buckets = new Map<string, number[]>();
let lastSweep = Date.now();
const SWEEP_INTERVAL_MS = 10 * 60 * 1000;
const MAX_WINDOW_MS = 60 * 60 * 1000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    const fresh = hits.filter((t) => now - t < MAX_WINDOW_MS);
    if (fresh.length === 0) buckets.delete(key);
    else buckets.set(key, fresh);
  }
}

/** Returns true when the call is allowed, false when the limit is exceeded. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);

  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
