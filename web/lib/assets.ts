// ============================================================================
// Static-asset resolver — heavy media (video, banners, market photos, product
// renders) lives in S3 behind CloudFront, not in the repo.
//
//   NEXT_PUBLIC_ASSET_BASE_URL = https://<cloudfront-domain>/site
//
// `asset("/video/clip1.mp4")` → `${ASSET_BASE}/video/clip1.mp4`.
// If the env var is unset (e.g. a fresh checkout before infra exists) paths
// pass through unchanged and Next serves whatever is still in /public — so
// local dev never hard-breaks on missing config.
// ============================================================================

export const ASSET_BASE =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "") || "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
