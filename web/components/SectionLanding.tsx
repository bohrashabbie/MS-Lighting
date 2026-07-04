import Link from "next/link";
import Image from "next/image";
import { getCategories, getCategory, SITE_URL } from "@/lib/api";
import { SECTIONS, sectionOf, type SectionSlug } from "@/lib/sections";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { localRender } from "@/lib/renders";
import type { Product } from "@/lib/types";

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function SectionLanding({ section }: { section: SectionSlug }) {
  const def = SECTIONS[section];
  const other = SECTIONS[section === "indoor" ? "outdoor" : "indoor"];

  const all = await getCategories().catch(() => []);
  const categories = all.filter((c) => sectionOf(c.slug) === section);
  const details = await Promise.all(
    categories.map((c) => getCategory(c.slug).catch(() => null))
  );
  const counts = categories.map((_, i) => details[i]?.products.length);
  const modelCount = details.reduce((n, d) => n + (d?.products.length ?? 0), 0);

  // Featured strip — lead with models we hold hi-res studio renders for.
  const allProducts: Product[] = details.flatMap((d) => d?.products ?? []);
  const withRender = allProducts.filter((p) => localRender(p.model_code));
  const rest = allProducts.filter((p) => !localRender(p.model_code));
  const featured = [...withRender, ...rest].slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: def.name },
        ],
      },
      {
        "@type": "ItemList",
        name: def.name,
        numberOfItems: categories.length,
        itemListElement: categories.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name_en,
          url: `${SITE_URL}/products/${c.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== BANNER HERO ===== */}
      <section className="sec-hero">
        <Image src={def.banner} alt={def.bannerAlt} fill priority quality={82} sizes="100vw" />
        <div className="veil" aria-hidden />
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>{def.short}
          </div>
          <div className="kicker">{def.kicker}</div>
          <h1>{def.name}</h1>
          <p>{def.blurb}</p>
          <div className="sec-meta">
            {categories.length} fixture families · {modelCount || "—"} models · CE · RoHS{section === "outdoor" ? " · IP-rated" : ""}
          </div>
          {categories.length > 0 && (
            <div className="sec-chips">
              {categories.map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}`}>{c.name_en}</Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== FAMILIES ===== */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">{def.short} families</div>
              <h2>Choose a fixture family</h2>
            </div>
            <span className="meta">{categories.length} categories</span>
          </div>
          {categories.length ? (
            <div className="grid grid-3">
              {categories.map((c, i) => (
                <CategoryCard key={c.slug} category={c} count={counts[i]} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)", padding: "30px 0" }}>Families coming online shortly — browse the full catalogue meanwhile.</p>
          )}
        </div>
      </section>

      {/* ===== FEATURED MODELS ===== */}
      {featured.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Selected {def.short.toLowerCase()} models</div>
                <h2>From the catalogue</h2>
              </div>
              <Link href="/products" className="link">All products</Link>
            </div>
            <div className="grid grid-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CROSS-LINK ===== */}
      <section className="sec-cross">
        <div className="inner">
          <div>
            <div className="eyebrow">Also explore</div>
            <h3>{other.name}</h3>
            <p>{other.tagline}</p>
          </div>
          <Link href={`/products/${other.slug}`} className="btn btn-primary">
            Explore {other.short.toLowerCase()} <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
