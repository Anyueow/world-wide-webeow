import type { PhotoSlot, ResumeVariant } from "@/lib/types";

export const site = {
  name: "Ananya Shah",
  tagline: "passionate builder, currently professionally telling stories with data",
  url: "https://ananya-personal.netlify.app",
  locale: "en_US",
  description:
    "passionate builder, currently professionally telling stories with data",
} as const;

/**
 * In-page anchors, not routes. The site is one scrolling page (T-G.1), so nav
 * just jumps to a section id on the same document instead of navigating.
 */
export const nav = [
  { label: "Experiences", href: "#experiences" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Pulled from the Notion sources, not guessed.
 *
 * Email and LinkedIn are the ones Ananya listed herself in the May 2026
 * website spec. Note that older Notion pages (2023 to 2024) give a different
 * LinkedIn, linkedin.com/in/ananya-shah-85372918a. The newer handle is used
 * here because it appears in both 2025 and 2026 sources. Confirm before
 * launch, it is item C-1 in CONTENT-GAPS.md.
 */
export const contact = {
  email: "anyushah@gmail.com",
  linkedin: "https://www.linkedin.com/in/anyushah",
  github: "https://github.com/Anyueow",
} as const;

/** One general resume. Add the supplied PDF at this path when available. */
export const resumes: ResumeVariant[] = [
  {
    id: "resume",
    label: "Download resume",
    description: "",
    file: "/resume/ananya-shah.pdf",
  },
];

/** The professional headshot. Caricature stands in until the photo arrives. */
export const headshot: PhotoSlot = {
  alt: "Ananya Shah",
  note: "PHOTO SLOT: professional headshot. Sits beside the caricature on the homepage.",
};
