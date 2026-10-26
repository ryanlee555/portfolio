"use client";

import { useLayoutEffect, useRef } from "react";

const SEEN_KEY = "intro-seen";

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// 0 to 100 intro. The inline script in the layout decides before first paint whether it
// plays; this re-applies that choice because React's dev remount clears <html> attributes.
export default function Loader() {
  const numRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const msgRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) {
      root.dataset.intro = "seen";
      return;
    }
    root.dataset.intro = "playing";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 500 : 2400;
    const timers: number[] = [];
    let frame = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const v = Math.floor(ease(t) * 100);
      if (numRef.current) numRef.current.textContent = String(v).padStart(3, "0");
      if (barRef.current) barRef.current.style.width = `${v}%`;
      if (v > 55 && msgRef.current) msgRef.current.textContent = "Taking the field";
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (numRef.current) numRef.current.textContent = "100";
      if (msgRef.current) msgRef.current.textContent = "Play ball";
      timers.push(
        window.setTimeout(() => {
          root.dataset.intro = "done";
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
        }, reduce ? 0 : 350),
      );
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div id="loader" role="status" aria-label="Loading">
      <div className="ld-top">
        <span className="mark">Ryan Lee</span>
        <span className="mono">Portfolio</span>
      </div>
      <div>
        <p className="ld-num" ref={numRef} aria-hidden="true">
          000
        </p>
        <div className="ld-bar">
          <i ref={barRef} />
        </div>
        <div className="ld-bot">
          <span className="mono" ref={msgRef}>
            Warming up
          </span>
          <span className="mono">% loaded</span>
        </div>
      </div>
    </div>
  );
}
