import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { APPLICATIONS, applicationBySlug } from "@/lib/applications";
import { getCategories, getCategory } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";
import Consult from "@/components/Consult";

export const revalidate = 120;

export function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const app = applicationBySlug(slug);
  if (!app) return { title: "Application" };
  return {
    title: app.name,
    description: app.blurb,
  };
}

export default async function ApplicationPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const app = applicationBySlug(slug);
  if (!app) notFound();

  const categories = await getCategories().catch(() => []);
  const known = new Set(categories.map((c) => c.slug));
  const familySlugs = app.families.filter((f) => known.has(f));
  const familyCats = categories.filter((c) => familySlugs.includes(c.slug));

  const counts = new Map(
    await Promise.all(
      familyCats.map((c) =>
        getCategory(c.slug)
          .then((d) => [c.slug, d.products.length] as const)
          .catch(() => [c.slug, undefined] as const)
      )
    )
  );

  return (
    <>
      <section className="sec-hero">
        <Image src={app.hero} alt={app.heroAlt} fill quality={82} priority sizes="100vw" />
        <div className="veil" aria-hidden />
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/applications">Applications</Link><span>/</span>
            {app.short}
          </div>
          <div className="kicker">{app.kicker}</div>
          <h1>{app.name}</h1>
          <p>{app.blurb}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Recommended fixtures</div>
              <h2>Families for {app.short.toLowerCase()}</h2>
            </div>
            <Link href="/products" className="link">Full catalogue</Link>
          </div>
          {familyCats.length > 0 ? (
            <div className="grid grid-4">
              {familyCats.map((c) => (
                <div className="reveal" key={c.slug}>
                  <CategoryCard category={c} count={counts.get(c.slug)} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)" }}>
              Recommended families will appear here once the catalogue is connected.
            </p>
          )}
        </div>
      </section>

      <Consult />
    </>
  );
}
