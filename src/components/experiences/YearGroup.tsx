"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { TimelineEntry } from "@/components/experiences/TimelineEntry";
import type { Experience } from "@/lib/types";

/**
 * A year, and everything that happened in it.
 *
 * Collapsible, and open by default. Open by default matters twice over: the
 * server rendered HTML contains every entry, so nothing depends on JavaScript
 * to be indexed, and a first time visitor sees the whole record rather than a
 * wall of closed drawers. Collapsing is for someone scanning twenty five
 * entries who wants to skip a year.
 *
 * The height animation only runs on click, never on scroll, so it can never
 * shift the page under a reader mid scroll.
 */
export function YearGroup({
  year,
  items,
  startIndex,
}: {
  year: number;
  items: Experience[];
  startIndex: number;
}) {
  const [open, setOpen] = useState(true);
  const reduceMotion = useReducedMotion();
  const panelId = `year-panel-${year}`;

  return (
    <section aria-labelledby={`year-${year}`} className="relative">
      <header className="relative pl-8 sm:pl-12 lg:pl-16">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink"
        />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-baseline gap-3 py-3 text-left"
        >
          <h2
            id={`year-${year}`}
            className="display-face text-[clamp(1.9rem,4.4vw,3.25rem)] leading-none tracking-tight text-ink transition-colors group-hover:text-coral"
          >
            {year}
          </h2>
          <span className="text-micro text-ink-faint">
            {items.length} {items.length === 1 ? "entry" : "entries"}
          </span>
          <span
            aria-hidden="true"
            className={`ml-auto text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "rotate-0" : "rotate-180"
            }`}
          >
            &#8593;
          </span>
        </button>
      </header>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key={panelId}
            id={panelId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {items.map((experience, index) => (
              <TimelineEntry
                key={experience.id}
                experience={experience}
                index={startIndex + index}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
