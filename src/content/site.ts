import type { StaticImageData } from "next/image";
import cisco from "@/assets/logos/cisco.png";
import pepsico from "@/assets/logos/pepsico.png";
import servicenowDark from "@/assets/logos/servicenow-dark.png";
import servicenow from "@/assets/logos/servicenow.png";
import tesla from "@/assets/logos/tesla.png";
import uberDark from "@/assets/logos/uber-dark.png";
import ciscoPhoto1 from "@/assets/photos/cisco-1.webp";
import ciscoPhoto2 from "@/assets/photos/cisco-2.webp";
import teslaPhoto1 from "@/assets/photos/tesla-1.webp";
import teslaPhoto2 from "@/assets/photos/tesla-2.webp";
import servicenowPhoto1 from "@/assets/photos/servicenow-1.webp";
import servicenowPhoto2 from "@/assets/photos/servicenow-2.webp";
import pepsicoPhoto1 from "@/assets/photos/pepsico-1.webp";
import pepsicoPhoto2 from "@/assets/photos/pepsico-2.webp";
import uberPhoto1 from "@/assets/photos/uber-1.webp";
import uberPhoto2 from "@/assets/photos/uber-2.webp";
import uber from "@/assets/logos/uber.png";
import groveBudgetEditor from "@/assets/projects/grove/budget-editor.webp";
import groveBudgets from "@/assets/projects/grove/budgets.webp";
import groveDashboard from "@/assets/projects/grove/dashboard.webp";
import groveHero from "@/assets/projects/grove/hero.webp";
import speakeasyFeatures from "@/assets/projects/speakeasy/features.webp";
import speakeasyHero from "@/assets/projects/speakeasy/hero.webp";
import speakeasyFreeplay from "@/assets/projects/speakeasy/mode-freeplay.webp";
import speakeasyTopic from "@/assets/projects/speakeasy/mode-topic.webp";
import speakeasyWords from "@/assets/projects/speakeasy/mode-words.webp";
import speakeasyStudio from "@/assets/projects/speakeasy/studio.webp";

// All site copy lives here. Edit this file to change what the pages say.
// Entries marked "sample" are placeholders to replace with real content.

export const profile = {
  name: "Ryan Lee",
  greeting: "Hi, I'm Ryan!",
  // One string per paragraph. Wrap text in **double asterisks** to bold it.
  intro: [
    "Thanks for visiting my portfolio! I'm a fourth-year student at UC Berkeley studying **Industrial Engineering** and **Data Science**. I've explored a few different paths, including consulting and program management, but I ended up falling in love with product, and that's what I'm pursuing now. I love building products from 0 to 1 and learning something new with each one.",
    "Outside of school and work, I love working out, discovering new music, and sports, especially baseball, as you may have guessed from the theme. Use the mini baseball field in the bottom-right corner to round the bases and explore the rest of the site!",
  ],
  github: "https://github.com/ryanlee555",
  resume: "/ryan-lee-resume.pdf",
  copyrightYear: 2026,
};

// The "Round the bases" list on Home: one line per page.
export const lineup = {
  about: "You're already here, thanks for visiting!",
  experience: "Roles I've held and what I accomplished in each one",
  projects: "Everything I've built and my lessons along the way",
  interests: "I'm not that boring, I have hobbies too!",
};

export const contact = {
  heading: "Let's connect.",
  blurb:
    "Reach out through the form if you have any questions or just want to connect, and I'll get back to you as soon as I can :D",
  email: "ryan.lee55@berkeley.edu",
  phone: "(714) 909-8464",
  phoneHref: "tel:+17149098464",
  linkedin: "https://www.linkedin.com/in/ryan-lee-uc-berkeley/",
};

export type Role = {
  company: string;
  logo: StaticImageData;
  logoDark?: StaticImageData; // light-colored version for dark mode, when the logo itself is dark
  logoHeight: number; // px; set per logo so wordmarks and icons look about the same size
  role: string;
  location: string;
  dates: string;
  points: string[];
  photos?: { src: StaticImageData; alt: string; position?: string }[]; // shown in the right column
};

