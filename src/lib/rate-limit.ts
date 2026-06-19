const requestMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const current = requestMap.get(key);

  if (!current || current.resetAt <= now) {
    requestMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (current.count >= limit) {
    return { allowed: false };
  }

  current.count += 1;
  return { allowed: true };
}
