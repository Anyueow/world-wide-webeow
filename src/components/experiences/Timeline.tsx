"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { YearGroup } from "@/components/experiences/YearGroup";
import { YearRail } from "@/components/experiences/YearRail";
import type { Experience } from "@/lib/types";

/**
 * ===========================================================================
 * The timeline. This is the isolated module.
 * ===========================================================================
 *
 * It takes an array of Experience objects and renders the whole section. It
 * reads nothing global, imports no content, and holds no data of its own. Hand
 * it a longer array and it keeps working: the spine gets longer, the year rail
 * grows, the alternation continues.
 *
 * Structure under the motion:
 *
 *   nav      year rail, real anchors
 *   section  one per year, h2, collapsible
 *   article  one per entry, h3, all content present in the HTML
 *
 * Nothing is drawn to a canvas. Nothing is injected after paint. Turn
 * JavaScript off and the entire work history is still there and still readable.
 */
export function Timeline({ groups }: { groups: { year: number; items: Experience[] }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 75%"],
  });

  // Springing the progress keeps the coral fill from twitching on trackpads
  // that emit high frequency scroll events.
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  let runningIndex = 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[7rem_1fr] lg:gap-16">
      <YearRail years={groups.map((group) => group.year)} />

      <div ref={trackRef} className="relative">
        {/* The spine. A static hairline with a coral fill that tracks scroll. */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-px bg-dune"
        >
          <motion.div
            className="h-full w-full origin-top bg-coral"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: fill }}
          />
        </div>

        {groups.map((group) => {
          const startIndex = runningIndex;
          runningIndex += group.items.length;
          return (
            <YearGroup
              key={group.year}
              year={group.year}
              items={group.items}
              startIndex={startIndex}
            />
          );
        })}

        {/* The tail. Marks where the record starts rather than just stopping. */}
        <div className="relative pl-10 pt-6 pb-2 sm:pl-14 lg:pl-20">
          <span
            aria-hidden="true"
            className="absolute top-[1.9rem] left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-dune"
          />
          <p className="text-micro text-ink-faint">
            Start of the record
          </p>
        </div>
      </div>
    </div>
  );
}
