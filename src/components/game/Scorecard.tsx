"use client";

import { motion, useReducedMotion } from "framer-motion";
import { gameItems, trueItemCount } from "@/content/game-items";
import { useGame } from "@/components/game/GameProvider";

/**
 * Opens above the basket when it is clicked. Lists everything opened so far,
 * marked correct (a real item, collected) or incorrect (a decoy, caught), plus
 * a running score. This is where the reveal copy actually gets read, so it is
 * the most important screen in the game.
 *
 * A sheet on narrow viewports rather than a small hovering card, since hover
 * has no equivalent on touch and a card this size would otherwise cover the
 * page underneath it (T-G.8).
 */
export function Scorecard() {
  const { attemptedIds, collectedIds, closeBasket } = useGame();
  const reduceMotion = useReducedMotion();

  const attempted = gameItems.filter((item) => attemptedIds.has(item.id));
  const correctCount = collectedIds.size;
  const incorrectCount = attempted.length - correctCount;

  return (
    <motion.div
      role="dialog"
      aria-label="What you have found"
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex max-h-[70vh] w-[min(90vw,22rem)] flex-col overflow-hidden rounded-2xl border border-dune bg-sand shadow-xl sm:w-80"
    >
      <div className="flex items-center justify-between border-b border-dune px-5 py-4">
        <div>
          <p className="text-micro text-ocean-soft">Score</p>
          <p className="display-face text-[1.1rem] text-ink">
            {correctCount} of {trueItemCount} real, {incorrectCount} decoy
            {incorrectCount === 1 ? "" : "s"} caught
          </p>
        </div>
        <button
          type="button"
          onClick={closeBasket}
          aria-label="Close"
          className="rounded-full p-2 text-ink-soft transition-colors hover:text-coral"
        >
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>

      <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {attempted.length === 0 ? (
          <li className="text-[0.9rem] text-ink-faint">
            Nothing yet. Go click on something.
          </li>
        ) : (
          attempted.map((item) => (
            <li key={item.id} className="border-b border-dune pb-4 last:border-b-0">
              <p
                className={`text-micro ${
                  item.kind === "true" ? "text-ocean-soft" : "text-coral"
                }`}
              >
                {item.label} &middot; {item.kind === "true" ? "correct" : "incorrect"}
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">
                {item.reveal}
              </p>
            </li>
          ))
        )}
      </ul>
    </motion.div>
  );
}
