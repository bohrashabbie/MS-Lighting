import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";

const Arrow = () => (
  <svg className="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SHOTS = [
  {
    src: "/markets/industrial.webp",
    alt: "LED manufacturing floor — Jiangmen, Guangdong",
    label: "Production",
    caption: "Jiangmen manufacturing",
  },
  {
    src: "/markets/office.webp",
    alt: "Engineering and quality control workspace in China",
    label: "Engineering",
    caption: "Spec & QC teams",
  },
  {
    src: "/markets/exterior.webp",
    alt: "Architectural lighting project supported from China operations",
    label: "Projects",
    caption: "Built for export",
  },
] as const;

export default function ChinaPresence() {
  return (
    <section className="china-band">
      <div className="wrap">
        <div className="china-head reveal">
          <div>
            <div className="eyebrow">China operations</div>
            <h2>
              Engineered in <em>Jiangmen</em>
            </h2>
            <p>
              Jiangmen Bohan Lighting Co., Ltd — our manufacturing base in Guangdong —
              designs, builds and certifies the fixtures that ship through the Al-Burhan
              network to Kuwait, the UAE and beyond.
            </p>
          </div>
          <div className="china-facts">
            <div className="cf">
              <b>Jiangmen</b>
              <span>Guangdong, China</span>
            </div>
            <div className="cf">
              <b>CE · RoHS · CB</b>
              <span>Export-ready certifications</span>
            </div>
            <div className="cf">
              <b>+86 137 2600 6786</b>
              <span>Direct factory line</span>
            </div>
          </div>
        </div>

        <div className="china-shots">
          {SHOTS.map((s) => (
            <figure className="china-shot reveal" key={s.src}>
              <div className="china-media">
                <Image
                  src={asset(s.src)}
                  alt={s.alt}
                  fill
                  quality={82}
                  sizes="(max-width:880px) 100vw, 33vw"
                />
              </div>
              <figcaption>
                <span className="china-label">{s.label}</span>
                <span>{s.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="china-cta reveal">
          <p>
            From the B2 Building on Yunoin Road, Jianghai District — fixtures leave
            China ready for Gulf projects and regional stock.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact China office <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
