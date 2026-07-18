import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";
import { SECTIONS } from "@/lib/sections";

export const revalidate = 120;

const def = SECTIONS.indoor;

export const metadata: Metadata = {
  title: "Indoor Lights & Indoor LED Lighting",
  description:
    "Browse indoor lights from MS Lighting — recessed down lights, surface lights, linear lights, track lights and magnetic LED fixtures for offices, homes, retail and hospitality.",
  keywords: [
    "indoor lights",
    "indoor LED lights",
    "indoor lighting",
    "recessed lights",
    "down lights",
    "linear lights",
    "track lights",
    "magnetic lights",
    "LED indoor lights",
    "MS Lighting",
  ],
  alternates: { canonical: "/products/indoor" },
  openGraph: {
    title: "Indoor Lights | MS Lighting",
    description: def.blurb,
    url: "/products/indoor",
    images: [{ url: def.banner, alt: def.bannerAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indoor Lights | MS Lighting",
    description: def.blurb,
    images: [def.banner],
  },
};

export default function IndoorPage() {
  return <SectionLanding section="indoor" />;
}
