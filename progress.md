# Portfolio Progress

Living handoff file. Read this first in any new chat. Update it at the end of every prompt.

## Project
- Personal portfolio website for Ryan Lee (4th-year UC Berkeley, IE + Data Science, pursuing product)
- Repo: https://github.com/ryanlee555/portfolio (branch `main`; everything through Pinguball, commit ac3080b, is pushed as of 2026-10-27)
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
- Field dock (top-right, just below the header links): grows only on real hover and shows all four base labels; hint "Click a base, or use the ← → keys" on top. Clicking a base waddles the penguin there, then navigates. Lineup links, header name, and ←/→ keys waddle without growing the dock. Back/forward makes the penguin catch up.
- Easter egg: hovering the penguin turns it into a random duck, lion, koala, or turtle (new pick each hover; default is always the penguin; art reused from `GameCharacters.tsx`)
- Custom cursor: white dot with difference blend (inverts over content), grows on links; off on touch screens
- Footer: "designed and developed by / Ryan Lee" (left), "all rights reserved, / ryan lee ©2026" (right), small
- Page max width 1280px; penguin favicon

**Home (`/`)** — real content
- Circle portrait (`src/assets/ryan.jpg`), "Hi, I'm Ryan!", two-paragraph intro with bold majors
- "Round the bases" lineup with Ryan's own one-line descriptions
- "What I'm looking for" note between the lineup and the scoreboard on the left half; the right half is a 4 by 2 grid of Ryan's photos (`src/components/PhotoGrid.tsx`, photos in `src/assets/home/`, listed in `looking.photos` in `site.ts`; the text top aligns with the grid top; photo frames stretch so the grid height always equals the text column. "Quick fun facts" (`looking.facts`, two columns) sit under the note). Ryan may swap in a rotating version later. Wording ends with ":D"
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
- Speakeasy is real too: `/projects/speakeasy` (live site + GitHub links), sections The studio, Three practice modes (three captioned panels, padded to equal height), Watch it back / build the habit, How it's built. Screenshots in `src/assets/projects/speakeasy/`
- Brain Alarm removed; an italic "More coming soon" line sits under the cards
- Opening a project: header lines rise in one after another, then the hero and each section fade up as they scroll into view (`src/components/Reveal.tsx`, `data-reveal`; reduced motion turns it off)
- Dock treats `/projects/<slug>` as 2B; clicking 2B there goes back to `/projects`

