import Link from "next/link";
import Image from "next/image";
import { getCategories, getCategory, imageUrl } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export const revalidate = 120;

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);

  // Gather products across categories for the hero "wall of light" + featured row.
  const details = await Promise.all(
    categories.slice(0, 8).map((c) => getCategory(c.slug).catch(() => null))
  );
  const allProducts: Product[] = details.flatMap((d) => d?.products ?? []);
  const cover = allProducts.filter((p) => p.image_url).slice(0, 12);
  const featured = allProducts.slice(0, 6);
  const counts = new Map(
    categories.map((c, i) => [c.slug, details[i]?.products.length])
  );

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="inner">
          <div className="kicker">MS Lighting · Catalogue 2025</div>
          <h1 className="serif">Engineered <em>light</em>,<br />for spaces that matter.</h1>
          <p>
            Recessed, surface, linear, magnetic and outdoor LED fixtures —
            certified, efficient and built to perform.
          </p>
          <div className="cta-row">
            <Link href="/products" className="btn btn-gold">Explore the range</Link>
            <Link href="/contact" className="btn btn-outline">Request a quote</Link>
          </div>

          {cover.length > 0 && (
            <div className="cover-wall reveal">
              {cover.map((p) => {
                const img = imageUrl(p.image_url);
                return (
                  <Link
                    key={p.id}
                    href={p.category ? `/products/${p.category.slug}/${p.slug}` : "/products"}
                    className="cw"
                    title={p.model_code ?? p.name_en}
                  >
                    {img ? <Image src={img} alt={p.name_en} width={180} height={180} sizes="160px" /> : null}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Browse</div>
              <h2 className="serif">Every light, by category</h2>
            </div>
            <Link href="/products" className="link">View all →</Link>
          </div>
          <div className="grid grid-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} count={counts.get(c.slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      {featured.length > 0 && (
        <section className="section dark">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Featured</div>
                <h2 className="serif">Hover to reveal full specs</h2>
              </div>
              <Link href="/products" className="link">All products →</Link>
            </div>
            <div className="grid grid-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
