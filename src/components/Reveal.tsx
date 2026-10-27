"use client";

import { useEffect } from "react";

// Fades [data-reveal] blocks inside `selector` up into place as they scroll into view.
// Content is only hidden once this runs, so the page reads fine without JavaScript.
// Anything already above the fold counts as seen, so a fast scroll or jump never skips a block.
export default function Reveal({ selector }: { selector: string }) {
  useEffect(() => {
    const root = document.querySelector(selector);
    if (!root) return;
    let pending = [...root.querySelectorAll("[data-reveal]")];
    root.classList.add("reveal-on");

    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true;
        el.classList.add("in");
        return false;
      });
      if (!pending.length) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return stop;
  }, [selector]);

  return null;
}
