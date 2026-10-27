"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BASES, BASE_GO_EVENT, baseIndexForPath } from "@/lib/bases";
import Penguin from "./Penguin";

const STEP_MS = 650; // one base-to-base waddle
const SETTLE_MS = 380; // pause on arrival before the dock shrinks

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, prefersReducedMotion() ? 0 : ms));
const standAt = (x: number, y: number) => `translate(${x} ${y + 3})`;

// The visitor can tuck the dock away and bring it back from a tab on the right edge. The choice is
// remembered, and the inline script in layout.tsx applies it before first paint so the dock never flashes.
const setDockHidden = (hidden: boolean) => {
  const root = document.documentElement;
  if (hidden) root.dataset.dock = "hidden";
  else delete root.dataset.dock;
  try {
    if (hidden) localStorage.setItem("dock", "hidden");
    else localStorage.removeItem("dock");
  } catch {}
};

export default function Dock() {
  const router = useRouter();
  const pathname = usePathname();
  const [startIndex] = useState(() => Math.max(0, baseIndexForPath(pathname)));
  const stageRef = useRef<HTMLDivElement>(null);
  const penguinRef = useRef<SVGGElement>(null);
  const posRef = useRef(startIndex);
  const busyRef = useRef(false);

  const place = useCallback((x: number, y: number) => {
    penguinRef.current?.setAttribute("transform", standAt(x, y));
  }, []);

  const segment = useCallback(
    (a: { x: number; y: number }, b: { x: number; y: number }) =>
      new Promise<void>((resolve) => {
        if (prefersReducedMotion()) {
          place(b.x, b.y);
          return resolve();
        }
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / STEP_MS);
          place(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
          if (p < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      }),
    [place],
  );

  // Walk the base path the short way round (ties go counterclockwise, like a real runner).
  const waddleTo = useCallback(
    async (target: number) => {
      const from = posRef.current;
      const fwd = (target - from + 4) % 4;
      const dir = fwd <= 4 - fwd ? 1 : -1;
      const steps = dir === 1 ? fwd : 4 - fwd;
      const penguin = penguinRef.current;
      penguin?.classList.add("running");
      let at = from;
      for (let s = 0; s < steps; s++) {
        const next = (at + dir + 4) % 4;
        await segment(BASES[at], BASES[next]);
        at = next;
      }
      penguin?.classList.remove("running");
      posRef.current = target;
    },
    [segment],
  );

  // Picked from the dock itself: keep it grown until the penguin arrives, even if the
  // pointer leaves. Picked from anywhere else: the penguin waddles in the small dock.
  const go = useCallback(
    async (target: number, fromDock = false) => {
      if (busyRef.current) return;
      // Already on this base but deeper in it (like /projects/grove): just go back up.
      if (target === posRef.current) {
        if (window.location.pathname !== BASES[target].path) router.push(BASES[target].path);
        return;
      }
      busyRef.current = true;
      const stage = stageRef.current;
      if (fromDock) stage?.classList.add("peek");
      document.documentElement.setAttribute("data-leaving", "");
      await waddleTo(target);
      router.push(BASES[target].path);
      if (fromDock) {
        await wait(SETTLE_MS);
        stage?.classList.remove("peek");
      }
      busyRef.current = false;
    },
    [router, waddleTo],
  );

  // Browser back/forward changes the page first; the penguin catches up.
  useEffect(() => {
    document.documentElement.removeAttribute("data-leaving");
    const idx = baseIndexForPath(pathname);
    if (idx < 0 || idx === posRef.current || busyRef.current) return;
    busyRef.current = true;
    waddleTo(idx).then(() => {
      busyRef.current = false;
    });
  }, [pathname, waddleTo]);

  useEffect(() => {
    BASES.forEach((b) => router.prefetch(b.path));
  }, [router]);

  useEffect(() => {
    const onRequest = (e: Event) => go((e as CustomEvent<number>).detail);
    const onKey = (e: KeyboardEvent) => {
      if (document.documentElement.dataset.intro === "playing") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.defaultPrevented) return; // a control (like a slider) already used the key
      if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable], [role="slider"]')) return;
      if (e.key === "ArrowRight") go((posRef.current + 1) % 4);
      if (e.key === "ArrowLeft") go((posRef.current + 3) % 4);
    };
    window.addEventListener(BASE_GO_EVENT, onRequest);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(BASE_GO_EVENT, onRequest);
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  // React types an SVG <a> as an HTML anchor; both have blur(), which is all this needs.
  const onBaseClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.blur();
    go(index, true);
  };

  const start = BASES[startIndex];

  const hide = () => {
    stageRef.current?.querySelector<HTMLElement>(":focus")?.blur();
    setDockHidden(true);
  };

  return (
    <>
      <nav className="stage" ref={stageRef} aria-label="Pages">
        <p className="dock-hint" aria-hidden="true">
          Click a base, or use the ← → keys
        </p>
        <button type="button" className="dock-hide" aria-label="Hide the field" onClick={hide}>
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M4.5 2.5 L8 6 L4.5 9.5" />
          </svg>
        </button>
        <svg viewBox="0 0 300 240">
          <polygon className="infield" points="150,205 215,140 150,75 85,140" />
          <path className="chalk draw foul" pathLength={1} d="M150 205 L262 93" />
          <path className="chalk draw foul" pathLength={1} d="M150 205 L38 93" />
          <path className="chalk draw" pathLength={1} d="M150 205 L215 140 L150 75 L85 140 Z" />
          <circle className="mound" cx="150" cy="140" r="3.5" />

          {BASES.map((b, i) => (
            <a
              key={b.path}
              href={b.path}
              className="base"
              aria-label={`${b.name}`}
              aria-current={i === baseIndexForPath(pathname) ? "page" : undefined}
              onClick={(e) => onBaseClick(e, i)}
            >
              <circle className="hit" cx={b.x} cy={b.y} r="26" />
              {i === 0 ? (
                <path className="bag" d="M-8 -5 H8 V2 L0 9 L-8 2 Z" transform={`translate(${b.x} ${b.y})`} />
              ) : (
                <rect
                  className="bag"
                  x="-6.5"
                  y="-6.5"
                  width="13"
                  height="13"
                  transform={`translate(${b.x} ${b.y}) rotate(45)`}
                />
              )}
              <BaseLabel index={i} />
            </a>
          ))}

          <Penguin ref={penguinRef} transform={standAt(start.x, start.y)} />
        </svg>
      </nav>
      <button type="button" className="dock-tab" aria-label="Show the field" onClick={() => setDockHidden(false)}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 3 L17 10 L10 17 L3 10 Z" />
        </svg>
      </button>
    </>
  );
}

// Each label sits on the outside of its base so it never collides with the penguin.
function BaseLabel({ index }: { index: number }) {
  const b = BASES[index];
  const spots = [
    { x: b.x, y: b.y + 27, anchor: "middle" },
    { x: b.x + 19, y: b.y + 4, anchor: "start" },
    { x: b.x, y: b.y - 31, anchor: "middle" },
    { x: b.x - 19, y: b.y + 4, anchor: "end" },
  ] as const;
  const s = spots[index];
  return (
    <text className="lbl" x={s.x} y={s.y} textAnchor={s.anchor}>
      {b.label}
    </text>
  );
}
