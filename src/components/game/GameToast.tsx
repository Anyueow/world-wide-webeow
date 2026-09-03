"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { itemById, useGame } from "@/components/game/GameProvider";

/**
 * Fixed banner near the bottom of the viewport showing the reveal text for
 * whatever was just clicked. Icons are scattered across the whole page (see
 * FloatingIcon), so there is no longer one boxed section to show this text
 * inline in. One shared toast instead of a panel per icon.
 */
export function GameToast() {
  const { lastOpenedId } = useGame();
  const reduceMotion = useReducedMotion();
  const item = lastOpenedId ? itemById(lastOpenedId) : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-40 flex justify-center sm:inset-x-auto sm:right-28 sm:left-6 sm:justify-start"
    >
      <AnimatePresence mode="wait">
        {item ? (
          <motion.div
            key={item.id}
            initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[36ch] rounded-xl border border-dune bg-sand/95 px-5 py-4 shadow-lg backdrop-blur"
          >
            <p className="text-micro text-coral">
              {item.label}
              {item.kind === "decoy" ? ", nice try" : ""}
            </p>
            <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">
              {item.reveal}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
