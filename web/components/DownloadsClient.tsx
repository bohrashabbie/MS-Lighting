"use client";

import { useMemo, useState } from "react";
import { DOWNLOADS, DOWNLOAD_KINDS, type DownloadKind } from "@/lib/downloads";

export default function DownloadsClient() {
  const [kind, setKind] = useState<DownloadKind | "all">("all");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DOWNLOADS.filter((d) => {
      if (kind !== "all" && d.kind !== kind) return false;
      if (!query) return true;
      const hay = `${d.title} ${d.description} ${d.tags.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [kind, q]);

  return (
    <div className="dl-wrap">
      <div className="dl-toolbar">
        <div className="dl-filters" role="tablist" aria-label="File type">
          {DOWNLOAD_KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              role="tab"
              aria-selected={kind === k.id}
              className={kind === k.id ? "on" : ""}
              onClick={() => setKind(k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
        <label className="dl-search">
          <span className="sr-only">Search downloads</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search files…"
          />
        </label>
      </div>

      <ul className="dl-list">
        {items.map((d) => (
          <li key={d.id} className="dl-item">
            <div className="dl-icon" aria-hidden>{d.ext}</div>
            <div className="dl-meta">
              <h3>{d.title}</h3>
              <p>{d.description}</p>
              <div className="dl-tags">
                {d.tags.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            {d.href ? (
              <a href={d.href} className="btn btn-outline" download>
                Download
              </a>
            ) : (
              <span className="dl-soon">Coming soon</span>
            )}
          </li>
        ))}
        {items.length === 0 && (
          <li className="dl-empty">No files match that filter.</li>
        )}
      </ul>
    </div>
  );
}
