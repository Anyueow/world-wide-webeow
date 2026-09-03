/**
 * ###########################################################################
 * ## REJECTED CONTENT. DO NOT BUILD ON THIS. DO NOT CITE IT.               ##
 * ###########################################################################
 *
 * Ananya reviewed this on 2026-09-03: "I hate all the content. It's inaccurate
 * on so many levels."
 *
 * It was derived from Notion pages that contradict each other on dates, titles
 * and numbers, and several of those pages are years stale. An agent resolved
 * those conflicts by judgement instead of escalating them. That was the error.
 *
 * This file is quarantined until Workstream 0 in /HANDOFF.md replaces it
 * wholesale from a sourced fact ledger plus an interview with Ananya.
 *
 * Do not patch these entries. Do not copy a bullet out of here into new code.
 * Do not treat any date, metric or title below as true.
 *
 * The only thing worth salvaging is the set of URLs, which were copied from
 * Notion verbatim and are probably still correct. Verify each one anyway.
 */

import type { Experience } from "@/lib/types";

/**
 * ===========================================================================
 * THE FULL TIMELINE. Built from the Notion "Life in Pages" sources.
 * ===========================================================================
 *
 * Sources consolidated (all seven pages named in the master spec, plus the
 * NLP final paper page found by search):
 *   - Personal Website Specs with Content   (master spec, Sep 2026)
 *   - Ananya Shah                            (original site page, 2023)
 *   - Ananya Portfolio                       (technical experiences)
 *   - Ananya.md                              (archetype, Jun 2026)
 *   - Comprehensive Overview                 (full career, exact dates)
 *   - Personal Website Specs, Career Re-Alignment (May 2026)
 *   - Personal Reference Card                (Aug 2025)
 *   - Older portfolio page                   (Tyle, Sandcastles, writeups)
 *
 * Anything still missing, unverified or conflicting is tracked in
 * /CONTENT-GAPS.md at the repo root. Every `links: []` below means no public
 * URL was found in Notion, not that one does not exist. Nothing here is
 * invented: no URL, metric or date appears that was not in a source.
 *
 * TO ADD AN ENTRY: append an object. Order does not matter, the timeline sorts
 * by `end` then `start` and groups by `year`. Fields are documented in
 * src/lib/types.ts.
 *
 * BULLET RULE: action verb first, then the result, then the method. Two to
 * four per entry. No paragraphs. No em dashes.
 */
