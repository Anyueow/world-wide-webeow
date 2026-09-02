"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useEffect, type ElementType, type ReactNode } from "react";

type Axes = { soft: number; wonk: number; wght: number; opsz: number };

type VariableTextProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Fraunces axis values the text starts at. */
  from?: Axes;
  /** Fraunces axis values it settles on, and toggles to on hover. */
  to?: Axes;
  /** Seconds before the entrance animation starts. */
  delay?: number;
  /** Re-run the axis animation on pointer enter. */
  hoverable?: boolean;
};

const REST: Axes = { soft: 0, wonk: 0, wght: 400, opsz: 96 };
const WONKY: Axes = { soft: 70, wonk: 1, wght: 500, opsz: 144 };

function settle(axes: Axes) {
  return `"SOFT" ${axes.soft}, "WONK" ${axes.wonk}, "opsz" ${axes.opsz}, "wght" ${axes.wght}`;
}

/**
 * Animates Fraunces' variable axes rather than position or opacity.
 *
 * This is the site's signature move. SOFT rounds the terminals and WONK
 * unbends the serifs, so the type physically loosens up as you arrive on the
 * page. It is text the whole time: real characters, real font, selectable,
 * crawlable, and it never moves in layout, so it cannot cause a shift or delay
 * largest contentful paint.
 *
 * If JavaScript never runs, the text renders at the `from` axes, which is plain
 * Fraunces. Nothing is hidden waiting on an animation.
 */
export function VariableText({
  children,
  className,
  as = "span",
  from = REST,
  to = WONKY,
  delay = 0,
  hoverable = true,
}: VariableTextProps) {
  const reduceMotion = useReducedMotion();

  const soft = useMotionValue(from.soft);
  const wonk = useMotionValue(from.wonk);
  const wght = useMotionValue(from.wght);
  const opsz = useMotionValue(from.opsz);

  const settings = useMotionTemplate`"SOFT" ${soft}, "WONK" ${wonk}, "opsz" ${opsz}, "wght" ${wght}`;

  useEffect(() => {
    if (reduceMotion) return;

    const options = { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] as const };
    const runs = [
      animate(soft, to.soft, options),
      animate(wonk, to.wonk, options),
      animate(wght, to.wght, options),
      animate(opsz, to.opsz, options),
    ];

    return () => runs.forEach((run) => run.stop());
  }, [reduceMotion, delay, to.soft, to.wonk, to.wght, to.opsz, soft, wonk, wght, opsz]);

  // Reduced motion gets the settled state immediately, with no animation and
  // no motion component at all.
  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={{ fontVariationSettings: settle(to) }}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as as "span"];

  const wobble = () => {
    if (!hoverable) return;
    const bump = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
    animate(wonk, wonk.get() > 0.5 ? 0 : 1, bump);
    animate(soft, soft.get() > 35 ? 0 : 100, bump);
  };

  return (
    <MotionTag
      className={className}
      style={{ fontVariationSettings: settings }}
      onPointerEnter={wobble}
    >
      {children}
    </MotionTag>
  );
}
