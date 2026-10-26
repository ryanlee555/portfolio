# Personal Portfolio

Personal portfolio site for Ryan Lee. Repo: https://github.com/ryanlee555/portfolio

@AGENTS.md

## Progress tracking (required)
- At the START of every new chat, read `progress.md` to see what has been done and what is next.
- At the END of every prompt that changes anything (code, decisions, plans), update `progress.md`: move finished items to Done, adjust Next up, record decisions, and add a dated line to Log. Keep it concise.
- Do this without being asked.

## Stack
- Next.js 16 (App Router, Cache Components on), React 19, TypeScript. Plain CSS in `src/app/globals.css` (no Tailwind).
- Next 16 differs from older versions: check `node_modules/next/dist/docs/` before using an API you are unsure of.
- Commands: `npm run dev` (port 3000), `npm run build`, `npm run lint`.

## Structure
- `src/content/site.ts`: all copy (profile, contact, experience, projects, interests). Edit content here, not in pages.
- `src/lib/bases.ts`: the four bases = the four pages (`/`, `/experience`, `/projects`, `/interests`) and their field coordinates.
- `src/components/Dock.tsx`: bottom-right ballfield nav. Grows on hover; clicking a base makes the penguin waddle there, then `router.push`. Back/forward makes the penguin catch up.
- `src/components/BaseLink.tsx`: links elsewhere on the page that ask the dock to run first (via a `base:go` window event).
- `src/components/Loader.tsx`: 0-100 intro, once per browser session (`sessionStorage`), gated by an inline script in `layout.tsx`.
- `src/components/Penguin.tsx`, `src/components/Scoreboard.tsx` (contact block on Home).

## Design rules
- Clean and minimal. Baseball touches stay subtle; no puns on every heading.
- Colors are CSS tokens on `:root` with a dark-mode override; the penguin's orange is the only strong accent.
- Laptop experience is the priority; mobile just needs to work.

## Working style
- Build in small pieces, not all at once.
- Do not push to GitHub or deploy without the user's go-ahead.
