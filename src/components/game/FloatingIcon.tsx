"use client";

import { useReducedMotion } from "framer-motion";
import { PixelIcon } from "@/components/game/PixelIcon";
import { useGame } from "@/components/game/GameProvider";
import type { GameItem } from "@/lib/game-types";

/**
 * Small deterministic hash so each icon gets a stable position and tilt from
 * its id. Not Math.random: that would render differently on the server and
 * the client and trip a hydration mismatch. Same id always gives the same
 * spot.
 */
function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Scatters an item within its own quadrant of the section, so items placed in the same section do not stack on top of each other. */
function positionFor(id: string, quadrant: number, quadrantCount: number) {
  const h = hash(id);
  const rotate = ((h % 13) - 6) * 1.4; // roughly -8.4deg to 8.4deg
  const withinQuadrant = 8 + (h % 60); // 8 to 68, kept off the hard edges
  const quadrantWidth = 100 / quadrantCount;
  const left = quadrant * quadrantWidth + (withinQuadrant / 100) * quadrantWidth;
  const top = 10 + ((h >> 4) % 70); // 10 to 80, stays clear of section title and footer
  return { rotate, left, top };
}

/**
 * One collectible, absolutely positioned inside a `relative` section. Several
 * of these are scattered through different sections of the page (see
 * GameFloatingField) so the game reads as things sprinkled through the whole
 * document rather than confined to one board.
 */
export function FloatingIcon({
  item,
  quadrant,
  quadrantCount,
}: {
  item: GameItem;
  quadrant: number;
  quadrantCount: number;
}) {
  const { collectedIds, attemptedIds, collect } = useGame();
  const reduceMotion = useReducedMotion();
  const collected = collectedIds.has(item.id);
  const attempted = attemptedIds.has(item.id);
  const { rotate, left, top } = positionFor(item.id, quadrant, quadrantCount);

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        collect(item.id, item.kind, rect);
      }}
      aria-pressed={attempted}
      aria-label={`${item.alt}${collected ? ", collected" : ""}`}
      className={`absolute z-10 flex h-16 w-16 items-center justify-center rounded-xl border transition-[opacity,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-20 sm:w-20 ${
        attempted
          ? "border-dune bg-sand opacity-40"
          : "border-dune/70 bg-sand/90 opacity-95 hover:border-coral hover:opacity-100"
      }`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: reduceMotion ? undefined : `rotate(${rotate}deg)`,
      }}
      disabled={collected}
    >
      <PixelIcon grid={item.grid} className="h-10 w-10 sm:h-12 sm:w-12" />
    </button>
  );
}
