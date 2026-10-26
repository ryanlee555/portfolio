import type { Ref } from "react";

// Drawn with its feet at (0, 0) so it can be placed by translating to a base.
export default function Penguin({ ref, transform }: { ref?: Ref<SVGGElement>; transform: string }) {
  return (
    <g ref={ref} className="penguin" transform={transform}>
      <g transform="scale(1.2)">
        <g className="pbob">
          <ellipse className="p-foot fa" cx="-3.6" cy="-1" rx="3" ry="1.5" />
          <ellipse className="p-foot fb" cx="3.6" cy="-1" rx="3" ry="1.5" />
          <g className="pwad">
            <ellipse className="p-flip" cx="-8" cy="-10.5" rx="2" ry="5" transform="rotate(14 -8 -10.5)" />
            <ellipse className="p-flip" cx="8" cy="-10.5" rx="2" ry="5" transform="rotate(-14 8 -10.5)" />
            <ellipse className="p-body" cx="0" cy="-11" rx="8" ry="11" />
            <ellipse className="p-belly" cx="0" cy="-8" rx="5" ry="7" />
            <circle className="p-eye" cx="-3.2" cy="-17" r=".9" />
            <circle className="p-eye" cx="3.2" cy="-17" r=".9" />
            <path className="p-beak" d="M-2.2 -15.4 L2.2 -15.4 L0 -12.8 Z" />
          </g>
        </g>
      </g>
    </g>
  );
}
