"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { search } from "@/lib/api";

export default function SearchBar({ placeholder = "Search a light, model or category…" }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  async function go(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setBusy(true);
    try {
      // Exact match -> jump straight to the page; else go to results.
      const r = await search(query);
      if (r.redirect) router.push(r.redirect);
      else router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="search" onSubmit={go} role="search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        disabled={busy}
      />
    </form>
  );
}
