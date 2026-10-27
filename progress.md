# Portfolio Progress

Living handoff file. Read this first in any new chat. Update it at the end of every prompt.

## Project
- Personal portfolio website for Ryan Lee (4th-year UC Berkeley, IE + Data Science, pursuing product)
- Repo: https://github.com/ryanlee555/portfolio (branch `main`, everything pushed as of 2026-10-26, last commit 88b02e0)
- Concept: minimalist baseball diamond as navigation. A small penguin waddles base to base to change pages: Home plate = About, 1B = Experience, 2B = Projects, 3B = Interests. Clean, simple theme. Laptop-first (mobile just needs to work).
- Stack: Next.js 16 + React 19 + TypeScript, plain CSS. File map and rules in `CLAUDE.md`.
- Run locally: `npm run dev` → http://localhost:3000
- Hosting: not deployed yet (Vercel recommended).
- Design reference: private preview artifact https://claude.ai/artifact/5dGtmFZC7234P4c6uRpEEF (early prototype; the real site has moved past it).

## Current state of the site
**Site-wide**
- 0-100 intro loader, once per browser session
- Dark mode by default; sun/moon toggle in header. Switching grows the new theme out of the toggle as a soft-edged circle (CSS `@keyframes` on `::view-transition-new(root)`, 0.9s); choice saved in localStorage
- Header: name (left); theme toggle, Resume ↗ (`public/ryan-lee-resume.pdf`), GitHub ↗, LinkedIn ↗ (right)
- Field dock (bottom-right): grows only on real hover and shows all four base labels; hint "Click a base, or use the ← → keys" on top. Clicking a base waddles the penguin there, then navigates. Lineup links, header name, and ←/→ keys waddle without growing the dock. Back/forward makes the penguin catch up.
- Easter egg: hovering the penguin turns it into a duck
- Custom cursor: white dot with difference blend (inverts over content), grows on links; off on touch screens
- Footer: "designed and developed by / Ryan Lee" (left), "all rights reserved, / ryan lee ©2026" (right), small
- Page max width 1280px; penguin favicon

**Home (`/`)** — real content
- Circle portrait (`src/assets/ryan.jpg`), "Hi, I'm Ryan!", two-paragraph intro with bold majors
- "Round the bases" lineup with Ryan's own one-line descriptions
- Contact scoreboard: "Let's connect." + email/phone with copy buttons (left), "Send a message" form (right)

**Experience (`/experience`)** — real content from the resume
- Cisco, Tesla, ServiceNow, PepsiCo, Uber; company heading, role · location, dates
- Company logos under the dates (`src/assets/logos/`), no tiles, per-logo `logoHeight`; Uber and ServiceNow swap to light `-dark.png` versions in dark mode
- Photos in a right column, overlapping and tilted, lift on hover; absolutely placed so they never change a section's height (`photos` on a role in `site.ts`, files in `src/assets/photos/`): all five roles have 2 each (the branded photo is first = in front); other roles can get theirs the same way. Stacks under the text on mobile
- Numbers in bullets auto-bolded (`BoldNumbers`); bullets ~60 characters a line, left-aligned with balanced wrapping, never hyphenated

