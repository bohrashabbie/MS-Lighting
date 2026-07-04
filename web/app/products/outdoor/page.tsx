import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Outdoor Lighting",
  description:
    "Outdoor LED lighting by MS Lighting — wall, lawn, street and flood fixture families in sealed, IP-rated housings built for façades, landscapes and roadways.",
  keywords: "outdoor lighting, wall light, lawn light, street light, flood light, IP65, LED, MS Lighting",
  alternates: { canonical: "/products/outdoor" },
};

export default function OutdoorPage() {
  return <SectionLanding section="outdoor" />;
}
