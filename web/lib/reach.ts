// ============================================================================
// Global reach — the regions and countries MS Lighting / Al-Burhan supplies.
//
// Confirmed presence (Kuwait, UAE, China, Egypt) is marked `active`; markets we
// deliver into or are expanding toward are `expanding`. Keep this honest — it is
// public-facing. Move a country between lists as the network grows; the section
// renders whatever is here.
// ============================================================================

export interface Region {
  name: string;
  blurb: string;
  countries: { name: string; status?: "active" | "soon" }[];
}

export const REACH: Region[] = [
  {
    name: "Middle East",
    blurb: "Our home market — project lighting and full specification support across the Gulf.",
    countries: [
      { name: "Kuwait", status: "active" },
      { name: "UAE", status: "active" },
      { name: "Saudi Arabia" },
      { name: "Qatar" },
      { name: "Oman" },
      { name: "Bahrain" },
    ],
  },
  {
    name: "Africa",
    blurb: "Growing across North and East Africa, led by our Egypt operation.",
    countries: [
      { name: "Egypt", status: "soon" },
      { name: "Morocco" },
      { name: "Kenya" },
      { name: "Nigeria" },
    ],
  },
  {
    name: "Europe",
    blurb: "Serving specifiers and distributors with CE-certified architectural ranges.",
    countries: [
      { name: "United Kingdom" },
      { name: "Germany" },
      { name: "France" },
      { name: "Spain" },
    ],
  },
  {
    name: "Asia & Beyond",
    blurb: "Manufacturing in China, exporting to project markets worldwide.",
    countries: [
      { name: "China", status: "active" },
      { name: "India" },
      { name: "United States" },
    ],
  },
];

/** Headline reach figures for the band. Confirm before publishing. */
export const REACH_STATS = [
  { value: "4", label: "Continents served" },
  { value: "20+", label: "Countries reached" },
  { value: "500+", label: "Projects delivered" },
];
