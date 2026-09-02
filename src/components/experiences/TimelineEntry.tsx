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
 * Everything is rendered, always. Nothing is hidden behind a click, because a
 * recruiter scanning on a phone should not have to discover the bullets, and a
 * crawler should not have to execute anything to read them.
 *
 * Scroll only changes emphasis: the node fills, the rule draws, the dimming
 * lifts. Opacity and transform exclusively, so the page never reflows while it
 * is moving.
 *
 * Cost control, because there are around 27 of these on one page:
 *   - `content-visibility: auto` lets the browser skip layout and paint for
 *     entries that are off screen. `contain-intrinsic-size` keeps the
 *     scrollbar honest while they are skipped.
 *   - The parallax `useScroll` subscriber only exists for entries that have a
 *     real photo. An empty slot has nothing to parallax, so most entries on the
 *     page today subscribe to nothing.
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
  const hasPhoto = Boolean(experience.photo.src);

  // The active band is the middle of the viewport. Whatever is there is what
  // the reader is looking at.
  const isActive = useInView(ref, { margin: "-42% 0px -43% 0px" });

  const active = reduceMotion ? true : isActive;
  const photoFirst = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      id={experience.id}
      className="relative scroll-mt-32 py-6 pl-8 sm:pl-12 lg:py-8 lg:pl-16"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 420px",
      }}
      animate={reduceMotion ? undefined : { opacity: active ? 1 : 0.5 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node on the spine. */}
      <span
        aria-hidden="true"
        className="absolute top-[2.4rem] left-0 flex h-3 w-3 -translate-x-1/2 items-center justify-center lg:top-[3rem]"
      >
        <motion.span
          className="block rounded-full border border-ink/30 bg-sand"
          animate={
            reduceMotion
              ? undefined
              : {
                  width: active ? 12 : 7,
                  height: active ? 12 : 7,
                  backgroundColor: active ? "#c2502f" : "#f7f5f0",
                  borderColor: active ? "#c2502f" : "rgba(16,16,14,0.3)",
                }
          }
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      </span>

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <div
          className={
            hasPhoto
              ? `lg:col-span-7 ${photoFirst ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`
              : "lg:col-span-11"
          }
        >
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
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

          {/* The organization is the heading, not the role. Half these entries
              are titled "Founder" or "Builder", so leading with the title gave
              a column of identical words. Someone scanning is looking for the
              name of the thing. */}
          <h3 className="display-face mt-2.5 text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.08] tracking-tight text-ink">
            {experience.org}
          </h3>

          <motion.p
            className="mt-0.5 text-[0.98rem] font-medium tracking-tight"
            animate={
              reduceMotion ? undefined : { color: active ? "#c2502f" : "#57544c" }
            }
            transition={{ duration: 0.4 }}
          >
            {experience.title}
          </motion.p>

          <motion.span
            aria-hidden="true"
            className="mt-3.5 block h-px origin-left bg-coral"
            animate={reduceMotion ? undefined : { scaleX: active ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {experience.summary ? (
            <p className="mt-3.5 max-w-[62ch] text-[0.92rem] leading-relaxed text-ink-soft italic">
              {experience.summary}
            </p>
          ) : null}

          <ul className="mt-3.5 space-y-2">
            {experience.bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative max-w-[62ch] pl-4 text-[0.92rem] leading-[1.55] text-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[0.6em] left-0 h-1 w-1 rounded-full bg-ink-faint"
                />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {experience.skills.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                {experience.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-dune px-2.5 py-0.5 text-[0.7rem] tracking-tight text-ink-soft"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : null}

            {experience.links.length > 0 ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Evidence">
                {experience.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-1 text-[0.83rem] font-medium text-ink transition-colors hover:text-coral"
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

          {!hasPhoto ? (
            <div className="mt-4 max-w-sm">
              <PhotoFrame
                photo={experience.photo}
                slotLabel={experience.org}
                compact
              />
            </div>
          ) : null}
        </div>

        {hasPhoto ? (
          <PhotoColumn
            experience={experience}
            photoFirst={photoFirst}
            reduceMotion={Boolean(reduceMotion)}
          />
        ) : null}
      </div>
    </motion.article>
  );
}

/**
 * Split out so the parallax scroll subscriber is only ever created for entries
 * that actually have an image. With 27 entries, mounting this unconditionally
 * meant 27 scroll listeners doing work for grey boxes.
 */
function PhotoColumn({
  experience,
  photoFirst,
  reduceMotion,
}: {
  experience: Experience;
  photoFirst: boolean;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <motion.div
      ref={ref}
      className={`lg:col-span-5 ${photoFirst ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"}`}
      style={reduceMotion ? undefined : { y }}
    >
      <PhotoFrame
        photo={experience.photo}
        slotLabel={`${experience.year}, ${experience.org}`}
        sizes="(max-width: 1024px) 100vw, 34vw"
        className="aspect-4/3 w-full"
      />
    </motion.div>
  );
}