**Interests (`/interests`)**
- The three interest blurbs are still sample placeholders
- Pillar 1 "Baseball" (Ryan's story, "Dodgers" in Dodger blue) has a "Play ball" button that opens Pinguball, a mini batting game (`src/components/BaseballGame.tsx`): pick a batter (Penguin default, Duck, Lion, Koala, Turtle; drawn in `src/components/GameCharacters.tsx`, choice remembered in localStorage; the game batter never swaps to a duck on hover, only the dock penguin does), swing with space / click / Swing button as the pitch crosses the plate; timing decides home run, double, single, foul, or strike; changeups now and then; 3 outs ends it; best score kept in localStorage. Three hits in a row (a foul or strike resets the streak) supercharges the next swing: glowing orange bat, guaranteed home run, then resets. Bat swing is a counterclockwise keyframe animation around the handle (rests toward the catcher, loads, through the zone, follows through toward third). Home runs get a celebration: two firework bursts over the outfield, a "HOME RUN!" banner, and the penguin hops
- Pillar 2 is "Music & Concerts" (Ryan's music story); its "Click for songs" button opens the "On repeat" panel below (Close button, scrolls into view; `src/components/InterestBoard.tsx`). pillar 3 is still a sample; only one panel (songs or game) is open at a time
- On repeat: four song cards (`songs` in `site.ts`, reasons written in Ryan's voice) with Spotify's player via its iFrame API (`src/components/SpotifyTrack.tsx`): one song plays at a time, and the player reloads when a preview pauses or nears its end so Spotify's "Get Spotify" ad doesn't stick. The ad can still flash briefly near a preview's end; Ryan is fine with that (2026-10-27), so no more work on it

## Next up
- [ ] **Theme toggle misbehaves on Home only** (fine on Projects/Interests). Could not reproduce in headless Chrome or WebKit (Playwright); the wave runs on Home there. Leading suspect: Home scrolls and the short pages don't (scrollbar affects the snapshot). Waiting on Ryan: does Experience (also scrolls) break too, which browser, and what exactly he sees.
- [ ] Fill Interests: the third pillar. Ryan to review the song reasons (drafted in his voice)
- [ ] Message form delivery: Ryan creates a free Formspree form and shares the URL; set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local` and on the host. Until then, submitting opens the visitor's email app.
- [ ] Deploy (Vercel suggested; connects straight to the GitHub repo)
- [ ] Optional: project detail links, Open Graph/share image

## Decisions & notes
- Ryan's preferences: clean and minimal; dislikes words split with hyphens; prefers small iterative changes; commit/push only when he says so.
- No Tailwind: the design was finished as plain CSS in the preview and ported directly.
- All copy lives in `src/content/site.ts` (profile, lineup, contact, experience, projects, interests).
- Photo: used the restaurant photo; the round beach photo had a stray overlay dot.
- Dev mode is slow on the first visit to each page (on-demand compile); production is instant.
- Testing tip: when the in-app browser pane is hidden, React also delays hydrating Suspense content (client code there won't run until a real click). The in-app browser pane often runs in the background, which skips view transitions and stalls animations. For visual checks, headless Chrome (`/Applications/Google Chrome.app`) or Playwright WebKit (cached in `~/Library/Caches/ms-playwright`) driven from a scratch script works better.
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
- 2026-10-26: Added Uber and PepsiCo photos to Experience (right column).
- 2026-10-26: Experience photos now overlap with a hover lift and no longer affect section height.
- 2026-10-26: Experience photos enlarged to fill the row (17rem column, 72% x 86% frames); verified at 1280px that row heights are unchanged.
- 2026-10-26: Experience photos spread wider (column bleeds 7rem left into the gap, frames 55% wide) to cover the empty space beside the text; mobile unchanged.
- 2026-10-26: Logo photos (Uber sign, PepsiCo wall) now sit in front of the overlap.
- 2026-10-26: Added Cisco and Tesla photos (branded photo in front, as with Uber/PepsiCo).
- 2026-10-26: Tesla photo restored to the original file; optional per-photo `position` (CSS object-position) in `site.ts`, Tesla uses 100% 50% so the whole wordmark shows with more of the building.
- 2026-10-26: Added ServiceNow photos (building sign in front). All roles now have photos.
- 2026-10-26: Lineup About line now reads "You're already here, thanks for visiting!".
- 2026-10-26: Projects page rebuilt as two-column cards; Grove card and `/projects/grove` detail page built from Ryan's screenshots and README.
- 2026-10-26: Ryan confirmed the Grove repo is public; GitHub button stays.
- 2026-10-26: Grove page: removed What's next; Hamilton AI shows the six styles (incl. Lin-Manuel) as cards; paragraphs widened to the screenshot edge.
- 2026-10-26: Grove: Why I built it paragraph shortened; interactive arc slider replaces the budget editor screenshot.
- 2026-10-26: Dock's arrow-key navigation now ignores keys a slider already used.
- 2026-10-26: Arc slider card now matches the budgets screenshot's height (absolutely placed in the row; arc scales to fit).
- 2026-10-26: Grove copy: key phrases bolded (`**...**` in site.ts, rendered with RichText on the card and detail page).
- 2026-10-26: Project detail pages no longer show the "Second base · Projects" eyebrow (overview only).
- 2026-10-26: Grove page entrance animations (staggered header, scroll reveal for sections). Verified in headless Chrome.
- 2026-10-26: Speakeasy card and detail page built (same structure as Grove).
- 2026-10-27: Speakeasy GitHub button added (github.com/ryanlee555/Speakeasy).
- 2026-10-27: Speakeasy studio paragraph reworded.
- 2026-10-27: Removed Brain Alarm placeholder; added italic "More coming soon" under the project cards.
- 2026-10-27: Interests: added On repeat song cards with playable Spotify embeds (reasons pending from Ryan).
- 2026-10-27: Interests: Music & Concerts pillar with click-to-open On repeat songs, song reasons written, title periods removed, Spotify ad workaround.
- 2026-10-27: Ryan OK with the brief Spotify ad near a preview's end; dropped from Next up.
- 2026-10-27: "Click for songs" / "Hide songs" button now uses the body font.
- 2026-10-27: Music & Concerts blurb updated to Ryan's wording; bold only on the artists, Dear Theodosia, Hamilton, EDM.
- 2026-10-27: Song reasons for Infinite and Good Night Good Dream updated to Ryan's wording.
- 2026-10-27: Baseball pillar blurb written in Ryan's words (similar length to Music & Concerts).
- 2026-10-27: "Dodgers" in the Baseball blurb is bold Dodger blue (`^^text^^` in site.ts; `--dodger` token: #005A9C light, #3E8EDE dark).
- 2026-10-27: Mini baseball batting game opens from the Baseball pillar. Playtested a full game in headless Chrome.
- 2026-10-27: Pinguball: renamed from Mini baseball, fixed bat swing animation, added 3-hit-streak supercharged home run. Playtested in headless Chrome.
- 2026-10-27: Pinguball: swing now counterclockwise; home run celebration added.
- 2026-10-27: Pinguball: batter picker (penguin, duck, lion, koala, turtle); game batter no longer turns into a duck on hover.
- 2026-10-27: Session wrap-up: all work committed and pushed (latest ac3080b); progress.md tidied.
- 2026-10-27: Dock penguin easter egg now randomizes between duck, lion, koala, turtle on each hover. Pick logic verified; not committed yet.
- 2026-10-27: Home: added a draft "What I'm looking for" section above the contact scoreboard. Not committed.
- 2026-10-27: Looking section: text ends with ":D", moved to the left half; right half is the photo rotator (awaiting photos). Not committed.
- 2026-10-27: Contact scoreboard recolored from dark green to neutral charcoal (--board tokens in globals.css). Not committed.
- 2026-10-27: Scoreboard made subtler: light mode is a soft gray panel with dark text, dark mode a slightly lighter panel than the page. Not committed.
- 2026-10-27: Looking section photos: 8 of Ryan's photos in a tidy 4x2 grid (replaced the rotator, removed PhotoRotator). Not committed.
- 2026-10-27: Looking section text now top aligned with the photo grid. Not committed.
- 2026-10-27: Looking section: added Quick fun facts; swapped two photos (dog Bomi top 2nd, stadium bottom 3rd; old hill and Aloha photos left unused in `src/assets/home/`); photo frames now stretch to match the text height. Not committed.
- 2026-10-27: Fun facts text now uses the main ink color (white in dark mode); heading stays muted. Not committed.
- 2026-10-27: Fun fact changed to "Been to over 50 concerts/raves". Not committed.
- 2026-10-27: Fun facts pinned to the bottom of the looking section (bottom lines match the photo grid); photo frames min height 175px so the gap above the facts grew. Not committed.
- 2026-10-27: Added fun facts (12 muscle-ups, spelling bee); fact text slightly smaller so photos stay 175px tall. Not committed.
- 2026-10-27: Field dock moved from bottom-right to top-right (hint now below it, header links padded to clear it); About copy says top-right corner. Not committed.
- 2026-10-27: Dock moved down to sit just below the header links row (header padding removed). Not committed.
- 2026-10-27: Dock's right edge now lines up with the page margin (same edge as the header links). Not committed.
- 2026-10-27: Footer's extra bottom padding (reserved for the old bottom-right dock) trimmed from 160px to 40px. Not committed.
- 2026-10-27: "top-right corner" bolded in the About paragraph. Not committed.
- 2026-10-27: "0 to 1" bolded in the looking paragraph. Not committed.
