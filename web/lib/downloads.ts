// ============================================================================
// Downloads centre — corporate brochure + certifications.
// Files live in S3 under the "site/downloads" prefix and are resolved through
// asset() (NEXT_PUBLIC_ASSET_BASE_URL), same as all other site media.
// ============================================================================

import { asset } from "./assets";

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
    id: "catalogue-2025-dark",
    title: "Al-Burhan Corporate Brochure 2025 — Dark",
    description: "Full company brochure and fixture range in the dark theme edition.",
    kind: "catalogue",
    ext: "PDF",
    href: asset("/downloads/catalogue-2025-dark.pdf"),
    tags: ["catalogue", "brochure", "2025", "dark"],
  },
  {
    id: "catalogue-2025-light",
    title: "Al-Burhan Corporate Brochure 2025 — Light",
    description: "Full company brochure and fixture range in the light theme edition.",
    kind: "catalogue",
    ext: "PDF",
    href: asset("/downloads/catalogue-2025-light.pdf"),
    tags: ["catalogue", "brochure", "2025", "light"],
  },
  {
    id: "cert-ce-lvd-2-1",
    title: "CE — LVD EN 60598-2-1 (Fixed Luminaires)",
    description: "Low Voltage Directive safety certificate for fixed general-purpose LED luminaires.",
    kind: "cert",
    ext: "PDF",
    href: asset("/downloads/certs/ce-lvd-en-60598-2-1.pdf"),
    tags: ["CE", "LVD", "EN 60598-2-1", "certification", "export"],
  },
  {
    id: "cert-ce-lvd-2-2",
    title: "CE — LVD EN 60598-2-2 (Recessed Luminaires)",
    description: "Low Voltage Directive safety certificate for recessed LED luminaires.",
    kind: "cert",
    ext: "PDF",
    href: asset("/downloads/certs/ce-lvd-en-60598-2-2.pdf"),
    tags: ["CE", "LVD", "EN 60598-2-2", "certification", "export"],
  },
  {
    id: "cert-emc",
    title: "CE — EMC EN 55015 / EN 61547",
    description: "Electromagnetic compatibility certificate for LED lighting equipment.",
    kind: "cert",
    ext: "PDF",
    href: asset("/downloads/certs/emc-en-55015-61547.pdf"),
    tags: ["CE", "EMC", "EN 55015", "EN 61547", "certification"],
  },
  {
    id: "cert-rohs",
    title: "RoHS Compliance Certificate",
    description: "Restriction of Hazardous Substances compliance for LED fixtures.",
    kind: "cert",
    ext: "PDF",
    href: asset("/downloads/certs/rohs.pdf"),
    tags: ["RoHS", "certification"],
  },
];

export const DOWNLOAD_KINDS: { id: DownloadKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "catalogue", label: "Catalogue" },
  { id: "cert", label: "Certifications" },
];
