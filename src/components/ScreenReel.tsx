"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent, type PointerEvent } from "react";
import type { Screen } from "@/content/site";

const SPEED = 40; // px per second while it drifts on its own
const RESUME_AFTER = 2500; // ms after the last swipe, drag, or scroll before it drifts again

// Films and shows in a row that keeps revolving. Visitors can swipe, scroll, or drag it by hand; it pauses
// while hovered and picks up again a moment after they let go. The list is drawn twice so the loop is
// seamless; the second copy is hidden from screen readers and the tab order.
export default function ScreenReel({ items }: { items: Screen[] }) {
  const reel = useRef<HTMLDivElement>(null);
  const pos = useRef(0); // exact scroll position; scrollLeft alone rounds away slow drift
  const hovered = useRef(false);
  const idleUntil = useRef(0);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);

  const touch = () => {
    idleUntil.current = performance.now() + RESUME_AFTER;
  };

  // Keep the position inside the first copy so scrolling either way never hits an end.
  const wrap = (el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (pos.current >= half) pos.current -= half;
    if (pos.current < 0) pos.current += half;
    el.scrollLeft = pos.current;
  };

  useEffect(() => {
    const el = reel.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const focused = el.querySelector(":focus-visible"); // a keyboard user is tabbing through the cards
      if (!still && !hovered.current && !focused && !drag.current && now > idleUntil.current) {
        pos.current += (SPEED * dt) / 1000;
        wrap(el);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Native scrolling (trackpad, wheel, touch swipe) moves scrollLeft; follow it and hold off the drift.
  const onScroll = () => {
    const el = reel.current;
    if (!el || Math.abs(el.scrollLeft - pos.current) < 1) return;
    pos.current = el.scrollLeft;
    touch();
    wrap(el);
  };

  // Mouse drag; touch screens already swipe natively.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, start: pos.current, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = reel.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 5) return;
    if (!d.moved) el.setPointerCapture(e.pointerId);
    d.moved = true;
    pos.current = d.start - dx;
    wrap(el);
  };
  const onPointerUp = () => {
    if (drag.current?.moved) touch();
    setTimeout(() => (drag.current = null)); // after the click that follows, so a drag never opens a link
  };
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className="reel"
      ref={reel}
      onScroll={onScroll}
      onPointerEnter={(e) => e.pointerType === "mouse" && (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      <div className="reel-track">
        {[0, 1].map((copy) =>
          items.map((item) => (
            <a
              key={`${copy}-${item.imdb}`}
              className="reel-card"
              href={item.imdb}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              aria-hidden={copy === 1 || undefined}
              tabIndex={copy === 1 ? -1 : undefined}
            >
              <div className="reel-poster">
                {item.poster ? (
                  <Image src={item.poster} alt={`${item.title} poster`} fill sizes="200px" loading="eager" draggable={false} />
                ) : (
                  <span>{item.title}</span>
                )}
              </div>
              <p className="eyebrow">
                {item.kind} · {item.year}
              </p>
              <h4>
                {item.title} <span aria-hidden="true">↗</span>
              </h4>
            </a>
          )),
        )}
      </div>
    </div>
  );
}
