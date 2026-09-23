"use client";

import { useGame } from "@/components/game/GameProvider";
import { gameItems } from "@/content/game-items";

/**
 * The escape hatch. A recruiter with thirty seconds should not have to click
 * through the game to get the substance, and this also has to work with no
 * JavaScript at all, since the site is a static export.
 *
 * <details>/<summary> is a real native disclosure widget: it needs zero JS to
 * open and its content is in the initial server HTML. A saved opt-out removes
 * this game disclosure after hydration along with the other game UI.
 */
export function RevealAll() {
  const { gamePreference } = useGame();
  if (gamePreference === false) return null;

  return (
    <details className="mx-auto mt-6 max-w-[60ch] border-t border-dune pt-6">
      <summary className="text-micro cursor-pointer text-ocean-soft hover:text-coral">
        Skip the game, show me everything
      </summary>
      <ul className="mt-6 space-y-6">
        {gameItems.map((item) => (
          <li key={item.id}>
            <p className="text-micro text-coral">
              {item.label}
              {item.kind === "decoy" ? ", a lie" : ""}
            </p>
            <p className="text-lede mt-1 text-ink-soft">{item.reveal}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
