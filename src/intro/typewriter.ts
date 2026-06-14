/**
 * Clamps progress between 0 and 1.
 */
function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(Math.max(progress, 0), 1);
}

/**
 * Returns a typewriter-style substring based on normalized progress.
 */
export function getTypewriterText(text: string, progress: number): string {
  if (text.length === 0) {
    return "";
  }

  const safeProgress = clampProgress(progress);
  const visibleCharacterCount = Math.floor(text.length * safeProgress);

  return text.slice(0, visibleCharacterCount);
}
