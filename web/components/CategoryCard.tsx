import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/lib/types";
import { imageUrl } from "@/lib/api";
import { categoryRender } from "@/lib/renders";

export default function CategoryCard({
  category,
  count,
}: {
  category: ProductCategory;
  count?: number;
}) {
  // Hi-res local studio render wins over the catalogue-scan image.
  const render = categoryRender(category.slug);
  const img = render?.src || imageUrl(category.image_url);
  return (
    <Link href={`/products/${category.slug}`} className="cat-card">
      <div className="thumb">
        {img ? (
          <Image src={img} alt={category.name_en} width={render?.w ?? 440} height={render?.h ?? 440} quality={92} sizes="(max-width:560px) 100vw, 25vw" />
        ) : (
          <span className="ph">{category.name_en.charAt(0)}</span>
        )}
      </div>
      <div className="body">
        <div>
          {typeof count === "number" ? (
            <span className="count">{count} {count === 1 ? "model" : "models"}</span>
          ) : null}
          <h3>{category.name_en}</h3>
        </div>
        <span className="arrow">→</span>
      </div>
    </Link>
  );
}
