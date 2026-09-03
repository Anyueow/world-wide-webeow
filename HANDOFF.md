# HANDOFF

Living board for ananya-personal. Multiple agents work this repo at once.
**Read `CLAUDE.md` before you touch this file.** Claim before you build, push
the claim, push the finish.

Last updated: 2026-09-03, by `opus-5/session_014ecdjnxdyE`

| Status | Meaning |
| --- | --- |
| `TODO` | Unclaimed. Anyone can take it. |
| `IN PROGRESS` | Claimed. Owner and claim time are filled in. Hands off. |
| `BLOCKED` | Waiting on Ananya or on another task. Blocker named in Notes. |
| `DONE` | Built, verified, pushed. Notes say what and where. |
| `NEEDS REWORK` | Built, but Ananya rejected it. Do not rebuild without her specifics. |
| `SUPERSEDED` | Was real work, is now dead. Do not polish it. Kept for history. |

---

# READ THIS FIRST: two decisions that invalidate a lot of the board

Ananya made two calls on 2026-09-03 that change the architecture, not just the
content. Everything below is organised around them.

**1. The site is ONE PAGE. One scroll. No routes.**
Her words: "there should only ever be a single page on scroll, multiple site
personal websites are an ick." So `/who-am-i`, `/experiences`, `/impact` and
`/contact` all collapse into `/`. Those routes get deleted, not hidden.

**2. The site IS a game.** Not a page with a game on it. See Workstream G.

**3. Every fact currently in `src/content/` is REJECTED.** Her words: "I hate
all the content. It's inaccurate on so many levels." Do not patch it, do not
cite it, do not copy a bullet out of it into something new. It was derived from
Notion pages that contradict each other and are in places years stale. It is
quarantined until Workstream 0 replaces it wholesale.

---

# FOR AN AGENT WITHOUT THE NOTION CONNECTOR

Everything in **Workstream G** is yours. None of it needs Notion. The blocking
research is done far enough that the game can be built now:

- `src/lib/game-types.ts` is the contract. Read it first.
- `src/content/game-items.ts` has 15 true items and 6 decoys, already written,
  already sourced, with pixel art authored as data.
- `src/components/game/PixelIcon.tsx` renders a grid to SVG. It works. Use it.

So the game board, the basket, the collection animation, the scorecard, the
single page collapse, mobile and accessibility are all unblocked. Claim
T-G.1 through T-G.9 and go.

**Do not** touch `src/content/experiences.ts` or `src/content/impact.ts`. Those
are quarantined rejected content and rebuilding them needs Notion plus Ananya.

Tasks are tagged `[no-notion]` or `[needs-notion]` below.


---

# Workstream 0: Truth and story `[needs-notion]`

**This blocks everything else. Nothing that renders a fact about Ananya should
be built until this lands.**

The failure being fixed: an agent read seven Notion pages, found conflicts,
picked a side silently, and shipped 29 experience entries that were wrong.
The fix is not "read harder". The fix is a **fact ledger where every single
claim carries a source and a confidence**, and where conflicts are escalated to
Ananya rather than resolved by an agent's judgement.

**Source hierarchy. This is the tiebreaker. Use it, do not improvise.**

1. Ananya's direct answers in conversation. Beats everything.
2. A current resume PDF, if one is supplied.
3. Notion, newest page wins over older page on the same fact.
4. Nothing else. No inference, no "this seems likely", no LinkedIn scraping.

If a fact appears in exactly one place and nowhere else, that is confidence
`single-source`, not confidence `confirmed`. Mark it and move on.

**Model:** Opus for all of it. This is synthesis and judgement about a person,
which is the exact thing a smaller model will smooth into generic mush, and
generic is the one outcome Ananya has explicitly banned.

