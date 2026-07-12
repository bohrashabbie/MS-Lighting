import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getCategory } from "@/lib/api";
import { SECTIONS, splitBySection } from "@/lib/sections";
import { CATALOGUE_GUIDE } from "@/lib/guide";
import CategoryCard from "@/components/CategoryCard";
import Guide from "@/components/Guide";
import Consult from "@/components/Consult";

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
  const modelCount = [...counts.values()].reduce<number>((n, v) => n + (v ?? 0), 0);
  const bySection = splitBySection(categories);

  return (
    <>
      {/* ===== CATALOGUE HERO ===== */}
      <section className="fam-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span>Products</div>
          <div className="fam-head">
            <div>
              <div className="eyebrow reveal">The catalogue</div>
              <h1 className="reveal">All products</h1>
              <p className="fam-lede reveal">
                Every fixture family in the collection — indoor architectural
                systems and sealed outdoor housings, each with its full
                specification sheet.
              </p>
            </div>
            <div className="fam-meta reveal">
              <span><b>{categories.length}</b> families</span>
              <span><b>{modelCount || "—"}</b> models</span>
              <span>CE · RoHS · CB · SASO</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAMILY GROUPS ===== */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
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
                    <div className="reveal" key={c.slug}>
                      <CategoryCard category={c} count={counts.get(c.slug)} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== EDUCATIONAL LAYER ===== */}
      <Guide eyebrow="Field guide" heading="Choosing well" items={CATALOGUE_GUIDE} />

      {/* ===== CONSULTATION CLOSE ===== */}
      <Consult />
    </>
  );
}
