import Link from "next/link";
import Image from "next/image";
import { getCategories, getCategory, imageUrl } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 120;

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);

  const details = await Promise.all(
    categories.slice(0, 8).map((c) => getCategory(c.slug).catch(() => null))
  );
  const allProducts: Product[] = details.flatMap((d) => d?.products ?? []);
  const counts = new Map(
    categories.map((c, i) => [c.slug, details[i]?.products.length])
  );
  const modelCount = details.reduce((n, d) => n + (d?.products.length ?? 0), 0);

  // pick a representative image for a category (its own, else first product's)
  const catImg = (c: ProductCategory, i: number) =>
    imageUrl(c.image_url) || imageUrl(details[i]?.products[0]?.image_url) || null;

  const heroImg = allProducts.map((p) => imageUrl(p.image_url)).find(Boolean) || null;
  const featured = allProducts.slice(0, 6);
  const stages = categories.slice(0, 4);
  const rest = categories.slice(4);

  return (
    <>
      {/* ===== CINEMATIC HERO ===== */}
      <section className="hero">
        <div className="inner">
          <div className="copy">
            <div className="kicker reveal">MS Lighting · 2025 Collection</div>
            <h1 className="reveal">Make light<br /><em>behave.</em></h1>
            <p className="reveal">
              Architectural LED fixtures — recessed, linear, magnetic and outdoor —
              engineered to disappear into the room and perform for years.
            </p>
            <div className="cta-row reveal">
              <Link href="/products" className="btn btn-primary">Explore the collection <Arrow /></Link>
              <Link href="/contact" className="btn btn-outline">Request a quote</Link>
            </div>
            <div className="scroll-cue reveal"><i />Scroll to begin</div>
          </div>

          {heroImg && (
            <div className="stage reveal">
              <span className="tag">Featured</span>
              <Image src={heroImg} alt="MS Lighting fixture" width={720} height={720} priority sizes="(max-width:920px) 90vw, 46vw" />
            </div>
          )}
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="manifesto">
        <div className="wrap">
          <p className="reveal">
            Good lighting is invisible. <span>You don&apos;t notice the fixture —</span> <em>you notice the space.</em> Every MS Lighting product is built to that standard.
          </p>
        </div>
      </section>

      {/* ===== CINEMATIC CATEGORY STAGES ===== */}
      <div className="stages">
        {stages.map((c, i) => {
          const img = catImg(c, i);
          const n = String(i + 1).padStart(2, "0");
          return (
            <section className="cine" key={c.slug}>
              <div className="row">
                <div className="copy reveal">
                  <div className="idx">{n}</div>
                  <div className="ct-count">{counts.get(c.slug) ?? "—"} models</div>
                  <h3>{c.name_en}</h3>
                  <p>
                    {c.description_en ||
                      `Precision ${c.name_en.toLowerCase()} engineered for clean output, true colour and effortless integration.`}
                  </p>
                  <Link href={`/products/${c.slug}`} className="more">View the range <Arrow /></Link>
                </div>
                <Link href={`/products/${c.slug}`} className="shot reveal" aria-label={c.name_en}>
                  {img ? (
                    <Image src={img} alt={c.name_en} width={680} height={544} sizes="(max-width:880px) 90vw, 46vw" />
                  ) : null}
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===== FULL COLLECTION INDEX ===== */}
      {rest.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">The full range</div>
                <h2>Every fixture family</h2>
              </div>
              <Link href="/products" className="link">All products</Link>
            </div>
            <div className="indexlist">
              {rest.map((c, i) => (
                <Link href={`/products/${c.slug}`} className="ixrow reveal" key={c.slug}>
                  <span className="n">{String(i + 5).padStart(2, "0")}</span>
                  <span className="nm">{c.name_en}</span>
                  <span className="ct">{counts.get(c.slug) ?? ""} {counts.get(c.slug) ? "models" : ""}</span>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="wrap">
          <div className="stat reveal">
            <div className="num" data-count={modelCount || 120} data-suffix="+">0</div>
            <div className="lbl">LED Models</div>
          </div>
          <div className="stat reveal">
            <div className="num" data-count={categories.length || 6}>0</div>
            <div className="lbl">Fixture Families</div>
          </div>
          <div className="stat reveal">
            <div className="num" data-count={15} data-suffix="+">0</div>
            <div className="lbl">Years Of Lighting</div>
          </div>
          <div className="stat reveal">
            <div className="num" data-count={100} data-suffix="%">0</div>
            <div className="lbl">Certified Quality</div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      {featured.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Featured</div>
                <h2>Hover to reveal full specs</h2>
              </div>
              <Link href="/products" className="link">All products</Link>
            </div>
            <div className="grid grid-3">
              {featured.map((p) => (
                <div className="reveal" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY ===== */}
      <section className="why">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Why MS Lighting</div>
              <h2>Built to a higher standard</h2>
            </div>
          </div>
          <div className="grid">
            {WHY.map((w) => (
              <div className="feat reveal" key={w.title}>
                <div className="ic">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow reveal">Let&apos;s build it</div>
          <h2 className="reveal">Light your next project.</h2>
          <p className="reveal">Tell us about the space — we&apos;ll spec the right fixtures, quantities and certifications.</p>
          <div className="cta-row reveal" style={{ justifyContent: "center", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Request a quote <Arrow /></Link>
            <Link href="/products" className="btn btn-outline">Browse the catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const WHY = [
  {
    title: "Precision optics",
    body: "Engineered beam control, true colour rendering and zero glare — light that flatters the space, not fights it.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /></svg>
    ),
  },
  {
    title: "Efficient by design",
    body: "High-lumen LED chips and tuned drivers cut energy draw and heat, so fixtures run cooler and last longer.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z" /></svg>
    ),
  },
  {
    title: "Certified & reliable",
    body: "CE, RoHS and rigorous in-house testing back every model — with a warranty that says we expect them to last.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
];
