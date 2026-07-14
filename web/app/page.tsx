import Link from "next/link";
import { getCategories, getCategory, getBrands } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import HeroVideo from "@/components/HeroVideo";
import Testimonials from "@/components/Testimonials";
import Brands from "@/components/Brands";
import Kinetic from "@/components/Kinetic";
import Highlights from "@/components/Highlights";
import Portfolio from "@/components/Portfolio";
import FactoryBand from "@/components/FactoryBand";
import { RENDERS, localRender } from "@/lib/renders";
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

  const withRender = RENDERS
    .map((r) => allProducts.find((p) => p.model_code?.toUpperCase() === r.code))
    .filter((p): p is Product => Boolean(p));
  const others = allProducts.filter((p) => !localRender(p.model_code));
  const featured = [...withRender, ...others].slice(0, 6);

  return (
    <>
      <section className="hero-bleed">
        <HeroVideo />
        <div className="hero-veil" aria-hidden />
        <div className="hero-content wrap">
          <div className="hero-brand reveal">MS Lighting</div>
          <h1 className="reveal">Light, engineered <em>to disappear.</em></h1>
          <p className="reveal">
            Architectural LED fixtures — manufactured in our China factory,
            specified and supplied across Kuwait, the UAE, China and Egypt.
          </p>
          <div className="hero-paths reveal">
            <Link href="/commercial" className="hero-path">
              Professional projects
            </Link>
            <Link href="/products/indoor" className="hero-path">
              Indoor lighting
            </Link>
            <Link href="/products/outdoor" className="hero-path">
              Outdoor lighting
            </Link>
          </div>
        </div>
      </section>

      <Highlights />
      <Portfolio categories={categories} counts={counts} />
      <FactoryBand />

      <Kinetic text="Jiangmen · Kuwait · UAE · Egypt" speed={0.5} />

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

      <section className="statement">
        <div className="wrap">
          <div className="eyebrow reveal">The standard</div>
          <p className="st-line reveal">
            Good lighting is invisible. <span>You don&apos;t notice the fixture —</span> <em>you notice the space.</em> Every MS Lighting product is built to that standard.
          </p>
          <div className="st-stats">
            <div className="stat reveal">
              <div className="num" data-count={modelCount || 48} data-suffix="+">0</div>
              <div className="lbl">LED models</div>
            </div>
            <div className="stat reveal">
              <div className="num" data-count={categories.length || 15}>0</div>
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

      <Brands brands={brands} />
      <Testimonials />
      <Kinetic text="Kuwait · UAE · China · Egypt" dark speed={0.65} />

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
