import { useState, type Ref } from "react";
import { CHARACTERS } from "./GameCharacters";

// Drawn with its feet at (0, 0) so it can be placed by translating to a base.
// Hovering it swaps the penguin for a random duck, lion, koala, or turtle (an easter egg); all share the feet and the waddle.
const ALTS = CHARACTERS.filter((c) => c.id !== "penguin");

export default function Penguin({ ref, transform }: { ref?: Ref<SVGGElement>; transform: string }) {
  const [alt, setAlt] = useState(ALTS[0].id);
  const pick = () => setAlt(ALTS[Math.floor(Math.random() * ALTS.length)].id);
  return (
    <g ref={ref} className="penguin" transform={transform}>
      <g transform="scale(1.2)">
        <rect className="p-hit" onPointerEnter={pick} x="-12" y="-27" width="24" height="29" />
        <g className="pbob">
          <ellipse className="p-foot fa" cx="-3.6" cy="-1" rx="3" ry="1.5" />
          <ellipse className="p-foot fb" cx="3.6" cy="-1" rx="3" ry="1.5" />
          <g className="pwad">
            <g className="peng">
              <ellipse className="p-flip" cx="-8" cy="-10.5" rx="2" ry="5" transform="rotate(14 -8 -10.5)" />
              <ellipse className="p-flip" cx="8" cy="-10.5" rx="2" ry="5" transform="rotate(-14 8 -10.5)" />
              <ellipse className="p-body" cx="0" cy="-11" rx="8" ry="11" />
              <ellipse className="p-belly" cx="0" cy="-8" rx="5" ry="7" />
              <circle className="p-eye" cx="-3.2" cy="-17" r=".9" />
              <circle className="p-eye" cx="3.2" cy="-17" r=".9" />
              <path className="p-beak" d="M-2.2 -15.4 L2.2 -15.4 L0 -12.8 Z" />
            </g>
            {ALTS.map((c) => (
              <g key={c.id} className={`alt${c.id === alt ? " on" : ""}`}>
                {c.art}
              </g>
            ))}
          </g>
        </g>
      </g>
    </g>
  );
}
