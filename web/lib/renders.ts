// ============================================================================
// High-resolution studio renders (product-level, by model code).
// These override soft catalogue-scan images on product cards / detail pages.
//
// Category / family tile imagery is CMS-driven via product_categories.image_url
// (S3 URLs set in the CMS). Do not hardcode family plates here.
//
// NOTE: these PNGs are OPAQUE with a solid BLACK background baked in (they are
// NOT transparent cut-outs). On the white site they are placed inside dark
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

const byCode = new Map(RENDERS.map((r) => [r.code.toUpperCase(), r]));

/** Hi-res local render for a model code, if we have one. */
export function localRender(modelCode: string | null | undefined): LocalRender | null {
  if (!modelCode) return null;
  return byCode.get(modelCode.trim().toUpperCase()) ?? null;
}

/**
 * Optional product-render fallback for a category slug.
 * Prefer CMS `product_categories.image_url` for family tiles / heroes.
 */
export function categoryRender(categorySlug: string | null | undefined): LocalRender | null {
  if (!categorySlug) return null;
  return RENDERS.find((r) => r.categorySlug === categorySlug) ?? null;
}
