#!/usr/bin/env bash
# ============================================================================
# Upload the site's static media to S3 (served via CloudFront).
#
#   ./deploy/upload-assets.sh [bucket] [prefix]
#
# Defaults: bucket=alburhan-asset  prefix=site
# Requires AWS credentials with s3:PutObject on the bucket.
#
# Everything is uploaded with a 1-year immutable Cache-Control: these files
# never change in place — a new banner or render gets a new filename, so
# neither CloudFront nor browsers ever need to revalidate.
# ============================================================================
set -euo pipefail

BUCKET="${1:-alburhan-asset}"
PREFIX="${2:-site}"
SRC="$(cd "$(dirname "$0")/../web/public" && pwd)"
CACHE="public, max-age=31536000, immutable"

for dir in video markets banners renders; do
  if [ -d "$SRC/$dir" ]; then
    echo "── $dir → s3://$BUCKET/$PREFIX/$dir"
    aws s3 sync "$SRC/$dir" "s3://$BUCKET/$PREFIX/$dir" \
      --cache-control "$CACHE" \
      --size-only
  fi
done

echo "Done. Set NEXT_PUBLIC_ASSET_BASE_URL=https://<cloudfront-domain>/$PREFIX"