export const experiences: Experience[] = [
  // ---------------------------------------------------------------- 2026 ---
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
      "Split the system into Supply, Demand and Intelligence engines so sourcing, employer demand and match scoring scale independently.",
      "Shipped a candidate portal and employer dashboard end to end, using Notion as the system of record and Claude Code as the build environment.",
    ],
    skills: [
      "LLM Engineering",
      "System Design",
      "Product Architecture",
      "Talent Tech",
      "Claude Code",
    ],
    links: [], // GAP: live URL and repo. See CONTENT-GAPS.md
    photo: {
      alt: "Leprechaun candidate portal interface",
      note: "PHOTO SLOT: screenshot of the candidate portal or the archetype map.",
    },
  },
  {
    id: "ai-runtime-talk",
    title: "Speaker",
    org: "AI Runtime",
    location: "Boston, MA",
    kind: "community",
    year: 2026,
    dates: "June 2026",
    start: "2026-06",
    end: "2026-06",
    featured: true,
    summary:
      "Collaborating with AI: The Workflow Shift We Haven't Made Yet.",
    bullets: [
      "Argued that teams adopted AI tools without changing the workflow around them, and named the missing practice Context Maxing.",
      "Framed knowledge sharing as a mycelium network, where context travels between people and agents rather than sitting in one head.",
      "Structured the talk around three pillars: knowledge context sharing, collaborative coding, and quality insurance.",
    ],
    skills: ["Public Speaking", "AI Strategy", "Thought Leadership"],
    links: [], // GAP: recording, slides, event page. See CONTENT-GAPS.md
    photo: {
      alt: "Ananya speaking at AI Runtime",
      note: "PHOTO SLOT: a photo from the talk. Stage, slide, or audience shot.",
    },
  },
  {
    id: "compound",
    title: "Builder",
    org: "Compound, also called Retain",
    location: "Boston, MA",
    kind: "venture",
    year: 2026,
    dates: "Spring 2026",
    start: "2026-03",
    end: "2026-05",
    bullets: [
      "Built an AI retention engine for small businesses that turns point of sale history into timed SMS and email outreach.",
      "Integrated Square, Toast and Shopify so the product reads real transaction data instead of asking owners to import it.",
      "Shipped the build and the brand system inside VibeJam Spring 2026, working in Claude Code.",
    ],
    skills: ["AI Products", "POS Integrations", "Retention", "Claude Code", "Branding"],
    links: [], // GAP: demo, repo, VibeJam entry. See CONTENT-GAPS.md
    photo: {
      alt: "Compound retention dashboard",
      note: "PHOTO SLOT: product screenshot or the Apple Green brand board.",
    },
  },
  {
    id: "clarity",
    title: "Builder",
    org: "Clarity",
    location: "Boston, MA",
    kind: "venture",
    year: 2026,
    dates: "2026",
    start: "2026-02",
    end: "present",
    bullets: [
      "Designed an AI onboarding tool for consultants dropped into a new client, built from the problem she was living at Charter.",
      "Specified a First 48 Hours feature that assembles the context a new embed needs before their first standup.",
    ],
    skills: ["AI Products", "PRD Writing", "Onboarding", "Consulting Ops"],
    links: [], // GAP: prototype or PRD link. See CONTENT-GAPS.md
    photo: {
      alt: "Clarity onboarding flow",
      note: "PHOTO SLOT: the First 48 Hours flow or a PRD excerpt.",
    },
  },
  {
    id: "night-owl",
    title: "Builder",
    org: "Night Owl",
    location: "Boston, MA",
    kind: "venture",
    year: 2026,
    dates: "2026",
    start: "2026-01",
    end: "present",
    bullets: [
      "Built an AI nightly planning engine that turns a day's loose ends into the next day's plan.",
      "Produced the full brand and a YC style pitch framework before writing the product, which is how she starts most builds.",
    ],
    skills: ["AI Products", "Planning Tools", "Branding", "Pitch Design"],
    links: [], // GAP: any public artifact. See CONTENT-GAPS.md
    photo: {
      alt: "Night Owl planning interface",
      note: "PHOTO SLOT: interface or brand board.",
    },
  },

  // ---------------------------------------------------------------- 2025 ---
  {
    id: "cartesian-charter",
    title: "Strategy and Data Consultant",
    org: "Cartesian Consulting, now Bounteous",
    location: "Boston, MA",
    kind: "work",
    year: 2025,
    dates: "2025 to present",
    start: "2025-01",
    end: "present",
    featured: true,
    summary:
      "Embedded full time on Charter Communications' Internet Reliability team.",
    bullets: [
      "Turned raw network operations data into the executive deliverables Charter runs its ESC and OSC reporting cycles on, working in Athena, Trino and Redshift.",
      "Traced the March 2026 fiber trouble call spike to a 144 percent change request ramp from the post holiday construction restart plus weather driven fiber cuts, and rebuilt the metric to catch the next one earlier.",
      "Ranked where field effort pays off across FTTP and DOCSIS reliability, using RPD vendor performance, firmware tracking and an optical contamination Pareto.",
      "Aligned trouble call methodology with the Reliability team so two groups stopped reporting different numbers for the same network.",
    ],
    skills: [
      "SQL",
      "Athena / Trino",
      "Redshift",
      "Executive Reporting",
      "Telecom Analytics",
      "Reliability Engineering",
    ],
    links: [], // Client work, no public artifact expected.
    photo: {
      alt: "Reliability analytics work at Charter",
      note: "PHOTO SLOT: a scrubbed dashboard, or a Boston office photo. Nothing client confidential.",
    },
  },
  {
    id: "ai-collective-boston",
    title: "Co-Lead",
    org: "AI Collective Boston",
    location: "Boston, MA",
    kind: "community",
    year: 2025,
    dates: "2025 to present",
    start: "2025-01",
    end: "present",
    featured: true,
    bullets: [
      "Runs the Boston chapter's programming: events, open source contribution sessions and Women in AI nights.",
      "Produced an Open Source Drop-In with Cursor Boston during Boston Tech Week, and a Women in AI event with SVB.",
      "Programmed Humans in AI, featuring speakers from Morgan Stanley and Microsoft.",
    ],
    skills: ["Community Building", "Event Production", "Women in AI", "Partnerships"],
    links: [], // GAP: chapter page, Luma, event links. See CONTENT-GAPS.md
    photo: {
      alt: "An AI Collective Boston event",
      note: "PHOTO SLOT: a full room. This is the community proof shot, make it a good one.",
    },
  },
  {
    id: "ping",
    title: "Growth Lead",
    org: "Ping",
    location: "Boston, MA",
    kind: "work",
    year: 2025,
    dates: "2025",
    start: "2025-01",
    end: "2025-12",
    bullets: [
      "Owned go to market at Northeastern and stood up the campus ambassador program.",
    ],
    skills: ["GTM", "Growth", "Campus Strategy"],
    links: [], // GAP: product URL. See CONTENT-GAPS.md
    photo: {
      alt: "Ping campus growth work",
      note: "PHOTO SLOT: campus event or ambassador team.",
    },
  },
  {
    id: "northeastern-grad",
    title: "B.S. Data Science and Business Administration",
    org: "Northeastern University",
    location: "Boston, MA",
    kind: "education",
    year: 2025,
    dates: "Fall 2020 to May 2025",
    start: "2020-09",
    end: "2025-05",
    summary:
      "Concentration in Finance, minor in Economics. Graduated May 2025.",
    bullets: [
      "Studied foundations of data science, machine learning, natural language processing and object oriented design.",
      "Taught two courses as a TA, DS2000 Intro to Data Science and MATH1234.",
      "Capstone: RAG model benchmarking. Research: covert dialect bias in open LLMs, and ESG scores against S&P 500 returns.",
    ],
    skills: ["Data Science", "Machine Learning", "NLP", "Finance", "Economics"],
    links: [],
    photo: {
      alt: "Northeastern University graduation",
      note: "PHOTO SLOT: graduation photo.",
    },
  },

  // ---------------------------------------------------------------- 2024 ---
  {
    id: "zero-clix",
    title: "Founder",
    org: "Zero Clix",
    location: "Boston, MA",
    kind: "venture",
    year: 2024,
    dates: "2024 to present",
    start: "2024-06",
    end: "present",
    featured: true,
    bullets: [
      "Built an AI native SEO and brand visibility platform for a web where the answer arrives before the click.",
      "Introduced LLM Surface Share, a metric for how often a brand appears inside model generated answers rather than in search rankings.",
      "Designed the measurement architecture behind Surface Share, which is the part competitors do not have.",
    ],
    skills: ["AI / SEO", "LLM Tooling", "Product Architecture", "Analytics"],
    links: [], // GAP: live site or demo. See CONTENT-GAPS.md
    photo: {
      alt: "Zero Clix Surface Share dashboard",
      note: "PHOTO SLOT: the Surface Share view. Before and after would be stronger.",
    },
  },
  {
    id: "sherman-center",
    title: "Entrepreneur in Residence",
    org: "The Michael J. and Ann Sherman Center, Northeastern",
    location: "Boston, MA",
    kind: "community",
    year: 2024,
    dates: "Dec 2024 to 2025",
    start: "2024-12",
    end: "2025-12",
    bullets: [
      "Mentored four Venture Co-ops through weekly sessions, from goal setting to shipping.",
      "Built the project management tool the Co-ops report progress in, as an Airtable MVP rather than a document nobody updates.",
      "Convened founders from across the Northeastern ecosystem for events and workshops.",
    ],
    skills: ["Mentorship", "Product Management", "Founder Support", "Airtable"],
    links: [
      {
        label: "Venture Co-op tracker",
        url: "https://airtable.com/applfOVKqssI3LX9y/pagk1LFrpdHccRT9L?ffPPf=recOM4ZGPUSLKY5O8",
      },
    ],
    photo: {
      alt: "Sherman Center founders session",
      note: "PHOTO SLOT: a mentoring session or workshop.",
    },
  },
  {
    id: "tyle",
    title: "Tech Product Manager",
    org: "Tyle.ai",
    location: "Boston, MA",
    kind: "work",
    year: 2024,
    dates: "2024 to 2025",
    start: "2024-01",
    end: "2025-06",
    bullets: [
      "Automated request for proposal workflows for construction NGOs, where the paperwork was eating the work.",
      "Ran the user research, mapped the flow and built the prototype taken to potential customers.",
      "Reached the finals of the US China Young Change Makers competition.",
    ],
    skills: ["Product Management", "User Research", "Prototyping", "Figma"],
    links: [], // GAP: Figma prototype link. See CONTENT-GAPS.md
    photo: {
      alt: "Tyle RFP automation prototype",
      note: "PHOTO SLOT: prototype screens from the Figma.",
    },
  },
  {
    id: "han-managing-director",
    title: "Managing Director",
    org: "Huntington Angels Network",
    location: "Boston, MA",
    kind: "venture",
    year: 2024,
    dates: "2024 to 2025",
    start: "2024-01",
    end: "2025-05",
    bullets: [
      "Led the student run angel network connecting Northeastern founders to capital.",
      "Ran investment recruiting and set the due diligence bar for the team.",
      "Built a matching algorithm in Python to route ventures to the investors most likely to take the meeting.",
    ],
    skills: ["Angel Investing", "Due Diligence", "Python", "Leadership", "Recruiting"],
    links: [
      {
        label: "HAN team page",
        url: "https://huntingtonangelsnetwork.com/people/our-team",
      },
    ],
    photo: {
      alt: "Huntington Angels Network team",
      note: "PHOTO SLOT: team or pitch night photo.",
    },
  },

  // ---------------------------------------------------------------- 2023 ---
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
    summary: "A job matching platform for women in India.",
    bullets: [
      "Built and shipped the MVP and landing page on the MERN stack as the only technical founder.",
      "Hired and led three developer interns on a weekly agile cycle in Jira and Git.",
      "Ran client acquisition directly through Airtable and LinkedIn Sales Navigator.",
      "Won a Northeastern Venture Co-op, which funded the move to Bangalore to build alongside her co-founder.",
    ],
    skills: [
      "MERN Stack",
      "Engineering Leadership",
      "Agile",
      "Sales",
      "Client Acquisition",
      "Product Design",
    ],
    links: [{ label: "findher.work", url: "http://www.findher.work/" }],
    photo: {
      alt: "FindHer product and team in Bangalore",
      note: "PHOTO SLOT: Bangalore team photo, or the FindHer product.",
    },
  },
  {
    id: "husky-startup-challenge",
    title: "Director",
    org: "Husky Startup Challenge, Northeastern Entrepreneurs Club",
    location: "Boston, MA",
    kind: "community",
    year: 2023,
    dates: "Spring 2023",
    start: "2023-01",
    end: "2023-05",
    bullets: [
      "Rebuilt the accelerator curriculum for the university's flagship startup program, having competed in it as a finalist the year before.",
    ],
    skills: ["Program Management", "Curriculum Design", "Startup Coaching"],
    links: [{ label: "Husky Startup Challenge", url: "https://www.nuentrepreneursclub.com/hsc" }],
    photo: {
      alt: "Husky Startup Challenge demo day",
      note: "PHOTO SLOT: demo day or cohort photo.",
    },
  },
  {
    id: "ta-ds2000",
    title: "Teaching Assistant, DS2000 Intro to Data Science",
    org: "Northeastern University",
    location: "Boston, MA",
    kind: "teaching",
    year: 2023,
    dates: "Spring 2023",
    start: "2023-01",
    end: "2023-05",
    bullets: [
      "Taught first exposure to Python and data analysis to students who had never written code.",
    ],
    skills: ["Teaching", "Python", "Data Science"],
    links: [],
    photo: {
      alt: "Teaching data science",
      note: "PHOTO SLOT: optional. Classroom or office hours.",
    },
  },

  // ---------------------------------------------------------------- 2022 ---
  {
    id: "hercules-capital",
    title: "Business Development Analyst, Co-op",
    org: "Hercules Capital BDC",
    location: "Boston, MA",
    kind: "work",
    year: 2022,
    dates: "Jul 2022 to Dec 2022",
    start: "2022-07",
    end: "2022-12",
    bullets: [
      "Researched new investment opportunities for a publicly traded venture lender and sized the markets behind them.",
      "Carried portfolio management responsibilities alongside origination work.",
      "Automated the business development intake process in Excel, cutting the manual step out of deal logging.",
    ],
    skills: [
      "Investment Analysis",
      "Market Research",
      "Portfolio Management",
      "Excel Automation",
    ],
    links: [],
    photo: {
      alt: "Hercules Capital co-op",
      note: "PHOTO SLOT: optional. Office or team photo.",
    },
  },
  {
    id: "huntington-angels-network",
    title: "Junior Associate to Vice President",
    org: "Huntington Angels Network",
    location: "Boston, MA",
    kind: "venture",
    year: 2022,
    dates: "Feb 2022 to Jun 2023",
    start: "2022-02",
    end: "2023-06",
    bullets: [
      "Built the relationships between Northeastern affiliated ventures and the investors who fund them.",
      "Led due diligence teams through venture research and analysis for deal flow.",
      "Moved from Junior Associate to Senior Associate to Vice President in under eighteen months.",
    ],
    skills: ["Venture Capital", "Due Diligence", "Deal Flow", "Team Leadership"],
    links: [
      {
        label: "HAN team page",
        url: "https://huntingtonangelsnetwork.com/people/our-team",
      },
    ],
    photo: {
      alt: "Huntington Angels Network pitch night",
      note: "PHOTO SLOT: pitch night or diligence team.",
    },
  },
  {
    id: "social-frame",
    title: "Founder",
    org: "Social Frame",
    location: "Boston, MA",
    kind: "venture",
    year: 2022,
    dates: "2022",
    start: "2022-01",
    end: "2022-12",
    bullets: [
      "Built AI powered social media optimization for small business owners, from gaps she hit running social for other people.",
      "Presented at Husky Startup Challenge Demo Day as a finalist.",
    ],
    skills: ["AI / ML", "Social Media Analytics", "Entrepreneurship"],
    links: [], // GAP: any surviving artifact. See CONTENT-GAPS.md
    photo: {
      alt: "Social Frame demo day pitch",
      note: "PHOTO SLOT: demo day pitch photo.",
    },
  },

  // ---------------------------------------------------------------- 2021 ---
  {
    id: "dogspotted",
    title: "Business Consultant and Community Manager",
    org: "Dogspotted.com",
    location: "Remote",
    kind: "work",
    year: 2021,
    dates: "Mar 2021 to Aug 2021",
    start: "2021-03",
    end: "2021-08",
    bullets: [
      "Built and ran the social marketing strategy for an early stage consumer startup.",
      "Contributed to the phase two launch.",
    ],
    skills: ["Social Media Strategy", "Community Management", "GTM"],
    links: [], // GAP: site may be dead. See CONTENT-GAPS.md
    photo: {
      alt: "Dogspotted community work",
      note: "PHOTO SLOT: optional. Campaign screenshot.",
    },
  },
  {
    id: "likd-by-anyu",
    title: "Founder",
    org: "Likd by Anyu",
    location: "Boston, MA",
    kind: "venture",
    year: 2021,
    dates: "2021",
    start: "2021-01",
    end: "2021-12",
    bullets: [
      "Turned the social playbook that scaled Bindu into a paid service for small business owners.",
    ],
    skills: ["Social Media Marketing", "Small Business", "Side Venture"],
    links: [], // GAP: any artifact. See CONTENT-GAPS.md
    photo: {
      alt: "Likd by Anyu client work",
      note: "PHOTO SLOT: optional. Client campaign work.",
    },
  },
  {
    id: "eclub-social",
    title: "Social Media Director",
    org: "Entrepreneurs Club, Northeastern",
    location: "Boston, MA",
    kind: "community",
    year: 2021,
    dates: "Spring 2021",
    start: "2021-01",
    end: "2021-05",
    bullets: [
      "Ran content strategy for the largest student entrepreneurship organization on campus.",
    ],
    skills: ["Content Strategy", "Student Leadership"],
    links: [{ label: "NU Entrepreneurs Club", url: "https://www.nuentrepreneursclub.com/" }],
    photo: {
      alt: "Entrepreneurs Club",
      note: "PHOTO SLOT: optional.",
    },
  },
  {
    id: "ta-math1234",
    title: "Teaching Assistant, MATH1234",
    org: "Northeastern University",
    location: "Boston, MA",
    kind: "teaching",
    year: 2021,
    dates: "Fall 2021 to Spring 2022",
    start: "2021-09",
    end: "2022-05",
    bullets: ["Taught business calculus across two semesters."],
    skills: ["Teaching", "Mathematics"],
    links: [],
    photo: {
      alt: "Teaching mathematics",
      note: "PHOTO SLOT: optional.",
    },
  },

  // ---------------------------------------------------------------- 2020 ---
  {
    id: "bindu",
    title: "President and Co-Founder",
    org: "Bindu",
    location: "Hyderabad, India",
    kind: "venture",
    year: 2020,
    dates: "May 2020 to May 2022",
    start: "2020-05",
    end: "2022-05",
    featured: true,
    summary:
      "A non profit against period poverty and stigma in India, founded in high school.",
    bullets: [
      "Raised over 30,000 dollars and put sustainable sanitary products in the hands of more than 7,000 women.",
      "Scaled the organization to 75 members across four teams covering Education, Social Media, Field and Design.",
      "Ran education workshops that reached 3,000 women directly, attacking the stigma rather than only the supply problem.",
    ],
    skills: [
      "Non-Profit Leadership",
      "Fundraising",
      "Community Building",
      "Team Scaling",
      "Program Design",
    ],
    links: [], // GAP: public Bindu site or press. See CONTENT-GAPS.md
    photo: {
      alt: "Bindu field team running a workshop in Hyderabad",
      note: "PHOTO SLOT: field team or workshop photo. This is the strongest image on the page, pick a good one.",
    },
  },

  // ---------------------------------------------------------------- 2019 ---
  {
    id: "dmz-sandbox",
    title: "Entrepreneur and Fellow",
    org: "DMZ Sandbox, Ryerson University",
    location: "Toronto, Canada",
    kind: "venture",
    year: 2019,
    dates: "Jul 2019 to Aug 2019",
    start: "2019-07",
    end: "2019-08",
    summary: "E-Cup, a coffee cup that is actually recyclable.",
    bullets: [
      "Pitched E-Cup, replacing the plastic lining in paper coffee cups with lignin to make them fully biodegradable.",
      "Targeted a real number: only one cup in 400 gets recycled, because of that plastic layer.",
      "Worked under industry mentors in her first startup incubator, which is what led to running one later.",
    ],
    skills: ["Entrepreneurship", "Clean Energy", "Product Design", "Pitching"],
    links: [],
    photo: {
      alt: "E-Cup at DMZ Sandbox in Toronto",
      note: "PHOTO SLOT: pitch photo or the E-Cup prototype.",
    },
  },
  {
    id: "student-council",
    title: "President of Student Council",
    org: "Aga Khan Academy",
    location: "Hyderabad, India",
    kind: "community",
    year: 2019,
    dates: "Dec 2018 to Dec 2019",
    start: "2018-12",
    end: "2019-12",
    bullets: [
      "Led the student body through the International Baccalaureate years, alongside Model United Nations and sports captaincy.",
    ],
    skills: ["Leadership", "Public Speaking"],
    links: [],
    photo: {
      alt: "Aga Khan Academy student council",
      note: "PHOTO SLOT: school photo. Good early anchor for the timeline.",
    },
  },

  // ---------------------------------------------------------------- 2018 ---
  {
    id: "enterpi",
    title: "Programming Intern",
    org: "Enterpi Solutions",
    location: "Hyderabad, India",
    kind: "work",
    year: 2018,
    dates: "Jun 2018 to Aug 2018",
    start: "2018-06",
    end: "2018-08",
    featured: true,
    summary: "The first job. Age sixteen.",
    bullets: [
      "Built Fitness Bolt, a workout app, in React Native against Firebase and the YouTube API.",
      "Designed a feed that assembled personalized workout routines out of existing YouTube video rather than hosting any.",
      "Learned React and React Native on the job, from the engineers who were shipping it.",
    ],
    skills: ["React Native", "Firebase", "YouTube API", "Mobile Development", "Figma"],
    links: [], // GAP: public Fitness Bolt page. See CONTENT-GAPS.md
    photo: {
      alt: "Fitness Bolt app screens",
      note: "PHOTO SLOT: app screenshot if any survive, or a photo from the internship.",
    },
  },
  {
    id: "tie-innovation-challenge",
    title: "Startup Founder, Second Place",
    org: "TiE Young Entrepreneurs Innovation Challenge",
    location: "Hyderabad, India",
    kind: "award",
    year: 2018,
    dates: "Oct 2018 to Jan 2019",
    start: "2018-10",
    end: "2019-01",
    bullets: [
      "Took second place pitching a temperature sensitive coffee cup, the first version of the idea that became E-Cup.",
    ],
    skills: ["Pitching", "Business Modeling", "Sustainability"],
    links: [],
    photo: {
      alt: "TiE Innovation Challenge pitch",
      note: "PHOTO SLOT: pitch or award photo.",
    },
  },

  // ---------------------------------------------------------------- 2015 ---
  // The brief says the record starts "a little bit before high school". This is
  // that entry. Delete it if the timeline should start at 2018 instead.
  {
    id: "book-upon-a-star",
    title: "Founder and Mentor",
    org: "A Book Upon a Star",
    location: "Hyderabad, India",
    kind: "community",
    year: 2015,
    dates: "Dec 2015 to Dec 2017",
    start: "2015-12",
    end: "2017-12",
    summary: "The first thing she ever built. Age thirteen.",
    bullets: [
      "Founded and mentored a reading program, then volunteered at Chaitanya Vidyalaya through 2018.",
    ],
    skills: ["Community Building", "Mentorship", "Literacy"],
    links: [],
    photo: {
      alt: "A Book Upon a Star reading program",
      note: "PHOTO SLOT: any photo from this, even a bad one. It is the start of the whole story.",
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
