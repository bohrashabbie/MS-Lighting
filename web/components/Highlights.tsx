import Link from "next/link";
import Image from "next/image";
import { HIGHLIGHTS } from "@/lib/highlights";

const Arrow = () => (
  <svg className="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Ledvance-style highlights / news wall with mixed card sizes. */
export default function Highlights() {
  return (
    <section className="highlights">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Highlights</div>
            <h2>Discover what&apos;s new</h2>
          </div>
          <Link href="/projects" className="link">View projects</Link>
        </div>
        <div className="hl-masonry">
          {HIGHLIGHTS.map((item) => (
            <Link
              href={item.href}
              className={`hl-card reveal hl-${item.size || "md"}`}
              key={item.id}
            >
              <div className="hl-media">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  quality={80}
                  sizes="(max-width:880px) 100vw, 40vw"
                />
              </div>
              <div className="hl-body">
                <span className="hl-kicker">{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="hl-cta">
                  Learn more <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
