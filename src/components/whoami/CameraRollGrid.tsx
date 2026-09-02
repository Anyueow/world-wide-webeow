"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { cameraRoll } from "@/content/camera-roll";

const aspect = {
  sm: "aspect-square",
  md: "aspect-4/5",
  lg: "aspect-3/4",
  tall: "aspect-2/3",
  wide: "aspect-3/2",
} as const;

/**
 * A pile, not a gallery.
 *
 * CSS columns rather than a grid, because a masonry flow of uneven heights is
 * what a camera roll actually looks like when you dump it out. Each tile is
 * tilted a degree or two and straightens on hover, so the pile feels handled.
 *
 * Every tile is an empty, labelled slot until a src lands in
 * src/content/camera-roll.ts. Filling one changes nothing about the layout.
 */
export function CameraRollGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="columns-2 gap-4 sm:gap-5 md:columns-3 lg:columns-4">
      {cameraRoll.map((photo, index) => (
        <li key={photo.id} className="mb-4 break-inside-avoid sm:mb-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: 0 }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, y: 0, rotate: photo.tilt ?? 0 }
            }
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.7,
              delay: (index % 4) * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.02 }}
            className="origin-center"
          >
            <PhotoFrame
              photo={photo}
              slotLabel={`Slot ${index + 1} of ${cameraRoll.length}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`${aspect[photo.size]} w-full`}
            />
            {photo.caption ? (
              <p className="mt-2 text-xs leading-snug text-ink-faint">
                {photo.caption}
              </p>
            ) : null}
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
