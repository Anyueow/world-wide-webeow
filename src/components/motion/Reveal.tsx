"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds. Use small values, 0.06 to 0.2, for stagger inside a group. */
  delay?: number;
  /** Distance travelled, in pixels. */
  distance?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * The site's one reveal primitive. Everything below the fold uses this so the
 * motion vocabulary stays consistent instead of every section inventing its own.
 *
 * Content is always in the DOM. This animates opacity and transform only, which
 * keeps it off the main thread and out of layout. Under prefers-reduced-motion
 * it renders a plain element with no animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  direction = "up",
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "left"
        ? { x: -distance }
        : { x: distance };

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
