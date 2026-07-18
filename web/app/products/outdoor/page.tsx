import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";
import { SECTIONS } from "@/lib/sections";

export const revalidate = 120;

const def = SECTIONS.outdoor;

export const metadata: Metadata = {
  title: "Outdoor Lights & Outdoor LED Lighting",
  description:
    "Browse outdoor lights from MS Lighting — IP-rated wall lights, lawn lights, street lights and flood lights for façades, landscapes and roadways.",
  keywords: [
    "outdoor lights",
    "outdoor LED lights",
    "outdoor lighting",
    "wall lights",
    "lawn lights",
    "street lights",
    "flood lights",
    "IP65 lights",
    "façade lighting",
    "MS Lighting",
  ],
  alternates: { canonical: "/products/outdoor" },
  openGraph: {
    title: "Outdoor Lights | MS Lighting",
    description: def.blurb,
    url: "/products/outdoor",
    images: [{ url: def.banner, alt: def.bannerAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor Lights | MS Lighting",
    description: def.blurb,
    images: [def.banner],
  },
};

export default function OutdoorPage() {
  return <SectionLanding section="outdoor" />;
}