**Tools:** `mcp__Notion__search` (empty query plus filters to enumerate, not
just semantic search) and `mcp__Notion__fetch` for every hit. `Write` for the
ledger and biography. `AskUserQuestion` for the interview. Do **not** use
`WebFetch` on ananya-personal.netlify.app, the egress proxy blocks it.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-0.1 | Quarantine the rejected content | DONE | opus-5/014ecdjnxdyE | Warning headers added to `src/content/experiences.ts` and `impact.ts` telling any agent the data is rejected and not to build on it. |
| T-0.2 | Enumerate every Notion page, do not sample | DONE | opus-5/014ecdjnxdyE | Not just the 7 named in the master spec. Sweep: every page tagged `ananya 101` in Life in Pages, every project sub-page (Bindu, FoundHer/FindHer, Fitness Bolt, E-Cup, Social Frame, Likd by Anyu, Dogspotted), Academics for the research work, and the Leprechaun knowledge base. Use `mcp__Notion__search` with an empty query plus a teamspace or date filter to LIST pages, since semantic search silently misses things. Output: a checklist of every page URL with a read/not-read box, committed as `research/notion-index.md`. |
| T-0.3 | Build the fact ledger | IN PROGRESS | opus-5/014ecdjnxdyE | Blocked on T-0.2. One row per atomic claim: the claim, every source that states it, every source that contradicts it, and a confidence of `confirmed` / `single-source` / `CONFLICT`. Commit as `research/fact-ledger.md`. This is the artifact that makes the next agent unable to repeat the mistake. Expect 150+ rows. Known conflicts to resolve, do not silently pick: HAN title by year, Bindu reach (7,000 vs 8,000), Zero Clix and Tyle start years, Sherman Center end date, FindHer vs FoundHer naming, which LinkedIn handle. |
| T-0.4 | Interview Ananya | IN PROGRESS | opus-5/014ecdjnxdyE | Blocked on T-0.3. **She chose this over supplying a resume, so it is the primary input, not a formality.** Two halves. (a) Every `CONFLICT` row, asked as a specific closed question she can answer in three words. (b) The autobiography questions, which are in no Notion page and cannot be derived: what is her core, who is she when nothing is being measured, what actually drives her, what is she avoiding, what does she want people to be wrong about. Use `AskUserQuestion` in batches of 4, not one giant wall. |
| T-0.5 | Write the biography | TODO | | Blocked on T-0.4. `research/BIOGRAPHY.md`. Not website copy. The long, honest read: origin, the through-line, the contradictions, the drivers, what the pattern across 2015 to 2026 actually says about her. Written as if for a book, so that everything the site says can be traced back to a paragraph here. Ananya's framing: "read and study me like you're writing my autobiography." |
| T-0.6 | Frame the story | TODO | | Blocked on T-0.5. One page: the thesis of the site in a sentence, the three beats it moves through, and the specific reason each game symbol is in the game. This is what makes the game mean something rather than being a novelty. Commit as `research/story-frame.md`. |
| T-0.7 | Rebuild the content files from the ledger | TODO | | Blocked on T-0.6. Rewrite `src/content/*` from scratch. **Every fact must carry a `source` field pointing at its ledger row.** A fact with no ledger row does not ship. |
| T-0.8 | Contact details | BLOCKED | | Still unanswered. Ananya must paste email, LinkedIn URL and GitHub URL. Notion has two conflicting LinkedIn handles. `ananya-personal.netlify.app` is the stated source of truth but the egress proxy blocks it from this environment, so no agent can read it. |

---

# Workstream G: The single page game `[no-notion]`

**The concept, in Ananya's words:** "turn the website into a quick game where
users have to click on pixelated icons of things that represent me best or
things I like or associate with, throw in a few fake ones in there so it's like
a two truths and a lie game. Just click on it to collect, have an animation of
collecting the pixelated items in a basket in the bottom right, and give users a
hovering scorecard which includes what they've unlocked knowing about me and why
that symbol was important to me."

Plus: "the design sucks as well. Simplify the shit out of it."

**The one hard constraint that shapes everything.** This site's job is to be the
first thing a recruiter sees when they Google her. So the real content must be
in the server rendered HTML whether or not anyone plays, and someone with 30
seconds and no patience for a game must still get the resume. That is not a
reason to water the game down. It means the game is a **layer over** a real
document, not a replacement for one. Build the honest single page first, then
put the game on top of it.

**Model:** Opus for the game mechanic, the pixel icon system and the motion.
Sonnet is fine for converting the existing sections into single page blocks once
the pattern exists.

