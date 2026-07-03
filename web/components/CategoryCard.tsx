import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/lib/types";
import { imageUrl } from "@/lib/api";

export default function CategoryCard({
  category,
  count,
}: {
  category: ProductCategory;
  count?: number;
}) {
  const img = imageUrl(category.image_url);
  return (
    <Link href={`/products/${category.slug}`} className="cat-card">
      <div className="thumb">
        {img ? (
          <Image src={img} alt={category.name_en} width={440} height={440} quality={90} sizes="(max-width:560px) 100vw, 25vw" />
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
