import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APPLICATIONS } from "@/lib/applications";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Lighting applications for office, retail, hospitality, residential, mosque & cultural, industrial and façade projects — MS Lighting.",
};

export default function ApplicationsIndexPage() {
  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">Applications</div>
          <h1>Light for every space</h1>
          <p>
            From workplaces to façades — pick an application to see recommended
            fixture families from the MS Lighting catalogue.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="app-index-grid">
            {APPLICATIONS.map((a) => (
              <Link href={`/applications/${a.slug}`} className="app-index-card reveal" key={a.slug}>
                <div className="app-index-media">
                  <Image src={a.hero} alt={a.heroAlt} fill quality={80} sizes="(max-width:880px) 100vw, 33vw" />
                  <div className="scrim" aria-hidden />
                </div>
                <div className="app-index-body">
                  <span className="app-kicker">{a.kicker}</span>
                  <h2>{a.short}</h2>
                  <p>{a.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
