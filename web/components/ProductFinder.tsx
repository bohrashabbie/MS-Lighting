"use client";

import { useMemo, useState } from "react";
import type { ProductCategory } from "@/lib/types";
import { sectionOf } from "@/lib/sections";
import CategoryCard from "./CategoryCard";

type Mount = "all" | "indoor" | "outdoor";

export default function ProductFinder({
  categories,
  counts,
}: {
  categories: ProductCategory[];
  counts: Map<string, number | undefined>;
}) {
  const [mount, setMount] = useState<Mount>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return categories.filter((c) => {
      if (mount !== "all" && sectionOf(c.slug) !== mount) return false;
      if (!query) return true;
      return (
        c.name_en.toLowerCase().includes(query) ||
        c.slug.includes(query) ||
        (c.description_en || "").toLowerCase().includes(query)
      );
    });
  }, [categories, mount, q]);

  const indoor = filtered.filter((c) => sectionOf(c.slug) === "indoor");
  const outdoor = filtered.filter((c) => sectionOf(c.slug) === "outdoor");

  return (
    <div className="finder">
      <aside className="finder-side">
        <div className="finder-sticky">
          <h2 className="finder-title">Fixture finder</h2>
          <label className="finder-field">
            <span>Search families</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. magnet, flood…"
            />
          </label>
          <fieldset className="finder-field">
            <legend>Application</legend>
            {(
              [
                ["all", "All"],
                ["indoor", "Indoor"],
                ["outdoor", "Outdoor"],
              ] as const
            ).map(([id, label]) => (
              <label key={id} className="finder-radio">
                <input
                  type="radio"
                  name="mount"
                  checked={mount === id}
                  onChange={() => setMount(id)}
                />
                {label}
              </label>
            ))}
          </fieldset>
          <p className="finder-note">
            Showing <b>{filtered.length}</b> of {categories.length} families.
            Wattage, beam and IP filters expand as structured spec data is added to the CMS.
          </p>
        </div>
      </aside>

      <div className="finder-main">
        {(mount === "all" || mount === "indoor") && indoor.length > 0 && (
          <div className="prod-group" id="indoor">
            <div className="section-head">
              <div>
                <div className="eyebrow">Interior · Architectural</div>
                <h2>Indoor Lighting</h2>
              </div>
            </div>
            <div className="grid grid-3">
              {indoor.map((c) => (
                <div className="reveal" key={c.slug}>
                  <CategoryCard category={c} count={counts.get(c.slug)} />
                </div>
              ))}
            </div>
          </div>
        )}
        {(mount === "all" || mount === "outdoor") && outdoor.length > 0 && (
          <div className="prod-group" id="outdoor">
            <div className="section-head">
              <div>
                <div className="eyebrow">Façade · Landscape · Street</div>
                <h2>Outdoor Lighting</h2>
              </div>
            </div>
            <div className="grid grid-3">
              {outdoor.map((c) => (
                <div className="reveal" key={c.slug}>
                  <CategoryCard category={c} count={counts.get(c.slug)} />
                </div>
              ))}
            </div>
          </div>
        )}
        {filtered.length === 0 && (
          <p style={{ color: "var(--muted)", padding: "40px 0" }}>
            No families match those filters.
          </p>
        )}
      </div>
    </div>
  );
}
