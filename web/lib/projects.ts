// ============================================================================
// Project references — placeholder case studies (data-driven).
// Swap copy/photos when real project assets land; the /projects page
// renders whatever is listed here.
// ============================================================================

import { asset } from "./assets";

export interface ProjectRef {
  slug: string;
  title: string;
  location: string;
  sector: string;
  year: string;
  blurb: string;
  fixtures: string[];
  image: string;
  featured?: boolean;
}

export const PROJECTS: ProjectRef[] = [
  {
    slug: "kuwait-retail-rollout",
    title: "Multi-store retail rollout",
    location: "Kuwait City, Kuwait",
    sector: "Retail & Showroom",
    year: "2024",
    blurb:
      "Fixture schedules, quantities and SASO paperwork for a coordinated store opening across four locations.",
    fixtures: ["Track spot light", "Recessed grille spot", "Linear light"],
    image: "/scenes/app-retail.webp",
    featured: true,
  },
  {
    slug: "dubai-hospitality-lobby",
    title: "Boutique hotel lobby & F&B",
    location: "Dubai, UAE",
    sector: "Hospitality",
    year: "2025",
    blurb:
      "Warm dim-to-warm layers for the lobby, restaurant and corridor — glare-free at seated eye height.",
    fixtures: ["Recessed down light", "Magnet light", "Surface down light"],
    image: "/markets/hospitality.webp",
    featured: true,
  },
  {
    slug: "jiangmen-office-fitout",
    title: "Headquarters office fit-out",
    location: "Jiangmen, China",
    sector: "Office",
    year: "2024",
    blurb:
      "Photometrics, fixture list and certifications delivered from reflected ceiling plans in under a week.",
    fixtures: ["Recessed panel light", "Linear light", "Ceiling light"],
    image: "/scenes/app-office.webp",
  },
  {
    slug: "gulf-facade-scheme",
    title: "Coastal façade & landscape",
    location: "Abu Dhabi, UAE",
    sector: "Façade & Landscape",
    year: "2025",
    blurb:
      "IP65 wall-wash and flood fixtures specified for salt air, with full cut-off optics for dark-sky compliance.",
    fixtures: ["Flood light", "Wall light", "Lawn light"],
    image: "/scenes/app-facade.webp",
    featured: true,
  },
  {
    slug: "logistics-highbay",
    title: "Regional logistics depot",
    location: "Shuwaikh, Kuwait",
    sector: "Industrial & Logistics",
    year: "2023",
    blurb:
      "High-bay replacement delivering 150+ lm/W system efficacy and uniform aisle lighting at 12 m mounting height.",
    fixtures: ["High bay", "Flood light"],
    image: "/scenes/factory-floor.webp",
  },
  {
    slug: "villa-residential",
    title: "Private villa interiors",
    location: "Hawally, Kuwait",
    sector: "Residential",
    year: "2025",
    blurb:
      "Trimless recessed and magnetic track throughout living spaces — warm 2700K domestic white.",
    fixtures: ["Recessed down light", "Magnet light", "Module series"],
    image: "/markets/residential.webp",
  },
].map((p) => ({ ...p, image: asset(p.image) }));
