// ============================================================================
// API client for the MS-Lighting site -> AL-Burhan CMS (FastAPI).
// Base URL is env-driven so the same build works against local + prod:
//   NEXT_PUBLIC_CMS_URL = http://127.0.0.1:8001  (local)
//                       = http://13.60.4.75:8002 (prod)
// ============================================================================
import type {
  Product,
  ProductCategory,
  CategoryDetail,
  SearchResult,
  PageContent,
  SiteSetting,
  Country,
  ContactInfo,
  ProjectCategory as ProjectCategoryType,
  TeamMember,
  Service,
  Sector,
} from "./types";

export const CMS_BASE =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/$/, "") || "http://127.0.0.1:8001";
export const CMS_API = `${CMS_BASE}/api`;
export const S3_BASE =
  process.env.NEXT_PUBLIC_S3_BASE_URL?.replace(/\/$/, "") ||
  "https://alburhan-asset.s3.eu-north-1.amazonaws.com";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3001";

const REVALIDATE = 120; // ISR window (seconds)

async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${CMS_API}${path}`, {
    next: { revalidate: REVALIDATE },
    ...init,
  });
  if (!res.ok) throw new Error(`CMS ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

/** Resolve a stored image path to a fully-qualified URL. */
export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${CMS_BASE}${path}`;
  return `${S3_BASE}/${path.replace(/^\//, "")}`;
}

export function getCategories(): Promise<ProductCategory[]> {
  return getJSON<ProductCategory[]>("/public/product-categories");
}

export interface Brand {
  id: number;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order?: number;
  is_active?: boolean;
}

/**
 * Partner brands. The `/public/brands` route is currently 500-ing server-side,
 * so we read `/brands` (open, same data). We drop the seeded "Brand 01…15"
 * placeholders and anything inactive, keeping only real, named partners.
 */
export async function getBrands(): Promise<Brand[]> {
  const all = await getJSON<Brand[]>("/brands");
  return all
    .filter((b) => b.is_active !== false)
    .filter((b) => b.name && !/^brand\s*\d+/i.test(b.name.trim()))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

/** CMS-managed page content blocks (title/body per section) for a page_key. */
export function getPageContents(pageKey?: string): Promise<PageContent[]> {
  const q = pageKey ? `?page_key=${encodeURIComponent(pageKey)}` : "";
  return getJSON<PageContent[]>(`/public/page-contents${q}`);
}

/** Global site settings as key/value pairs (company name, logo, etc.). */
export function getSiteSettings(): Promise<SiteSetting[]> {
  return getJSON<SiteSetting[]>("/public/settings");
}

/** The regional companies (one per country) with firm name + imagery. */
export function getCountries(): Promise<Country[]> {
  return getJSON<Country[]>("/public/countries");
}

/** Office / contact details, one or more rows per country. */
export function getContactInfo(): Promise<ContactInfo[]> {
  return getJSON<ContactInfo[]>("/public/contact-info");
}

/** Project references grouped by category (Gyms, Restaurants, …). */
export function getProjectCategories(): Promise<ProjectCategoryType[]> {
  return getJSON<ProjectCategoryType[]>("/public/project-categories");
}

/** Leadership / team members with portrait, designation and quote. */
export function getTeam(): Promise<TeamMember[]> {
  return getJSON<TeamMember[]>("/public/team");
}

/** "What we offer" — service groups, each with a list of bullet items. */
export function getServices(): Promise<Service[]> {
  return getJSON<Service[]>("/public/services");
}

/** "Sectors we serve" — the project sectors the company operates in. */
export function getSectors(): Promise<Sector[]> {
  return getJSON<Sector[]>("/public/sectors");
}

export function getCategory(slug: string): Promise<CategoryDetail> {
  return getJSON<CategoryDetail>(`/public/product-categories/${slug}`);
}

export function getProduct(slug: string): Promise<Product> {
  return getJSON<Product>(`/public/products/${slug}`);
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/** Submit the contact form to the CMS. */
export async function submitContact(
  data: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${CMS_API}/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, error: `Server error (${res.status})` };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

/** Search — exact match returns { redirect }, else ranked lists. Uncached. */
export async function search(q: string): Promise<SearchResult> {
  const res = await fetch(`${CMS_API}/public/search?q=${encodeURIComponent(q)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`search -> ${res.status}`);
  return res.json();
}
