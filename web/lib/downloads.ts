// ============================================================================
// Downloads centre — catalogue PDF, family specs, certifications.
// Paths point at public/ or CDN assets; mark `available: false` until
// the file is uploaded so the UI can show "Coming soon".
// ============================================================================

export type DownloadKind = "catalogue" | "spec" | "cert" | "guide";

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  kind: DownloadKind;
  /** File extension label shown in the UI. */
  ext: string;
  /** Absolute or site-relative href; null = coming soon. */
  href: string | null;
  /** Optional family slug for filtering. */
  family?: string;
  tags: string[];
}

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "catalogue-2025",
    title: "MS Lighting Product Catalogue 2025",
    description: "Full fixture range — indoor, outdoor, magnetic and linear systems.",
    kind: "catalogue",
    ext: "PDF",
    href: null,
    tags: ["catalogue", "2025", "all products"],
  },
  {
    id: "cert-ce",
    title: "CE Declaration of Conformity",
    description: "EU safety, health and electromagnetic compatibility declaration.",
    kind: "cert",
    ext: "PDF",
    href: null,
    tags: ["CE", "certification", "export"],
  },
  {
    id: "cert-rohs",
    title: "RoHS Compliance Statement",
    description: "Restriction of Hazardous Substances compliance for LED fixtures.",
    kind: "cert",
    ext: "PDF",
    href: null,
    tags: ["RoHS", "certification"],
  },
  {
    id: "cert-cb",
    title: "CB Scheme Test Summary",
    description: "IECEE CB Scheme coverage for international market access.",
    kind: "cert",
    ext: "PDF",
    href: null,
    tags: ["CB", "certification"],
  },
  {
    id: "cert-saso",
    title: "SASO / Gulf Conformity Overview",
    description: "Saudi and Gulf import documentation pathway for project shipments.",
    kind: "cert",
    ext: "PDF",
    href: null,
    tags: ["SASO", "Gulf", "certification"],
  },
  {
    id: "spec-recessed-down",
    title: "Recessed Down Light — Family Spec Sheet",
    description: "Technical data, cutouts and photometrics for the recessed down light range.",
    kind: "spec",
    ext: "PDF",
    href: null,
    family: "recessed-down-light",
    tags: ["spec", "indoor", "recessed"],
  },
  {
    id: "spec-magnet",
    title: "Magnet Light — Family Spec Sheet",
    description: "Low-voltage magnetic track modules, optics and mounting options.",
    kind: "spec",
    ext: "PDF",
    href: null,
    family: "magnet-light",
    tags: ["spec", "indoor", "magnetic"],
  },
  {
    id: "spec-flood",
    title: "Flood Light — Family Spec Sheet",
    description: "IP-rated flood fixtures for façade, area and landscape lighting.",
    kind: "spec",
    ext: "PDF",
    href: null,
    family: "flood-light",
    tags: ["spec", "outdoor", "flood"],
  },
  {
    id: "oem-odm-guide",
    title: "OEM / ODM Capability Brief",
    description: "Custom finishes, private label and project-specific tooling from Jiangmen.",
    kind: "guide",
    ext: "PDF",
    href: null,
    tags: ["OEM", "ODM", "factory", "China"],
  },
];

export const DOWNLOAD_KINDS: { id: DownloadKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "catalogue", label: "Catalogue" },
  { id: "spec", label: "Spec sheets" },
  { id: "cert", label: "Certifications" },
  { id: "guide", label: "Guides" },
];
