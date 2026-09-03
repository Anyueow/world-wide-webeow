/**
 * Persistence for the collect-the-icons game (T-G.9). Optional and best
 * effort: a returning visitor keeps their progress, a first time or
 * private-browsing visitor just starts at zero.
 *
 * Every call is wrapped in try/catch. localStorage can throw synchronously in
 * a handful of real situations (Safari private mode, storage quota, a
 * corporate policy blocking it), and a broken game is a worse outcome than a
 * game that forgets your progress.
 */

const STORAGE_KEY = "game-progress";

type StoredProgress = {
  /** True items actually collected. */
  collected: string[];
  /** Every item ever opened, true or decoy, for the scorecard's tally. */
  attempted: string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export function loadProgress(): StoredProgress {
  const empty: StoredProgress = { collected: [], attempted: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return empty;
    const collected = isStringArray(parsed.collected) ? parsed.collected : [];
    const attempted = isStringArray(parsed.attempted) ? parsed.attempted : [];
    return { collected, attempted };
  } catch {
    return empty;
  }
}

export function saveProgress(progress: StoredProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full, blocked, or unavailable. Progress just does not persist.
  }
}
