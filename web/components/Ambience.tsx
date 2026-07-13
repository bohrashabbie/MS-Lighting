"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion engine (no markup of its own). Everything here is
 * progressive — the page is fully usable without JS, and every effect
 * collapses to a static layout under prefers-reduced-motion.
 *
 *  chrome (once):  intro curtain · scroll-progress hairline · smart header
 *  per page:       scroll reveals · masked word-by-word headline reveals
 *                  count-ups · parallax [data-plx] · magnetic buttons
 *                  3D card tilt · cursor spotlight on the dark bands
 */

// Headlines that get the masked word-by-word rise.
const SPLIT_TARGETS = [
  ".intro h1",
  ".section-head h2",
  ".brands-head h2",
  ".cta-band h2",
  ".consult h3",
  ".page-hero h1",
  ".fam-hero h1",
  ".sec-hero h1",
  ".detail h1",
  ".st-line",
  ".xp-head p",
].join(",");

// Dark bands where a warm spotlight follows the cursor.
const SPOT_BANDS = ".statement,.cta-band,.consult,.expertise";

// Cards that tilt subtly toward the cursor.
const TILT_CARDS = ".card,.cat-card,.mk-tile,.tm-card";

// Mono HUD labels that decode into place when they enter view.
const SCRAMBLE_TARGETS = ".eyebrow,.kicker,.nl-eyebrow,.fr-label,.col-label";

// Cards where the cursor ring grows into a "View" badge.
const CURSOR_VIEW = ".card,.cat-card,.app-tile,.xp-card,.mk-tile";

