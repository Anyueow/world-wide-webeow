# HANDOFF

Living board for ananya-personal. Multiple agents work this repo at once.
**Read `CLAUDE.md` before you touch this file.** Claim before you build, push
the claim, push the finish.

Last updated: 2026-09-02, by `opus-5/session_014ecdjnxdyE`

| Status | Meaning |
| --- | --- |
| `TODO` | Unclaimed. Anyone can take it. |
| `IN PROGRESS` | Claimed. Owner and claim time are filled in. Hands off. |
| `BLOCKED` | Waiting on Ananya or on another task. Blocker named in Notes. |
| `DONE` | Built, verified, pushed. Notes say what and where. |

---

## Workstream 1: Content

Copy, data, photos, links. The stuff only Ananya can supply, plus the plumbing
that consumes it.

**Model:** Sonnet is enough for data entry from a known source. Use Opus for
anything that writes copy in Ananya's voice, since voice is the hard part and
generic copy is the one thing she has explicitly banned.

**Tools:** `mcp__Notion__fetch` and `mcp__Notion__search` for source material,
`Read`/`Write`/`Edit` for the content files, `Grep` to check nothing hardcodes
copy in a component.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-1.1 | Typed content shapes for Experience and ImpactItem | DONE | opus-5/014ecdjnxdyE | `src/lib/types.ts`. Every field doc commented. Add an object to the array and it renders. |
| T-1.2 | Pull the full spec from Notion | DONE | opus-5/014ecdjnxdyE | Source: "Personal Website Specs with Content". Full 2018 to 2026 role list, voice rules, Impact source list. |
| T-1.3 | Draft homepage bio and tagline options | DONE | opus-5/014ecdjnxdyE | `src/content/site.ts`. Marked DRAFT. Tagline locked to "curiouser, curiouser" by Ananya. Bio is 3 lines, unapproved. |
| T-1.4 | Draft Who Am I copy, camera roll captions, Pacifica passage | DONE | opus-5/014ecdjnxdyE | `src/content/camera-roll.ts` and inline in `PacificaTide.tsx`. All marked DRAFT. |
| T-1.5 | Five prototype experience entries | DONE | opus-5/014ecdjnxdyE | `src/content/experiences.ts`. Enterpi 2018, Bindu 2020, FindHer 2023, Cartesian 2025, Leprechaun 2026. Real data from Notion. |
| T-1.6 | Remaining ~20 experience entries | BLOCKED | | Blocked on Ananya approving the timeline interaction (T-2.6). Source data already in the Notion spec, so this is transcription, not research. Entries listed in the header comment of `experiences.ts`. |
| T-1.7 | Impact entries with real URLs | BLOCKED | | Blocked on Ananya supplying links. Source list is in the header comment of `src/content/impact.ts`. Papers, repos, Figma files, Airtable MVPs, the AI Runtime talk. |
| T-1.8 | Real contact links | BLOCKED | | Blocked on Ananya. `src/content/site.ts` currently ships `REPLACE-ME` placeholders on purpose. Do not guess a LinkedIn or GitHub URL. |
| T-1.9 | Three resume PDFs | BLOCKED | | Blocked on Ananya. Drop into `/public/resume/`, filenames already referenced in `site.ts`. Contact page checks the filesystem at build and only shows a link if the file exists. |
| T-1.10 | Camera roll photos | BLOCKED | | Blocked on Ananya. 9 labelled slots in `src/content/camera-roll.ts`. Add a `src` to a slot, that is the whole job. |
| T-1.11 | Experience photos | BLOCKED | | Blocked on Ananya. One slot per entry, `photo.note` says what belongs there. |
| T-1.12 | Professional headshot | BLOCKED | | Blocked on Ananya. `headshot` in `site.ts`. Not yet placed on the homepage, the caricature holds the hero. |

---

## Workstream 2: Design

Layout, type, palette, composition. What it looks like standing still.

**Model:** Opus. Design judgement is the whole task and it is the thing being
judged by recruiters in the first 30 seconds.