// From the resume (public/ryan-lee-resume.pdf), newest first.
export const experience: Role[] = [
  {
    company: "Cisco",
    logo: cisco,
    logoHeight: 68,
    photos: [
      { src: ciscoPhoto1, alt: "Ryan standing next to the Cisco sign" },
      { src: ciscoPhoto2, alt: "Team dinner around a long restaurant table" },
    ],
    role: "AI Product Management Intern",
    location: "San Jose, CA",
    dates: "Jun 2026 – Sep 2026",
    points: [
      "Owned and delivered 2 features end-to-end for AI Canvas (Cisco's newest AI collaborative workspace app, launched in Aug 2026), redesigning the main navigation page and restructuring the backend for quick-start prompts",
      "Launched 3 Jira internal automation skills adopted by 400+ people org-wide, cutting a 12‑minute manual process by 90%",
      "Built an automated metrics dashboard consolidating 50+ Cisco dashboards and achieving a 99% approval rating",
    ],
  },
  {
    company: "Tesla",
    logo: tesla,
    logoHeight: 84,
    photos: [
      { src: teslaPhoto1, alt: "Tesla office entrance with the Tesla wordmark", position: "100% 50%" },
      { src: teslaPhoto2, alt: "Ryan sitting in front of a large metal wolf sculpture" },
    ],
    role: "Technical Program Management Intern",
    location: "Palo Alto, CA",
    dates: "Jan 2026 – Apr 2026",
    points: [
      "Coordinated requirements from engineering to allocate 350+ vehicle Chassis Controls fleet across global sites",
      "Developed and iterated an internal fleet audit web tool, reducing audit processing time by 40% across 14 teams",
      "Procured $1.2M+ in parts and materials, overseeing end-to-end ordering processes to ensure operational continuity",
    ],
  },
  {
    company: "ServiceNow",
    logo: servicenow,
    logoDark: servicenowDark,
    logoHeight: 26,
    photos: [
      { src: servicenowPhoto1, alt: "ServiceNow office building with the ServiceNow sign" },
      { src: servicenowPhoto2, alt: "Group dressed up at an evening event under a lit tree" },
    ],
    role: "Product Manager (Contract)",
    location: "San Francisco, CA",
    dates: "Sep 2025 – Dec 2025",
    points: [
      "Executed user and market research with 40 startups and SMBs, uncovering onboarding and pricing friction points",
      "Built a GTM plan boosting trial-to-paid conversion by 35% via streamlined onboarding and success programs",
      "Benchmarked 8 competing platforms using MySQL queries and Tableau dashboards to identify 10 market gaps",
    ],
  },
  {
    company: "PepsiCo",
    logo: pepsico,
    logoHeight: 88,
    photos: [
      { src: pepsicoPhoto1, alt: "PepsiCo and Frito-Lay sign on an office wall" },
      { src: pepsicoPhoto2, alt: "Chester Cheetah mascot head with oversized glasses" },
    ],
    role: "Supply Chain Intern",
    location: "Bakersfield, CA",
    dates: "Jun 2025 – Aug 2025",
    points: [
      "Automated a redispatch tracking tool for 150+ weekly truckloads, surfacing driver, timing, and location data",
      "Reduced manual lookup time by 60% by streamlining dispatch workflows leveraging data from SAP and Excel",
      "Cut 70% of citation review time with an attendance call-off tracker for 77 drivers that auto-calculates eligibility",
    ],
  },
  {
    company: "Uber",
    logo: uber,
    logoDark: uberDark,
    logoHeight: 38,
    photos: [
      { src: uberPhoto1, alt: "Uber sign in the Mission Bay office lobby" },
      { src: uberPhoto2, alt: "The team standing under an Uber welcome banner" },
    ],
    role: "Technical Product Manager (Contract)",
    location: "San Francisco, CA",
    dates: "Feb 2025 – May 2025",
    points: [
      "Guided a team of 8 to pilot campus card proposals, hypothesizing data-driven use cases with 12 executive inputs",
      "Uncovered 84% intent to order more with campus card support via 300+ surveys and 12 executive interviews",
      "Projected a 15–25% increase in student order volume by modeling spending behavior across 35+ campus markets",
    ],
  },
];

type Shot = { src: StaticImageData; alt: string; caption?: string };

export type ProjectDetail = {
  live?: string;
  repo?: string;
  meta: { label: string; value: string }[];
  why: string[]; // one string per paragraph
  sections: {
    title: string;
    body: string;
    shots?: Shot[];
    demo?: "arc-slider"; // a live, draggable component shown beside the shots
    options?: { name: string; blurb: string }[];
  }[];
  built: { layer: string; tech: string }[];
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  cover?: Shot; // card image; a second, smaller one floats over it
  inset?: Shot;
  detail?: ProjectDetail; // projects with a detail page at /projects/[slug]
};

