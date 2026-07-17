import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getCategories, SITE_URL, imageUrl } from "@/lib/api";
import { sectionOf, SECTIONS } from "@/lib/sections";
import { guideFor } from "@/lib/guide";
import ProductCard from "@/components/ProductCard";
import Guide from "@/components/Guide";
import Consult from "@/components/Consult";

export const revalidate = 120;

export async function generateStaticParams() {
  const cats = await getCategories().catch(() => []);
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  try {
    const { category: c } = await getCategory(category);
    return {
      title: c.seo_title || c.name_en,
      description: c.seo_description || `Browse ${c.name_en} LED fixtures from MS Lighting.`,
      keywords: c.seo_keywords || undefined,
      alternates: { canonical: `/products/${c.slug}` },
    };
  } catch {
    return { title: "Category" };
  }
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  let data;
  try {
    data = await getCategory(category);
  } catch {
    notFound();
  }
  const { category: c, products } = data!;

  const section = sectionOf(c.slug);
  const def = SECTIONS[section];
  const plateSrc = imageUrl(c.image_url);

  // Sibling families in the same application section — the WAC-style
  // subcategory strip, minus the current family.
  const all = await getCategories().catch(() => []);
  const siblings = all.filter((x) => sectionOf(x.slug) === section && x.slug !== c.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: def.name, item: `${SITE_URL}/products/${section}` },
          { "@type": "ListItem", position: 4, name: c.name_en },
        ],
      },
      {
        "@type": "ItemList",
        name: c.name_en,
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.model_code || p.name_en,
          url: `${SITE_URL}/products/${c.slug}/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== FAMILY HERO — copy + studio plate ===== */}
      <section className="fam-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>
            <Link href={`/products/${section}`}>{def.short}</Link><span>/</span>
            {c.name_en}
          </div>
          <div className={`fam-head${plateSrc ? " has-plate" : ""}`}>
            <div className="fam-copy">
              <div className="eyebrow reveal">{def.kicker}</div>
              <h1 className="reveal">{c.name_en}</h1>
              {c.description_en && <p className="fam-lede reveal">{c.description_en}</p>}
              <div className="fam-meta reveal">
                <span><b>{products.length}</b> {products.length === 1 ? "model" : "models"}</span>
                <span>CE · RoHS{section === "outdoor" ? " · IP-rated" : ""}</span>
                <span>Tap a card for full specs</span>
              </div>
            </div>
            {plateSrc && (
              <div className="fam-plate reveal" aria-hidden>
                <Image
                  src={plateSrc}
                  alt=""
                  width={1400}
                  height={933}
                  quality={90}
                  priority
                  sizes="(max-width:880px) 92vw, 42vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== MODEL GRID ===== */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          {products.length ? (
            <div className="grid grid-3">
              {products.map((p) => (
                <div className="reveal" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)", padding: "30px 0" }}>No products in this category yet.</p>
          )}

          {/* sibling families — WAC's subcategory strip */}
          {siblings.length > 0 && (
            <div className="fam-related reveal">
              <span className="fr-label">More {def.short.toLowerCase()} families</span>
              <div className="kw-row">
                {siblings.map((s) => (
                  <Link href={`/products/${s.slug}`} className="kw" key={s.slug}>{s.name_en}</Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== EDUCATIONAL LAYER ===== */}
      <Guide
        eyebrow="Field guide"
        heading={`${c.name_en}, explained`}
        items={guideFor(c.name_en, c.slug)}
      />

      {/* ===== CONSULTATION CLOSE ===== */}
      <Consult context={`ceiling plan, mood reference or just a photo`} />
    </>
  );
}
