import Link from "next/link";
import Image from "next/image";
import { getCategories, getCategory, getBrands } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import HeroVideo from "@/components/HeroVideo";
import Testimonials from "@/components/Testimonials";
import Expertise from "@/components/Expertise";
import Brands from "@/components/Brands";
import { RENDERS, localRender } from "@/lib/renders";
import { SECTIONS, splitBySection, type SectionSlug } from "@/lib/sections";
import type { Product } from "@/lib/types";

export const revalidate = 120;

const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);
  const brands = await getBrands().catch(() => []);

  const details = await Promise.all(
    categories.map((c) => getCategory(c.slug).catch(() => null))
  );
  const allProducts: Product[] = details.flatMap((d) => d?.products ?? []);
  const counts = new Map(
    categories.map((c, i) => [c.slug, details[i]?.products.length])
  );
  const modelCount = details.reduce((n, d) => n + (d?.products.length ?? 0), 0);

  // Lead the featured strip with models we hold hi-res studio renders for.
  const withRender = RENDERS
    .map((r) => allProducts.find((p) => p.model_code?.toUpperCase() === r.code))
    .filter((p): p is Product => Boolean(p));
  const others = allProducts.filter((p) => !localRender(p.model_code));
  const featured = [...withRender, ...others].slice(0, 6);

  // Indoor / Outdoor application split (WAC-style)
  const bySection = splitBySection(categories);
  const sectionModels = (s: SectionSlug) =>
    bySection[s].reduce((n, c) => n + (counts.get(c.slug) ?? 0), 0);

  return (
    <>
      {/* ===== 01 · VIDEO BANNER (framed, contained) ===== */}
      <section className="hero-band">
        <div className="hero-frame">
          <HeroVideo />
        </div>
      </section>

      {/* ===== 02 · INTRO — the page's h1 and primary CTAs ===== */}
      <section className="intro">
        <div className="wrap">
          <div className="kicker reveal">MS Lighting · Architectural LED</div>
          <div className="intro-grid">
            <h1 className="reveal">Light, engineered <em>to disappear.</em></h1>
            <div className="intro-side">
              <p className="reveal">
                Recessed, linear, magnetic and outdoor fixtures for the
                region&apos;s most demanding projects — built to vanish into
                the architecture and perform for years.
              </p>
              <div className="cta-row reveal">
                <Link href="/products" className="btn btn-primary">Explore the collection <Arrow /></Link>
                <Link href="/commercial" className="btn btn-outline">Commercial projects</Link>
              </div>
            </div>
          </div>
          <div className="intro-meta reveal">
            <span><b>Certified</b> CE · RoHS · CB · SASO</span>
            <span><b>{modelCount || 99}</b> models · <b>{categories.length || 15}</b> families</span>
            <span>Kuwait · UAE · China · Egypt</span>
          </div>
        </div>
      </section>

      {/* ===== 03 · OUR EXPERTISE (four verticals) ===== */}
      <Expertise />

      {/* ===== 04 · INDOOR / OUTDOOR APPLICATIONS ===== */}
      <section className="section apps">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Applications</div>
              <h2>Indoor &amp; Outdoor</h2>
            </div>
            <Link href="/products" className="link">All products</Link>
          </div>
          <div className="apps-grid">
            {(["indoor", "outdoor"] as const).map((s) => {
              const def = SECTIONS[s];
              const cats = bySection[s];
              const models = sectionModels(s);
              return (
                <Link href={`/products/${s}`} className="app-tile reveal" key={s}>
                  <Image src={def.banner} alt={def.bannerAlt} fill quality={80} sizes="(max-width:880px) 100vw, 50vw" />
                  <div className="scrim" aria-hidden />
                  <div className="app-body">
                    <div className="app-kicker">
                      {cats.length} families{models ? ` · ${models} models` : ""}
                    </div>
                    <h3>{def.short}</h3>
                    <p>{def.tagline}</p>
                    <div className="app-cats">
                      {cats.slice(0, 5).map((c) => (
                        <span key={c.slug}>{c.name_en}</span>
                      ))}
                      {cats.length > 5 && <span>+{cats.length - 5} more</span>}
                    </div>
                    <span className="app-cta">Explore {def.short.toLowerCase()} <Arrow /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 05 · SIGNATURE FIXTURES ===== */}
      {featured.length > 0 && (
        <section className="section dark">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Featured</div>
                <h2>Signature fixtures</h2>
              </div>
              <Link href="/products" className="link">All products</Link>
            </div>
            <div className="grid grid-3">
              {featured.map((p) => (
                <div className="reveal" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 06 · STATEMENT + THE NUMBERS BEHIND IT ===== */}
      <section className="statement">
        <div className="wrap">
          <div className="eyebrow reveal">The standard</div>
          <p className="st-line reveal">
            Good lighting is invisible. <span>You don&apos;t notice the fixture —</span> <em>you notice the space.</em> Every MS Lighting product is built to that standard.
          </p>
          <div className="st-stats">
            <div className="stat reveal">
              <div className="num" data-count={modelCount || 120} data-suffix="+">0</div>
              <div className="lbl">LED models</div>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={categories.length || 6}>0</div>
              <div className="lbl">Fixture families</div>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={15} data-suffix="+">0</div>
              <div className="lbl">Years of lighting</div>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={4}>0</div>
              <div className="lbl">Regional markets</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 07 · OUR BRANDS (from CMS) ===== */}
      <Brands brands={brands} />

      {/* ===== 08 · TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== 09 · CTA ===== */}
      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow reveal">Let&apos;s build it</div>
          <h2 className="reveal">Light your next <em>project.</em></h2>
          <p className="ar-line reveal" lang="ar" dir="rtl">أضِئ مشروعك القادم</p>
          <p className="reveal">Tell us about the space — we&apos;ll spec the right fixtures, quantities and certifications, through the Al-Burhan regional network.</p>
          <div className="cta-row reveal" style={{ justifyContent: "center", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Request a quote <Arrow /></Link>
            <Link href="/products" className="btn btn-outline">Browse the catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