export const projects: Project[] = [
  {
    slug: "grove",
    name: "Grove",
    summary:
      "A personal **full-stack finance and budgeting app**. It links to **real bank accounts** and turns raw transactions into **a clear picture of where my money goes**.",
    stack: ["React", "Supabase", "TypeScript", "Vercel"],
    cover: { src: groveHero, alt: "Grove landing page: Grow your savings, naturally" },
    inset: { src: groveBudgetEditor, alt: "Grove budget editor with an arc slider set to $150" },
    detail: {
      live: "https://grovee.vercel.app/",
      repo: "https://github.com/ryanlee555/Grove",
      meta: [
        { label: "Role", value: "Solo, full stack" },
        { label: "Built with", value: "React, Supabase, TypeScript, Vercel" },
        { label: "Status", value: "Live, used every week" },
      ],
      why: [
        "I'm a **broke college student** who got tired of having **no idea where my money was going**. My bank would show me a long list of transactions and call it a day, but that wasn't enough. I wanted to actually see it: **where is my money really going every month?**",
        "So I built Grove, a **clean, simple, and transparent** tool that shows **exactly where your money goes**, so you can budget with a clearer head. It started as a way to make sense of my own spending and turned into something **I use every week**.",
        "If you're a student, a young professional, or anyone who wants **more clarity on their finances**, Grove was made for you.",
      ],
      sections: [
        {
          title: "Spending overview",
          body: "Grove syncs **live transactions** from my SoFi and Chase accounts **through Plaid**. The dashboard breaks spending down **by category or by card** with an interactive donut chart, weekly trends, and a sortable transaction table. Edits like recategorizing or deleting a transaction are saved against Plaid's stable IDs, so they **survive every future sync**.",
          shots: [{ src: groveDashboard, alt: "Grove dashboard with total spent, a category donut chart, transactions, and weekly trends" }],
        },
        {
          title: "Budgets",
          body: "Set a **monthly limit for each category** and see at a glance **what's on track and what's over**. Limits are set with a **custom SVG arc slider**: drag to set, snap to $50, with an amber warning past 80%. **Try it on the right.**",
          shots: [
            { src: groveBudgets, alt: "Grove budgets page with totals and a card per category" },
          ],
          demo: "arc-slider",
        },
        {
          title: "Hamilton AI",
          body: "A slide-in assistant **built on Claude** that knows my **transaction history and monthly spending**, so I can just **ask where my money went**. It answers in whichever of **six styles** I pick.",
          options: [
            { name: "Default", blurb: "Balanced and friendly, like a knowledgeable friend." },
            { name: "Concise", blurb: "Short and direct. No fluff, just the numbers." },
            { name: "Detailed", blurb: "Deep dives with full breakdowns and context." },
            { name: "Hype", blurb: "Enthusiastic and encouraging about every win." },
            { name: "Roast", blurb: "Brutally honest about your spending. No filter." },
            { name: "Lin-Manuel 🎭", blurb: "Hamilton the musical energy: rise up, not throwing away your shot." },
          ],
        },
      ],
      built: [
        { layer: "Frontend", tech: "React + Vite, React Router" },
        { layer: "Backend", tech: "Supabase: Postgres, Edge Functions (Deno, TypeScript), Storage" },
        { layer: "Bank data", tech: "Plaid API" },
        { layer: "AI", tech: "Anthropic API (Claude Haiku) through an Edge Function" },
        { layer: "Hosting", tech: "Vercel, deploys on every push to main" },
      ],
    },
  },
  {
    slug: "speakeasy",
    name: "Speakeasy",
    summary:
      "A **speaking practice app** with a few different modes that help you **get comfortable speaking**, whether that's on a stage or in everyday conversation. **150+ people** use it today.",
    stack: ["JavaScript", "Supabase", "IndexedDB", "MediaRecorder API"],
    cover: { src: speakeasyHero, alt: "Speakeasy landing page: Speak a little easier" },
    inset: { src: speakeasyTopic, alt: "Speakeasy practice mode panel with today's challenge" },
    detail: {
      live: "https://speakeasy-beryl.vercel.app",
      repo: "https://github.com/ryanlee555/Speakeasy",
      meta: [
        { label: "Role", value: "Solo, full stack" },
        { label: "Built with", value: "JavaScript, Supabase, IndexedDB, Vercel" },
        { label: "Status", value: "Live, 150+ active users" },
      ],
      why: [
        "All my life, I was **never a great speaker**. I'd find myself **trembling uncontrollably** whenever I had to speak in public, and nothing I tried seemed to help. Then I came across **Vinh Giang**, who said the best way to get better at public speaking is to **watch and listen to yourself**.",
        "**Record yourself, then replay it**: first just the audio, then just the visual, then with a transcript, then all of it again. Doing this over and over has **genuinely helped me improve**, and I've seen real progress in myself.",
        "The other thing that helped was **putting myself under pressure**: giving myself a random topic and speaking on it for a set amount of time. That trains your brain to **stay calm under pressure**. I hope Speakeasy helps you get better at speaking too, or at least gives you a good place to practice.",
      ],
      sections: [
        {
          title: "The studio",
          body: "Pick a prompt, **set a timer, and hit record** in the browser. The take plays back **the moment you stop**, with a scrubber to jump around. Nothing leaves your machine unless you sign in and choose to save it, and **every take auto-saves** to a folder you pick once.",
          shots: [{ src: speakeasyStudio, alt: "Speakeasy studio with the recording panel and practice mode picker" }],
        },
        {
          title: "Three practice modes",
          body: "**Topic** gives you a prompt from **13 categories**, each rated easy, medium, or hard. **Words** hands you a single random word and nothing else to lean on. **Freeplay** drops the prompt entirely so you can just talk. Behind them is a library of **1,043 prompts**, plus a **Daily Challenge** that's the same for everyone each day.",
          shots: [
            { src: speakeasyTopic, alt: "Topic mode with the daily challenge and topic categories", caption: "Topic" },
            { src: speakeasyWords, alt: "Words mode with the daily word and word categories", caption: "Words" },
            { src: speakeasyFreeplay, alt: "Freeplay mode with time limit options", caption: "Freeplay" },
          ],
        },
        {
          title: "Watch it back, build the habit",
          body: "Sign in to keep every take in a **private library that follows you across devices**. Re-watch any recording as the **full video, camera only, or audio only** to notice different things each time. A **day streak** and running totals of recordings and minutes practiced keep you coming back.",
          shots: [{ src: speakeasyFeatures, alt: "Speakeasy features: Topic, Words, and Freeplay modes, the Daily Challenge, and notes on every take" }],
        },
      ],
      built: [
        { layer: "Frontend", tech: "HTML, CSS, and plain JavaScript; no framework, no build step" },
        { layer: "Recording", tech: "getUserMedia + MediaRecorder, capped near 1 Mbps" },
        { layer: "Backend", tech: "Supabase: auth, Postgres, private Storage for video" },
        { layer: "Local saves", tech: "File System Access API + IndexedDB" },
        { layer: "Hosting", tech: "Vercel, deploys on every push to main" },
      ],
    },
  },
];

