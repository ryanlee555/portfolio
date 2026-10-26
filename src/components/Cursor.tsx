"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

// A dot that replaces the mouse pointer. It's white with a difference blend, so it shows
// dark on the light background and flips to the opposite color over text, images and panels.
// Grows over anything clickable. Touch screens keep their normal behavior.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || !window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let frame = 0;
    let x = 0;
    let y = 0;
    const render = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.classList.add("visible");
      const target = e.target instanceof Element ? e.target : null;
      dot.classList.toggle("grow", !!target?.closest(INTERACTIVE));
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => dot.classList.remove("visible");
    const onDown = () => dot.classList.add("press");
    const onUp = () => dot.classList.remove("press");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div className="cursor" ref={dotRef} aria-hidden="true" />;
}
