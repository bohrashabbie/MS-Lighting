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
