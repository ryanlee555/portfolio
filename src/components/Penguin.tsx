import type { Ref } from "react";

// Drawn with its feet at (0, 0) so it can be placed by translating to a base.
// Hovering it swaps the penguin for a duck (an easter egg); both share the feet and the waddle.
export default function Penguin({ ref, transform }: { ref?: Ref<SVGGElement>; transform: string }) {
  return (
    <g ref={ref} className="penguin" transform={transform}>
      <g transform="scale(1.2)">
        <rect className="p-hit" x="-12" y="-27" width="24" height="29" />
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
            <g className="duck">
              <path className="d-tail" d="M-7.5 -9.5 L-11.5 -13.5 L-6 -12 Z" />
              <ellipse className="d-body" cx="0" cy="-7.5" rx="9" ry="6.5" />
              <ellipse className="d-wing" cx="-1.5" cy="-7.8" rx="4.6" ry="2.9" transform="rotate(-12 -1.5 -7.8)" />
              <circle className="d-head" cx="3.4" cy="-16" r="5.2" />
              <path className="d-bill" d="M7.6 -17 Q11.8 -16.4 11.4 -14.6 Q9.6 -13.7 7.6 -14.5 Z" />
              <circle className="d-eye" cx="4.9" cy="-17.3" r=".95" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}
