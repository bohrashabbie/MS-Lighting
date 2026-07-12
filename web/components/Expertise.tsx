import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/assets";

const Arrow = () => (
  <svg className="ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M9 7h8v8" /></svg>
);

const CARDS = [
  {
    title: "Commercial",
    href: "/commercial",
    img: "/markets/exterior.webp",
    body: "Complete project lighting — beauty, measured performance and real-world support from specification through installation and handover.",
    cta: "Explore commercial solutions",
  },
  {
    title: "Residential",
    href: "/products/indoor",
    img: "/markets/residential.webp",
    body: "Architectural discipline at domestic scale — trimless recessed, cove and magnetic systems that disappear into the ceiling and let the home speak.",
    cta: "Explore residential designs",
  },
  {
    title: "Hospitality",
    href: "/commercial",
    img: "/markets/hospitality.webp",
    body: "Warm, deeply dimmable, glare-free lighting that sets the register of a room before anyone reads the menu.",
    cta: "Explore hospitality",
  },
  {
    title: "Retail",
    href: "/commercial",
    img: "/markets/retail.webp",
    body: "High-fidelity colour and tight beam control that lets merchandise read exactly the way it was designed to.",
    cta: "Explore retail",
  },
];

export default function Expertise() {
 return (
  <section className="expertise">
    <div className="wrap">
      <div className="xp-head reveal">
        <div className="eyebrow">Our expertise</div>
        <p>
          We light the spaces people live and work in — four disciplines,
          one standard of engineering.
        </p>
      </div>

      <div className="xp-grid">
        {CARDS.map((c) => (
          <Link href={c.href} className="xp-card reveal" key={c.title}>
            <div className="xp-media">
              <Image src={asset(c.img)} alt={c.title} fill quality={82} sizes="(max-width:880px) 50vw, 25vw" />
              <div className="xp-scrim" aria-hidden />
              <div className="xp-caption">
                <h3>{c.title}</h3>
                <span className="xp-cta">{c.cta} <Arrow /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
}
