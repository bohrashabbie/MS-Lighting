import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { FACTORY, FACTORY_STATS } from "@/lib/factory";

const Arrow = () => (
  <svg className="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Homepage: From our factory to your project. */
export default function FactoryBand() {
  return (
    <section className="factory-band" id="china">
      <div className="wrap">
        <div className="factory-split">
          <div className="factory-media reveal">
            <Image
              src={asset("/scenes/factory-floor.webp")}
              alt="LED manufacturing facility — Jiangmen, Guangdong"
              fill
              quality={82}
              sizes="(max-width:900px) 100vw, 50vw"
            />
            <div className="factory-badge">
              Manufactured in-house · Jiangmen, China
            </div>
          </div>
          <div className="factory-copy">
            <div className="eyebrow reveal">Our factory</div>
            <h2 className="reveal">
              From our factory to <em>your project</em>
            </h2>
            <p className="reveal">{FACTORY.pitch}</p>
            <ul className="factory-points reveal">
              <li>Own facility: {FACTORY.name}</li>
              <li>In-house R&amp;D, tooling, SMT, aging tests and QC</li>
              <li>OEM / ODM and custom finishes available</li>
              <li>Direct factory-to-project supply = better pricing &amp; lead times</li>
            </ul>
            <div className="factory-stats">
              {FACTORY_STATS.map((s) => (
                <div className="fs reveal" key={s.label}>
                  <div className="num" data-count={s.value} data-suffix={s.suffix}>
                    0
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="cta-row reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/manufacturing" className="btn btn-primary">
                See manufacturing <Arrow />
              </Link>
              <Link href="/contact?subject=OEM%20%2F%20ODM%20enquiry" className="btn btn-outline">
                OEM / ODM enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
