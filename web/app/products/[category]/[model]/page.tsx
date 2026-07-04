import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, imageUrl, SITE_URL } from "@/lib/api";
import { localRender } from "@/lib/renders";

export const revalidate = 120;

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; model: string }> }
): Promise<Metadata> {
  const { model } = await params;
  try {
    const p = await getProduct(model);
    const hero = imageUrl(p.image_url) || undefined;
    return {
      title: p.seo_title ? { absolute: p.seo_title } : `${p.model_code} ${p.category?.name_en ?? ""}`.trim(),
      description:
        p.seo_description ||
        `${p.model_code} — ${p.category?.name_en}. Specifications and technical data from MS Lighting.`,
      keywords: p.seo_keywords || undefined,
      alternates: { canonical: `/products/${p.category?.slug}/${p.slug}` },
      openGraph: { images: hero ? [hero] : [], title: p.name_en, type: "website" },
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage(
  { params }: { params: Promise<{ category: string; model: string }> }
) {
  const { model } = await params;
  let p;
  try {
    p = await getProduct(model);
  } catch {
    notFound();
  }

  // Hi-res local studio render wins over the catalogue-scan image.
  const render = localRender(p.model_code);
  const hero = render?.src || imageUrl(p.image_url) || imageUrl(p.images?.find((i) => i.image_type === "hero")?.image_url);
  const spec = imageUrl(p.spec_image_url) || imageUrl(p.images?.find((i) => i.image_type === "spec")?.image_url);
  const catSlug = p.category?.slug ?? "all";

  const keywords = (p.seo_keywords || "").split(",").map((k) => k.trim()).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "Product",
        name: p.name_en,
        sku: p.model_code,
        mpn: p.model_code,
        category: p.category?.name_en,
        image: hero ? [hero] : undefined,
        description: p.seo_description || `${p.model_code} ${p.category?.name_en ?? ""}`,
        brand: { "@type": "Brand", name: "MS Lighting" },
        url: `${SITE_URL}/products/${catSlug}/${p.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: p.category?.name_en, item: `${SITE_URL}/products/${catSlug}` },
          { "@type": "ListItem", position: 4, name: p.model_code },
        ],
      },
    ],
  };

  return (
    <section className="section">
      <div className="wrap">
        <div className="crumbs">
          <a href="/">Home</a><span>/</span>
          <a href="/products">Products</a><span>/</span>
          <a href={`/products/${catSlug}`}>{p.category?.name_en}</a><span>/</span>
          {p.model_code}
        </div>

        <div className="detail">
          <div className="gallery">
            <div className="main">
              {hero ? <Image src={hero} alt={p.name_en} width={render?.w ?? 700} height={render?.h ?? 930} priority quality={95} sizes="(max-width:900px) 92vw, 48vw" /> : null}
            </div>
          </div>

          <div>
            <div className="sub">{p.category?.name_en}</div>
            <h1 className="serif">{p.model_code || p.name_en}</h1>
            <p className="lead">
              {p.description_en ||
                `${p.name_en} — see the full specification sheet below for technical data, photometrics and certifications.`}
            </p>
            <div className="actions">
              <Link href={`/products/${catSlug}`} className="btn btn-ghost">← Back to {p.category?.name_en}</Link>
              <Link href="/contact" className="btn btn-primary">Enquire</Link>
            </div>

            <div className="prose">
              <p>
                <strong>{p.model_code}</strong> is part of the MS Lighting{" "}
                <Link href={`/products/${catSlug}`}>{p.category?.name_en}</Link> range — a
                professional LED fixture engineered for efficient, reliable performance.
                Full technical data, photometric curves, dimensions and certifications are
                shown in the specification sheet below. For pricing or project quantities,{" "}
                <Link href="/contact">contact our team</Link>.
              </p>
              {keywords.length > 0 && (
                <div className="kw-row" aria-label="Related searches">
                  {keywords.map((k) => (
                    <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="kw">{k}</Link>
                  ))}
                </div>
              )}
            </div>

            {spec ? (
              <div className="spec-sheet">
                <h3>Specifications &amp; Technical Data</h3>
                <Image src={spec} alt={`${p.name_en} specification sheet`} width={900} height={1240} quality={95} sizes="(max-width:900px) 100vw, 44vw" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
