export interface CategoryBrief {
  id: number;
  slug: string;
  name_en: string;
  name_ar?: string | null;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  image_type: "hero" | "spec" | "gallery" | string;
  sort_order: number;
}

export interface Product {
  id: number;
  slug: string | null;
  model_code: string | null;
  category_id: number | null;
  name_en: string;
  description_en?: string | null;
  image_url: string | null;
  spec_image_url: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  sort_order: number;
  is_active: boolean;
  category?: CategoryBrief | null;
  images: ProductImage[];
}

export interface ProductCategory {
  id: number;
  slug: string;
  name_en: string;
  name_ar?: string | null;
  description_en?: string | null;
  image_url?: string | null;
  icon_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  sort_order: number;
}

export interface CategoryDetail {
  category: ProductCategory;
  products: Product[];
}

export interface SearchResult {
  redirect: string | null;
  query?: string;
  categories?: { slug: string; name_en: string; image_url: string | null; url: string }[];
  products?: {
    slug: string;
    model_code: string | null;
    name_en: string;
    image_url: string | null;
    category: string | null;
    url: string;
  }[];
}
