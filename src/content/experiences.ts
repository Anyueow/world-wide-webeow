import type { Experience } from "@/lib/types";

/**
 * ===========================================================================
 * PROTOTYPE SET. Five entries out of roughly twenty five.
 * ===========================================================================
 *
 * These five are real, pulled from the Notion spec, and chosen to stress the
 * timeline design: the earliest year, the highest impact numbers, a technical
 * founder role, salaried consulting work, and the current build. They span
 * 2018 to 2026 so the year rail and the spine have real distance to cover.
 *
 * The remaining entries (TiE, DMZ Sandbox, Northeastern, Dogspotted, E Club,
 * both TA roles, Likd by Anyu, Huntington Angels, Hercules Capital, Social
 * Frame, Husky Startup Challenge, Sherman Center, Tyle.ai, Zero Clix, AI
 * Collective Boston, Ping, Compound, Clarity, Night Owl, AI Runtime) go in
 * this same array once the interaction design is approved.
 *
 * TO ADD AN ENTRY: append an object below. Order does not matter, the timeline
 * sorts by `start` descending and groups by `year`. Every field is documented
 * in src/lib/types.ts.
 *
 * BULLET RULE: action verb first, then the result, then the method. Two to
 * four per entry. No paragraphs. No em dashes.
 */
export const experiences: Experience[] = [
  {
    id: "leprechaun",
    title: "Founder",
    org: "Leprechaun",
    location: "Boston, MA",
    kind: "venture",
    year: 2026,
    dates: "2026 to present",
    start: "2026-01",
    end: "present",
    featured: true,
    bullets: [
      "Built an LLM matching engine that scores consulting talent against technical roles, replacing keyword search with archetype based inference.",
      "Split the system into Supply, Demand and Intelligence engines so candidate sourcing, employer demand and match scoring scale independently.",
      "Shipped a candidate portal and employer dashboard end to end, using Notion as the system of record and Claude Code as the build environment.",
    ],
    skills: [
      "LLM Engineering",
      "System Design",
      "Product Architecture",
      "Talent Tech",
      "Claude Code",
    ],
    links: [
      // TODO: add the live URL and repo once public.
    ],
    photo: {
      alt: "Leprechaun candidate portal interface",
      note: "PHOTO SLOT: screenshot of the candidate portal or the archetype map.",
    },
  },
  {
    id: "cartesian-charter",
    title: "Strategy Consultant",
    org: "Cartesian Consulting, now Bounteous",
    location: "Boston, MA",
    kind: "work",
    year: 2025,
    dates: "2025 to present",
    start: "2025-01",
    end: "present",
    featured: true,
    bullets: [
      "Embedded with Charter Communications' Internet Reliability team, turning raw operational data into the reporting executives use on ESC and OSC cycles.",
      "Traced a fiber trouble call rate spike to its source across Athena, Trino and Redshift, then rebuilt the metric so the same spike is caught earlier.",
      "Modeled FTTP and DOCSIS reliability across RPD vendor performance, firmware versions and optical contamination to rank where field effort pays off most.",
    ],
    skills: [
      "SQL",
      "Athena / Trino",
      "Redshift",
      "Executive Reporting",
      "Telecom Analytics",
      "Reliability Engineering",
    ],
    links: [],
    photo: {
      alt: "Reliability analytics dashboard",
      note: "PHOTO SLOT: a scrubbed dashboard screenshot, or a Boston office photo.",
    },
  },
  {
    id: "findher",
    title: "Co-Founder and CTO",
    org: "FindHer",
    location: "Bangalore, India",
    kind: "venture",
    year: 2023,
    dates: "Jan 2023 to Nov 2023",
    start: "2023-01",
    end: "2023-11",
    featured: true,
    bullets: [
      "Built and shipped the MVP and landing page on the MERN stack as the sole technical founder.",
      "Hired and ran a development team on a weekly agile cycle in Jira and Git.",
      "Drove client acquisition directly, running outbound through Airtable and LinkedIn Sales Navigator.",
      "Won a Northeastern Venture Co-op, which funded the move to Bangalore to build on the ground.",
    ],
    skills: [
      "MERN Stack",
      "Agile",
      "Engineering Leadership",
      "Sales",
      "Client Acquisition",
    ],
    links: [{ label: "findher.work", url: "https://findher.work" }],
    photo: {
      alt: "FindHer product and team in Bangalore",
      note: "PHOTO SLOT: Bangalore team photo, or the FindHer landing page.",
    },
  },
  {
    id: "bindu",
    title: "President and Co-Founder",
    org: "Bindu",
    location: "Hyderabad, India",
    kind: "venture",
    year: 2020,
    dates: "2020 to 2022",
    start: "2020-01",
    end: "2022-12",
    featured: true,
    bullets: [
      "Founded a non profit against period poverty and stigma in India, reaching 7,000 women with sustainable sanitary products.",
      "Raised over 30,000 dollars from individual and institutional donors to fund distribution and workshops.",
      "Scaled the organization to 75 members across four teams covering Education, Social Media, Field and Design.",
      "Ran education workshops that reached 3,000 women directly.",
    ],
    skills: [
      "Non-Profit Leadership",
      "Fundraising",
      "Community Building",
      "Team Scaling",
      "Program Design",
    ],
    links: [
      // TODO: add the Bindu site or Notion page.
    ],
    photo: {
      alt: "Bindu field team running a workshop in Hyderabad",
      note: "PHOTO SLOT: field team or workshop photo. This is the strongest image on the page, pick a good one.",
    },
  },
  {
    id: "enterpi",
    title: "Programming Intern",
    org: "Enterpi Solutions",
    location: "Hyderabad, India",
    kind: "work",
    year: 2018,
    dates: "2018",
    start: "2018-06",
    end: "2018-08",
    bullets: [
      "Built Fitness Bolt, a workout app, in React Native against Firebase and the YouTube API.",
      "Designed a custom workout video feed that assembled routines from third party video rather than hosting any.",
    ],
    skills: ["React Native", "Firebase", "YouTube API", "Mobile Development"],
    links: [
      // TODO: add the Fitness Bolt Notion page.
    ],
    photo: {
      alt: "Fitness Bolt app screens",
      note: "PHOTO SLOT: app screenshot, or a photo from the internship.",
    },
  },
];

/** Newest first, which is the order the timeline reads top to bottom. */
export function sortedExperiences(): Experience[] {
  return [...experiences].sort((a, b) => {
    const aKey = a.end === "present" ? "9999" : a.end;
    const bKey = b.end === "present" ? "9999" : b.end;
    if (aKey !== bKey) return bKey.localeCompare(aKey);
    return b.start.localeCompare(a.start);
  });
}

/** Grouped into year buckets for the timeline's year markers. */
export function experiencesByYear(): { year: number; items: Experience[] }[] {
  const buckets = new Map<number, Experience[]>();
  for (const item of sortedExperiences()) {
    const list = buckets.get(item.year) ?? [];
    list.push(item);
    buckets.set(item.year, list);
  }
  return [...buckets.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}

/** Every year that has at least one entry, newest first. Drives the year rail. */
export function timelineYears(): number[] {
  return experiencesByYear().map((group) => group.year);
}
