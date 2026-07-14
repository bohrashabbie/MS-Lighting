"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { search } from "@/lib/api";
import type { SearchResult } from "@/lib/types";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setResults(null);
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const query = q.trim();
    if (!query || query.length < 2) {
      setResults(null);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(async () => {
      setBusy(true);
      try {
        const r = await search(query);
        if (!cancelled) setResults(r);
      } catch {
        if (!cancelled) setResults(null);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 220);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [q]);

  async function go(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setBusy(true);
    try {
      const r = await search(query);
      if (r.redirect) {
        onClose();
        router.push(r.redirect);
      } else {
        onClose();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    } catch {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search catalogue"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          <button type="button" className="so-scrim" aria-label="Close search" onClick={onClose} />
          <motion.div
            className="so-panel"
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="so-form" onSubmit={go} role="search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search model code, family or page…"
                aria-label="Search"
                autoComplete="off"
              />
              <kbd>Esc</kbd>
              <button type="button" className="so-close" onClick={onClose} aria-label="Close">
                Close
              </button>
            </form>

            <div className="so-body">
              {busy && <p className="so-hint">Searching…</p>}
              {!busy && q.trim().length >= 2 && results && (
                <>
                  {(results.products?.length ?? 0) > 0 && (
                    <div className="so-group">
                      <div className="so-label">Models</div>
                      {results.products!.slice(0, 6).map((p) => (
                        <Link
                          key={p.url}
                          href={p.url}
                          className="so-row"
                          onClick={onClose}
                        >
                          <b>{p.model_code || p.name_en}</b>
                          <span>{p.category || p.name_en}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {(results.categories?.length ?? 0) > 0 && (
                    <div className="so-group">
                      <div className="so-label">Families</div>
                      {results.categories!.slice(0, 6).map((c) => (
                        <Link key={c.url} href={c.url} className="so-row" onClick={onClose}>
                          <b>{c.name_en}</b>
                          <span>Category</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {!results.products?.length && !results.categories?.length && (
                    <p className="so-hint">No matches — try a model code like MS-240R.</p>
                  )}
                </>
              )}
              {!q.trim() && (
                <div className="so-hints">
                  <Link href="/products" onClick={onClose}>All products</Link>
                  <Link href="/products/indoor" onClick={onClose}>Indoor</Link>
                  <Link href="/products/outdoor" onClick={onClose}>Outdoor</Link>
                  <Link href="/manufacturing" onClick={onClose}>Factory</Link>
                  <Link href="/downloads" onClick={onClose}>Downloads</Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
