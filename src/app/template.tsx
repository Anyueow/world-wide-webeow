"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Page transition. Runs on every navigation because Next remounts template.tsx
 * on route change.
 *
 * Deliberately restrained: the content lifts into place and a coral rule draws
 * across the top. No curtain, no fade from zero. Fading a page in from opacity
 * 0 delays largest contentful paint, and this site is judged on speed as well
 * as feel.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 h-px w-full origin-left bg-coral"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4, delay: 0.55 },
        }}
      />
      <motion.div
        initial={{ opacity: 0.4, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
