import type { ImpactItem } from "@/lib/types";

/**
 * ===========================================================================
 * IMPACT. The public artifacts, pulled from the Notion sources.
 * ===========================================================================
 *
 * Every `url` below was found in Notion. Nothing is guessed. Items whose only
 * home is a private Notion page or a private repo are NOT listed here, because
 * a card that links nowhere is worse than no card. They are tracked in
 * /CONTENT-GAPS.md instead, and drop straight in once a public link exists.
 *
 * The page at /impact renders whatever is in this array and goes noindex when
 * it is empty. Flip `robots.index` in src/app/impact/page.tsx and add the route
 * to src/app/sitemap.ts in the same commit that fills the last gap.
 */
export const impactItems: ImpactItem[] = [
  {
    id: "lora-light-debiasing",
    title: "LoRA-Light Debiasing: Removing Covert Dialect Bias from Open LLMs",
    type: "Research",
    year: 2025,
    featured: true,
    description:
      "Large models quietly penalize African American English, and that shows up in hiring and sentencing recommendations. This trains a LoRA adapter on a self supervised, parity corrected corpus and closes most of the gap on the ReDial benchmark without touching the base weights or the model's fluency. Tested it on a résumé screen, where the base model marked a candidate down for slang and the adapted one did not.",
    // GAP: no public URL yet. Notion page is private. See CONTENT-GAPS.md.
    url: "",
    linkLabel: "Read the paper",
    thumbnail: {
      alt: "Parity results across code, math, logic and comprehension tasks",
      note: "THUMBNAIL: the results table, or the LoRA adapter diagram.",
    },
    tags: ["LLMs", "Fairness", "LoRA", "Llama 3", "NLP"],
  },
  {
    id: "vera",
    title: "Vera",
    type: "Project",
    year: 2024,
    featured: true,
    description:
      "A deep learning model that predicts fashion trends from runway and event photography. Multi label classification picks out every garment in a frame, then frequency analysis across the set says which combinations are actually rising.",
    url: "https://github.com/Anyueow/vera",
    linkLabel: "View on GitHub",
    thumbnail: {
      alt: "Vera multi-label fashion classification output",
      note: "THUMBNAIL: a classified runway frame, or a trend chart.",
    },
    tags: ["Python", "TensorFlow", "Keras", "Computer Vision"],
  },
  {
    id: "vera-report",
    title: "Vera, technical report",
    type: "Research",
    year: 2024,
    description:
      "The write up behind Vera: dataset construction, the multi label architecture, and how trend signal was separated from noise.",
    url: "https://drive.google.com/file/d/1TLFW-QvmLW78AkVtoJjAEaKDcH8ajqKJ/view?usp=sharing",
    linkLabel: "Read the report",
    thumbnail: {
      alt: "Vera technical report",
      note: "THUMBNAIL: report cover page.",
    },
    tags: ["Deep Learning", "Technical Writing"],
  },
  {
    id: "flood-risk",
    title: "Flood Risk and Mitigation for Mass Ave",
    type: "Project",
    year: 2024,
    featured: true,
    description:
      "Found where Mass Ave floods and where to plant trees to stop it. Joins Speak for the Trees canopy data, Boston 311 service requests and NOAA precipitation into one geospatial model, then ranks candidate planting sites by runoff absorbed.",
    url: "https://github.com/dvijashah/Speak-for-the-Trees/tree/main/Group-4%20Flood%20Remediation",
    linkLabel: "View on GitHub",
    thumbnail: {
      alt: "Flood risk map of Massachusetts Avenue",
      note: "THUMBNAIL: the risk map or the planting site overlay.",
    },
    tags: ["Python", "Geospatial", "Civic Data", "Pandas"],
  },
  {
    id: "flood-risk-doc",
    title: "Flood Remediation, project document",
    type: "Research",
    year: 2024,
    description:
      "Methodology and recommendations behind the Mass Ave flood model, written for a non technical reader.",
    url: "https://docs.google.com/document/d/1amwQZzbGnbRMeSkGXni6Oaw2kqbkA-RpiiXqbabGolU/edit?usp=sharing",
    linkLabel: "Read the document",
    thumbnail: {
      alt: "Flood remediation project document",
      note: "THUMBNAIL: a figure from the document.",
    },
    tags: ["Urban Planning", "Data Analysis"],
  },
  {
    id: "findher-site",
    title: "FindHer",
    type: "Project",
    year: 2023,
    featured: true,
    description:
      "A job matching platform for women in India. Built the MVP and landing page on the MERN stack as the sole technical founder, then moved to Bangalore on a Northeastern Venture Co-op to build it on the ground.",
    url: "http://www.findher.work/",
    linkLabel: "Visit findher.work",
    thumbnail: {
      alt: "FindHer landing page",
      note: "THUMBNAIL: the landing page, or the product UI.",
    },
    tags: ["MERN", "Founder", "Product Design"],
  },
  {
    id: "sandcastles",
    title: "Sandcastles",
    type: "Prototype",
    year: 2024,
    description:
      "Never work alone as a builder. A small tool made with friends that applies planning structure to side projects, so a group of three can ship without a project manager.",
    url: "http://sandcastles.framer.website",
    linkLabel: "See the site",
    thumbnail: {
      alt: "Sandcastles project site",
      note: "THUMBNAIL: the Framer site, or the Figma frames.",
    },
    tags: ["Figma", "Framer", "Collaboration"],
  },
  {
    id: "sherman-airtable",
    title: "Venture Co-op tracker",
    type: "Prototype",
    year: 2024,
    description:
      "The Airtable MVP founders at the Sherman Center report progress in. Built it because the document nobody updates is the default failure mode of every mentorship program.",
    url: "https://airtable.com/applfOVKqssI3LX9y/pagk1LFrpdHccRT9L?ffPPf=recOM4ZGPUSLKY5O8",
    linkLabel: "Open the tracker",
    thumbnail: {
      alt: "Sherman Center Venture Co-op Airtable tracker",
      note: "THUMBNAIL: the Airtable interface.",
    },
    tags: ["Airtable", "No-code", "Founder Ops"],
  },
  {
    id: "han-team",
    title: "Huntington Angels Network",
    type: "Press",
    year: 2024,
    description:
      "Managing Director of Northeastern's student run angel network, listed on the team page. Ran investment recruiting, led due diligence, and wrote a Python matching algorithm to route ventures to the right investors.",
    url: "https://huntingtonangelsnetwork.com/people/our-team",
    linkLabel: "See the team page",
    thumbnail: {
      alt: "Huntington Angels Network team page",
      note: "THUMBNAIL: the team page, or a pitch night photo.",
    },
    tags: ["Angel Investing", "Due Diligence"],
  },
  {
    id: "github",
    title: "GitHub",
    type: "Project",
    description:
      "Class projects, prototypes and the things that never got a landing page.",
    url: "https://github.com/Anyueow",
    linkLabel: "github.com/Anyueow",
    thumbnail: {
      alt: "Ananya Shah on GitHub",
      note: "THUMBNAIL: contribution graph, or skip and let this card be text only.",
    },
    tags: ["Open Source"],
  },
];

export function impactByType(): { type: string; items: ImpactItem[] }[] {
  const order = ["Research", "Project", "Prototype", "Talk", "Press"];
  const buckets = new Map<string, ImpactItem[]>();
  for (const item of impactItems) {
    const list = buckets.get(item.type) ?? [];
    list.push(item);
    buckets.set(item.type, list);
  }
  return order
    .filter((type) => buckets.has(type))
    .map((type) => ({ type, items: buckets.get(type)! }));
}

/** Only items with a working link should ever render a card. */
export function linkedImpactItems(): ImpactItem[] {
  return impactItems.filter((item) => item.url.length > 0);
}
