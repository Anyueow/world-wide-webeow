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

export const nav = [
  { label: "Who am I", href: "/who-am-i" },
  { label: "Experiences", href: "/experiences" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * TODO: replace every one of these with real links before launch.
 * The site renders them exactly as written, so a placeholder here ships as a
 * placeholder. Nothing guesses an address on your behalf.
 */
export const contact = {
  email: "REPLACE-ME@example.com",
  linkedin: "https://www.linkedin.com/in/REPLACE-ME",
  github: "https://github.com/REPLACE-ME",
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
