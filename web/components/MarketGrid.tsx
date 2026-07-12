import Link from "next/link";
import Image from "next/image";
import { MARKETS, liveFamilies } from "@/lib/markets";

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** Beam-of-light plate, drawn when a market has no photograph yet. */
const Beam = () => (
  <svg className="mk-beam" viewBox="0 0 400 300" aria-hidden preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="mkb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity=".30" />
        <stop offset="55%" stopColor="#fff" stopOpacity=".07" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="mkp" cx="50%" cy="100%" r="60%">
        <stop offset="0%" stopColor="#fff" stopOpacity=".22" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M200 6 L296 300 L104 300 Z" fill="url(#mkb)" />
    <ellipse cx="200" cy="300" rx="108" ry="26" fill="url(#mkp)" />
    <circle cx="200" cy="8" r="3.2" fill="#fff" fillOpacity=".85" />
  </svg>
);

export default function MarketGrid({
  knownFamilies,
  familyNames,
}: {
  /** Category slugs that exist in the CMS right now. */
  knownFamilies: Set<string>;
  /** slug -> display name, for the chip labels. */
  familyNames: Map<string, string>;
}) {
  return (
    <div className="mk-grid">
      {MARKETS.map((m, i) => {
        const fams = liveFamilies(m, knownFamilies);
        return (
          <article className="mk-tile reveal" key={m.slug}>
            <div className="mk-plate">
              {m.image ? (
                <Image src={m.image} alt={m.name} fill quality={82} sizes="(max-width:900px) 100vw, 33vw" />
              ) : (
                <Beam />
              )}
              <span className="mk-idx">{String(i + 1).padStart(2, "0")}</span>
            </div>

            <div className="mk-body">
              <div className="mk-kicker">{m.kicker}</div>
              <h3>{m.name}</h3>
              <p>{m.blurb}</p>

              <ul className="mk-specs">
                {m.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              {fams.length > 0 && (
                <div className="mk-fams">
                  {fams.map((f) => (
                    <Link href={`/products/${f}`} key={f}>
                      {familyNames.get(f) ?? f}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/contact" className="mk-cta">
                Specify for {m.name.split(" ")[0].toLowerCase()} <Arrow />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
