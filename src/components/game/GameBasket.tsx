"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useGame } from "@/components/game/GameProvider";
import { Scorecard } from "@/components/game/Scorecard";

/**
 * Fixed bottom right, always visible while scrolling. Opens the scorecard.
 * Bumps on collect via a key change on the count, which restarts the CSS
 * animation, transform and opacity only.
 */
export function GameBasket() {
  const { collectedIds, attemptedIds, trueItemCount, basketOpen, toggleBasket, basketRef } =
    useGame();
  const reduceMotion = useReducedMotion();
  const count = collectedIds.size;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-8 sm:bottom-8">
      {basketOpen ? <Scorecard /> : null}

      <motion.button
        ref={basketRef}
        type="button"
        onClick={toggleBasket}
        aria-expanded={basketOpen}
        aria-label={`Basket, ${count} of ${trueItemCount} collected, ${attemptedIds.size} opened total. Show what you have found.`}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-dune bg-ink text-sand shadow-lg transition-colors hover:bg-coral sm:h-20 sm:w-20"
        key={count}
        initial={reduceMotion ? undefined : { scale: 1 }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <BasketIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-coral px-1.5 text-[0.75rem] font-semibold text-sand">
          {count}
        </span>
      </motion.button>
    </div>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 9h16l-1.6 9.6a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6L4 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 9V7a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