**Projects (`/projects`)**
- Cards are two columns wide (two per row, one on mobile): screenshot stage on top (cover + floating inset, both lift on hover), then name, summary, stack
- Grove is real and links to its detail page `/projects/grove` (`src/app/projects/[slug]/page.tsx`, data in `projects[].detail` in `site.ts`): live site + GitHub buttons, role/stack/status, hero shot, Why I built it, Spending overview, Budgets, Budgets has a live, draggable copy of Grove's arc slider (`src/components/ArcSlider.tsx`, DM Sans, Grove's palette in both themes; snaps to $50, amber past 80%, Confirm/Cancel/Remove limit, arrow keys), Hamilton AI (six style cards, from Ryan's settings screen), How it's built. Section paragraphs run the full content width, to the screenshots' right edge
- Screenshots in `src/assets/projects/grove/` (cropped from Ryan's shots; landing page "how it works" crop saved but unused)
- Speakeasy and Brain Alarm are placeholders ("Write-up coming soon")
- Dock treats `/projects/<slug>` as 2B; clicking 2B there goes back to `/projects`

**Interests (`/interests`)** — still sample placeholder content

## Next up
- [ ] **Theme toggle misbehaves on Home only** (fine on Projects/Interests). Could not reproduce in headless Chrome or WebKit (Playwright); the wave runs on Home there. Leading suspect: Home scrolls and the short pages don't (scrollbar affects the snapshot). Waiting on Ryan: does Experience (also scrolls) break too, which browser, and what exactly he sees.
- [ ] Projects: Speakeasy (JavaScript, IndexedDB, MediaRecorder API) and Brain Alarm (SQL, Figma, A/B testing) need write-ups, screenshots, links.
- [ ] Fill Interests (baseball first, plus working out, music; ask Ryan for details)
- [ ] Message form delivery: Ryan creates a free Formspree form and shares the URL; set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local` and on the host. Until then, submitting opens the visitor's email app.
- [ ] Deploy (Vercel suggested; connects straight to the GitHub repo)
- [ ] Optional: project detail links, Open Graph/share image

## Decisions & notes
- Ryan's preferences: clean and minimal; dislikes words split with hyphens; prefers small iterative changes; commit/push only when he says so.
- No Tailwind: the design was finished as plain CSS in the preview and ported directly.
- All copy lives in `src/content/site.ts` (profile, lineup, contact, experience, projects, interests).
- Photo: used the restaurant photo; the round beach photo had a stray overlay dot.
- Dev mode is slow on the first visit to each page (on-demand compile); production is instant.
- Testing tip: the in-app browser pane often runs in the background, which skips view transitions and stalls animations. For visual checks, headless Chrome (`/Applications/Google Chrome.app`) or Playwright WebKit (cached in `~/Library/Caches/ms-playwright`) driven from a scratch script works better.
- `gh` CLI not installed.

## Contact info (for the site)
- Email: ryan.lee55@berkeley.edu
- Phone: (714) 909-8464
- LinkedIn: https://www.linkedin.com/in/ryan-lee-uc-berkeley/
- GitHub: https://github.com/ryanlee555

## Log
- 2026-10-26: Project set up; repo connected; HTML preview iterated (8 versions).
- 2026-10-26: Real Next.js site built and pushed.
- 2026-10-26: Home page real content, portrait, contact form, custom cursor.
- 2026-10-26: Dark/light theme toggle, duck easter egg, footer, dock hover fixes (laptop crashed mid-session; no work lost).
- 2026-10-26: Theme reveal moved to CSS keyframes so content appears with the wave; confirmed working for Ryan except on Home.
- 2026-10-26: Resume link; Experience filled from resume with logos, bold numbers, tidy line length.
- 2026-10-26: Session wrap-up; progress.md and CLAUDE.md refreshed.
- 2026-10-26: Added Uber and PepsiCo photos to Experience (right column). Uncommitted.
- 2026-10-26: Experience photos now overlap with a hover lift and no longer affect section height. Uncommitted.
- 2026-10-26: Experience photos enlarged to fill the row (17rem column, 72% x 86% frames); verified at 1280px that row heights are unchanged.
- 2026-10-26: Experience photos spread wider (column bleeds 7rem left into the gap, frames 55% wide) to cover the empty space beside the text; mobile unchanged.
- 2026-10-26: Logo photos (Uber sign, PepsiCo wall) now sit in front of the overlap.
- 2026-10-26: Added Cisco and Tesla photos (branded photo in front, as with Uber/PepsiCo). Uncommitted.
- 2026-10-26: Tesla photo restored to the original file; optional per-photo `position` (CSS object-position) in `site.ts`, Tesla uses 100% 50% so the whole wordmark shows with more of the building.
- 2026-10-26: Added ServiceNow photos (building sign in front). All roles now have photos. Uncommitted.
- 2026-10-26: Lineup About line now reads "You're already here, thanks for visiting!". Uncommitted.
- 2026-10-26: Projects page rebuilt as two-column cards; Grove card and `/projects/grove` detail page built from Ryan's screenshots and README. Uncommitted.
- 2026-10-26: Ryan confirmed the Grove repo is public; GitHub button stays.
- 2026-10-26: Grove page: removed What's next; Hamilton AI shows the six styles (incl. Lin-Manuel) as cards; paragraphs widened to the screenshot edge. Uncommitted.
- 2026-10-26: Grove: Why I built it paragraph shortened; interactive arc slider replaces the budget editor screenshot. Uncommitted.
- 2026-10-26: Dock's arrow-key navigation now ignores keys a slider already used.
- 2026-10-26: Arc slider card now matches the budgets screenshot's height (absolutely placed in the row; arc scales to fit).
- 2026-10-26: Grove copy: key phrases bolded (`**...**` in site.ts, rendered with RichText on the card and detail page). Uncommitted.
- 2026-10-26: Project detail pages no longer show the "Second base · Projects" eyebrow (overview only). Uncommitted.
