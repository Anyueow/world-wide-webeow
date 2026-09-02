"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import type { Experience, ExperienceKind } from "@/lib/types";

const kindLabel: Record<ExperienceKind, string> = {
  work: "Work",
  venture: "Venture",
  community: "Community",
  education: "Education",
  teaching: "Teaching",
  award: "Award",
};

const kindDot: Record<ExperienceKind, string> = {
  work: "bg-ocean",
  venture: "bg-coral",
  community: "bg-coral-deep",
  education: "bg-ocean-soft",
  teaching: "bg-ocean-soft",
  award: "bg-coral",
};

/**
 * One station on the timeline.
 *
 * Everything is rendered, always. Nothing about this entry is hidden behind a
 * click, because a recruiter scanning on a phone should not have to discover
 * the bullets, and a crawler should not have to execute anything to read them.
 *
 * Scroll only changes emphasis: the node fills, the rule draws, the dimming
 * lifts, the photo drifts. Opacity and transform exclusively, so the page never
 * reflows while it is moving.
 */
export function TimelineEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // The active band is the middle 15% of the viewport. Whatever is there is
  // what the reader is looking at.
  const isActive = useInView(ref, { margin: "-42% 0px -43% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [22, -22]);

  const active = reduceMotion ? true : isActive;
  const photoFirst = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      id={experience.id}
      className="relative scroll-mt-32 py-10 pl-10 sm:pl-14 lg:py-14 lg:pl-20"
      animate={reduceMotion ? undefined : { opacity: active ? 1 : 0.48 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node on the spine. */}
      <span
        aria-hidden="true"
        className="absolute top-[3.4rem] left-0 flex h-3 w-3 -translate-x-1/2 items-center justify-center lg:top-[4.6rem]"
      >
        <motion.span
          className="block rounded-full border border-ink/30 bg-sand"
          animate={
            reduceMotion
              ? undefined
              : {
                  width: active ? 13 : 7,
                  height: active ? 13 : 7,
                  backgroundColor: active ? "#c2502f" : "#f7f5f0",
                  borderColor: active ? "#c2502f" : "rgba(16,16,14,0.3)",
                }
          }
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      </span>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div
          className={`lg:col-span-7 ${photoFirst ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${kindDot[experience.kind]}`}
              />
              <span className="text-micro text-ink-soft">
                {kindLabel[experience.kind]}
              </span>
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <span className="text-micro text-ink-soft">{experience.dates}</span>
            {experience.location ? (
              <>
                <span aria-hidden="true" className="text-ink-faint">
                  /
                </span>
                <span className="text-micro text-ink-soft">
                  {experience.location}
                </span>
              </>
            ) : null}
          </div>

          <h3 className="display-face text-title mt-4 text-ink">
            {experience.title}
          </h3>

          <motion.p
            className="mt-1 text-[1.05rem] font-medium tracking-tight"
            animate={
              reduceMotion ? undefined : { color: active ? "#c2502f" : "#57544c" }
            }
            transition={{ duration: 0.4 }}
          >
            {experience.org}
          </motion.p>

          <motion.span
            aria-hidden="true"
            className="mt-5 block h-px origin-left bg-coral"
            animate={reduceMotion ? undefined : { scaleX: active ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {experience.summary ? (
            <p className="mt-5 max-w-[58ch] text-[0.98rem] leading-relaxed text-ink-soft">
              {experience.summary}
            </p>
          ) : null}

          <ul className="mt-5 space-y-3">
            {experience.bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative max-w-[58ch] pl-5 text-[0.98rem] leading-relaxed text-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[0.62em] left-0 h-1 w-1 rounded-full bg-ink-faint"
                />
                {bullet}
              </li>
            ))}
          </ul>

          {experience.skills.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
              {experience.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-dune bg-shell px-3 py-1 text-[0.75rem] tracking-tight text-ink-soft"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : null}

          {experience.links.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Evidence">
              {experience.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-1.5 text-[0.875rem] font-medium text-ink transition-colors hover:text-coral"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <motion.div
          className={`lg:col-span-5 ${photoFirst ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"}`}
          style={reduceMotion ? undefined : { y: photoY }}
        >
          <PhotoFrame
            photo={experience.photo}
            slotLabel={`${experience.year}, ${experience.org}`}
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="aspect-4/3 w-full"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}
