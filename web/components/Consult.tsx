import Link from "next/link";

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/**
 * The consultation close for catalogue pages — the "Why WAC?" moment:
 * human specification support as the conversion, under a cone of light.
 */
export default function Consult({ context }: { context?: string }) {
  return (
    <section className="consult">
      <div className="inner">
        <div>
          <div className="eyebrow reveal">Specification support</div>
          <h3 className="reveal">Not sure which fixture <em>fits?</em></h3>
          <p className="reveal">
            Send us the space{context ? ` — ${context}` : ""} and we&apos;ll
            answer with fixtures, quantities, photometrics and the paperwork
            your consultant needs.
          </p>
        </div>
        <div className="consult-actions reveal">
          <Link href="/contact" className="btn btn-primary">Talk to a specifier <Arrow /></Link>
          <Link href="/commercial" className="btn btn-outline">Commercial projects</Link>
        </div>
      </div>
    </section>
  );
}