export type Interest = {
  name: string;
  blurb: string; // **bold** works
  opens?: "songs"; // a button under the blurb that reveals the "On repeat" songs
};

// Baseball and the third pillar are still samples.
export const interests: Interest[] = [
  {
    name: "Baseball",
    blurb:
      "The reason this site looks like this. Your team, your favorite ballpark, and the first game you remember go here.",
  },
  {
    name: "Music & Concerts",
    blurb:
      "I grew up with music. I took singing lessons as a kid, so I've always been drawn to it. In high school, I listened to a lot of pop, R&B, and K‑R&B, artists like **The Weeknd, Bruno Mars, and Wave to Earth**. I've also always loved musicals, and **Dear Theodosia** has had a place in my heart since I saw **Hamilton** on Broadway in 2022. Lately it's been a lot of **EDM**, and I love going to concerts and raves to express myself and have fun with friends. Click below to see some of the songs I have on repeat!",
    opens: "songs",
  },
  { name: "Interest three", blurb: "A line or two about it." },
];

export type Song = {
  title: string;
  artist: string; // shown above the title; the Spotify player shows the full credits
  spotifyId: string; // from the track's Spotify link: open.spotify.com/track/<this>
  why: string[]; // one string per paragraph; **bold** works
};

// The "On repeat" songs on Interests. Each plays through Spotify's embedded player.
export const songs: Song[] = [
  {
    title: "Carry You",
    artist: "Martin Garrix",
    spotifyId: "31ZO9XuKt48Qb2eUTBynd2",
    why: [
      "I first heard this song live at **EDC Las Vegas in 2026**, and I fell in love with it immediately. Martin Garrix has a way of building a drop that feels **huge but still emotional**: the synths swell, the vocals carry the melody, and then everything opens up at once. Hearing that live, with thousands of people singing along around me, is something I'll **never forget**.",
    ],
  },
  {
    title: "Infinite",
    artist: "GRiZ",
    spotifyId: "4zTVDxD5KpLjrSAiLcxl4b",
    why: [
      "My **favorite song** from my **favorite artist, GRiZ**. Nobody else in EDM sounds like him: he mixes **funky, soulful grooves** with heavy bass and plays **live saxophone** right over the top. Infinite has that **feel-good, uplifting energy** that makes it impossible not to smile.",
    ],
  },
  {
    title: "Good Night Good Dream",
    artist: "Nerd Connection",
    spotifyId: "423WHvB4mKprM6hELzpH3F",
    why: [
      "Such a **beautiful Korean melody** about **love, heartbreak, and farewell**. It's soft, warm, and a little bittersweet, like saying goodbye to someone you still care about, and it's the kind of song I put on **late at night** when everything slows down.",
    ],
  },
  {
    title: "Dear Theodosia",
    artist: "Hamilton",
    spotifyId: "2sEq2rC3ynYsT49x7utWnd",
    why: [
      "I've been **obsessed with Hamilton** since I was introduced to it in high school, and seeing it **live on Broadway in 2022** was a dream come true. Dear Theodosia is Burr and Hamilton singing to their newborn kids about the world they hope to leave them, and it's one of the **most tender moments** in the whole show. It still gets me every time.",
    ],
  },
];
