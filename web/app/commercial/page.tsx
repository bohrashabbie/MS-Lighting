import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/lib/api";
import MarketGrid from "@/components/MarketGrid";
import { SPEC_LITERACY, LUX_LEVELS, LUX_SOURCE, CERTIFICATIONS, CERT_SOURCE } from "@/lib/lighting";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Commercial Lighting",
  description:
    "Project lighting for hospitality, workplace, retail, exterior, industrial and residential schemes — specified, certified and supplied across Kuwait, the UAE, China and Egypt.",
};

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function CommercialPage() {
  const categories = await getCategories().catch(() => []);
  const knownFamilies = new Set(categories.map((c) => c.slug));
  const familyNames = new Map(categories.map((c) => [c.slug, c.name_en]));

  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link><span>/</span>Commercial
          </div>
          <div className="eyebrow">Our markets</div>
          <h1>Brilliant light.<br />Built for projects.</h1>
          <p>
            Complete commercial lighting — beauty, measured performance and
            real support from specification through installation and handover.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Six segments</div>
              <h2>Every space has a number</h2>
            </div>
            <Link href="/contact" className="link">Get in touch</Link>
          </div>
          <MarketGrid knownFamilies={knownFamilies} familyNames={familyNames} />
        </div>
      </section>

      {/* Spec literacy — the four numbers that decide a fixture */}
      <section className="section spec-lit">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Technology</div>
              <h2>Four numbers that decide the room</h2>
            </div>
          </div>
          <div className="sl-grid">
            {SPEC_LITERACY.map((s) => (
              <article className="sl-card reveal" key={s.code}>
                <div className="sl-top">
                  <span className="sl-code">{s.code}</span>
                  <span className="sl-q">{s.question}</span>
                </div>
                <h3>{s.term}</h3>
                <p>{s.body}</p>
                <dl className="sl-scale">
                  {s.scale.map((r) => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.note}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Light-level reference — EN 12464-1 */}
      <section className="section lux-band">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Reference</div>
              <h2>How much light a space wants</h2>
            </div>
            <a href={LUX_SOURCE.href} target="_blank" rel="noopener noreferrer" className="link">EN 12464-1</a>
          </div>
          <p className="lux-lede reveal">
            Maintained illuminance in lux, per the European workplace-lighting
            standard your specifier designs to. A useful sanity check before you
            count fixtures.
          </p>
          <div className="lux-grid">
            {LUX_LEVELS.map((g) => (
              <div className="lux-col reveal" key={g.group}>
                <h3>{g.group}</h3>
                <dl>
                  {g.rows.map((r) => (
                    <div key={r.space}>
                      <dt>{r.space}</dt>
                      <dd>{r.lux}<i>lux</i></dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section cert-band">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Certified</div>
              <h2>What our marks guarantee</h2>
            </div>
            <a href={CERT_SOURCE.href} target="_blank" rel="noopener noreferrer" className="link">Gulf import rules</a>
          </div>
          <div className="cert-grid">
            {CERTIFICATIONS.map((c) => (
              <article className="cert-card reveal" key={c.mark}>
                <div className="cert-top">
                  <span className="cert-mark">{c.mark}</span>
                  <span className="cert-scope">{c.scope}</span>
                </div>
                <h3>{c.name}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow reveal">Specification support</div>
          <h2 className="reveal">Send us the drawings.</h2>
          <p className="reveal">
            Share the reflected ceiling plan and we will come back with fixture
            schedules, quantities, photometrics and the certifications your
            authority having jurisdiction will ask for.
          </p>
          <div className="cta-row reveal" style={{ justifyContent: "center", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Request a quote <Arrow /></Link>
            <Link href="/products" className="btn btn-outline">Browse the catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
