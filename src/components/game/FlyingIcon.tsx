"use client";

import { motion, useReducedMotion } from "framer-motion";
import { itemById, useGame } from "@/components/game/GameProvider";
import { PixelIcon } from "@/components/game/PixelIcon";

/**
 * The collected icon's flight from where it was clicked into the basket.
 * Transform and opacity only, per the site's scroll/motion rule. Renders
 * nothing under prefers-reduced-motion: the basket count still updates
 * instantly in GameProvider, this is purely the cosmetic flourish on top.
 */
export function FlyingIcon() {
  const { flight, clearFlight, basketRef } = useGame();
  const reduceMotion = useReducedMotion();

  if (!flight || reduceMotion) return null;

  const item = itemById(flight.itemId);
  if (!item) return null;

  const basketRect = basketRef.current?.getBoundingClientRect();
  if (!basketRect) return null;

  const from = flight.fromRect;
  const toX = basketRect.left + basketRect.width / 2 - (from.left + from.width / 2);
  const toY = basketRect.top + basketRect.height / 2 - (from.top + from.height / 2);

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{ left: from.left, top: from.top, width: from.width, height: from.height }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: toX, y: toY, opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}
      onAnimationComplete={clearFlight}
    >
      <PixelIcon grid={item.grid} className="h-full w-full" />
    </motion.div>
  );
}