**Tools:** `Write` and `Edit`. Playwright through `Bash` for screenshots at 390
and 1440, and `Read` on the PNGs, because a game cannot be judged from source.
`Bash` for build, tsc and lint.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-G.1 | Collapse to a single page | DONE | sonnet-5/session_797907ec | Deleted `src/app/{who-am-i,experiences,impact,contact}/page.tsx`. `src/app/page.tsx` now renders every section inline in scroll order (hero, intro, who-am-i, camera roll, Pacifica tide, into-it list, experiences timeline, impact grid, contact, resume), each wrapped in a `<section id="...">` with `scroll-mt-24`. `nav` in `src/content/site.ts` now points at `#who-am-i` / `#experiences` / `#impact` / `#contact` instead of routes; `SiteHeader` dropped its `usePathname` active-link logic since there is nothing to be "active" against anymore. `sitemap.ts` lists just `/`. JSON-LD merged into a single `Person` node with `hasOccupation`, replacing the old split `Person` (home) plus `ProfilePage` (experiences) scripts. Content itself is untouched, byte for byte, just relocated: still reads from `experiences.ts` and `impact.ts` exactly as the old routes did, per the quarantine note (no new facts, no edits to those files beyond one stale doc-comment fixup in `impact.ts`). Build, tsc, lint clean. Verified in the browser: content is in the static HTML (`grep` on `out/index.html`), nav anchors jump correctly, no console errors. Route count dropped from 11 to 7 in the build output. |
| T-G.2 | Pixel icon system | DONE | opus-5/014ecdjnxdyE | 21 icons: 15 true, 6 decoys, including Ananya's own symbol list (India, monkey, ladoos, fries and a McFlurry, plus her three decoys). Authored as data: each icon is a 16x16 grid of palette indices, rendered to inline SVG by `src/components/game/PixelIcon.tsx`. No image files, scales cleanly, recolours with the tokens, and adding an item is adding a row. Every icon was rendered and looked at; nine were redrawn as a result. Types in `src/lib/game-types.ts`, data in `src/content/game-items.ts`. |
| T-G.3 | The game board | DONE | sonnet-5/session_797907ec | `src/components/game/GameBoard.tsx`, added as a new `#game` section in `src/app/page.tsx` right after the intro. All 14 items from `game-items.ts` render as real `<button>` elements with `aria-label={item.alt}`, tilted with a small deterministic hash of the id (not `Math.random`, so server and client render the same tilt and there is no hydration mismatch). Click toggles the item open: true items add to a `collectedIds` set and the "X of 11 collected" counter updates, decoys never count but still open. A single `aria-live="polite"` region below the board shows the clicked item's `reveal` text, so screen readers hear the payoff without a live region per icon. `aria-pressed` and `aria-expanded` reflect state. No basket, no fly-to-basket animation, no scorecard: those are T-G.4 and T-G.5, this only had to make clicking do something real. Verified by clicking through in the browser: counter increments, reveal text swaps, all 14 icons and their accessible names are present in `out/index.html`. Build, tsc, lint clean. |
| T-G.10 | Reveal copy is not in the server rendered HTML | TODO | | Found by verification on the merged tree. The board renders all 21 icons and their `aria-label`s into `out/index.html`, which is good, but the `reveal` text is not there: it is injected into the live region only on click. `grep "climbing trees" out/index.html` returns 0. **The reveal copy IS the content about Ananya**, so as it stands Google sees a page of buttons and no substance, which breaks the one hard constraint at the top of Workstream G. Fix by rendering every reveal into the DOM up front (a visually hidden list is fine, or the scorecard renders them all and CSS shows the unlocked ones). Likely absorbed by T-G.5, but do not let it fall through the gap between T-G.3 and T-G.5. |
| T-G.4 | Basket and collection animation | TODO | | Bottom right. Collected icon flies from where it was clicked into the basket and lands. Transform and opacity only. Basket shows a count and can be opened to see what is inside. Must degrade to an instant state change under `prefers-reduced-motion`. |
| T-G.5 | Hovering scorecard | TODO | | **UNBLOCKED.** Reveal copy is written per item in `game-items.ts`, marked draft. Shows what the player has unlocked: which symbols they got right, which were decoys, and for each real one, the short piece of Ananya it reveals and why that symbol matters to her. **This is where the biography surfaces, so it is the most important writing on the site.** Blocked on T-0.5. |
| T-G.6 | Reveal-all escape hatch | IN PROGRESS | sonnet-5/session_797907ec-sub, 2026-09-03T01:20Z | A quiet, always visible control that dumps the whole story without playing. Non negotiable for the recruiter case and it costs almost nothing. Also the fallback when JavaScript fails. |
| T-G.7 | The scrolling document underneath | TODO | | The real content as one honest scroll: the story, the work, the proof, how to reach her. Radically simpler than the four pages it replaces. Every fact in the server rendered HTML, so the game never gates what Google can read. Blocked on T-0.7. |
| T-G.8 | Mobile | TODO | | 390px is the real target, since recruiters check on phones. Tap targets at least 44px, basket must not cover content, scorecard becomes a sheet rather than a hover. Hover does not exist on touch, so every hover affordance needs a tap equivalent. |
| T-G.9 | Progress persistence | IN PROGRESS | sonnet-5/session_797907ec, 2026-09-03T01:25Z | Optional and low priority. Remember collected items in `localStorage` so a returning visitor is not reset. Must render correctly when storage throws or is empty. |

