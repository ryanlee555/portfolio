# Portfolio Progress

Living handoff file. Read this first in any new chat. Update it at the end of every prompt.

## Project
- Personal portfolio website for Ryan Lee
- Repo: https://github.com/ryanlee555/portfolio (branch `main`)
- Concept: minimalist baseball diamond as navigation. A small penguin waddles base to base to change pages: Home plate = About, 1B = Experience, 2B = Projects, 3B = Interests. 0-100 loading screen first (once per session). Clean, simple theme. Laptop-first.
- Stack: Next.js 16 + React 19 + TypeScript, plain CSS. Details and file map in `CLAUDE.md`.
- Hosting: undecided (Vercel recommended; GitHub Pages would need static export + base path).
- Design reference: private preview artifact https://claude.ai/artifact/5dGtmFZC7234P4c6uRpEEF (v8 matches what was built).

## Done
- [x] Researched inspiration sources
- [x] `git init`, linked to GitHub repo, pulled initial commit (README only)
- [x] Created `progress.md` and `CLAUDE.md`
- [x] Iterated a throwaway HTML preview (8 versions): dock in bottom-right that grows on hover, per-base hover labels, penguin runner, scoreboard contact block on Home
- [x] Built the real site in this folder (2026-10-26):
  - Routes `/`, `/experience`, `/projects`, `/interests`, all statically prerendered
  - Dock + waddling penguin nav (click base, home-page lineup links, ←/→ keys, browser back/forward)
  - 0-100 loader once per session, no flash for repeat visits
  - Scoreboard contact block (email, phone, LinkedIn, copy buttons); GitHub + LinkedIn in header
  - Penguin favicon (`src/app/icon.svg`)
  - `npm run build` and `npm run lint` pass; navigation checked in the production build
- [x] First version committed and pushed to `main` (commit 28427bf)

- [x] Home page, real content (session focus: home page only):
  - Circle portrait above "Hi, I'm Ryan!" (`src/assets/ryan.jpg`, cropped from the restaurant photo; the round beach photo had a stray overlay dot)
  - Real two-paragraph intro (fourth-year at Berkeley, IE + Data Science, product focus); removed the "Home plate · About" eyebrow
  - Lineup ("Round the bases") with one-sentence descriptions, bottom-aligned beside the intro
  - Contact scoreboard rebuilt: "Let's connect." + email/phone on the left, "Send a message" form on the right; LinkedIn removed from it (still in header)
  - Site-wide custom cursor: white dot with difference blend (dark on light bg, inverts over content), grows over links/buttons; off on touch screens

- [x] Theme + polish pass (pushed):
  - Dark/light mode, dark by default; sun/moon toggle left of GitHub; 0.75s circle-reveal animation (color fade fallback); choice saved in localStorage
  - Dock grows only on real hover; links elsewhere (name, lineup) and arrow keys just make the penguin waddle in the small dock. "Click a base…" hint moved to the top of the grown field
  - Hovering the penguin turns it into a little duck (easter egg)
  - Footer on every page: "all rights reserved," / "ryan lee ©2026"
  - Scoreboard about 12% shorter; page max width 1280px with wider side padding

- [x] Theme switch reveal reworked (pushed): feathered circle edge driven by a plain CSS `@keyframes` on `::view-transition-new(root)` (was a JS `animate()` call, which likely no-ops in Safari, causing the "blink at the end" the user saw). Verified frame-by-frame in headless Chrome that content transitions with the wave. Confirmed working in the user's browser.

- [x] Field shows all four base labels whenever it's hovered (the base under the pointer brightens); footer split into "designed and developed by / Ryan Lee" (bottom left) and "all rights reserved, / ryan lee ©2026" (bottom right) at a smaller size (pushed)

- [x] New "Round the bases" descriptions from Ryan; lineup copy moved into `src/content/site.ts` (`lineup`) (pushed)

- [x] Resume: `public/ryan-lee-resume.pdf` (copied from Ryan's resume), linked as "Resume ↗" in the header between the theme toggle and GitHub. Experience page filled from it: Cisco, Tesla, ServiceNow, PepsiCo, Uber (company as heading, role · location under it). (pushed)

- [x] Company logos under each role's dates on Experience (`src/assets/logos/`), no tiles, larger, sized per logo (`logoHeight`: Cisco 68, Tesla 84, ServiceNow 26, PepsiCo 88, Uber 38). Uber and ServiceNow have light `-dark.png` twins that swap in for dark mode. (pushed)

- [x] Experience bullets auto-bold every number with its symbols ($1.2M+, 40%, 15–25%, 350+) via `BoldNumbers` in `src/components/RichText.tsx`; bullets narrowed to ~30em (about 60 characters a line), left-aligned with `text-wrap: pretty` for even-ish line endings; no hyphenation (Ryan doesn't want split words; tried justify first); "12‑minute" uses a non-breaking hyphen (pushed)

## Next up
- [ ] Theme toggle misbehaves on Home only (works on Projects/Interests). Not reproducible in headless Chrome or WebKit; suspect scrollable-page/scrollbar snapshot difference. Waiting on Ryan: does Experience (also scrolls) break too, which browser, and what exactly happens.
- [ ] Projects page could be filled from the resume too (Grove, Speakeasy, Brain Alarm)
- [ ] Message form delivery: create a free Formspree (or similar) form and set `NEXT_PUBLIC_FORM_ENDPOINT` (in `.env.local` and on the host). Until then, submitting opens the visitor's email app.
- [ ] Replace sample content for Projects and Interests in `src/content/site.ts`
- [ ] Look over the site in a normal browser at laptop size (`npm run dev`, http://localhost:3000) and note tweaks
- [ ] Pick hosting and deploy (Vercel suggested)
- [ ] Optional: resume link/PDF, project detail links, Open Graph image

## Decisions & notes
- No Tailwind: the design was already finished as plain CSS in the preview, so it was ported directly.
- Dev mode is slow on the first visit to each page (on-demand compile); production navigation is instant.
- `gh` CLI not installed.

## Contact info (for the site)
- Email: ryan.lee55@berkeley.edu
- Phone: (714) 909-8464
- LinkedIn: https://www.linkedin.com/in/ryan-lee-uc-berkeley/
- GitHub: https://github.com/ryanlee555

## Log
- 2026-10-26: Project set up; repo connected; progress tracking added.
- 2026-10-26: Preview iterated to v8 (hover-grow dock, penguin, scoreboard).
- 2026-10-26: Real Next.js site built from the preview; builds clean.
- 2026-10-26: Pushed first version to GitHub.
- 2026-10-26: Home page content, portrait, contact form, custom cursor; pushed.
- 2026-10-26: Theme toggle, duck easter egg, footer, dock hover fix (laptop crashed mid-session; work intact); pushed.
- 2026-10-26: Theme-switch reveal moved to CSS keyframes so content appears with the wave (Safari-safe).
- 2026-10-26: All field labels on hover; footer credit left, rights right, smaller.
- 2026-10-26: New lineup descriptions.
- 2026-10-26: Resume link in header; Experience filled from resume.
- 2026-10-26: Company logos on Experience (boxless, theme-aware).
- 2026-10-26: Numbers bolded, bullets narrowed and balanced (no hyphens) on Experience.
