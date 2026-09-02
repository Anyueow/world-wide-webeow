import type { PhotoSlot } from "@/lib/types";

export type CameraRollPhoto = PhotoSlot & {
  id: string;
  /** Controls the tile's footprint in the scattered grid. */
  size: "sm" | "md" | "lg" | "tall" | "wide";
  /** Small rotation in degrees so the grid reads as a pile, not a table. */
  tilt?: number;
};

/**
 * ===========================================================================
 * PHOTO SLOTS. Every one is empty and clearly labelled on the page.
 * ===========================================================================
 *
 * TO FILL A SLOT: drop the file in /public/images/camera-roll/ and add
 * `src: "/images/camera-roll/your-file.jpg"` to the object. That is the whole
 * process. The layout, alt text and captions are already set.
 *
 * Captions are DRAFT copy. Rewrite freely.
 */
export const cameraRoll: CameraRollPhoto[] = [
  {
    id: "run",
    size: "tall",
    tilt: -2,
    alt: "Ananya on a long run",
    caption: "Running. The thinking happens here, not at the desk.",
    note: "PHOTO SLOT: a running photo. Race, trail, or just the watch face after a good one.",
  },
  {
    id: "decks",
    size: "md",
    tilt: 1.5,
    alt: "Ananya DJing",
    caption: "Behind the decks.",
    note: "PHOTO SLOT: DJing. Dark room, hands on the controller.",
  },
  {
    id: "passport-1",
    size: "wide",
    tilt: -1,
    alt: "Travel photograph",
    caption: "Thirteen countries so far. Counting.",
    note: "PHOTO SLOT: the best travel frame you own. This one is the widest tile.",
  },
  {
    id: "table",
    size: "md",
    tilt: 2,
    alt: "A table full of people at one of Ananya's dinners",
    caption: "I host. Everyone gets fed and nobody leaves early.",
    note: "PHOTO SLOT: a hosting photo. Full table, people mid conversation.",
  },
  {
    id: "pacifica",
    size: "lg",
    tilt: -1.5,
    alt: "The beach at Pacifica, California",
    caption: "Pacifica. More on this below.",
    note: "PHOTO SLOT: Pacifica. The beach, the cliffs, or the Taco Bell Cantina. Ideally the Cantina.",
  },
  {
    id: "animals",
    size: "sm",
    tilt: 2.5,
    alt: "An animal Ananya has photographed",
    caption: "Animal rights is not a hobby, it is a position.",
    note: "PHOTO SLOT: an animal photo. Yours, a rescue, a street dog abroad.",
  },
  {
    id: "build",
    size: "md",
    tilt: -2.5,
    alt: "A late night build session",
    caption: "The other half of the camera roll is screenshots at 2am.",
    note: "PHOTO SLOT: a laptop, a whiteboard, a hackathon table.",
  },
  {
    id: "passport-2",
    size: "tall",
    tilt: 1,
    alt: "Travel photograph",
    caption: "",
    note: "PHOTO SLOT: second travel frame. Vertical works best in this tile.",
  },
  {
    id: "outside",
    size: "wide",
    tilt: -1,
    alt: "Outdoors, somewhere green",
    caption: "Outside, as often as the calendar allows.",
    note: "PHOTO SLOT: hiking, camping, anything outdoors.",
  },
];
