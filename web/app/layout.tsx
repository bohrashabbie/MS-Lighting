import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ambience from "@/components/Ambience";
import { SITE_URL } from "@/lib/api";

// Editorial display grotesque + clean neutral body — light, modern, gallery feel.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MS Lighting — Professional LED Lighting Solutions",
    template: "%s | MS Lighting",
  },
  description:
    "MS Lighting — recessed, surface, linear, magnetic and outdoor LED fixtures. Browse the full 2025 product range with full specifications.",
  keywords: ["MS Lighting", "LED lighting", "down light", "recessed light", "linear light", "magnet light", "flood light"],
  openGraph: {
    type: "website",
    siteName: "MS Lighting",
    title: "MS Lighting — Professional LED Lighting Solutions",
    description: "Browse the full MS Lighting 2025 LED product range.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MS Lighting",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: "Professional LED lighting manufacturer and supplier — recessed, surface, linear, magnetic and outdoor fixtures.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MS Lighting",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          {/* Without JS the reveal observer never runs — show everything. */}
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="grain" aria-hidden />
        <Ambience />
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
