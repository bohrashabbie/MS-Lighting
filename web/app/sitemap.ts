import type { MetadataRoute } from "next";
import { getCategories, getCategory, SITE_URL } from "@/lib/api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.4 },
  ];

  try {
    const cats = await getCategories();
    for (const c of cats) {
      base.push({ url: `${SITE_URL}/products/${c.slug}`, lastModified: now, priority: 0.8 });
      const detail = await getCategory(c.slug).catch(() => null);
      detail?.products.forEach((p) => {
        if (p.slug)
          base.push({ url: `${SITE_URL}/products/${c.slug}/${p.slug}`, lastModified: now, priority: 0.7 });
      });
    }
  } catch {}

  return base;
}
