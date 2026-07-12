// ============================================================================
// Market verticals — the "who we light" axis, distinct from the indoor/outdoor
// product axis in ./sections.ts. Modelled on the way project-spec lighting
// houses organise a commercial catalogue (hospitality / office / retail /
// exterior), extended with the segments the Al-Burhan regional network
// actually serves across Kuwait, the UAE, China and Egypt.
//
// `image` is optional on purpose: tiles render as a designed noir plate when
// no photograph exists yet. Drop a file at the documented path and it is
// picked up with no code change.
// ============================================================================

import { asset } from "./assets";

export interface Market {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  /** Specification notes a lighting designer would actually ask for. */
  specs: string[];
  /** Product family slugs that serve this vertical (verified against the CMS). */
  families: string[];
  /** Optional hero photo, e.g. "/markets/hospitality.webp". */
  image?: string;
}

/**
 * Keep only the families that still exist in the CMS, so renaming or retiring a
 * category degrades to a shorter chip row rather than a dead link.
 */
export function liveFamilies(m: Market, known: Set<string>): string[] {
  return m.families.filter((f) => known.has(f));
}

export const MARKETS: Market[] = [
  {
    slug: "hospitality",
    image: "/markets/hospitality.webp",
    name: "Hospitality",
    kicker: "Hotels · Restaurants · Lounges",
    blurb:
      "Lighting that sets the register of a room before anyone reads the menu. Warm, deeply dimmable, and glare-free at eye level.",
    specs: ["2700–3000K warm white", "CRI 90+ for skin & food tones", "Dim-to-warm on approach", "UGR < 19 at seated eye height"],
    families: ["recessed-down-light", "track-spot-light", "magnet-light"],
  },
  {
    slug: "office",
    image: "/markets/office.webp",
    name: "Office & Workplace",
    kicker: "Workplace · Education · Civic",
    blurb:
      "Comfort over hours, not seconds. Low-glare optics and tunable white that tracks the working day and keeps screens readable.",
    specs: ["4000K neutral, tunable to 5000K", "UGR < 19 screen compliance", "Uniform 300–500 lux on task plane", "DALI-2 / 0–10V dimming"],
    families: ["recessed-panel-light", "linear-light", "ceiling-light"],
  },
  {
    slug: "retail",
    image: "/markets/retail.webp",
    name: "Retail & Showroom",
    kicker: "Stores · Galleries · Showrooms",
    blurb:
      "Merchandise lit the way it was designed to be seen. High-fidelity colour, tight beam control and contrast that pulls the eye.",
    specs: ["CRI 95+ / R9 > 50 for reds", "15° / 24° / 36° beam options", "3:1 accent-to-ambient contrast", "Adjustable track & monopoint"],
    families: ["track-spot-light", "recessed-spot-light", "recessed-grille-spot-light"],
  },
  {
    slug: "exterior",
    image: "/markets/exterior.webp",
    name: "Exterior & Façade",
    kicker: "Façade · Landscape · Streets",
    blurb:
      "Sealed, IP-rated housings built for Gulf heat, coastal salt and desert dust — shaping buildings and landscapes after dark.",
    specs: ["IP65–IP67 sealed housings", "Corrosion-resistant die-cast alloy", "Asymmetric grazing & wall-wash optics", "Full cut-off, dark-sky conscious"],
    families: ["flood-light", "wall-light", "street-light", "lawn-light"],
  },
  {
    slug: "industrial",
    image: "/markets/industrial.webp",
    name: "Industrial & Logistics",
    kicker: "Warehouses · Plants · Depots",
    blurb:
      "High-mounting-height output with the efficacy to justify itself on the electricity bill, and the thermals to survive the roof.",
    specs: ["High bay 100–240W", "150+ lm/W system efficacy", "IK08 impact rating", "L80 > 50,000h lifetime"],
    families: ["high-bay", "flood-light", "linear-light"],
  },
  {
    slug: "residential",
    image: "/markets/residential.webp",
    name: "Residential",
    kicker: "Villas · Apartments · Interiors",
    blurb:
      "Architectural discipline at domestic scale — trimless recessed, cove and magnetic track that disappear into the ceiling plane.",
    specs: ["Trimless & plaster-in options", "2700K warm domestic white", "Phase-cut dimmer compatible", "Shallow plenum depths"],
    families: ["surface-mounted-down-light", "magnet-light", "module-series"],
  },
];

// Market photos are served from S3/CloudFront — resolve once at module load.
for (const m of MARKETS) if (m.image) m.image = asset(m.image);

export const marketBySlug = (slug: string) => MARKETS.find((m) => m.slug === slug);
