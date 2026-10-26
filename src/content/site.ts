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
  dates: string;
  title: string;
  org: string;
  points: string[];
};

// sample
export const experience: Role[] = [
  {
    dates: "Jun 2025 – Aug 2025",
    title: "Software Engineering Intern",
    org: "Company Name · City, ST",
    points: [
      "One line on the biggest thing you shipped, with a number if you have one.",
      "One line on the tools or team you worked with.",
      "One line on what changed because of your work.",
    ],
  },
  {
    dates: "Jan 2025 – May 2025",
    title: "Contract Developer",
    org: "Client or Company · Remote",
    points: [
      "What the client needed and what you delivered.",
      "The part you're proudest of.",
    ],
  },
  {
    dates: "Summer 2024",
    title: "Role Title",
    org: "Company Name · City, ST",
    points: [
      "A short, specific description of the work.",
      "A skill you picked up that you still use.",
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
