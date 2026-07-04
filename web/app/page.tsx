import Link from "next/link";
import Image from "next/image";
import { getCategories, getCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { RENDERS, localRender } from "@/lib/renders";
import type { Product } from "@/lib/types";

export const revalidate = 120;

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);

  const details = await Promise.all(
    categories.map((c) => getCategory(c.slug).catch(() => null))
  );
  const allProducts: Product[] = details.flatMap((d) => d?.products ?? []);
  const counts = new Map(
    categories.map((c, i) => [c.slug, details[i]?.products.length])
  );
  const modelCount = allProducts.length;

  // Lead the grid with models we hold hi-res studio renders for,
  // then fill with the rest of the catalogue.
  const withRender = RENDERS
    .map((r) => allProducts.find((p) => p.model_code?.toUpperCase() === r.code))
    .filter((p): p is Product => Boolean(p));
  const others = allProducts.filter((p) => !localRender(p.model_code));
  const featured = [...withRender, ...others].slice(0, 9);

  const hero = RENDERS[0]; // MS-240R — always local, always crisp

  return (
    <>
      {/* ===== CATALOGUE OPENER ===== */}
      <section className="hero">
        <div className="inner">
          <div className="copy">
            <div className="kicker reveal">Product Catalogue 2025 · Kuwait · GCC</div>
            <h1 className="reveal">Architectural<br />LED lighting<em>.</em></h1>
            <p className="reveal">
              Recessed, surface, linear, magnetic and outdoor fixtures —
              engineered for clean output and effortless integration, with
              full specification sheets on every model.
            </p>
            <div className="cta-row reveal">
              <Link href="/products" className="btn btn-primary">Browse the catalogue <Arrow /></Link>
              <Link href="/contact" className="btn btn-outline">Request a quote</Link>
            </div>
            <div className="certs reveal"><b>Certified</b> · CE · RoHS · CB · SASO</div>
          </div>

          <div className="stage reveal">
            <span className="tag">Featured fixture</span>
            <Image
              src={hero.src}
              alt={`${hero.code} ${hero.category}`}
              width={hero.w}
              height={hero.h}
              priority
              quality={95}
              sizes="(max-width:920px) 92vw, 54vw"
            />
            <span className="code">{hero.code} · {hero.category}</span>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY TABS ===== */}
      {categories.length > 0 && (
        <nav className="tabstrip" aria-label="Product families">
          <div className="row">
            <Link href="/products" className="all">All products</Link>
            {categories.map((c) => (
              <Link href={`/products/${c.slug}`} key={c.slug}>
                {c.name_en}
                {counts.get(c.slug) ? <b>{counts.get(c.slug)}</b> : null}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* ===== THE COLLECTION ===== */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">The collection</div>
              <h2>Signature fixtures</h2>
            </div>
            <Link href="/products" className="link">All products</Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-3">
              {featured.map((p) => (
                <div className="reveal" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            /* CMS unreachable — the hi-res renders still make a full catalogue page */
            <div className="grid grid-3">
              {RENDERS.map((r) => (
                <Link href={`/products/${r.categorySlug}`} className="card reveal" key={r.code}>
                  <div className="heroimg">
                    <Image src={r.src} alt={`${r.code} ${r.category}`} width={r.w} height={r.h} quality={90} sizes="(max-width:560px) 100vw, (max-width:980px) 50vw, 33vw" />
                  </div>
                  <div className="meta">
                    <div className="model">{r.code}</div>
                    <div className="type">{r.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== BROWSE BY FAMILY ===== */}
      {categories.length > 0 && (
        <section className="section tight" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Browse by family</div>
                <h2>Every fixture family</h2>
              </div>
              <span className="meta">{categories.length} families · {modelCount} models</span>
            </div>
            <div className="indexlist">
              {categories.map((c, i) => (
                <Link href={`/products/${c.slug}`} className="ixrow reveal" key={c.slug}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
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

      {/* ===== CTA ===== */}
      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow reveal">Let&apos;s build it</div>
          <h2 className="reveal">Light your next project.</h2>
          <p className="ar-line reveal" lang="ar" dir="rtl">أضِئ مشروعك القادم</p>
          <p className="reveal">Tell us about the space — we&apos;ll spec the right fixtures, quantities and certifications. Serving Kuwait, the GCC and beyond.</p>
          <div className="cta-row reveal" style={{ justifyContent: "center", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Request a quote <Arrow /></Link>
            <Link href="/products" className="btn btn-outline">Browse the catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
