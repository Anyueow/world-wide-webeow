"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VariableText } from "@/components/motion/VariableText";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/**
 * The hero.
 *
 * The caricature is line art on white, so mix-blend-multiply drops the white
 * out against the sand background with no image editing and no transparency
 * work. It sits behind the wordmark and drifts on scroll.
 *
 * The h1 is a single real heading. It is not split into per letter spans, it
 * does not fade in from zero, and it does not move in layout. All of that is
 * deliberate: it is the largest contentful paint element and the first thing a
 * crawler reads.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40">
      {/* Caricature. Sits behind the type on large screens. */}
      <motion.div
        style={reduceMotion ? undefined : { y: portraitY, opacity: portraitOpacity }}
        className="pointer-events-none absolute right-0 bottom-0 -z-10 hidden w-[38vw] max-w-[34rem] lg:block"
      >
        <div className="relative aspect-855/941 w-full">
          <Image
            src="/images/ananya-caricature.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="42vw"
            className="object-contain"
          />
        </div>
      </motion.div>

      <Container width="wide">
        <p className="text-micro text-ocean-soft">
          Boston, Massachusetts. Building since 2018.
        </p>

        <h1 className="mt-6 max-w-[16ch]">
          <VariableText
            as="span"
            className="display-face text-hero block text-ink"
            delay={0.1}
          >
            Ananya
          </VariableText>
          <VariableText
            as="span"
            className="display-face text-hero block text-ink"
            delay={0.22}
          >
            Shah
          </VariableText>
          <span className="sr-only">, {site.tagline}</span>
        </h1>

        <p aria-hidden="true" className="mt-6">
          <VariableText
            as="span"
            className="display-face text-display block text-coral italic"
            delay={0.4}
            from={{ soft: 0, wonk: 0, wght: 300, opsz: 96 }}
            to={{ soft: 100, wonk: 1, wght: 300, opsz: 144 }}
          >
            {site.tagline}
          </VariableText>
        </p>

        {/* Caricature on small screens, where there is no room beside the type. */}
        <div className="relative mx-auto mt-10 aspect-855/941 w-[62%] max-w-xs lg:hidden">
          <Image
            src="/images/ananya-caricature.png"
            alt="Illustrated portrait of Ananya Shah at a laptop, giving a thumbs up"
            fill
            priority
            sizes="(max-width: 1024px) 62vw, 0px"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
