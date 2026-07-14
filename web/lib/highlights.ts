// ============================================================================
// Homepage highlights — announcement wall (Ledvance-style).
// ============================================================================

import { asset } from "./assets";

export interface Highlight {
  id: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  img: string;
  /** "lg" spans two columns on desktop masonry. */
  size?: "sm" | "md" | "lg";
}

export const HIGHLIGHTS: Highlight[] = [
  {
    id: "factory",
    kicker: "Manufacturing",
    title: "Made in our Jiangmen factory",
    body: "Own production, tooling, SMT and QC in Guangdong — factory pricing and OEM/ODM capability.",
    href: "/manufacturing",
    img: "/scenes/factory-floor.webp",
    size: "lg",
  },
  {
    id: "catalogue",
    kicker: "Catalogue 2025",
    title: "48 models · 15 families",
    body: "Browse the full LED range with studio renders and specification sheets.",
    href: "/products",
    img: "/scenes/app-office.webp",
    size: "md",
  },
  {
    id: "certs",
    kicker: "Certifications",
    title: "CE · RoHS · CB · SASO",
    body: "Export-ready documentation for Gulf projects and international tenders.",
    href: "/downloads",
    img: "/scenes/app-retail.webp",
    size: "sm",
  },
  {
    id: "outdoor",
    kicker: "Outdoor",
    title: "Floodlight & street range",
    body: "IP-rated wall, lawn, street and flood fixtures built for Gulf nights.",
    href: "/products/outdoor",
    img: "/scenes/app-facade.webp",
    size: "md",
  },
  {
    id: "projects",
    kicker: "Projects",
    title: "References across the region",
    body: "Retail, hospitality, office and façade schemes delivered through Al-Burhan.",
    href: "/projects",
    img: "/scenes/app-retail.webp",
    size: "sm",
  },
  {
    id: "oem",
    kicker: "OEM / ODM",
    title: "Custom finishes & private label",
    body: "Project-specific optics, finishes and branding from our China facility.",
    href: "/contact?subject=OEM%20%2F%20ODM%20enquiry",
    img: "/scenes/factory-floor.webp",
    size: "md",
  },
].map((h) => ({ ...h, img: asset(h.img) })) as Highlight[];
