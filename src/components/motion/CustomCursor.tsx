"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * A single coral ring that trails the pointer and swells over anything
 * interactive. It does not replace the system cursor, it sits behind it, so
 * nothing about clicking or text selection changes.
 *
 * Touch and coarse pointer devices never see it: `.custom-cursor-root` is
 * display:none under `(pointer: coarse)` in globals.css. That is handled in CSS
 * rather than JavaScript so there is no state to set on mount and no chance of
 * a hydration mismatch. Reduced motion drops the component entirely.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as Element | null;
      setHot(Boolean(target?.closest("a, button, [data-cursor-hot]")));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor-root pointer-events-none fixed top-0 left-0 z-50 mix-blend-multiply"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full border border-coral"
        animate={{
          width: hot ? 44 : 18,
          height: hot ? 44 : 18,
          x: hot ? -22 : -9,
          y: hot ? -22 : -9,
          backgroundColor: hot ? "rgba(194, 80, 47, 0.12)" : "rgba(194, 80, 47, 0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
