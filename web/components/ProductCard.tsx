"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { imageUrl } from "@/lib/api";
import { localRender } from "@/lib/renders";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  // Hi-res local studio render wins over the catalogue-scan image.
  const render = localRender(product.model_code);
  const hero =
    render?.src ||
    imageUrl(product.image_url) ||
    imageUrl(product.images?.find((i) => i.image_type === "hero")?.image_url);
  const spec =
    imageUrl(product.spec_image_url) ||
    imageUrl(product.images?.find((i) => i.image_type === "spec")?.image_url);
  const href = product.category
    ? `/products/${product.category.slug}/${product.slug}`
    : `/products`;

  return (
    <article
      className={`card${open ? " open" : ""}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="heroimg">
        {product.category ? <span className="badge">{product.category.name_en}</span> : null}
        {hero ? (
          <Image
            src={hero}
            alt={product.name_en}
            width={render?.w ?? 520}
            height={render?.h ?? 520}
            quality={92}
            sizes="(max-width:560px) 100vw, (max-width:980px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="meta">
        <div className="model">{product.model_code || product.name_en}</div>
        <div className="type">{product.category?.name_en}</div>
        {spec ? (
          <span className="tip"><span className="dot" /> Hover for full specs</span>
        ) : null}
      </div>
      {spec ? (
        <div className="spec">
          <div className="spec-label">Specifications &amp; Technical Data</div>
          <Image src={spec} alt={`${product.name_en} specifications`} width={760} height={1040} quality={95} sizes="(max-width:980px) 100vw, 33vw" />
          <div className="cta" onClick={(e) => e.stopPropagation()}>
            <Link href={href} className="btn btn-primary full">View full product</Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
