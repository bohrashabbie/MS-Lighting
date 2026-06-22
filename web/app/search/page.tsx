import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { search, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage(
  { searchParams }: { searchParams: Promise<{ q?: string }> }
) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  if (!query) {
    return (
      <section className="section"><div className="wrap results">
        <h2 className="serif">Search</h2>
        <p className="ph">Type a model code (e.g. MS-240R) or a category (e.g. recessed down light).</p>
      </div></section>
    );
  }

  const r = await search(query).catch(() => null);
  if (r?.redirect) redirect(r.redirect);

  const products = r?.products ?? [];
  const categories = r?.categories ?? [];
  const empty = !products.length && !categories.length;

  return (
    <section className="section">
      <div className="wrap results">
        <div className="crumbs"><a href="/">Home</a><span>/</span>Search</div>
        <div className="section-head">
          <h2 className="serif">Results for “{query}”</h2>
          <span className="meta">{products.length + categories.length} found</span>
        </div>

        {empty && <p className="ph">No matches. Try a model code (MS-240R) or a category name.</p>}

        {categories.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            {categories.map((c) => (
              <Link key={c.slug} href={c.url} className="chip">{c.name_en}</Link>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-4">
            {products.map((p) => {
              const img = imageUrl(p.image_url);
              return (
                <Link key={p.slug} href={p.url} className="cat-card">
                  <div className="thumb">
                    {img ? <Image src={img} alt={p.name_en} width={440} height={330} sizes="25vw" /> : <span className="ph">{(p.model_code || p.name_en).charAt(0)}</span>}
                  </div>
                  <div className="body">
                    <div>
                      <h3>{p.model_code || p.name_en}</h3>
                      <span className="count">{p.category}</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
