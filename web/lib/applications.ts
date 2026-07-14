// ============================================================================
// Application areas — Ledvance-style vertical landing pages.
// Built on the commercial markets axis; each page filters recommended
// fixture families from the live CMS catalogue.
// ============================================================================

import { asset } from "./assets";

export interface Application {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  tagline: string;
  blurb: string;
  hero: string;
  heroAlt: string;
  /** Product family slugs recommended for this application. */
  families: string[];
}

export const APPLICATIONS: Application[] = [
  {
    slug: "office",
    name: "Office lighting",
    short: "Office",
    kicker: "Workplace · Education · Civic",
    tagline: "Comfort over hours, not seconds.",
    blurb:
      "Low-glare optics and uniform task lighting that keeps screens readable and teams productive through a full working day.",
    hero: "/scenes/app-office.webp",
    heroAlt: "Modern office interior with architectural LED lighting",
    families: ["recessed-panel-light", "linear-light", "ceiling-light", "recessed-down-light"],
  },
  {
    slug: "retail",
    name: "Retail & showroom lighting",
    short: "Retail & Showroom",
    kicker: "Stores · Galleries · Showrooms",
    tagline: "Merchandise lit the way it was designed.",
    blurb:
      "High-fidelity colour, tight beam control and contrast that pulls the eye to the product — not the ceiling.",
    hero: "/scenes/app-retail.webp",
    heroAlt: "Retail showroom with accent LED spot lighting",
    families: ["track-spot-light", "recessed-spot-light", "recessed-grille-spot-light", "magnet-light"],
  },
  {
    slug: "hospitality",
    name: "Hospitality lighting",
    short: "Hospitality",
    kicker: "Hotels · Restaurants · Lounges",
    tagline: "Sets the register of a room before anyone reads the menu.",
    blurb:
      "Warm, deeply dimmable and glare-free at eye level — for lobbies, guest rooms, restaurants and bars.",
    hero: "/markets/hospitality.webp",
    heroAlt: "Hospitality lounge with warm architectural lighting",
    families: ["recessed-down-light", "track-spot-light", "magnet-light", "surface-mounted-down-light"],
  },
  {
    slug: "residential",
    name: "Residential lighting",
    short: "Residential",
    kicker: "Villas · Apartments · Interiors",
    tagline: "Architectural discipline at domestic scale.",
    blurb:
      "Trimless recessed, cove and magnetic track that disappear into the ceiling and let the home speak.",
    hero: "/markets/residential.webp",
    heroAlt: "Residential interior with recessed LED lighting",
    families: ["surface-mounted-down-light", "magnet-light", "module-series", "recessed-down-light"],
  },
  {
    slug: "mosque-cultural",
    name: "Mosque & cultural lighting",
    short: "Mosque & Cultural",
    kicker: "Mosques · Museums · Civic halls",
    tagline: "Light that respects the architecture of faith and culture.",
    blurb:
      "Gentle ambient layers, controlled accent and façade-aware outdoor for prayer halls, courtyards and cultural venues.",
    hero: "/banners/indoor.webp",
    heroAlt: "Cultural interior illuminated with soft architectural light",
    families: ["recessed-down-light", "linear-light", "flood-light", "wall-light"],
  },
  {
    slug: "industrial",
    name: "Industrial & logistics lighting",
    short: "Industrial & Logistics",
    kicker: "Warehouses · Plants · Depots",
    tagline: "High-mount output that earns its keep on the bill.",
    blurb:
      "High-bay and flood fixtures with the efficacy and thermals to survive roof-level Gulf heat.",
    hero: "/scenes/factory-floor.webp",
    heroAlt: "Industrial warehouse with high-bay LED lighting",
    families: ["high-bay", "flood-light", "linear-light", "street-light"],
  },
  {
    slug: "facade-landscape",
    name: "Façade & landscape lighting",
    short: "Façade & Landscape",
    kicker: "Façade · Landscape · Streets",
    tagline: "Built for the elements, tuned for the night.",
    blurb:
      "IP-rated wall, lawn, street and flood fixtures shaping buildings and landscapes after dark.",
    hero: "/scenes/app-facade.webp",
    heroAlt: "Building façade with architectural outdoor lighting",
    families: ["flood-light", "wall-light", "street-light", "lawn-light"],
  },
].map((a) => ({ ...a, hero: asset(a.hero) }));

export const applicationBySlug = (slug: string) =>
  APPLICATIONS.find((a) => a.slug === slug);
