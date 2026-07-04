// ============================================================================
// Indoor / Outdoor application sections (WAC-style split).
// The source catalogue orders its outdoor families together (sort 68–88:
// Wall, Lawn, Street, Flood) — everything else is architectural indoor,
// including the industrial High Bay and Ceiling families.
// Banners live in /public/banners (sourced from the Al-Burhan asset library).
// ============================================================================
import type { ProductCategory } from "./types";

export type SectionSlug = "indoor" | "outdoor";

export interface SectionDef {
  slug: SectionSlug;
  name: string;
  short: string;
  kicker: string;
  tagline: string;
  blurb: string;
  banner: string;
  bannerAlt: string;
}

export const SECTIONS: Record<SectionSlug, SectionDef> = {
  indoor: {
    slug: "indoor",
    name: "Indoor Lighting",
    short: "Indoor",
    kicker: "Interior · Architectural",
    tagline: "Light that disappears into the architecture.",
    blurb:
      "Recessed, surface, linear, track and magnetic systems — engineered to vanish into the ceiling and put clean, glare-free light exactly where the design needs it.",
    banner: "/banners/indoor.webp",
    bannerAlt: "Sculptural LED pendant washing a modern living space in warm light",
  },
  outdoor: {
    slug: "outdoor",
    name: "Outdoor Lighting",
    short: "Outdoor",
    kicker: "Façade · Landscape · Street",
    tagline: "Built for the elements, tuned for the night.",
    blurb:
      "Wall, lawn, street and flood fixtures in sealed, IP-rated housings — shaping façades, landscapes and roadways through every season.",
    banner: "/banners/outdoor.webp",
    bannerAlt: "City skyline with architectural façade lighting reflected on water at night",
  },
};

const OUTDOOR_SLUGS = new Set(["wall-light", "lawn-light", "street-light", "flood-light"]);

/** Which application section a category belongs to. */
export function sectionOf(categorySlug: string): SectionSlug {
  return OUTDOOR_SLUGS.has(categorySlug) ? "outdoor" : "indoor";
}

/** Split a category list into its indoor and outdoor groups (order preserved). */
export function splitBySection(categories: ProductCategory[]): Record<SectionSlug, ProductCategory[]> {
  return {
    indoor: categories.filter((c) => sectionOf(c.slug) === "indoor"),
    outdoor: categories.filter((c) => sectionOf(c.slug) === "outdoor"),
  };
}