---

# Workstream 1: Content

**Status: mostly frozen.** Content work resumes after Workstream 0. The rows
below are kept because the plumbing is still good even though the facts are not.

**Model:** Opus for anything in Ananya's voice. **Tools:** Notion MCP, `Write`.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-1.1 | Typed content shapes | DONE | opus-5/014ecdjnxdyE | `src/lib/types.ts`. The shapes survive the rewrite. Needs a `source` field added per T-0.7. |
| T-1.2 | Pull the master spec from Notion | DONE | opus-5/014ecdjnxdyE | Superseded in practice by T-0.2, which sweeps everything rather than seven pages. |
| T-1.3 | Homepage bio and taglines | NEEDS REWORK | | Rejected with the rest of the content. Tagline "curiouser, curiouser" was chosen by Ananya and survives. |
| T-1.4 | Who Am I copy, captions, Pacifica passage | NEEDS REWORK | | Rejected. The Pacifica metaphor itself is Ananya's and is worth keeping in some form, the four lines are not. |
| T-1.5 | Five prototype experience entries | SUPERSEDED | | Folded into T-1.6. |
| T-1.6 | Full experience timeline | NEEDS REWORK | | 29 entries built from conflicting Notion sources. **Rejected as inaccurate.** Rebuild only via T-0.7. Do not patch. |
| T-1.7 | Impact entries | NEEDS REWORK | | 10 artifacts with real URLs. The **URLs** are probably still good, they came from Notion verbatim, and are worth salvaging into the ledger. The **descriptions** are rejected. |
| T-1.8 | Real contact links | BLOCKED | | See T-0.8. |
| T-1.9 | Three resume PDFs | BLOCKED | | Ananya to supply. Contact block checks the filesystem at build, so a missing PDF shows as unavailable rather than a broken link. |
| T-1.10 | Camera roll photos | BLOCKED | | 9 labelled slots. May be superseded by the game, decide during T-G.7. |
| T-1.11 | Experience photos | BLOCKED | | Likely superseded by the game. |
| T-1.12 | Professional headshot | BLOCKED | | Ananya to supply. |

---

# Workstream 2: Design

**Model:** Opus. **Tools:** `Write`/`Edit`, Playwright screenshots, `Read` on
the PNGs. Do not mark a design task done without looking at it.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-2.1 | Palette and type tokens | DONE | opus-5/014ecdjnxdyE | `src/app/globals.css`. Pacifica dusk, chosen by Ananya. Fraunces plus Inter. **Survives the rebuild.** Pixel art will need a couple of extra palette entries. |
| T-2.2 | Layout shell | NEEDS REWORK | | Header, footer, container, buttons. A four route nav is meaningless on a single page. Container and buttons survive. |
| T-2.3 | Hero | NEEDS REWORK | | The caricature processing work survives (952KB to 59KB, real alpha). The hero itself is replaced by the game. |
| T-2.4 | Camera roll pile | SUPERSEDED | | Replaced by the game board. |
| T-2.5 | Pacifica tide | NEEDS REWORK | | The clip-path tide is the one piece of the old design worth arguing to keep. Decide during T-G.7 whether it survives as a beat in the single scroll. |
| T-2.6 | Experiences timeline | SUPERSEDED | | Ananya never approved the interaction and the content under it was wrong. Do not polish it. Some of it may return as a compact block in T-G.7. |
| T-2.7 | Contact page | SUPERSEDED | | Becomes a block on the single page. |
| T-2.8 | Impact card grid | SUPERSEDED | | Folded into T-G.7. |
| T-2.9 | Headshot placement | TODO | | Depends on T-1.12 and on what the game leaves room for. |
| T-2.10 | Dark mode | TODO | | Lowest priority. Tokens are centralised so it stays cheap. |
| T-2.11 | Favicon and OG image | DONE | sonnet-5/session_797907ec | `src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx` via `next/og` with `dynamic = "force-static"`. See T-3.15 for the Content-Type fix these needed. |

---

# Workstream 3: Animation, responsiveness, bugs

