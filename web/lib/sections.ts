// ============================================================================
// Indoor / Outdoor application sections (WAC-style split).
// The source catalogue orders its outdoor families together (sort 68–88:
// Wall, Lawn, Street, Flood) — everything else is architectural indoor,
// including the industrial High Bay and Ceiling families.
// Banners live in /public/banners (sourced from the Al-Burhan asset library).
// ============================================================================
import type { ProductCategory } from "./types";
import { asset } from "./assets";

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
    name: "Indoor Lights",
    short: "Indoor",
    kicker: "Interior · Architectural",
    tagline: "Light that disappears into the architecture.",
    blurb:
      "Indoor LED lights for offices, homes, retail and hospitality — recessed, surface, linear, track and magnetic systems engineered for clean, glare-free architectural light.",
    banner: asset("/banners/indoor.webp"),
    bannerAlt: "Indoor LED lights illuminating a modern living space with warm architectural light",
  },
  outdoor: {
    slug: "outdoor",
    name: "Outdoor Lights",
    short: "Outdoor",
    kicker: "Façade · Landscape · Street",
    tagline: "Built for the elements, tuned for the night.",
    blurb:
      "Outdoor LED lights for façades, landscapes and roadways — wall, lawn, street and flood fixtures in sealed, IP-rated housings built for every season.",
    banner: asset("/banners/outdoor.webp"),
    bannerAlt: "Outdoor lights on a city skyline with architectural façade lighting at night",
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
