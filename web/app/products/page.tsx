import type { Metadata } from "next";
import { getCategories, getCategory } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all MS Lighting LED fixture categories — down lights, linear, magnet, track, flood, street lighting and more.",
};

export default async function ProductsPage() {
  const categories = await getCategories().catch(() => []);
  const counts = await Promise.all(
    categories.map((c) =>
      getCategory(c.slug).then((d) => d.products.length).catch(() => undefined)
    )
  );

  return (
    <section className="section">
      <div className="wrap">
        <div className="crumbs"><a href="/">Home</a><span>/</span>Products</div>
        <div className="section-head">
          <h2 className="serif">All Products</h2>
          <span className="meta">{categories.length} categories</span>
        </div>
        <div className="grid grid-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} count={counts[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
