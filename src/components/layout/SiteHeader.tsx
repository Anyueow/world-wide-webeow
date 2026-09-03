"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useState } from "react";
import { nav, site } from "@/content/site";

/**
 * Fixed header over a page that is sand in some places and deep ocean in
 * others.
 *
 * Two problems, two decisions.
 *
 * Colour: rather than tracking which section is underneath, the whole bar is
 * set in sand and composited with mix-blend-difference. Over sand the
 * difference is near zero, so the type reads as near black. Over the ocean
 * panel it inverts to near white. No scroll listener to fall out of sync with
 * the tide animation. Everything inside inherits currentColor for the same
 * reason.
 *
 * Collision: a fixed bar with no background will sit on top of body text at
 * some scroll position on every page. Rather than covering the page with a
 * scrim, the header gets out of the way. It retracts once you scroll down past
 * it and returns the moment you scroll up, which is when someone actually
 * wants navigation. Transform only, so it costs nothing.
 */
export function SiteHeader() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Always visible near the top, otherwise follow scroll direction.
    setHidden(current > 140 && current > previous);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-30 text-sand mix-blend-difference"
      animate={reduceMotion ? undefined : { y: hidden ? "-115%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="display-face text-[1.05rem] font-semibold tracking-tight whitespace-nowrap"
          aria-label={`${site.name}, home`}
        >
          <span className="sm:hidden" aria-hidden="true">
            AS
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-3.5 sm:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-[0.75rem] font-medium tracking-tight whitespace-nowrap opacity-70 transition-opacity hover:opacity-100 sm:text-[0.875rem]"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
