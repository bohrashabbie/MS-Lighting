"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProductCategory } from "@/lib/types";
import { imageUrl } from "@/lib/api";
import { categoryRender } from "@/lib/renders";
import { sectionOf } from "@/lib/sections";
import { APPLICATIONS } from "@/lib/applications";
import SearchOverlay from "./SearchOverlay";
import LangToggle from "./LangToggle";

export const GROUP_URL = "http://alburhan-regional.com/";

type Props = {
  categories: ProductCategory[];
  logoSrc?: string;
};

export default function SiteHeader({ categories, logoSrc = "/logo.png" }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerProducts, setDrawerProducts] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();

  const indoor = categories.filter((c) => sectionOf(c.slug) === "indoor");
  const outdoor = categories.filter((c) => sectionOf(c.slug) === "outdoor");

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setDrawerOpen(false);
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const thumb = useCallback((c: ProductCategory) => {
    return imageUrl(c.image_url) || categoryRender(c.slug)?.src;
  }, []);

  return (
    <>
      <header className={`header${megaOpen ? " mega-open" : ""}`}>
        <div className="header-inner">
          <Link href="/" aria-label="MS Lighting home" className="logo-badge">
            <Image src={logoSrc} alt="MS Lighting" width={132} height={38} className="logo-img" priority />
          </Link>
          <a
            href={GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group-mark"
            title="Al-Burhan Regional — parent company"
          >
            <span className="gm-by">A company of</span>
            <span className="gm-name">
              Al-Burhan Regional
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>

          <nav className="menu" aria-label="Primary">
            <div
              className="nav-mega-wrap"
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`nav-trigger${megaOpen ? " active" : ""}`}
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMegaOpen((v) => !v)}
                onFocus={openMega}
              >
                Products
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    id={megaId}
                    role="region"
                    aria-label="Products menu"
                    className="mega"
                    initial={reduce ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="mega-inner">
                      <div className="mega-col">
                        <div className="mega-col-head">
                          <span>Indoor</span>
                          <Link href="/products/indoor" onClick={() => setMegaOpen(false)}>Overview</Link>
                        </div>
                        <div className="mega-families">
                          {indoor.map((c) => {
                            const img = thumb(c);
                            return (
                              <Link
                                key={c.slug}
                                href={`/products/${c.slug}`}
                                className="mega-fam"
                                onClick={() => setMegaOpen(false)}
                              >
                                <span className="mega-thumb">
                                  {img ? (
                                    <Image src={img} alt="" width={56} height={56} sizes="56px" />
                                  ) : (
                                    <span className="mega-ph">{c.name_en.charAt(0)}</span>
                                  )}
                                </span>
                                <span className="mega-fam-name">{c.name_en}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mega-col">
                        <div className="mega-col-head">
                          <span>Outdoor</span>
                          <Link href="/products/outdoor" onClick={() => setMegaOpen(false)}>Overview</Link>
                        </div>
                        <div className="mega-families">
                          {outdoor.map((c) => {
                            const img = thumb(c);
                            return (
                              <Link
                                key={c.slug}
                                href={`/products/${c.slug}`}
                                className="mega-fam"
                                onClick={() => setMegaOpen(false)}
                              >
                                <span className="mega-thumb">
                                  {img ? (
                                    <Image src={img} alt="" width={56} height={56} sizes="56px" />
                                  ) : (
                                    <span className="mega-ph">{c.name_en.charAt(0)}</span>
                                  )}
                                </span>
                                <span className="mega-fam-name">{c.name_en}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mega-side">
                        <div className="mega-col-head">
                          <span>Applications</span>
                          <Link href="/applications" onClick={() => setMegaOpen(false)}>All</Link>
                        </div>
                        <ul className="mega-apps">
                          {APPLICATIONS.slice(0, 7).map((a) => (
                            <li key={a.slug}>
                              <Link href={`/applications/${a.slug}`} onClick={() => setMegaOpen(false)}>
                                {a.short}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="/products" className="mega-cta" onClick={() => setMegaOpen(false)}>
                          Go to all products
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/applications">Applications</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/manufacturing">Factory</Link>
            <Link href="/downloads">Downloads</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <LangToggle />
            <button
              type="button"
              className="icon-btn"
              aria-label="Search (Ctrl+K)"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              type="button"
              className={`burger${drawerOpen ? " open" : ""}`}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="drawer"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" className="drawer-scrim" aria-label="Close menu" onClick={() => setDrawerOpen(false)} />
            <motion.nav
              className="drawer-panel"
              aria-label="Mobile"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="drawer-head">
                <span>Menu</span>
                <button type="button" className="icon-btn" aria-label="Close" onClick={() => setDrawerOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <button
                type="button"
                className="drawer-acc"
                aria-expanded={drawerProducts}
                onClick={() => setDrawerProducts((v) => !v)}
              >
                Products
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: drawerProducts ? "rotate(180deg)" : undefined }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {drawerProducts && (
                <div className="drawer-sub">
                  <Link href="/products" onClick={() => setDrawerOpen(false)}>All products</Link>
                  <Link href="/products/indoor" onClick={() => setDrawerOpen(false)}>Indoor</Link>
                  <Link href="/products/outdoor" onClick={() => setDrawerOpen(false)}>Outdoor</Link>
                  {categories.slice(0, 12).map((c) => (
                    <Link key={c.slug} href={`/products/${c.slug}`} onClick={() => setDrawerOpen(false)}>
                      {c.name_en}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/applications" onClick={() => setDrawerOpen(false)}>Applications</Link>
              <Link href="/projects" onClick={() => setDrawerOpen(false)}>Projects</Link>
              <Link href="/manufacturing" onClick={() => setDrawerOpen(false)}>Factory</Link>
              <Link href="/downloads" onClick={() => setDrawerOpen(false)}>Downloads</Link>
              <Link href="/about" onClick={() => setDrawerOpen(false)}>About</Link>
              <Link href="/contact" className="drawer-cta" onClick={() => setDrawerOpen(false)}>Request a quote</Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
