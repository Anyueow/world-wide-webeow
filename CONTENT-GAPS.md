# CONTENT GAPS

Everything the site needs that was not in Notion. Fill a line here, tell me, and
it goes straight into the build. Nothing on this list is guessed anywhere in the
codebase: where a link is missing the site renders no link at all, and where a
photo is missing it renders a labelled empty slot the same size as the photo.

**How to use this file.** Write the answer next to the item, in this file, and
commit. That is enough. Each item names the exact file and field it lands in, so
an agent picking this up later does not have to work out where it goes.

Built from all seven Notion source pages named in the master spec, plus the NLP
final paper page found by search. Last swept 2026-09-02.

---

## A. Blocking. The site is worse without these.

| ID | What I need | Where it lands | Notes |
| --- | --- | --- | --- |
| A-1 | **Three resume PDFs** | `/public/resume/` | Filenames already wired: `ananya-shah-product.pdf`, `ananya-shah-data.pdf`, `ananya-shah-founder.pdf`. Rename them or tell me the real split. Ananya.md calls them Resume A (GTM and Revenue Ops), B (AI Builder and Product), C (Strategy and BizOps), which does not match the three labels I put in `site.ts`. **Which split is right?** There is also an older Docsend at https://docsend.com/view/95srqpryrzmtwu4x, confirm whether that is still current. Contact page checks the filesystem at build, so a missing PDF shows as "not added yet" rather than a broken link. |
| A-2 | **Professional headshot** | `/public/images/` then `headshot` in `src/content/site.ts` | The caricature carries the hero right now. Notion has a `Headshot.jpeg` as the page icon on two pages but I cannot pull it at usable resolution. |
| A-3 | **Camera roll photos, 9 slots** | `/public/images/camera-roll/` then `src` on each entry in `src/content/camera-roll.ts` | Each slot has a note saying what belongs there: running, DJing, two travel frames, hosting, Pacifica, an animal, a build session, outdoors. Pacifica ideally the Taco Bell Cantina, since that is the stated happy place (https://goo.gl/maps/ymEH7qJTcoiwHuQu9). |
| A-4 | **The research paper, somewhere public** | `url` on `lora-light-debiasing` in `src/content/impact.ts` | "LoRA-Light Debiasing: Removing Covert Dialect Bias from Open LLMs". The Notion page is private, so the card currently has no link and does not render. arXiv, a course page, a PDF in the repo, or a Google Drive link all work. **Also: was this actually published anywhere?** The master spec says "published research papers". I have described it as research, not as published, until you confirm a venue. |
| A-5 | **LinkedIn handle, confirm** | `contact.linkedin` in `src/content/site.ts` | Two live in Notion. `linkedin.com/in/anyushah` (2025 reference card, 2026 spec) and `linkedin.com/in/ananya-shah-85372918a` (2023 to 2024 pages). I used the newer one. |

---

## B. Links and evidence that do not exist yet

Every one of these is an experience or artifact with no public URL found. The
entry renders fine without it, it just has no proof attached.

### Ventures and products

| ID | Item | Where it lands | What would work |
| --- | --- | --- | --- |
| B-1 | **Leprechaun** | `links` on `leprechaun`, `src/content/experiences.ts` | Live URL, repo, or a demo video. Currently your most important entry with zero evidence. |
| B-2 | **Zero Clix** | `links` on `zero-clix` | Live site or demo. The May 2026 spec wanted the LLM Surface Share metric shown explicitly with a before and after screenshot. Worth doing. |
| B-3 | **Compound / Retain** | `links` on `compound` | Demo, repo, or the VibeJam Spring 2026 entry page. |
| B-4 | **Clarity** | `links` on `clarity` | Prototype link or a shareable PRD. |
| B-5 | **Night Owl** | `links` on `night-owl` | Anything public. Deck, landing page, repo. |
| B-6 | **Ping** | `links` on `ping` | Product URL. |
| B-7 | **Social Frame** | `links` on `social-frame` | Any surviving artifact. Deck, demo day listing, screenshot. Fine if it is gone. |
| B-8 | **Likd by Anyu** | `links` on `likd-by-anyu` | Instagram or a client example. |
| B-9 | **Bindu** | `links` on `bindu` | Public site, Instagram, or press. This entry has the strongest numbers on the whole timeline and currently nothing to click. **Highest value item in section B.** |
| B-10 | **Dogspotted** | `links` on `dogspotted` | dogspotted.com appears dead. Confirm and I will leave it linkless. |
| B-11 | **Fitness Bolt** | `links` on `enterpi` | The Notion page is private. A screenshot or an App Store archive would do. |
| B-12 | **E-Cup** | `links` on `dmz-sandbox` | DMZ Sandbox cohort listing, or the pitch deck. |

### Prototypes and design files

| ID | Item | Where it lands | Notes |
| --- | --- | --- | --- |
| B-13 | **Tyle Figma prototype** | `links` on `tyle`, and a new `Prototype` card in `impact.ts` | The old portfolio page has this as an embedded Figma that the API returns as an unresolvable block. I need the raw share URL. |
| B-14 | **FindHer Figma** | new `Prototype` card in `impact.ts` | Same problem, embedded block, no URL. You called this "my biggest undertaking so far" and "designed our entire product", so the design file is worth showing. |
| B-15 | **Sandcastles Figma** | `sandcastles` in `impact.ts` | The Framer site link works. The Figma is an unresolvable embed. |

### Academic artifacts

| ID | Item | Where it lands | Notes |
| --- | --- | --- | --- |
| B-16 | **RAG Model Benchmarking capstone (DS 4300)** | new `Research` card in `impact.ts` | Named in the reference card, no artifact found. Repo, paper or slides. |
| B-17 | **ESG Scores vs S&P 500 Returns** | new `Research` card | Named in two sources, no artifact found. |
| B-18 | **Trend Prediction from Social Media (DS 4420)** | new `Research` card | Named in the reference card, no artifact found. |
| B-19 | **TradePulse, stock prediction** | new `Project` card | Exists only as a PDF attached to a Notion page. Send me the PDF and I will host it in `/public`. |
| B-20 | **My Journal App** | new `Project` card | Repo is private. Notion says "the readme is linked" but the link does not resolve. Public readme or a gist. |
| B-21 | **WHOOP Labs research** | possibly a `Research` card | The May 2026 spec wanted this mentioned "to show range". I have no detail on it at all. What was it? |

### Talks and press

| ID | Item | Where it lands | Notes |
| --- | --- | --- | --- |
| B-22 | **AI Runtime talk** | `links` on `ai-runtime-talk`, plus a `Talk` card | Recording, slides, or the event page. June 16 2026, organized by Kranthi. |
| B-23 | **AI Collective Boston** | `links` on `ai-collective-boston` | Chapter page or Luma. Specific events worth linking: Open Source Drop-In with Cursor Boston during Boston Tech Week, the Women in AI night with SVB, and Humans in AI. |
| B-24 | **Any press at all** | new `Press` cards | The master spec asks for "articles or press that can be quoted". I found none. Northeastern coverage of Bindu, FindHer or HAN would be ideal. |

---

## C. Facts to confirm

| ID | Question | Why it matters |
| --- | --- | --- |
| C-1 | LinkedIn handle. See A-5. | Wrong link on every page footer. |
| C-2 | **Huntington Angels Network dates.** One Notion page says Managing Director in Spring 2023, another says Vice President through Fall 2023 and Managing Director in Spring 2024. I used VP Feb 2022 to Jun 2023, then Managing Director 2024 to 2025. | Two entries on the timeline are dated off this. |
| C-3 | **Sherman Center end date.** Notion says "December 2024 to Present" as of 2024. I have it ending in 2025. Still active? | Changes whether it says "to present". |
| C-4 | **Ping dates.** I have 2025 with no months. | Timeline ordering within the year. |
| C-5 | **Zero Clix and Tyle start dates.** The master spec files both under 2024, the reference card lists both as current in 2025. I used 2024 starts. | Which year bucket they appear in. |
| C-6 | **Cartesian, one entry or two?** The master spec lists 2025 and 2026 separately. I merged them into one entry running 2025 to present, with the March 2026 spike work in the bullets. Splitting makes the timeline longer but repeats the employer. | Structure of the two densest years. |
| C-7 | **Should the timeline start in 2015 or 2018?** Your copy says the record starts "a little bit before high school", so I added A Book Upon a Star, 2015 to 2017, age thirteen. The spec elsewhere says 2018 to present. Both are defensible. Say the word and I delete it. | Adds a whole year group at the bottom. |
| C-8 | **Bindu impact numbers.** The master spec says 7,000 women and 3,000 workshop attendees. The 2023 site page says "over 8,000 individuals". I used the master spec numbers. | These are the strongest numbers on the site, they should be the right ones. |
| C-9 | **Do you want the STEM OPT mention?** The May 2026 spec asked for it "somewhere subtle, for recruiters who care". I left it out. | Recruiter signal, and your call entirely. |
| C-10 | **Do you want SF relocation stated?** The May 2026 spec said state it clearly. The September 2026 spec does not mention it, and the hero currently says Boston. | Changes the hero line and the meta description. |
| C-11 | **Northeastern email.** `shah.anan@northeastern.edu` appears on the old site page. You graduated May 2025, so I assume it is dead and used the Gmail. | Contact page. |
| C-12 | **Experience photos, roughly 25 slots.** Every entry has one, each with a note saying what belongs there. Not blocking, and the layout is correct without them. | Fills out the timeline. |

---

## D. Copy still unapproved

All of this is written and marked DRAFT in the code. It is mine, not yours, until
you say otherwise.

| ID | What | Where |
| --- | --- | --- |
| D-1 | Homepage bio, three lines | `bio` in `src/content/site.ts` |
| D-2 | Pacifica passage, four lines | `lines` in `src/components/whoami/PacificaTide.tsx` |
| D-3 | Camera roll captions, nine | `src/content/camera-roll.ts` |
| D-4 | "What I am into" list, six items | `src/app/who-am-i/page.tsx` |
| D-5 | Every experience bullet | `src/content/experiences.ts`. Rewritten from Notion into action verb first form. The facts are yours, the phrasing is mine. |
| D-6 | Every Impact description | `src/content/impact.ts`. Same. |

The Experiences opening paragraph is your words verbatim and I have not touched
it.

---

## E. Things I deliberately left out

Flagging these so you can overrule me.

1. **GPA.** In Notion as 3.26 and 3.3. Not on the site. Add it only if you want it.
2. **Personal details** from the reference card: date of birth, address, rent,
   credit cards, investment strategy. Obviously not going on a public site.
3. **Named colleagues and stakeholders** from Ananya.md. Real people, no consent,
   not mine to publish.
4. **"Passionate startup founder and tech enthusiast"** from the 2023 portfolio
   page. That is the exact voice your own rules ban.
5. **Client specifics from Charter** beyond what is already in the resume style
   bullets. No stakeholder names, no internal ticket numbers.
