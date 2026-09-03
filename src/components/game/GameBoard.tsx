"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PixelIcon } from "@/components/game/PixelIcon";
import { gameItems, trueItemCount } from "@/content/game-items";
import { loadCollectedIds, saveCollectedIds } from "@/lib/game-storage";

/**
 * Small deterministic hash so each icon gets a stable tilt and offset from its
 * id. Not Math.random: that would render differently on the server and the
 * client and trip a hydration mismatch. Same id always gives the same tilt.
 */
function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return h;
}

function tiltFor(id: string): { rotate: number; translateY: number } {
  const h = hash(id);
  const rotate = ((h % 13) - 6) * 1.1; // roughly -6.6deg to 6.6deg
  const translateY = ((h >> 3) % 9) - 4; // roughly -4px to 4px
  return { rotate, translateY };
}

/**
 * The game board: click a pixel icon to collect it. Real items build the
 * collected count, decoys are the "lie" and reveal why they are a joke rather
 * than counting toward anything.
 *
 * This is T-G.3 only: the click-to-collect mechanic and the reveal itself.
 * The flying-to-a-basket animation (T-G.4) and the hovering scorecard (T-G.5)
 * are separate tasks and layer on top of this without changing this
 * component's contract (collected ids, in state, are all either needs).
 */
export function GameBoard() {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const liveRegionId = useId();

  const openItem = useMemo(
    () => gameItems.find((item) => item.id === openId) ?? null,
    [openId],
  );

  function handleClick(id: string, kind: "true" | "decoy") {
    setOpenId((current) => (current === id ? null : id));
    if (kind === "true") {
      setCollectedIds((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  }

  return (
    <div>
      <p className="text-micro text-ink-faint">
        {collectedIds.size} of {trueItemCount} collected
      </p>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-10 sm:gap-x-10">
        {gameItems.map((item) => {
          const collected = collectedIds.has(item.id);
          const isOpen = openId === item.id;
          const { rotate, translateY } = tiltFor(item.id);

          return (
            <li key={item.id} className="list-none">
              <button
                type="button"
                onClick={() => handleClick(item.id, item.kind)}
                aria-pressed={isOpen}
                aria-expanded={isOpen}
                aria-controls={isOpen ? liveRegionId : undefined}
                aria-label={`${item.alt}${collected ? ", collected" : ""}`}
                className={`group flex h-20 w-20 items-center justify-center rounded-xl border transition-[transform,opacity,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-24 sm:w-24 ${
                  isOpen
                    ? "border-coral bg-coral-wash"
                    : "border-dune bg-sand hover:border-ocean-soft"
                } ${collected ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
                style={
                  reduceMotion
                    ? undefined
                    : { transform: `rotate(${rotate}deg) translateY(${translateY}px)` }
                }
              >
                <PixelIcon grid={item.grid} className="h-12 w-12 sm:h-14 sm:w-14" />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id={liveRegionId}
        role="status"
        aria-live="polite"
        className="mt-8 min-h-24 max-w-[52ch] border-t border-dune pt-6"
      >
        {openItem ? (
          <>
            <p className="text-micro text-coral">
              {openItem.label}
              {openItem.kind === "decoy" ? ", nice try" : ""}
            </p>
            <p className="text-lede mt-2 text-ink-soft">{openItem.reveal}</p>
          </>
        ) : (
          <p className="text-[0.95rem] text-ink-faint">
            Click something. Some of it is really her, some of it is a lie.
          </p>
        )}
      </div>
    </div>
  );
}
