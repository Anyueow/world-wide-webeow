"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

/**
 * DRAFT COPY. The Pacifica metaphor, four beats.
 */
const lines = [
  "If I were a place, I would be Pacifica.",
  "You go for the beach. It looks great. It is great.",
  "Then you get in, and the water is cold enough to take the air out of you, the current has an opinion, and it turns out the whole thing is serious.",
  "Both halves are true at the same time. That is the part people miss.",
];

function Passage({
  tone,
  ariaHidden = false,
}: {
  tone: "ink" | "sand";
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden || undefined} className="py-24 sm:py-32">
      <Container width="default">
        <p
          className={`text-micro ${tone === "sand" ? "text-ocean-soft" : "text-ocean-soft"}`}
        >
          Personality, as a place
        </p>
        <div className="mt-8 space-y-6">
          {lines.map((line, index) => (
            <p
              key={line}
              className={`display-face max-w-[24ch] text-balance ${
                index === 0
                  ? "text-display"
                  : "text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.25] max-w-[34ch]"
              } ${tone === "sand" ? "text-sand" : "text-ink"}`}
            >
              {line}
            </p>
          ))}
        </div>
      </Container>
    </div>
  );
}

/**
 * The tide comes in as you scroll.
 *
 * Two identical copies of the passage sit on top of each other, one in ink on
 * sand and one in sand on deep ocean. The ocean copy is clipped from the bottom
 * and the clip retreats as the section scrolls, so the water rises up through
 * the words and swallows them.
 *
 * Only clip-path animates, which is compositor cheap, and the duplicate is
 * aria-hidden so the passage is announced and indexed exactly once.
 */
export function PacificaTide() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const inset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% 0% 0% 0%)`;

  if (reduceMotion) {
    return (
      <section
        ref={ref}
        aria-labelledby="pacifica-heading"
        className="relative bg-ocean-deep"
      >
        <h2 id="pacifica-heading" className="sr-only">
          Pacifica
        </h2>
        <Passage tone="sand" />
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="pacifica-heading" className="relative isolate">
      <h2 id="pacifica-heading" className="sr-only">
        Pacifica
      </h2>

      <Passage tone="ink" />

      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 bg-ocean-deep"
      >
        <Passage tone="sand" ariaHidden />
      </motion.div>
    </section>
  );
}
