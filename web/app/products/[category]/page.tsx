import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCategories, SITE_URL } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: c.name_en },
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
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <div className="crumbs">
          <a href="/">Home</a><span>/</span>
          <a href="/products">Products</a><span>/</span>{c.name_en}
        </div>
        <div className="section-head">
          <h2 className="serif">{c.name_en}</h2>
          <span className="meta">{products.length} {products.length === 1 ? "model" : "models"} · hover for specs</span>
        </div>
        {c.description_en && (
          <p style={{ color: "var(--muted)", maxWidth: 680, marginBottom: 24 }}>{c.description_en}</p>
        )}
        {products.length ? (
          <div className="grid grid-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--muted)", padding: "30px 0" }}>No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}
