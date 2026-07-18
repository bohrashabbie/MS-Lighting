import type { MetadataRoute } from "next";
import { getCategories, getCategory, SITE_URL } from "@/lib/api";
import { APPLICATIONS } from "@/lib/applications";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products/indoor`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/products/outdoor`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/applications`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...APPLICATIONS.map((a) => ({
      url: `${SITE_URL}/applications/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/manufacturing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/downloads`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/commercial`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  try {
    const cats = await getCategories();
    for (const c of cats) {
      base.push({
        url: `${SITE_URL}/products/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
      const detail = await getCategory(c.slug).catch(() => null);
      detail?.products.forEach((p) => {
        if (p.slug)
          base.push({
            url: `${SITE_URL}/products/${c.slug}/${p.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
          });
      });
    }
  } catch {}

  return base;
}
