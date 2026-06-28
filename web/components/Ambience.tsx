"use client";
import { useEffect } from "react";

/**
 * Site-wide motion layer (no markup of its own):
 *  - reveals `.reveal` elements on scroll with a stagger
 *  - drives a cursor-following spotlight on `.hero` / `.page-hero`
 *  - animates count-up on `[data-count]` numbers when they enter view
 * All effects are progressive — the page is fully usable without JS.
 */
export default function Ambience() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll reveals -------------------------------------------------
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const sibs = Array.from(el.parentElement?.children ?? []).filter((c) =>
                c.classList.contains("reveal")
              );
              el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 8) * 90}ms`);
              el.classList.add("in");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));

      // ---- count-up ------------------------------------------------------
      const nums = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
      const nio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const to = parseFloat(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const n = Math.round(to * eased).toLocaleString();
            el.innerHTML = suffix ? `${n}<span>${suffix}</span>` : n;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          nio.unobserve(el);
        });
      }, { threshold: 0.5 });
      nums.forEach((el) => nio.observe(el));

      // ---- hero cursor spotlight ----------------------------------------
      const heroes = Array.from(
        document.querySelectorAll<HTMLElement>(".hero, .page-hero")
      );
      const onMove = (ev: PointerEvent) => {
        const el = ev.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((ev.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((ev.clientY - r.top) / r.height) * 100}%`);
      };
      heroes.forEach((h) => h.addEventListener("pointermove", onMove as EventListener));

      return () => {
        io.disconnect();
        nio.disconnect();
        heroes.forEach((h) =>
          h.removeEventListener("pointermove", onMove as EventListener)
        );
      };
    }
  }, []);

  return null;
}
