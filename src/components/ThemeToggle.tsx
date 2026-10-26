"use client";

import { useLayoutEffect, type MouseEvent } from "react";

export const THEME_KEY = "theme";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
}

// Dark is the default. The inline script in the layout applies a saved choice before first
// paint; switching animates as a circle growing out of the button.
export default function ThemeToggle() {
  // React's dev remount clears <html> attributes the inline script set; put the theme back.
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(THEME_KEY) === "light") applyTheme("light");
    } catch {}
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "light" ? "dark" : "light";
    const commit = () => {
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return commit();

    if (!document.startViewTransition) {
      root.classList.add("theme-fade");
      commit();
      setTimeout(() => root.classList.remove("theme-fade"), 750);
      return;
    }

    const box = e.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const feather = 220; // keep in sync with --feather in globals.css
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + feather;
    // The wave itself is a CSS animation on ::view-transition-new(root); it reads these.
    root.style.setProperty("--tx", `${x}px`);
    root.style.setProperty("--ty", `${y}px`);
    root.style.setProperty("--reveal-to", `${r}px`);
    // Freeze other color transitions so nothing changes on its own timer mid-reveal.
    root.classList.add("theme-switching");

    const transition = document.startViewTransition(commit);
    // The browser may skip the animation (e.g. a hidden tab); the theme still changes.
    transition.ready.catch(() => {});
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch between dark and light mode">
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
