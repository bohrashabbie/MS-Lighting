import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getCategory } from "@/lib/api";
import { CATALOGUE_GUIDE } from "@/lib/guide";
import Guide from "@/components/Guide";
import Consult from "@/components/Consult";
import ProductFinder from "@/components/ProductFinder";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "All Products — Indoor & Outdoor Lights",
  description:
    "Browse all MS Lighting indoor lights and outdoor lights — recessed, linear, magnet and track systems, plus wall, lawn, street and flood LED lighting.",
  keywords: [
    "indoor lights",
    "outdoor lights",
    "LED lights",
    "LED catalogue",
    "MS Lighting products",
  ],
  alternates: { canonical: "/products" },
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

  return (
    <>
      <section className="fam-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span>Products</div>
          <div className="fam-head">
            <div>
              <div className="eyebrow reveal">The catalogue</div>
              <h1 className="reveal">Indoor &amp; outdoor lights</h1>
              <p className="fam-lede reveal">
                Every fixture family in the collection — indoor lights for
                interiors and outdoor lights in sealed housings, each with its
                full specification sheet. Manufactured in-house in Jiangmen, China.
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

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <ProductFinder categories={categories} counts={counts} />
        </div>
      </section>

      <Guide eyebrow="Field guide" heading="Choosing well" items={CATALOGUE_GUIDE} />
      <Consult />
    </>
  );
}
