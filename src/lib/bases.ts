// The four bases double as the site's pages. Order matters: it's the
// direction a runner (here, a penguin) rounds the bases.

export type Base = {
  path: string;
  name: string;
  short: string;
  label: string;
  x: number;
  y: number;
};

export const BASES: Base[] = [
  { path: "/", name: "About", short: "HP", label: "ABOUT", x: 150, y: 205 },
  { path: "/experience", name: "Experience", short: "1B", label: "EXPERIENCE", x: 215, y: 140 },
  { path: "/projects", name: "Projects", short: "2B", label: "PROJECTS", x: 150, y: 75 },
  { path: "/interests", name: "Interests", short: "3B", label: "INTERESTS", x: 85, y: 140 },
];

export function baseIndexForPath(pathname: string): number {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  // Subpages (like /projects/grove) belong to their base.
  return BASES.findIndex((b) => b.path === clean || (b.path !== "/" && clean.startsWith(`${b.path}/`)));
}

// Fired by links outside the dock so the penguin runs before the page changes.
export const BASE_GO_EVENT = "base:go";

export function requestBase(index: number) {
  window.dispatchEvent(new CustomEvent<number>(BASE_GO_EVENT, { detail: index }));
}
