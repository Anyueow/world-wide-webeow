# CLAUDE.md

Instructions for any agent working in this repository. Read this before you
touch a file.

This repo is worked on by **multiple agents at the same time**. The rules below
exist so two agents never build the same thing twice, and so the next agent can
pick up cold without asking anyone what happened.

---

## 1. The handoff protocol, in order

`HANDOFF.md` is the living state of this project. It is the source of truth for
what is done, what is in flight, and who is on it. It is not a summary written
at the end. It is updated **before and after** every task.

**Before you start any task:**

1. `git pull --rebase origin main` first, before anything else. Do this every
   single time, even if you pulled five minutes ago. The board changes
   underneath you, and a stale `HANDOFF.md` is how two agents claim the same
   task.
2. Open `HANDOFF.md` and read the whole board. Not just your workstream.
3. Find the task you intend to do. If it is marked `IN PROGRESS` by another
   agent, **stop and pick something else**. Do not "help" with a claimed task.
4. If it is `TODO`, claim it: change the status to `IN PROGRESS`, write your
   agent id and the UTC timestamp in the Owner column.
5. Commit that claim on its own, immediately, before writing any code:
   `git commit -m "Claim: T-3.2 responsive audit"` and push. The claim is only
   real once it is pushed. An unpushed claim does not exist to other agents.

**While you work:**

- If you discover new work, add it to the board as a new `TODO` row rather than
  silently doing it. Someone else may already be on it.
- If you have to abandon a task, set it back to `TODO`, clear the Owner, and
  add a line to the task's Notes saying how far you got. Never leave a task
  `IN PROGRESS` with no owner working on it.

**When you finish:**

1. Set the status to `DONE`, keep your agent id, add the finishing timestamp.
2. Fill in the task's **Notes**: what you actually built, which files, and
   anything the next agent needs to know that is not obvious from the diff.
3. Commit the code and the `HANDOFF.md` update **in the same commit**. Code
   without a board update is an incomplete task.
4. **Push to `main` immediately.** Do not batch several finished tasks into one
   push at the end of your session. Every other agent builds on `main`, so an
   unpushed task is a task that does not exist to them, and two agents will end
   up writing the same component. Finish a task, push it, then claim the next
   one.

**Pull again before you finish**, too, not just before you claim. See the "When
you finish" section above and the Git loop at the bottom of this file.

---

## 1a. Anything Ananya tells you is invisible to every other agent

This is the rule that gets broken most, and it is the expensive one.

When Ananya gives you an instruction, a correction, or a design description in
your session, **no other agent can see it**. Not the next one, not the one
running in parallel right now. Your chat history is not shared state. The board
is the only shared state there is.

So: **write it to `HANDOFF.md` before you act on it**, in her words, quoted.
Then push. Only then start building.

This has already cost the project once. Ananya described the animation she
wanted for the game symbols to one agent. That agent built from it without
recording it. A second agent, reading the board, built the symbol set against a
spec that said "scattered field of icons" and had no idea a specific animation
had been asked for. Both agents were following the board. The board was wrong,
because a real instruction never reached it.

If she corrects you, that correction is now a fact about the project. Facts
about the project live in `HANDOFF.md`, not in your context window.


---

## 2. What "documented" means

Every completed task must leave behind enough that a fresh agent with no
context can continue. That means:

- The Notes column on the board says what was built and where.
- Non obvious decisions are explained in a comment **in the code**, next to the
  thing they explain, not only in the commit message. Explain why, not what.
- New content shapes are typed in `src/lib/types.ts` with doc comments.
- If you changed how something is meant to be used, say so in this file.

---

## 3. Project facts an agent needs

**Stack.** Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion.
Static export (`output: "export"`), deployed to Netlify from `out/`.

**No server features.** No route handlers, no server actions, no middleware, no
dynamic rendering, no ISR. The build must stay fully static or the Netlify
deploy target breaks. `fs` at module or build time is fine, since it runs
during the build.

**Design tokens live in `src/app/globals.css`.** Palette is "Pacifica dusk":
sand `#F7F5F0`, ink `#10100E`, coral `#C2502F`, ocean `#1B4048`. Never hardcode
a hex in a component. Use the token classes.

**Type.** Fraunces variable (display, axes SOFT/WONK/opsz) and Inter (body).
`display-face` plus a `text-*` scale class. Do not add a third typeface.

**Content lives in `src/content/`.** Components never hold copy or data. If you
are typing a sentence of prose into a `.tsx` file, it probably belongs in
`src/content/`.

---

## 4. Hard rules

These are Ananya's, not negotiable, and they apply to every string that ships:

- **No em dashes. Ever.** Use a comma, a period, or rewrite the sentence.
- Plain prose. Conclusion first. Cut hedging and passive voice.
- No "passionate data scientist" language. No AI slop voice.
- Bullets only for enumerated deliverables, never as a default in prose.
- Draft copy must be marked as draft in a comment so Ananya knows what to argue
  with.

And the engineering equivalents:

- **Content must be in the server rendered HTML.** No experience, bullet, skill
  or link may exist only after hydration. Verify with
  `grep "your text" out/experiences/index.html` after a build.
- **Scroll driven animation is opacity and transform only.** Never animate
  height, width, top or margin on scroll. Click driven animation may animate
  layout, because the user asked for it.
- **Every animation checks `prefers-reduced-motion`**, in JS via
  `useReducedMotion`, not only in CSS.
- Real placeholder slots, never invented content. If Ananya has not supplied a
  photo, link or fact, ship a labelled empty slot. Do not guess a URL.

---

## 5. Definition of done

A task is not done until all of these are true:

1. `npm run build` passes.
2. `npx tsc --noEmit` passes and `npm run lint` is clean.
3. You looked at the rendered result in a browser at 1440px and at 390px.
4. No new console errors or page errors.
5. `HANDOFF.md` is updated and pushed in the same commit as the code.

---

## 6. Git

**`main` is the shared surface. Push completed tasks to it as you finish them.**

Because several agents work this repo at once, `main` is how they see each
other. The moment a task meets the definition of done above, commit it with the
`HANDOFF.md` update and push to `main`. Do not sit on finished work. Do not
batch. An agent that finishes four tasks and pushes once at the end has spent
the whole session invisible, and whatever another agent built in parallel now
has to be reconciled by hand.

The loop is:

```
git pull --rebase origin main     # before claiming
# claim the task in HANDOFF.md, commit, push
# do the work
git pull --rebase origin main     # before finishing
npm run build && npx tsc --noEmit
git add -A && git commit          # code and HANDOFF.md together
git push origin HEAD:main         # immediately
```

Pull with rebase before you push. If someone else moved `main` while you
worked, rebase onto it rather than forcing. Never force push `main`.

Claims are pushed too, on their own commit, before the work starts. That is the
whole anti duplication mechanism: an agent about to start a task sees your
claim on `main` and picks something else.

End commit messages with the co-author trailer the session gives you.
