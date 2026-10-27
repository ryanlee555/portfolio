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
  about: "You're here right now, get to know me a little!",
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

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  href?: string;
};

// sample
export const projects: Project[] = [
  {
    name: "Project One",
    summary: "Two sentences on what it does, who it's for, and why you built it.",
    stack: ["React", "Node", "Postgres"],
  },
  {
    name: "Project Two",
    summary: "Two sentences on what it does, who it's for, and why you built it.",
    stack: ["Python", "FastAPI"],
  },
  {
    name: "Project Three",
    summary: "Two sentences on what it does, who it's for, and why you built it.",
    stack: ["TypeScript", "Next.js"],
  },
  {
    name: "Project Four",
    summary: "Two sentences on what it does, who it's for, and why you built it.",
    stack: ["Swift", "SwiftUI"],
  },
];

export type Interest = {
  name: string;
  blurb: string;
};

// sample
export const interests: Interest[] = [
  {
    name: "Baseball",
    blurb:
      "The reason this site looks like this. Your team, your favorite ballpark, and the first game you remember go here.",
  },
  { name: "Interest two", blurb: "A line or two about it." },
  { name: "Interest three", blurb: "A line or two about it." },
];
