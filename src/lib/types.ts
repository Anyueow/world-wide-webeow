/**
 * Content types for the site.
 *
 * These are the only shapes the page components know about. Add an entry to
 * src/content/experiences.ts or src/content/impact.ts that satisfies the type
 * and it renders, sorts, groups and gets picked up by the sitemap automatically.
 */

/** A link out to proof: a live site, a repo, a Figma file, an Airtable base. */
export type EvidenceLink = {
  label: string;
  url: string;
};

/**
 * An image slot. Leave `src` undefined and the UI renders a labelled
 * placeholder instead, so the layout is correct before the photo exists.
 */
export type PhotoSlot = {
  /** Path under /public, for example "/images/experiences/bindu.jpg". */
  src?: string;
  /** Always write this, placeholder or not. It becomes the alt attribute. */
  alt: string;
  /** Optional caption printed under the image. */
  caption?: string;
  /** Note to self about what photo belongs here. Never rendered to visitors. */
  note?: string;
};

/**
 * What kind of thing this was. Drives the accent treatment on the timeline so
 * a reader can tell paid work from a venture from a community role at a glance.
 */
export type ExperienceKind =
  | "work"
  | "venture"
  | "community"
  | "education"
  | "teaching"
  | "award";

export type Experience = {
  /** Stable, URL safe, unique. Used as the anchor id and React key. */
  id: string;
  title: string;
  org: string;
  location?: string;
  kind: ExperienceKind;
  /** Year the entry is filed under on the timeline. */
  year: number;
  /** Display string for the date range, for example "Jul 2022 to Dec 2022". */
  dates: string;
  /** ISO-ish sort keys. "2022-07" or "2022". Used for ordering within a year. */
  start: string;
  /** Same format as start, or "present". */
  end: string;
  /** One line of context. Optional, and usually better left out. */
  summary?: string;
  /** 2 to 4 bullets. Action verb first. Accomplished X measured by Y doing Z. */
  bullets: string[];
  skills: string[];
  links: EvidenceLink[];
  photo: PhotoSlot;
  /** Pulls the entry forward in condensed views such as the homepage. */
  featured?: boolean;
};

export type ImpactType =
  | "Research"
  | "Project"
  | "Talk"
  | "Press"
  | "Prototype";

export type ImpactItem = {
  id: string;
  title: string;
  type: ImpactType;
  /** One or two sentences. What it is and why it matters. */
  description: string;
  url: string;
  /** Text shown on the outbound link, for example "Read the paper". */
  linkLabel?: string;
  year?: number;
  thumbnail: PhotoSlot;
  tags?: string[];
  featured?: boolean;
};

export type ResumeVariant = {
  id: string;
  label: string;
  description: string;
  /** Path under /public/resume. */
  file: string;
};
