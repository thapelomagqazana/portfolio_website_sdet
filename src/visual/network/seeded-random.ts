/**
 * Creates a stable unsigned integer hash from a seed string.
 */
function hashSeed(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

/**
 * Creates a deterministic pseudo-random generator.
 *
 * Same seed produces the same sequence.
 * Different seed produces a different sequence.
 */
export function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed.trim() || "default-seed");

  return () => {
    state += 0x6d2b79f5;

    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a deterministic decimal number between min and max.
 */
export function randomBetween(random: () => number, min: number, max: number): number {
  if (max < min) {
    return randomBetween(random, max, min);
  }

  return min + random() * (max - min);
}

/**
 * Returns a deterministic integer between min and max, inclusive.
 */
export function randomInteger(random: () => number, min: number, max: number): number {
  return Math.floor(randomBetween(random, min, max + 1));
}

/**
 * Picks one deterministic item from a non-empty readonly list.
 */
export function pickRandom<T>(random: () => number, values: readonly T[]): T {
  if (values.length === 0) {
    throw new Error("Cannot pick a random value from an empty array.");
  }

  return values[randomInteger(random, 0, values.length - 1)];
}