**Model:** Opus for motion architecture and scroll performance. Sonnet for a
contained breakpoint fix. **Tools:** Playwright at 390/768/1024/1440/2560,
`Bash` for build and tsc.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-3.1 | Motion primitives | DONE | opus-5/014ecdjnxdyE | `Reveal`, `VariableText`, `CustomCursor`, `app/template.tsx`. **Survives.** The game should reuse this vocabulary rather than inventing its own easing. |
| T-3.2 | Reduced motion support | DONE | opus-5/014ecdjnxdyE | Every animated component branches in JS via `useReducedMotion`, plus a CSS backstop. **The game must hold this line**, especially the collection animation. |
| T-3.3 | Scroll performance discipline | DONE | opus-5/014ecdjnxdyE | Scroll driven animation is opacity and transform only. Rule lives in `CLAUDE.md`. Keep it. |
| T-3.4 | Sticky year rail bug | SUPERSEDED | | Timeline is gone. |
| T-3.5 | Caricature checkerboard | DONE | opus-5/014ecdjnxdyE | Source PNG had a flattened transparency checkerboard. Converted luminance to alpha. Asset survives. |
| T-3.6 | Mobile header wrap | SUPERSEDED | | Header is being rebuilt. |
| T-3.12 | Header colliding with body text | SUPERSEDED | | Same. The retract-on-scroll idea is worth reusing. |
| T-3.14 | Timeline render cost | SUPERSEDED | | Timeline is gone. The lesson survives and is worth reading before building the game board: `content-visibility: auto`, and never mount a scroll subscriber per item. |
| T-3.15 | OG and icons served as octet-stream | DONE | opus-5/014ecdjnxdyE | `next/og` under `output: export` emits PNGs at extensionless paths, so Netlify served them as `application/octet-stream` and LinkedIn would not render the share card. Fixed with explicit `Content-Type` headers in `netlify.toml`. **Any future `next/og` route needs the same.** |
| T-3.7 | Full responsive audit | TODO | | Redo after the game lands. |
| T-3.8 | Lighthouse 90+ | TODO | | Run against built output, not the dev server. |
| T-3.9 | Per item scroll subscribers | SUPERSEDED | | Solved in T-3.14, and the timeline is gone. |
| T-3.10 | Keyboard and screen reader pass | TODO | | **Much higher stakes now.** A click-to-collect game is trivially inaccessible if built carelessly. Real buttons, focus order, live region for the scorecard. |
| T-3.11 | Cross browser check | TODO | | Safari: `mix-blend-difference` on a fixed header and `clip-path` animation are the risky spots. |
| T-3.13 | Netlify hosting configuration | TODO | | Custom domain and HTTPS are dashboard work Ananya has to do. Agent side: a redirects fallback for the 404, and switching `site.url` when a real domain exists. |

---

# Workstream 4: Verification

A dedicated reviewer that runs after any workstream lands. It does not build. It
checks, reports, and files new `TODO` rows.

**Model:** Opus. It has to hold the brief and the rendered output in mind at once
and say whether they match.

**Tools:** `Bash` for dev server, build, tsc, lint. Playwright for screenshots
and timings. `Read` on the screenshots, actually look at them. `Grep` on `out/`
to verify server rendered content. Notion MCP to re-read what it checks against.

**What it checks, every pass:**

1. **Does it match the brief.** Every requirement, not the testable ones.
2. **Does the build pass.** `npm run build`, `npx tsc --noEmit`, `npm run lint`.
3. **Is it fast.** Lighthouse on the built output. LCP, CLS, TBT, bytes.
4. **Is the content really there.** `grep` the emitted HTML in `out/`. Content
   that only exists after hydration is a bug.
5. **Is it actually true.** New, and the most important one. Every rendered fact
   traces to a row in `research/fact-ledger.md`. A fact with no row is a defect
   at the same severity as a crash.
6. **Does it look right.** Screenshots at 390, 768, 1440, 2560.
7. **Does it move right.** Motion on, and reduced motion forced.
8. **Voice.** Grep for em dashes. Read new copy against `CLAUDE.md`.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-4.1 | Verification pass on the prototype | DONE | opus-5/014ecdjnxdyE | Found 5 rendering bugs. Did **not** catch that the content was factually wrong, which is why check 5 now exists. |
| T-4.2 | Lighthouse baseline | TODO | | Run before anyone optimises, so there is a comparison point. |
| T-4.3 | Verification pass after the game lands | TODO | | Blocked on Workstream G. |
| T-4.4 | Pre launch pass | TODO | | Every outbound link resolves, no placeholder string survives, every fact has a ledger row. |

---

# Open questions for Ananya

1. **Contact details.** Email, LinkedIn URL, GitHub URL, pasted here. Blocking.
2. **The interview.** T-0.4. She chose this as the source of truth, so the
   quality of the whole site now depends on it.
3. **Which symbols?** The game needs roughly 18 real things and 6 convincing
   decoys. Some come out of the biography, but her own list will be better than
   anything derived.
4. **How honest are the decoys?** A decoy that is obviously wrong is not fun. A
   decoy that is nearly true is. How close to the bone can they go.