**Tools:** `Write`/`Edit` for components, Playwright through `Bash` for
screenshots at real viewports, `Read` on the PNGs to actually look at the
result. Do not mark a design task done without looking at it.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-2.1 | Palette and type tokens | DONE | opus-5/014ecdjnxdyE | `src/app/globals.css`. Pacifica dusk, chosen by Ananya over teal and violet. Fraunces plus Inter, chosen over Bricolage and Instrument Serif. Fluid `text-*` scale, no breakpoint soup. |
| T-2.2 | Layout shell: header, footer, container, buttons, links | DONE | opus-5/014ecdjnxdyE | `src/components/layout` and `src/components/ui`. Header uses `mix-blend-difference` so it inverts over the dark Pacifica panel without a scroll listener. |
| T-2.3 | Hero | DONE | opus-5/014ecdjnxdyE | Caricature reprocessed: the supplied PNG had a baked in transparency checkerboard, converted luminance to alpha and cropped to the figure. 952KB to 59KB. |
| T-2.4 | Who Am I: camera roll pile | DONE | opus-5/014ecdjnxdyE | CSS columns, not grid, so heights stagger like a real dump of photos. Tilt per tile, straightens on hover. |
| T-2.5 | Who Am I: Pacifica tide | DONE | opus-5/014ecdjnxdyE | Two stacked copies of the passage, clip-path reveals the ocean copy as you scroll. Duplicate is aria-hidden. |
| T-2.6 | Experiences timeline design | DONE | opus-5/014ecdjnxdyE | **Awaiting Ananya's approval before Impact is designed.** Sticky year rail, coral spine, collapsible year groups, alternating photo side, parallax. |
| T-2.7 | Contact page | DONE | opus-5/014ecdjnxdyE | Deliberately plain, per brief. Three channels plus the resume list. |
| T-2.8 | Impact card grid and masonry | TODO | | Held until T-2.6 is signed off so the card can inherit the timeline's visual language. Page and data wiring already exist, only the card design is missing. |
| T-2.9 | Homepage headshot placement | TODO | | Decide whether the real headshot sits on the homepage next to the caricature, or on Who Am I. Depends on T-1.12. |
| T-2.10 | Dark mode | TODO | | "Optional but nice to have" per the spec. Tokens are already centralised, so this is a token swap plus a toggle, not a rewrite. Lowest priority. |
| T-2.11 | Favicon and OG image | TODO | | OG currently points at the caricature, which works. A dedicated 1200x630 card would be better. Favicon is still the Next default. |

---

## Workstream 3: Animation, responsiveness, bugs

Motion, breakpoints, and everything that only shows up once it moves.

**Model:** Opus for the motion architecture and scroll performance work.
Sonnet is fine for a contained breakpoint fix once the pattern exists.

**Tools:** Playwright through `Bash` at 390, 768, 1024, 1440 and 2560, capturing
at several scroll offsets. `Bash` for `npm run build` and `tsc`. Chrome DevTools
protocol through Playwright if you need real frame timings.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-3.1 | Motion primitives | DONE | opus-5/014ecdjnxdyE | `Reveal`, `VariableText`, `CustomCursor`, `app/template.tsx`. One vocabulary, reused everywhere, so nothing invents its own easing. |
| T-3.2 | Reduced motion support | DONE | opus-5/014ecdjnxdyE | Every animated component branches on `useReducedMotion` in JS and returns a static element, plus a CSS backstop in `globals.css`. Not just a media query. |
| T-3.3 | Scroll performance discipline | DONE | opus-5/014ecdjnxdyE | Scroll driven animation is opacity and transform only. Layout animation happens on click only, in `YearGroup`. This rule is in `CLAUDE.md`, keep it. |
| T-3.4 | Sticky year rail bug | DONE | opus-5/014ecdjnxdyE | The nav was a stretched grid item, so it spanned the whole timeline and had nothing to stick to. Fixed with `self-start`. |
| T-3.5 | Caricature checkerboard bug | DONE | opus-5/014ecdjnxdyE | Source PNG shipped a flattened transparency checkerboard. Converted to real alpha. |
| T-3.6 | Mobile header wrap bug | DONE | opus-5/014ecdjnxdyE | Brand and nav wrapped to two lines at 390px. Brand collapses to "AS" below `sm`, nav gaps tightened, `whitespace-nowrap` throughout. |
| T-3.7 | Full responsive audit | TODO | | Every page at 390, 768, 1024, 1440, 2560. The timeline at 768 in particular: it drops to one column there and the alternation stops, needs a look. |
| T-3.8 | Lighthouse 90+ on all four pages | TODO | | Not yet measured. Run against the built static output, not the dev server. Watch LCP on the hero and CLS on the photo slots. |
| T-3.9 | Timeline performance with 25 entries | TODO | | Currently five entries. Each one mounts its own `useScroll` and `useInView`. At 25 that is 50 scroll subscribers, which may need consolidating into one shared scroll listener. Measure before rewriting. |
| T-3.10 | Keyboard and screen reader pass | TODO | | Focus order, focus visibility on the year rail and collapsed groups, and whether the aria-hidden tide duplicate is announced anywhere it should not be. |
| T-3.11 | Cross browser check | TODO | | Safari especially: `mix-blend-difference` on a fixed header, `clip-path` animation on the tide, and CSS columns in the camera roll are the three risky spots. |

