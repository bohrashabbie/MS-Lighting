import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getCategory } from "@/lib/api";
import { SECTIONS, splitBySection } from "@/lib/sections";
import CategoryCard from "@/components/CategoryCard";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all MS Lighting LED fixture categories — indoor recessed, linear, magnet and track systems, plus outdoor wall, lawn, street and flood lighting.",
};

export default async function ProductsPage() {
  const categories = await getCategories().catch(() => []);
  const counts = new Map(
    await Promise.all(
      categories.map((c) =>
        getCategory(c.slug)
          .then((d) => [c.slug, d.products.length] as const)
          .catch(() => [c.slug, undefined] as const)
      )
    )
  );
  const bySection = splitBySection(categories);

  return (
    <section className="section">
      <div className="wrap">
        <div className="crumbs"><a href="/">Home</a><span>/</span>Products</div>
        <div className="section-head">
          <h2 className="serif">All Products</h2>
          <span className="meta">{categories.length} categories</span>
        </div>

        {(["indoor", "outdoor"] as const).map((s) => {
          const def = SECTIONS[s];
          const cats = bySection[s];
          if (!cats.length) return null;
          return (
            <div className="prod-group" id={s} key={s}>
              <div className="section-head">
                <div>
                  <div className="eyebrow">{def.kicker}</div>
                  <h2>{def.name}</h2>
                </div>
                <Link href={`/products/${s}`} className="link">{def.short} overview</Link>
              </div>
              <div className="grid grid-4">
                {cats.map((c) => (
                  <CategoryCard key={c.slug} category={c} count={counts.get(c.slug)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
