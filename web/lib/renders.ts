// ============================================================================
// High-resolution studio renders (local, /public/renders/*.png).
// These override the catalogue-scan images wherever a model code matches —
// the PDF crops are too soft for hero placement; these are 1300–1800px
// transparent cut-outs that stay crisp through next/image optimization.
// ============================================================================

export interface LocalRender {
  code: string;
  src: string;
  w: number;
  h: number;
  category: string;
  categorySlug: string;
}

export const RENDERS: LocalRender[] = [
  { code: "MS-240R", src: "/renders/MS-240R.png", w: 1800, h: 1336, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-241", src: "/renders/MS-241.png", w: 1800, h: 1440, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-242", src: "/renders/MS-242.png", w: 1800, h: 1312, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-250", src: "/renders/MS-250.png", w: 1800, h: 1216, category: "Recessed Down Light", categorySlug: "recessed-down-light" },
  { code: "MS-252", src: "/renders/MS-252.png", w: 1776, h: 1800, category: "Surface Mounted Down Light", categorySlug: "surface-mounted-down-light" },
  { code: "MS-257", src: "/renders/MS-257.png", w: 1800, h: 1440, category: "Surface Mounted Down Light", categorySlug: "surface-mounted-down-light" },
  { code: "MS-220GR", src: "/renders/MS-220GR.png", w: 1281, h: 1667, category: "Recessed Grille Spot Light", categorySlug: "recessed-grille-spot-light" },
  { code: "MS-1140", src: "/renders/MS-1140.png", w: 1800, h: 895, category: "Recessed Panel Light", categorySlug: "recessed-panel-light" },
  { code: "MS-341AR", src: "/renders/MS-341AR.png", w: 1800, h: 1058, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
  { code: "MS-342BR", src: "/renders/MS-342BR.png", w: 1800, h: 927, category: "Recessed Spot Light", categorySlug: "recessed-spot-light" },
];

const byCode = new Map(RENDERS.map((r) => [r.code.toUpperCase(), r]));

/** Hi-res local render for a model code, if we have one. */
export function localRender(modelCode: string | null | undefined): LocalRender | null {
  if (!modelCode) return null;
  return byCode.get(modelCode.trim().toUpperCase()) ?? null;
}

/** First hi-res render available for a category slug (for category tiles). */
export function categoryRender(categorySlug: string | null | undefined): LocalRender | null {
  if (!categorySlug) return null;
  return RENDERS.find((r) => r.categorySlug === categorySlug) ?? null;
}