export default function Ambience() {
  const pathname = usePathname();

  // ---- page chrome: curtain, progress hairline, smart header (bind once) --
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const curtain = document.getElementById("curtain");
    if (curtain) {
      // One play per tab session — the inline <head> script hides it on
      // subsequent hard loads before first paint.
      try { sessionStorage.setItem("msIntro", "1"); } catch {}
      const done = () => { curtain.style.display = "none"; };
      // loading counter — eases 0 → 100 in sync with the charging seam
      const num = document.getElementById("ct-num");
      if (num && !reduce) {
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          num.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * 100));
          if (p < 1 && curtain.style.display !== "none") requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      // the bottom leaf finishes last and ends the sequence (animationend bubbles)
      curtain.addEventListener("animationend", (e) => {
        if (e.animationName === "ctPanel" && (e.target as HTMLElement).classList.contains("ct-p-last")) done();
      });
      window.setTimeout(done, 3600); // safety net
      if (reduce) done();
    }

    const bar = document.getElementById("progress");
    const header = document.querySelector<HTMLElement>(".header");
    let lastY = window.scrollY;
    let ticking = false;
    const frame = () => {
      ticking = false;
      const y = window.scrollY;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      if (header && !reduce) {
        header.classList.toggle("scrolled", y > 10);
        // Glide away scrolling down, glide back the moment you scroll up.
        if (y > lastY + 6 && y > 180) header.classList.add("veiled");
        else if (y < lastY - 4 || y <= 180) header.classList.remove("veiled");
      }
      lastY = y;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    frame();

    // ---- custom cursor — a dot with a lagging light ring (fine pointers) --
    let stopCursor: (() => void) | undefined;
    if (!reduce && window.matchMedia("(pointer:fine)").matches && !document.getElementById("cur-dot")) {
      const dot = document.createElement("div");
      dot.id = "cur-dot";
      const ring = document.createElement("div");
      ring.id = "cur-ring";
      const label = document.createElement("span");
      label.className = "cur-label";
      label.textContent = "View";
      ring.appendChild(label);
      document.body.append(dot, ring);
      document.documentElement.classList.add("has-cursor");

      let x = window.innerWidth / 2, y = window.innerHeight / 2;
      let rx = x, ry = y, s = 1, ts = 1;
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        x = e.clientX; y = e.clientY;
        dot.style.transform = `translate3d(${x - 4}px,${y - 4}px,0)`;
        document.documentElement.classList.add("cur-on");
      };
      const over = (e: PointerEvent) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        const media = t.closest(CURSOR_VIEW);
        const act = t.closest("a,button,summary,[role=button],label");
        const field = t.closest("input,textarea,select");
        ring.classList.toggle("is-view", !!media);
        ts = media ? 2.4 : act ? 1.5 : 1;
        // over form fields the native caret cursor comes back
        document.documentElement.classList.toggle("cur-off", !!field);
      };
      const out = (e: PointerEvent) => {
        if (!e.relatedTarget) document.documentElement.classList.remove("cur-on");
      };
      const down = () => dot.classList.add("pressed");
      const up = () => dot.classList.remove("pressed");
      let raf = 0;
      const loop = () => {
        rx += (x - rx) * 0.16;
        ry += (y - ry) * 0.16;
        s += (ts - s) * 0.18;
        ring.style.transform = `translate3d(${rx - 23}px,${ry - 23}px,0) scale(${s.toFixed(3)})`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      document.addEventListener("pointerout", out);
      document.addEventListener("pointerdown", down);
      document.addEventListener("pointerup", up);
      stopCursor = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerout", out);
        document.removeEventListener("pointerdown", down);
        document.removeEventListener("pointerup", up);
      };
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      stopCursor?.();
    };
  }, []);

  // ---- per-page motion ----------------------------------------------------
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // ---- masked word reveals — split headlines into per-word masks --------
    if (!reduce) {
      document.querySelectorAll<HTMLElement>(SPLIT_TARGETS).forEach((el) => {
        if (el.dataset.split) return;
        el.dataset.split = "1";
        let i = 0;
        const frag = document.createDocumentFragment();
        const wrap = (node: Node) => {
          const mask = document.createElement("span");
          mask.className = "w";
          const inner = document.createElement("span");
          inner.className = "wi";
          inner.style.setProperty("--wi", String(Math.min(i++, 20)));
          inner.appendChild(node);
          mask.appendChild(inner);
          return mask;
        };
        Array.from(el.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            (node.textContent || "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              frag.appendChild(
                /^\s+$/.test(part)
                  ? document.createTextNode(" ")
                  : wrap(document.createTextNode(part))
              );
            });
          } else if (node instanceof HTMLBRElement) {
            // Wrapping a <br> in an inline-block mask would swallow the
            // line break — keep it as-is.
            frag.appendChild(node);
          } else {
            // Nested <em>/<span> rises as one phrase so its styling survives.
            frag.appendChild(wrap(node));
          }
        });
        el.replaceChildren(frag);
        el.classList.add("split");
      });
    }

    // ---- scroll reveals + split triggers ----------------------------------
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .split"));
    if (reduce) {
      reveals.forEach((el) => el.classList.add("in", "si"));
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const n = parseFloat(el.dataset.count || "0").toLocaleString();
        const suffix = el.dataset.suffix || "";
        el.innerHTML = suffix ? `${n}<span>${suffix}</span>` : n;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.classList.contains("reveal")) {
            const sibs = Array.from(el.parentElement?.children ?? []).filter((c) =>
              c.classList.contains("reveal")
            );
            el.style.setProperty("--d", `${Math.min(Math.max(sibs.indexOf(el), 0), 8) * 90}ms`);
            el.classList.add("in");
          }
          if (el.classList.contains("split")) {
            el.classList.add("si");
            // Once every word has risen, release the masks so glow effects
            // (filament text-shadow) aren't clipped to rectangles.
            window.setTimeout(() => el.classList.add("um"), 2300);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // ---- count-up ----------------------------------------------------------
    const nums = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const nio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const to = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const dur = 1700;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // expo-out
          const n = Math.round(to * eased).toLocaleString();
          el.innerHTML = suffix ? `${n}<span>${suffix}</span>` : n;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        nio.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach((el) => nio.observe(el));
    cleanups.push(() => nio.disconnect());

    // ---- scroll-driven layer: parallax, kinetic type, hero shrink ---------
    type Plx = { el: HTMLElement; speed: number; base: number; h: number; max: number };
    type Kin = { track: HTMLElement; unit: number; speed: number };
    let plx: Plx[] = [];
    let kins: Kin[] = [];
    const hero = document.querySelector<HTMLElement>(".hero-frame");
    const collect = () => {
      plx = Array.from(document.querySelectorAll<HTMLElement>("[data-plx]")).map((el) => {
        const prev = el.style.transform;
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        el.style.transform = prev;
        return {
          el,
          speed: parseFloat(el.dataset.plx || "0.1"),
          base: r.top + window.scrollY,
          h: r.height,
          max: r.height * parseFloat(el.dataset.plxClamp || "0.09"),
        };
      });
      kins = Array.from(document.querySelectorAll<HTMLElement>(".kinetic")).flatMap((band) => {
        const track = band.querySelector<HTMLElement>(".kin-track");
        const unit = track?.firstElementChild instanceof HTMLElement ? track.firstElementChild.offsetWidth : 0;
        return track && unit > 0
          ? [{ track, unit, speed: parseFloat(band.dataset.kin || "0.45") }]
          : [];
      });
    };
    let pTick = false;
    const pFrame = () => {
      pTick = false;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      for (const p of plx) {
        const top = p.base - sy;
        if (top + p.h < -160 || top > vh + 160) continue;
        const mid = top + p.h / 2 - vh / 2;
        let y = mid * p.speed;
        if (y > p.max) y = p.max;
        else if (y < -p.max) y = -p.max;
        p.el.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
      }
      // giant outlined type slides with the scroll — reverses when you do
      for (const k of kins) {
        const off = (sy * k.speed + 60) % k.unit;
        k.track.style.transform = `translate3d(${(-off).toFixed(1)}px,0,0)`;
      }
      // the hero settles back and dims as you leave it (CSS reads --hp)
      if (hero && sy < vh * 1.2) {
        hero.style.setProperty("--hp", Math.min(sy / (vh * 0.9), 1).toFixed(3));
      }
    };
    const onPlx = () => { if (!pTick) { pTick = true; requestAnimationFrame(pFrame); } };
    const onResize = () => { collect(); pFrame(); };
    collect();
    pFrame();
    window.addEventListener("scroll", onPlx, { passive: true });
    window.addEventListener("resize", onResize);
    // Late image/font loads shift layout — re-measure once things settle.
    const settle = window.setTimeout(onResize, 1000);
    cleanups.push(() => {
      window.removeEventListener("scroll", onPlx);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settle);
    });

    // ---- magnetic buttons --------------------------------------------------
    document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
      if (btn.dataset.mag) return;
      btn.dataset.mag = "1";
      btn.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = btn.getBoundingClientRect();
        btn.classList.add("magnet");
        btn.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) - 0.5) * r.width * 0.22}px`);
        btn.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) - 0.5) * r.height * 0.3}px`);
      });
      btn.addEventListener("pointerleave", () => {
        btn.classList.remove("magnet");
        btn.style.setProperty("--mx", "0px");
        btn.style.setProperty("--my", "0px");
      });
    });

    // ---- 3D card tilt --------------------------------------------------------
    document.querySelectorAll<HTMLElement>(TILT_CARDS).forEach((card) => {
      if (card.dataset.tilt) return;
      card.dataset.tilt = "1";
      card.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse" || card.classList.contains("open")) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add("tilting");
        card.style.setProperty("--ry", `${(px * 4.5).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-py * 4.5).toFixed(2)}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });

    // ---- cursor spotlight on dark bands -------------------------------------
    document.querySelectorAll<HTMLElement>(SPOT_BANDS).forEach((band) => {
      if (band.dataset.spot) return;
      band.dataset.spot = "1";
      const glow = document.createElement("i");
      glow.className = "spot";
      glow.setAttribute("aria-hidden", "true");
      band.appendChild(glow);
      band.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = band.getBoundingClientRect();
        glow.style.transform = `translate3d(${e.clientX - r.left - 340}px,${e.clientY - r.top - 340}px,0)`;
        band.classList.add("lit");
      });
      band.addEventListener("pointerleave", () => band.classList.remove("lit"));
    });

    // ---- HUD labels decode into place --------------------------------------
    const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        sio.unobserve(el);
        const orig = el.textContent || "";
        // text-only labels; anything nested or long keeps its static text
        if (!orig.trim() || orig.length > 64 || el.children.length) return;
        const start = performance.now();
        const dur = 650;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const solved = Math.floor(orig.length * p);
          el.textContent =
            orig.slice(0, solved) +
            orig
              .slice(solved)
              .split("")
              .map((c) => (c === " " ? " " : CH[(Math.random() * CH.length) | 0]))
              .join("");
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = orig;
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll<HTMLElement>(SCRAMBLE_TARGETS).forEach((el) => {
      if (el.dataset.scr) return;
      el.dataset.scr = "1";
      sio.observe(el);
    });
    cleanups.push(() => sio.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
