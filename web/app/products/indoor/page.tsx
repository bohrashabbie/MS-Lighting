import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Indoor Lighting",
  description:
    "Indoor LED lighting by MS Lighting — recessed, surface-mounted, linear, track and magnetic fixture families engineered for clean, glare-free architectural light.",
  keywords: "indoor lighting, recessed down light, linear light, track light, magnet light, LED, MS Lighting",
  alternates: { canonical: "/products/indoor" },
};

export default function IndoorPage() {
  return <SectionLanding section="indoor" />;
}
