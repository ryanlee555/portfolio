"use client";

import { DM_Sans } from "next/font/google";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

// A working copy of Grove's budget editor: drag the knob around the arc to set a
// monthly limit. Snaps to $50, like the real app. It always uses Grove's own light palette.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MAX = 3000;
const STEP = 50;
const SPENT = 178;
const START = 150;
// The arc runs 270 degrees, clockwise from bottom-left to bottom-right (angles from 12 o'clock).
const SWEEP = 270;
const CX = 150;
const CY = 140;
const R = 108;

const money = (n: number, cents = false) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;

function point(t: number) {
  const a = ((-SWEEP / 2 + SWEEP * t) * Math.PI) / 180;
  return { x: CX + R * Math.sin(a), y: CY - R * Math.cos(a) };
}

function arc(t: number) {
  const s = point(0);
  const e = point(t);
  const large = SWEEP * t > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
}

const snap = (v: number) =>
  Math.min(MAX, Math.max(0, Math.round(v / STEP) * STEP));

export default function ArcSlider() {
  const [limit, setLimit] = useState<number | null>(START);
  const [saved, setSaved] = useState<number | null>(START);
  const [flash, setFlash] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const value = limit ?? 0;
  const t = value / MAX;
  const knob = point(t);

  const fromPointer = (e: PointerEvent) => {
    // Map the pointer into viewBox units; the SVG may be letterboxed inside its box.
    const svg = svgRef.current!;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
      svg.getScreenCTM()!.inverse(),
    );
    const x = p.x - CX;
    const y = p.y - CY;
    const deg = (Math.atan2(x, -y) * 180) / Math.PI; // -180..180, 0 at 12 o'clock
    // In the gap at the bottom, stick to whichever end the knob is nearer.
    if (Math.abs(deg) > SWEEP / 2) return setLimit(t > 0.5 ? MAX : 0);
    setLimit(snap(((deg + SWEEP / 2) / SWEEP) * MAX));
  };

  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e);
  };
  const onMove = (e: PointerEvent) => dragging.current && fromPointer(e);
  const onUp = () => (dragging.current = false);

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: STEP,
      ArrowUp: STEP,
      ArrowLeft: -STEP,
      ArrowDown: -STEP,
      PageUp: 500,
      PageDown: -500,
    };
    if (e.key in keys) setLimit(snap(value + keys[e.key]));
    else if (e.key === "Home") setLimit(0);
    else if (e.key === "End") setLimit(MAX);
    else return;
    e.preventDefault();
  };

  const say = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(""), 1400);
  };

  const left = value - SPENT;
  const status =
    limit === null
      ? { text: "", tone: "" }
      : left < 0
        ? { text: `${money(-left, true)} over`, tone: "over" }
        : {
            text: `${money(left, true)} left`,
            tone: SPENT / value > 0.8 ? "warn" : "ok",
          };
  const fill =
    limit !== null && SPENT / Math.max(value, 1) > 0.8 && left >= 0
      ? "#D4A72C"
      : "#5E6B3A";

  return (
    <div className="arc-wrap">
      <div className={`arc-card ${dmSans.className}`}>
        <div className="arc-top">
          <span className="arc-cat">
            <i aria-hidden="true" />
            Shopping
          </span>
          <button
            type="button"
            className="arc-remove"
            onClick={() => setLimit(null)}
            disabled={limit === null}
          >
            Remove limit
          </button>
        </div>

        <svg
          ref={svgRef}
          className="arc-svg"
          viewBox="0 16 300 244"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <path
            d={arc(1)}
            fill="none"
            stroke="#EAE5DA"
            strokeWidth="26"
            strokeLinecap="round"
          />
          {limit !== null && (
            <path
              d={arc(t)}
              fill="none"
              stroke={fill}
              strokeWidth="26"
              strokeLinecap="round"
            />
          )}
          <text x={CX} y={CY + 2} textAnchor="middle" className="arc-amount">
            {limit === null ? "No limit" : money(value)}
          </text>
          <text x={CX} y={CY + 30} textAnchor="middle" className="arc-sub">
            monthly limit
          </text>
          <g
            className="arc-knob"
            transform={`translate(${knob.x} ${knob.y})`}
            tabIndex={0}
            role="slider"
            aria-label="Monthly limit for Shopping"
            aria-valuemin={0}
            aria-valuemax={MAX}
            aria-valuenow={value}
            aria-valuetext={limit === null ? "No limit" : money(value)}
            onKeyDown={onKey}
          >
            <circle r="21" fill="#fff" stroke="#4A7A57" strokeWidth="6" />
          </g>
          <text x={point(0).x} y="252" textAnchor="middle" className="arc-end">
            $0
          </text>
          <text x={point(1).x} y="252" textAnchor="middle" className="arc-end">
            $3,000
          </text>
        </svg>

        <div className="arc-foot">
          <span>{money(SPENT, true)} spent</span>
          <span className={`arc-status ${status.tone}`}>{status.text}</span>
        </div>

        <button
          type="button"
          className="arc-btn confirm"
          onClick={() => {
            setSaved(limit);
            say("Saved");
          }}
        >
          {flash || "Confirm"}
        </button>
        <button
          type="button"
          className="arc-btn cancel"
          onClick={() => {
            setLimit(saved);
            say("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