---

## Workstream 4: Verification

A dedicated reviewer that runs after any workstream lands something. This agent
does not build. It checks, reports, and files new `TODO` rows for what it finds.

**Model:** Opus. It has to hold the brief and the rendered output in mind at the
same time and say whether they match, which is judgement, not a checklist.

**Tools:** `Bash` to start the dev server and run the build, Playwright through
`Bash` for screenshots and timings, `Read` on the screenshots to actually look,
`Grep` on `out/` to verify server rendered content, `mcp__Notion__fetch` to
re-read the spec it is checking against.

**What it checks, every pass:**

1. **Does it match the brief.** Re-read the Notion spec and the original brief.
   Every requirement, not the ones that are easy to test. Flag anything that
   drifted.
2. **Does the build pass.** `npm run build`, `npx tsc --noEmit`, `npm run lint`.
   All three, clean.
3. **Is it fast.** Lighthouse against the built output. LCP, CLS, TBT, total
   bytes. The target is 90+ and the brief says creative direction never costs
   speed.
4. **Is the content really there.** `grep` the emitted HTML in `out/` for
   bullets, skills and links. If content only exists after hydration, that is a
   bug, not a preference.
5. **Does it look right.** Screenshots at 390, 768, 1440 and 2560, at several
   scroll offsets, and actually look at them. Overlaps, clipped text, orphaned
   headings, dead space, misaligned baselines.
6. **Does it move right.** Scroll through with motion on and with reduced motion
   forced. Check nothing janks and nothing shifts under the reader.
7. **Voice.** Grep the whole repo for em dashes. Read any new copy against the
   voice rules in `CLAUDE.md`.

| ID | Task | Status | Owner | Notes |
| --- | --- | --- | --- | --- |
| T-4.1 | Verification pass on the prototype | DONE | opus-5/014ecdjnxdyE | Found and fixed 4 bugs: sticky rail, caricature checkerboard, mobile header wrap, chevron direction. Build clean, no page errors, content confirmed in static HTML. |
| T-4.2 | Lighthouse baseline | TODO | | First real numbers. Run before anyone optimises anything, so there is something to compare against. |
| T-4.3 | Verification pass after Impact lands | TODO | | Blocked until T-2.8. |
| T-4.4 | Pre launch pass | TODO | | The last one before the domain is pointed. Includes checking every outbound link resolves and no `REPLACE-ME` string survives anywhere. |

---

## Open questions for Ananya

1. **Timeline interaction: approve or redirect?** This is the gate on Impact and
   on the remaining 20 entries. Specifically: entries stay fully expanded and
   scroll only changes emphasis, rather than expanding and collapsing as you
   pass them. That was deliberate, since auto expanding on scroll shifts the
   page under a reader. Year groups collapse on click instead.
2. **Bio copy.** Three draft lines on the homepage. Argue with them.
3. **Pacifica passage.** Four draft lines. The tide rising through the type is
   the creative moment, the words are a first pass.
4. **Is "Download resume" the right third CTA** before the PDFs exist? It
   currently points at the resume block on Contact.
