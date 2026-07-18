"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProductCategory } from "@/lib/types";
import { imageUrl } from "@/lib/api";
import { categoryRender } from "@/lib/renders";
import { sectionOf } from "@/lib/sections";

const Arrow = () => (
  <svg className="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type Tab = "indoor" | "outdoor" | "magnetic";

const TABS: { id: Tab; label: string }[] = [
  { id: "indoor", label: "Indoor" },
  { id: "outdoor", label: "Outdoor" },
  { id: "magnetic", label: "Magnetic & Linear" },
];

function isMagnetic(slug: string) {
  return /magnet|linear|track|module/i.test(slug);
}

export default function Portfolio({
  categories,
  counts,
}: {
  categories: ProductCategory[];
  counts: Map<string, number | undefined>;
}) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("indoor");

  const filtered = useMemo(() => {
    // Indoor = every indoor family (including magnet / linear / track / module).
    // Magnetic & Linear = focused subset of those same families.
    if (tab === "indoor") return categories.filter((c) => sectionOf(c.slug) === "indoor");
    if (tab === "outdoor") return categories.filter((c) => sectionOf(c.slug) === "outdoor");
    return categories.filter((c) => isMagnetic(c.slug));
  }, [categories, tab]);

  return (
    <section className="portfolio">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Our product portfolio</div>
            <h2>Find the right light</h2>
          </div>
          <Link href="/products" className="link">
            Discover all products
          </Link>
        </div>

        <div className="pf-tabs reveal" role="tablist" aria-label="Product portfolio">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? "on" : ""}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="pf-grid"
            role="tabpanel"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.map((c) => {
              const cms = imageUrl(c.image_url);
              const render = categoryRender(c.slug);
              const img = cms || render?.src;
              const n = counts.get(c.slug);
              return (
                <Link href={`/products/${c.slug}`} className="pf-cat" key={c.slug}>
                  <div className="pf-cat-thumb">
                    {img ? (
                      <Image
                        src={img}
                        alt={c.name_en}
                        width={render?.w ?? 1400}
                        height={render?.h ?? 933}
                        quality={88}
                        sizes="(max-width:560px) 50vw, 20vw"
                      />
                    ) : (
                      <span className="ph">{c.name_en.charAt(0)}</span>
                    )}
                  </div>
                  <div className="pf-cat-meta">
                    <h3>{c.name_en}</h3>
                    {typeof n === "number" ? (
                      <span>
                        {n} {n === 1 ? "model" : "models"}
                      </span>
                    ) : null}
                    <span className="pf-cat-cta">
                      Explore <Arrow />
                    </span>
                  </div>
                </Link>
              );
            })}
            {filtered.length === 0 && (
              <p className="pf-empty">No families in this tab yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
