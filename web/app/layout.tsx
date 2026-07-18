import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ambience from "@/components/Ambience";
import { SITE_URL } from "@/lib/api";

/* Architectural stack — precise display + calm body (not Inter). */
const display = Outfit({
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--mono",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

export const viewport = { themeColor: "#ffcc00" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MS Lighting — Indoor & Outdoor LED Lights",
    template: "%s | MS Lighting",
  },
  description:
    "MS Lighting supplies indoor lights and outdoor lights for projects across Kuwait, UAE, China and Egypt — recessed, surface, linear, magnetic, wall, street and flood LED fixtures. Browse the 2025 catalogue.",
  keywords: [
    "MS Lighting",
    "indoor lights",
    "outdoor lights",
    "indoor lighting",
    "outdoor lighting",
    "LED lights",
    "LED lighting",
    "recessed lights",
    "down lights",
    "linear lights",
    "track lights",
    "magnetic lights",
    "flood lights",
    "street lights",
    "wall lights",
    "architectural lighting",
  ],
  openGraph: {
    type: "website",
    siteName: "MS Lighting",
    title: "MS Lighting — Indoor & Outdoor LED Lights",
    description:
      "Indoor lights and outdoor lights for architectural and project lighting — full 2025 LED catalogue with specifications.",
    images: [{ url: "/logo.png", width: 120, height: 34, alt: "MS Lighting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MS Lighting — Indoor & Outdoor LED Lights",
    description:
      "Indoor lights and outdoor lights for architectural and project lighting — full 2025 LED catalogue.",
    images: ["/logo.png"],
  },
  verification: {
    google: "A5xOOHt6IIddAinuNw3JmuTZhp_AlwuwGaWdd9Aduc8",
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
      description:
        "Professional LED lighting manufacturer and supplier of indoor lights and outdoor lights — recessed, surface, linear, magnetic, wall, street and flood fixtures.",
      areaServed: ["Kuwait", "United Arab Emirates", "China", "Egypt"],
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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: skip the intro curtain if it already played
            this tab session (Ambience sets the flag). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{sessionStorage.getItem('msIntro')&&document.documentElement.setAttribute('data-intro','off')}catch(e){}",
          }}
        />
        <noscript>
          {/* Without JS the reveal observer never runs — show everything. */}
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}#curtain{display:none!important}#progress{display:none}`}</style>
        </noscript>
      </head>
      <body>
        {/* Cinematic intro — a tungsten seam charges from the centre out as
            the counter runs to 100; the wordmark rises above it, the seam
            flares, and the curtain parts along it like a shutter opening.
            Plays once per tab session; reduced-motion and no-JS both skip it. */}
        <div id="curtain" aria-hidden="true">
          <div className="ct-panels">
            <i className="ct-p-top" />
            <i className="ct-p-btm ct-p-last" />
          </div>
          <div className="ct-glow" />
          <div className="ct-inner">
            <div className="ct-half ct-ha">
              <div className="ct-kicker">Al-Burhan Group</div>
              <div className="ct-word">
                <span className="ct-mask"><span className="ct-t1">MS</span></span>{" "}
                <span className="ct-mask"><span className="ct-t2">Lighting</span></span>
              </div>
            </div>
            <div className="ct-half ct-hb">
              <div className="ct-tag">Light, engineered to disappear</div>
            </div>
          </div>
          <div className="ct-seam" />
          <div className="ct-cor ct-c-tl">MS Lighting<em>®</em></div>
          <div className="ct-cor ct-c-tr">Catalogue 2025</div>
          <div className="ct-cor ct-c-br">Kuwait · UAE · China · Egypt</div>
          <div className="ct-count"><i>Loading</i><b><span id="ct-num">0</span><em>%</em></b></div>
        </div>
        <div id="progress" aria-hidden="true" />
        <div className="grain" aria-hidden />
        <Ambience />
        <div className="geo-banner">
          <span className="gb-label">Manufactured in China · Sold across</span>
          <span className="gb-countries">Kuwait · UAE · China · Egypt <em>(soon)</em></span>
          <a href="/manufacturing">Our factory ↓</a>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
