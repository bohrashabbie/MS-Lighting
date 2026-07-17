// ============================================================================
// High-resolution studio renders + per-family hero plates.
//
// Product renders override soft catalogue-scan images wherever a model code
// matches. Family plates cover every category slug for tiles / fam-heroes —
// including families that do not yet have a matching MS-* product render.
//
// NOTE: these images are OPAQUE with a solid BLACK background baked in (they
// are NOT transparent cut-outs). On the white site they sit inside dark
// "noir plate" panels (see .heroimg / .cine .shot / .cat-card .thumb /
// .detail .gallery / .fam-plate in globals.css).
// ============================================================================

import { asset } from "./assets";

export interface LocalRender {
  code: string;
  src: string;
  w: number;
  h: number;
  category: string;
  categorySlug: string;
}

export const RENDERS: LocalRender[] = [
  { code: "MS-240R", src: "/renders/MS-240R.png", w: 1186, h: 880, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-241", src: "/renders/MS-241.png", w: 1207, h: 880, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-242", src: "/renders/MS-242.png", w: 1152, h: 921, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-250", src: "/renders/MS-250.png", w: 1255, h: 848, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-252", src: "/renders/MS-252.png", w: 1776, h: 1800, category: "Surface Mounted Down Light", categorySlug: "surface-mounted-down-light" },
  { code: "MS-257", src: "/renders/MS-257.png", w: 1152, h: 921, category: "Surface Mounted Down Light", categorySlug: "surface-mounted-down-light" },
  { code: "MS-220GR", src: "/renders/MS-220GR.png", w: 1186, h: 880, category: "Recessed Grille Spot Light", categorySlug: "recessed-grille-spot-light" },
  { code: "MS-1140", src: "/renders/MS-1140.png", w: 1451, h: 720, category: "Recessed Panel Light", categorySlug: "recessed-panel-light" },
  { code: "MS-341AR", src: "/renders/MS-341AR.png", w: 1334, h: 784, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
  { code: "MS-342BR", src: "/renders/MS-342BR.png", w: 1800, h: 927, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
  // Net-new render — no matching model_code in the CMS yet (closest family: MS-342BR/CR "Recessed Spot Light").
  // Add a product with model_code "MS-342BS-3" (or update this code) once it's seeded.
  { code: "MS-342BS-3", src: "/renders/MS-342BS-3.png", w: 1430, h: 736, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
].map((r) => ({ ...r, src: asset(r.src) }));

/** Dedicated family hero plates (one per category slug). Served from S3 site/families/. */
const FAMILY_PLATES: LocalRender[] = [
  { code: "FAMILY-recessed-down-light", src: "/renders/MS-240R.png", w: 1186, h: 880, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "FAMILY-surface-mounted-down-light", src: "/renders/MS-252.png", w: 1776, h: 1800, category: "Surface Mounted Down Light", categorySlug: "surface-mounted-down-light" },
  { code: "FAMILY-recessed-grille-spot-light", src: "/renders/MS-220GR.png", w: 1186, h: 880, category: "Recessed Grille Spot Light", categorySlug: "recessed-grille-spot-light" },
  { code: "FAMILY-recessed-panel-light", src: "/renders/MS-1140.png", w: 1451, h: 720, category: "Recessed Panel Light", categorySlug: "recessed-panel-light" },
  { code: "FAMILY-recessed-spot-light", src: "/renders/MS-341AR.png", w: 1334, h: 784, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
  { code: "FAMILY-track-spot-light", src: "/families/track-spot-light.webp", w: 1400, h: 933, category: "Track Spot Light", categorySlug: "track-spot-light" },
  { code: "FAMILY-magnet-light", src: "/families/magnet-light.webp", w: 1400, h: 933, category: "Magnet Light", categorySlug: "magnet-light" },
  { code: "FAMILY-linear-light", src: "/families/linear-light.webp", w: 1400, h: 933, category: "Linear Light", categorySlug: "linear-light" },
  { code: "FAMILY-ceiling-light", src: "/families/ceiling-light.webp", w: 1400, h: 933, category: "Ceiling Light", categorySlug: "ceiling-light" },
  { code: "FAMILY-high-bay", src: "/families/high-bay.webp", w: 1400, h: 933, category: "High Bay", categorySlug: "high-bay" },
  { code: "FAMILY-module-series", src: "/families/module-series.webp", w: 1400, h: 933, category: "Module Series", categorySlug: "module-series" },
  { code: "FAMILY-wall-light", src: "/families/wall-light.webp", w: 1400, h: 933, category: "Wall Light", categorySlug: "wall-light" },
  { code: "FAMILY-lawn-light", src: "/families/lawn-light.webp", w: 1400, h: 933, category: "Lawn Light", categorySlug: "lawn-light" },
  { code: "FAMILY-street-light", src: "/families/street-light.webp", w: 1400, h: 933, category: "Street Light", categorySlug: "street-light" },
  { code: "FAMILY-flood-light", src: "/families/flood-light.webp", w: 1400, h: 933, category: "Flood Light", categorySlug: "flood-light" },
].map((r) => ({ ...r, src: asset(r.src) }));

const byCode = new Map(RENDERS.map((r) => [r.code.toUpperCase(), r]));
const byFamily = new Map(FAMILY_PLATES.map((r) => [r.categorySlug, r]));

/** Hi-res local render for a model code, if we have one. */
export function localRender(modelCode: string | null | undefined): LocalRender | null {
  if (!modelCode) return null;
  return byCode.get(modelCode.trim().toUpperCase()) ?? null;
}

/** Family hero / tile plate for a category slug (covers all 15 families). */
export function categoryRender(categorySlug: string | null | undefined): LocalRender | null {
  if (!categorySlug) return null;
  return byFamily.get(categorySlug) ?? RENDERS.find((r) => r.categorySlug === categorySlug) ?? null;
}
