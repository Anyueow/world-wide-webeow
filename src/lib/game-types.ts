/**
 * Types for the collect-the-icons game.
 *
 * Kept separate from types.ts because the game is the site now, and this is the
 * contract another agent builds the board, basket and scorecard against.
 */

/**
 * A pixel icon, authored as data rather than as an image file.
 *
 * `grid` is 16 strings of 16 characters. Each character indexes into PALETTE.
 * "0" is transparent. Everything else is a hex digit, 1 through f.
 *
 * Why data and not SVG or PNG files: nothing extra to load, it scales to any
 * size without blurring, it recolours with the design tokens, and Ananya can
 * add an item by adding one row rather than opening a drawing tool.
 *
 * TO DRAW ONE: copy an existing grid, keep it 16 by 16, and read it as a
 * picture. Squint. If it does not read at 32px on a phone it is too detailed.
 */
export type PixelGrid = readonly string[];

/**
 * Palette indices. Keep this in sync with PALETTE in src/content/game-items.ts.
 * These are the Pacifica dusk tokens plus the few extras the icons need.
 */
export type PaletteIndex = string;

export type GameItem = {
  /** Stable, unique, URL safe. */
  id: string;
  /** What the thing is. Shown in the basket and the scorecard. */
  label: string;
  /**
   * True items are really her. Decoys are the joke, per her call: obvious,
   * not near-misses. Getting a decoy wrong should be funny, never a gotcha.
   */
  kind: "true" | "decoy";
  /**
   * The payoff. Why this symbol matters to her, or for a decoy, the joke about
   * why it is not her. This is the whole point of the game, so it is the most
   * important writing on the site. One or two sentences, her voice, no em dashes.
   */
  reveal: string;
  /**
   * Where this fact came from. Must map to a row in research/fact-ledger.md.
   * A game item with no source does not ship. This is the rule that exists
   * because the first content pass shipped facts it could not trace.
   */
  source: string;
  /** Accessible name for the button. Screen readers get this, not the picture. */
  alt: string;
  grid: PixelGrid;
};
