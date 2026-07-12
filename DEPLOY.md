# Deploy — MS Lighting web

Production stack: **Next.js (standalone) → Nginx → Let's Encrypt**, via
`docker-compose.prod.yml`. The CMS API + Postgres + S3 run separately.

## 1 · First-time server setup

```bash
# on the server (Ubuntu with Docker + compose plugin)
git clone https://github.com/bohrashabbie/MS-Lighting.git
cd MS-Lighting

cp .env.example .env
nano .env          # set DOMAIN + real NEXT_PUBLIC_SITE_URL (and ASSET_BASE_URL when CDN exists)

docker compose -f docker-compose.prod.yml up -d --build
```

Site is now on **http://DOMAIN** (port 80). Issue certificates once:

```bash
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d "$DOMAIN" -d "www.$DOMAIN" \
  --email you@example.com --agree-tos --no-eff-email
```

Then enable HTTPS: uncomment the `443` server block (and the HTTP→HTTPS
redirect) in `deploy/nginx/templates/app.conf.template` and reload:

```bash
docker compose -f docker-compose.prod.yml restart nginx
```

Renewal (cron it monthly):

```bash
docker compose -f docker-compose.prod.yml run --rm certbot renew
docker compose -f docker-compose.prod.yml restart nginx
```

## 2 · Redeploy on every update

```bash
cd MS-Lighting
git pull
docker compose -f docker-compose.prod.yml up -d --build web
```

`NEXT_PUBLIC_*` values are baked at build time — changing `.env` requires a
rebuild (`--build`), not just a restart.

## 3 · Media → S3 + CloudFront (when AWS access is granted)

```bash
# needs credentials with s3:PutObject on alburhan-asset
./deploy/upload-assets.sh                 # uploads with 1-year immutable cache

# create a CloudFront distribution (origin: alburhan-asset S3, compression on,
# CachingOptimized policy), then in .env:
#   NEXT_PUBLIC_ASSET_BASE_URL=https://<distribution>.cloudfront.net/site
#   NEXT_PUBLIC_S3_BASE_URL=https://<distribution>.cloudfront.net   # CMS images via CDN too

docker compose -f docker-compose.prod.yml up -d --build web
```

After that, `web/public/{video,markets,banners,renders}` can be deleted from
the repo — the site reads everything from the CDN.

## Health checks

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f --tail=50 web
curl -sI http://localhost | head -3     # from the server
```
