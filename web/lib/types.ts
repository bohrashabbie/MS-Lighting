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

export interface PageContent {
  id: number;
  page_key: string;
  section_key: string;
  title_en?: string | null;
  title_ar?: string | null;
  content_en?: string | null;
  content_ar?: string | null;
  image_url?: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Country {
  id: number;
  slug: string;
  name_en: string;
  name_ar?: string | null;
  firm_name_en?: string | null;
  firm_name_ar?: string | null;
  description_en?: string | null;
  flag_url?: string | null;
  country_image_url?: string | null;
  logo_url?: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ContactInfo {
  id: number;
  country_id: number | null;
  company_name_en?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  email?: string | null;
  website?: string | null;
  is_head_office?: boolean;
  is_active?: boolean;
}

export interface ProjectItemImage {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface ProjectItem {
  id: number;
  category_id: number;
  country_id?: number | null;
  name_en: string;
  name_ar?: string | null;
  description_en?: string | null;
  sort_order: number;
  is_active: boolean;
  images: ProjectItemImage[];
}

export interface ProjectCategory {
  id: number;
  name_en: string;
  name_ar?: string | null;
  cover_image_url?: string | null;
  sort_order: number;
  is_active: boolean;
  projects: ProjectItem[];
}

export interface SiteSetting {
  id: number;
  key: string;
  value_en?: string | null;
  value_ar?: string | null;
  setting_type?: string;
  description?: string | null;
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
