# Ryan Lee's Portfolio

My personal portfolio site. The whole thing is laid out like a baseball diamond: a small penguin waddles from base to base to take you through my experience, projects, and interests.

**Live site:** [ryanlee.io](https://www.ryanlee.io)

---

## What is this?

A solo-built portfolio for a fourth-year UC Berkeley student studying Industrial Engineering and Data Science who is pursuing product. Home plate is the About page, first base is Experience, second base is Projects, and third base is Interests. A mini field in the top-right corner is the navigation: hover it to grow it, click a base, and the penguin runs there before the page changes. The arrow keys work too.

The design is clean and minimal, with dark mode by default, a light mode behind a sun/moon switch, and just enough baseball to be fun without turning every heading into a pun. It is built for laptops first, and works on phones.

---

## Features

- **Baseball diamond navigation** - a field dock in the corner that grows on hover. Clicking a base sends the penguin waddling there, then routes to the page. Back and forward make the penguin catch up, and it can be tucked away to the right edge and brought back from a small tab
- **Hover easter egg** - hover the penguin and it turns into a random duck, lion, koala, or turtle
- **Intro loader** - a 0 to 100 count that plays once per browser session
- **Dark and light themes** - the new theme grows out of the toggle as a soft-edged circle, and the choice is remembered
- **Sticky header** - name, theme toggle, resume, GitHub, and LinkedIn stay pinned while you scroll
- **Experience** - roles at Cisco, Tesla, ServiceNow, PepsiCo, and Uber, with logos, auto-bolded numbers, and tilted photos that lift on hover
- **Project case studies** - Grove and Speakeasy each get a detail page with live and GitHub links, screenshots, and how they were built. Grove's page includes a live, draggable copy of its budget arc slider
- **Pinguball** - a mini batting game on the Baseball interest: pick a batter, time your swing, and string together three hits in a row for a supercharged home run
- **On repeat** - four favorite songs with Spotify's player, one playing at a time
- **On screen** - a row of favorite movies and shows that drifts on its own, can be swiped or dragged, and links each title to its IMDb page
- **Contact scoreboard** - copy-to-clipboard email and phone, plus a message form that delivers straight to my inbox through Formspree
- **Home extras** - a note on what I am looking for, a photo grid, and quick fun facts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router, Cache Components) + React 19 |
| Language | TypeScript |
| Styling | Plain CSS in one file with CSS variable tokens for both themes (no Tailwind) |
| Fonts | Bricolage Grotesque (headings), Hanken Grotesk (body), DM Mono (labels) |
| Contact form | [Formspree](https://formspree.io/), falling back to a `mailto:` link without it |
| Music | Spotify's embedded player (iFrame API) |
| Hosting | Vercel (auto-deploys on push to `main`), domain bought through Vercel |

There is no database, no backend of my own, and no UI library. All the art, including the penguin and the game characters, is hand-drawn SVG.

---

## How it fits together

```
┌──────────────────────────┐
│  src/content/site.ts      │  every word of copy, plus project, song,
│  (all the content)        │  and film data
└────────────┬─────────────┘
             │ imported by
             ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│  src/app/*  (pages)       │ ───▶ │  src/components/*         │
│  /  /experience           │      │  Dock, Penguin, Contact,  │
│  /projects  /projects/x   │      │  BaseballGame, ScreenReel │
│  /interests               │      │  SpotifyTrack, ...        │
└──────────────────────────┘      └─────────────┬────────────┘
                                                 │
                                                 ▼
                                  ┌──────────────────────────┐
                                  │  Formspree (contact form) │
                                  │  Spotify (song previews)  │
                                  └──────────────────────────┘
```

The four bases and their coordinates on the field live in `src/lib/bases.ts`. The dock reads them to place the penguin and to decide which page is "home".

---

## Getting Started

### Prerequisites

- Node.js (v20+)
- A free [Formspree](https://formspree.io/) form, if you want the contact form to deliver messages

### Installation

```bash
git clone https://github.com/ryanlee555/portfolio.git
cd portfolio
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```

This is optional. Without it, the message form opens the visitor's email app instead of sending directly. The value ends up in the public site code on purpose, so it is not a secret, but `.env.local` is git-ignored anyway.

### Running locally

```bash
npm run dev
```

Then open http://localhost:3000. The first visit to each page is slow in dev mode while it compiles; a production build (`npm run build && npm start`) is instant.

### Editing the content

All the copy lives in `src/content/site.ts`, so you rarely need to touch the pages themselves. Edit that file to change the intro, experience, projects, songs, films, and fun facts.

### Deployment

The site auto-deploys to Vercel on every push to `main`. In Vercel, add `NEXT_PUBLIC_FORM_ENDPOINT` as an environment variable so the contact form works in production.

---

## Project Structure

```
portfolio/
├── public/
│   └── ryan-lee-resume.pdf     # linked from the header
├── src/
│   ├── app/                     # routes: /, /experience, /projects, /projects/[slug], /interests
│   │   ├── layout.tsx           # header, footer, fonts, dock, theme and intro script
│   │   └── globals.css          # all styling, tokens for dark and light themes
│   ├── components/              # Dock, Penguin, BaseballGame, ScreenReel, Contact, ...
│   ├── content/
│   │   └── site.ts              # all copy and data
│   ├── lib/
│   │   └── bases.ts             # the four bases = the four pages
│   └── assets/                  # portrait, company logos, photos, project shots, posters
├── AGENTS.md / CLAUDE.md        # working notes for coding agents
└── progress.md                  # running log of every change and decision
```

---

## Roadmap

- [ ] Open Graph share image for link previews
- [ ] More projects as they ship ("More coming soon" sits under the cards)
- [ ] Optional: restrict the Formspree form to this domain
