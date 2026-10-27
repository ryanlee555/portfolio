import type { ReactNode } from "react";

// Pinguball batters. Each is drawn upright with its feet at (0, 0), about 27 units tall,
// the same footprint as the dock penguin, so the bat lines up with any of them.
// Unlike the dock penguin, these never change on hover.

export type CharacterId = "penguin" | "duck" | "lion" | "koala" | "turtle";

const feet = (fill: string) => (
  <>
    <ellipse cx="-3.6" cy="-1" rx="3" ry="1.5" style={{ fill }} />
    <ellipse cx="3.6" cy="-1" rx="3" ry="1.5" style={{ fill }} />
  </>
);

export const CHARACTERS: { id: CharacterId; name: string; art: ReactNode }[] = [
  {
    id: "penguin",
    name: "Penguin",
    art: (
      <g className="ch-penguin">
        {feet("var(--beak)")}
        <ellipse className="ch-pbody" cx="-8" cy="-10.5" rx="2" ry="5" transform="rotate(14 -8 -10.5)" />
        <ellipse className="ch-pbody" cx="8" cy="-10.5" rx="2" ry="5" transform="rotate(-14 8 -10.5)" />
        <ellipse className="ch-pbody" cx="0" cy="-11" rx="8" ry="11" />
        <ellipse className="ch-pbelly" cx="0" cy="-8" rx="5" ry="7" />
        <circle className="ch-pbelly" cx="-3.2" cy="-17" r=".9" />
        <circle className="ch-pbelly" cx="3.2" cy="-17" r=".9" />
        <path d="M-2.2 -15.4 L2.2 -15.4 L0 -12.8 Z" style={{ fill: "var(--beak)" }} />
      </g>
    ),
  },
  {
    id: "duck",
    name: "Duck",
    art: (
      <g>
        {feet("var(--beak)")}
        <path d="M-7.5 -9.5 L-11.5 -13.5 L-6 -12 Z" style={{ fill: "var(--duck)" }} />
        <ellipse cx="0" cy="-7.5" rx="9" ry="6.5" style={{ fill: "var(--duck)" }} />
        <ellipse cx="-1.5" cy="-7.8" rx="4.6" ry="2.9" transform="rotate(-12 -1.5 -7.8)" style={{ fill: "var(--duck-wing)" }} />
        <circle cx="3.4" cy="-16" r="5.2" style={{ fill: "var(--duck)" }} />
        <path d="M7.6 -17 Q11.8 -16.4 11.4 -14.6 Q9.6 -13.7 7.6 -14.5 Z" style={{ fill: "var(--beak)" }} />
        <circle cx="4.9" cy="-17.3" r=".95" style={{ fill: "var(--duck-eye)" }} />
      </g>
    ),
  },
  {
    id: "lion",
    name: "Lion",
    art: (
      <g>
        {feet("#C98A3E")}
        <ellipse cx="0" cy="-8" rx="7" ry="8" fill="#E0AC5C" />
        <ellipse cx="0" cy="-6" rx="4.2" ry="5" fill="#F3D9A6" />
        <circle cx="0" cy="-18" r="8.2" fill="#B5652B" />
        <circle cx="-4.6" cy="-23.2" r="1.8" fill="#E8B566" />
        <circle cx="4.6" cy="-23.2" r="1.8" fill="#E8B566" />
        <circle cx="0" cy="-18" r="5.6" fill="#E8B566" />
        <circle cx="-2" cy="-19" r=".8" fill="#2A1C10" />
        <circle cx="2" cy="-19" r=".8" fill="#2A1C10" />
        <ellipse cx="0" cy="-15.8" rx="2.4" ry="1.6" fill="#F6E2BA" />
        <path d="M-1.2 -17 L1.2 -17 L0 -15.6 Z" fill="#6B3A1E" />
      </g>
    ),
  },
  {
    id: "koala",
    name: "Koala",
    art: (
      <g>
        {feet("#7D858C")}
        <ellipse cx="0" cy="-8.5" rx="7.5" ry="8.5" fill="#A7AEB4" />
        <ellipse cx="0" cy="-6.5" rx="4.5" ry="5.5" fill="#E4E7EA" />
        <circle cx="-6.2" cy="-21.5" r="4" fill="#A7AEB4" />
        <circle cx="6.2" cy="-21.5" r="4" fill="#A7AEB4" />
        <circle cx="-6.2" cy="-21.5" r="2.2" fill="#F1C9CF" />
        <circle cx="6.2" cy="-21.5" r="2.2" fill="#F1C9CF" />
        <circle cx="0" cy="-18" r="6.4" fill="#B4BAC0" />
        <circle cx="-2.4" cy="-19.2" r=".8" fill="#1E2327" />
        <circle cx="2.4" cy="-19.2" r=".8" fill="#1E2327" />
        <ellipse cx="0" cy="-16.6" rx="1.7" ry="2.3" fill="#2B3035" />
      </g>
    ),
  },
  {
    id: "turtle",
    name: "Turtle",
    art: (
      <g>
        {feet("#6FA35A")}
        <ellipse cx="0" cy="-9" rx="8.6" ry="9" fill="#4E7D3A" />
        <ellipse cx="0" cy="-8.5" rx="5.4" ry="7" fill="#E7D49A" />
        <path d="M-4.6 -12.5 H4.6 M-5.3 -9 H5.3 M-4.6 -5.5 H4.6" stroke="#C9B373" strokeWidth=".6" />
        <circle cx="0" cy="-20.5" r="5" fill="#7DB563" />
        <circle cx="-1.9" cy="-21.4" r=".85" fill="#1D2A16" />
        <circle cx="1.9" cy="-21.4" r=".85" fill="#1D2A16" />
        <path d="M-1.6 -18.8 Q0 -17.6 1.6 -18.8" stroke="#2F4A24" strokeWidth=".5" fill="none" />
      </g>
    ),
  },
];

export const characterById = (id: string) => CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
