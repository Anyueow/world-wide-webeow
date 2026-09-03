import type { PhotoSlot, ResumeVariant } from "@/lib/types";

export const site = {
  name: "Ananya Shah",
  tagline: "curiouser, curiouser",
  url: "https://ananya-personal.netlify.app",
  locale: "en_US",
  description:
    "Ananya Shah builds products and the communities around them. Founder, engineer and analyst working across LLM tooling, telecom reliability analytics and the Boston AI scene.",
} as const;

/**
 * DRAFT COPY. Written in Ananya's voice, not approved. Every string in this
 * file is meant to be argued with. Swap the tagline by changing site.tagline
 * above, or pick one of the alternates below.
 */
export const taglineOptions = [
  "curiouser, curiouser", // selected
  "I put 110% into everything. Especially the things that don't require it.",
  "I build products, and the communities that carry them.",
  "Depth in a lot of places at once.",
] as const;

/** DRAFT. Three lines, homepage, under the wordmark. */
export const bio: string[] = [
  "I build things and the communities around them, usually two or three at once.",
  "Right now that means an LLM talent matching engine, reliability analytics for a telecom network, and the AI Collective in Boston.",
  "I have been doing some version of this since 2018, which is why my timeline starts there and not at graduation.",
];

/**
 * In-page anchors, not routes. The site is one scrolling page (T-G.1), so nav
 * just jumps to a section id on the same document instead of navigating.
 */
export const nav = [
  { label: "Who am I", href: "#who-am-i" },
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

/** TODO: drop the three PDFs into /public/resume and fix the labels. */
export const resumes: ResumeVariant[] = [
  {
    id: "product",
    label: "Product and engineering",
    description: "For engineering and product roles.",
    file: "/resume/ananya-shah-product.pdf",
  },
  {
    id: "data",
    label: "Data and analytics",
    description: "For analytics and data science roles.",
    file: "/resume/ananya-shah-data.pdf",
  },
  {
    id: "founder",
    label: "Founder and strategy",
    description: "For venture, strategy and founding roles.",
    file: "/resume/ananya-shah-founder.pdf",
  },
];

/** The professional headshot. Caricature stands in until the photo arrives. */
export const headshot: PhotoSlot = {
  alt: "Ananya Shah",
  note: "PHOTO SLOT: professional headshot. Sits beside the caricature on the homepage.",
};
