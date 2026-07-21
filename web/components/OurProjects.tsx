import Link from "next/link";
import { getProjectCategories, getPageContents } from "@/lib/api";

const Arrow = () => (
  <svg className="ar" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Pick a category's best available image (cover, else first project image). */
function coverOf(cat: {
  cover_image_url?: string | null;
  projects: { images: { image_url: string }[] }[];
}): string | null {
  if (cat.cover_image_url) return cat.cover_image_url;
  for (const p of cat.projects) {
    if (p.images[0]?.image_url) return p.images[0].image_url;
  }
  return null;
}

/**
 * "Our Projects" — reference schemes grouped by category, driven by the CMS
 * (`/public/project-categories`). Renders nothing if unreachable.
 */
export default async function OurProjects() {
  const [categories, contents] = await Promise.all([
    getProjectCategories().catch(() => []),
    getPageContents("home").catch(() => []),
  ]);

  const live = categories.filter((c) => c.is_active && c.projects.length > 0);
  if (live.length === 0) return null;

  const heading =
    contents.find((c) => c.section_key === "section_ourProjects")?.title_en?.trim() ||
    "Our Projects";

  return (
    <section className="section projwall">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">References</div>
            <h2>{heading}</h2>
          </div>
          <Link href="/projects" className="link">View all projects</Link>
        </div>

        <div className="pw-grid">
          {live.map((cat) => {
            const img = coverOf(cat);
            const count = cat.projects.length;
            return (
              <Link
                href="/projects"
                key={cat.id}
                className="pw-card reveal"
                aria-label={`${cat.name_en} — ${count} project${count === 1 ? "" : "s"}`}
              >
                <span
                  className="pw-bg"
                  aria-hidden
                  style={img ? { backgroundImage: `url("${img}")` } : undefined}
                />
                <span className="pw-veil" aria-hidden />
                <div className="pw-body">
                  <span className="pw-count">
                    {count} project{count === 1 ? "" : "s"}
                  </span>
                  <h3>{cat.name_en}</h3>
                  <span className="pw-cta">
                    View work <Arrow />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
