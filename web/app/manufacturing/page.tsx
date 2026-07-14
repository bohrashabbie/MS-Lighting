import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { FACTORY, FACTORY_STATS, PROCESS_STEPS } from "@/lib/factory";

export const metadata: Metadata = {
  title: "Manufacturing — Jiangmen Factory",
  description:
    "MS Lighting manufactures LED fixtures in-house at Jiangmen Bohan Lighting Co., Ltd, Guangdong, China — R&D, tooling, SMT, aging tests, QC and OEM/ODM.",
};

const Arrow = () => (
  <svg className="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ManufacturingPage() {
  return (
    <>
      <section className="sec-hero" style={{ minHeight: "55vh" }}>
        <Image
          src={asset("/scenes/factory-floor.webp")}
          alt="Jiangmen manufacturing facility"
          fill
          quality={82}
          priority
          sizes="100vw"
        />
        <div className="veil" aria-hidden />
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link><span>/</span>Manufacturing
          </div>
          <div className="kicker">Jiangmen · Guangdong · China</div>
          <h1>Made in our factory</h1>
          <p>{FACTORY.pitch}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mfg-intro">
            <div>
              <div className="eyebrow reveal">The facility</div>
              <h2 className="reveal">{FACTORY.name}</h2>
              <p className="reveal" style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.75, maxWidth: "54ch", marginTop: 16 }}>
                {FACTORY.address}. Direct line {FACTORY.phone}. We own the production
                chain — so projects get factory pricing, custom capability and QC we stand behind.
              </p>
            </div>
            <div className="factory-stats mfg-stats">
              {FACTORY_STATS.map((s) => (
                <div className="fs reveal" key={s.label}>
                  <div className="num" data-count={s.value} data-suffix={s.suffix}>0</div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Process</div>
              <h2>Design to export</h2>
            </div>
          </div>
          <ol className="mfg-timeline">
            {PROCESS_STEPS.map((step) => (
              <li className="reveal" key={step.n}>
                <span className="mfg-n">{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap mfg-certs">
          <div className="eyebrow reveal">Certifications</div>
          <h2 className="reveal">CE · RoHS · CB · SASO</h2>
          <p className="reveal" style={{ color: "var(--ink-2)", maxWidth: "48ch", marginTop: 14, lineHeight: 1.7 }}>
            Export documentation ready for Gulf projects and international tenders.
            Download statements from the downloads centre.
          </p>
          <div className="cta-row reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/downloads" className="btn btn-outline">Downloads centre</Link>
            <Link href="/contact?subject=OEM%20%2F%20ODM%20enquiry" className="btn btn-primary">
              OEM / ODM enquiry <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="consult">
        <div className="inner">
          <div>
            <div className="eyebrow">Talk to the factory</div>
            <h3>Custom finishes, private label, <em>project tooling.</em></h3>
            <p>Tell us the optic, finish and volume — we&apos;ll confirm feasibility from Jiangmen.</p>
          </div>
          <div className="consult-actions">
            <Link href="/contact?subject=Factory%20enquiry" className="btn btn-primary">Contact factory team</Link>
            <a href={`mailto:${FACTORY.email}`} className="btn btn-outline">{FACTORY.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
