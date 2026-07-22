/**
 * The LED chip and driver brands MS Lighting builds its fixtures from, grouped
 * by component type. Real brand marks are served locally from /public/brands.
 * A brand without a `logo` renders as a typographic wordmark instead, so the
 * grid stays complete even where a clean logo file isn't available — drop a
 * file into /public/brands and point `logo` at it to upgrade any wordmark.
 */
export interface ComponentBrand {
  name: string;
  /** Path under /public, e.g. "/brands/cree.svg". Omit to render a wordmark. */
  logo?: string;
}

export interface BrandGroup {
  label: string;
  brands: ComponentBrand[];
}

export const COMPONENT_BRANDS: BrandGroup[] = [
  {
    label: "LED Chips",
    brands: [
      { name: "Cree", logo: "/brands/cree.svg" },
      { name: "Epistar" },
      { name: "Citizen", logo: "/brands/citizen.svg" },
      { name: "Osram", logo: "/brands/osram.svg" },
      { name: "Sanan", logo: "/brands/sanan.png" },
      { name: "Nichia", logo: "/brands/nichia.svg" },
      { name: "Philips Lumileds", logo: "/brands/philips.svg" },
    ],
  },
  {
    label: "Drivers",
    brands: [
      { name: "Meanwell" },
      { name: "Lifud" },
      { name: "Eaglerise" },
      { name: "Osram", logo: "/brands/osram.svg" },
      { name: "Philips", logo: "/brands/philips.svg" },
      { name: "T.C.I" },
      { name: "Tridonic" },
    ],
  },
];
