import type { Metadata } from "next";
import Image from "next/image";
import { getPageContents, getServices, getSectors, getTeam, imageUrl } from "@/lib/api";
import type { PageContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "MS Lighting — part of the Al-Burhan Group. Two decades of professional LED lighting design, supply and turnkey installation across Kuwait, the UAE, China and Egypt.",
};

// Keep the page fresh without a full rebuild.
export const revalidate = 300;

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Split a CMS text block into clean paragraphs. */
function paras(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export default async function AboutPage() {
  const [about, services, sectors, team] = await Promise.all([
    getPageContents("about").catch(() => [] as PageContent[]),
    getServices().catch(() => []),
    getSectors().catch(() => []),
    getTeam().catch(() => []),
  ]);

  const pc = (key: string) => about.find((c) => c.section_key === key);
  const titleBlock = pc("title");
  const mainDesc = pc("mainDescription")?.content_en;
  const journey = pc("journey")?.content_en;
  const expansion = pc("expansion")?.content_en;
  const vision = pc("vision");
  const missionIntro = pc("mission")?.content_en;
  const missionItems = about
    .filter((c) => /^mission_item\d+$/.test(c.section_key))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((c) => c.title_en)
    .filter(Boolean) as string[];

  // Story = the founding narrative + the establishing statement.
  const storyParas = [...paras(titleBlock?.content_en), ...paras(mainDesc)];

  const activeServices = services
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
  const activeSectors = sectors
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
  const leaders = team
    .filter((t) => t.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const stats = [
    { n: "20+", l: "Years of experience" },
    { n: "4", l: "Countries" },
    { n: "500+", l: "Projects delivered" },
    { n: activeSectors.length ? String(activeSectors.length) : "6", l: "Sectors served" },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">Our story</div>
          <h1 className="serif">
            Illuminating spaces for <em>over two decades</em>
          </h1>
          <p>
            MS Lighting is part of the Al-Burhan Group — a family of lighting
            companies delivering design, supply and turnkey installation across
            Kuwait, the UAE, China and Egypt.
          </p>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section className="section about-story">
        <div className="wrap">
          <div className="about-story-grid">
            <div className="about-story-aside reveal">
              <div className="eyebrow">Since 2008</div>
              <h2>Built on trust, grown by hand.</h2>
            </div>
            <div className="about-story-body reveal">
              <p className="lead">
                {storyParas[0] ||
                  "Founded in 2008, Al-Burhan Lighting grew from a small lighting business into an international company serving residential, commercial, governmental and industrial projects."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────── */}
      <section className="about-stats">
        <div className="wrap">
          <div className="about-stats-grid">
            {stats.map((s) => (
              <div className="about-stat reveal" key={s.l}>
                <div className="as-n">{s.n}</div>
                <div className="as-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────── */}
      <section className="section about-vm">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">What drives us</div>
              <h2>Vision &amp; Mission</h2>
            </div>
          </div>
          <div className="about-vm-grid">
            <div className="vm-card vm-vision reveal">
              <div className="vm-tag">{vision?.title_en || "Our Vision"}</div>
              <p>
                {vision?.content_en ||
                  "To be the top provider of advanced lighting solutions in Kuwait and the regional market — offering modern, efficient and high-quality products that enhance both functionality and aesthetics."}
              </p>
            </div>
            <div className="vm-card vm-mission reveal">
              <div className="vm-tag">Our Mission</div>
              <p>{missionIntro || "To deliver complete lighting solutions through:"}</p>
              <ul>
                {(missionItems.length
                  ? missionItems
                  : ["High-quality products", "Professional design", "Precise execution", "On-time delivery"]
                ).map((m) => (
                  <li key={m}>
                    <span className="vm-check">
                      <Check />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we offer ────────────────────────────────────── */}
      {activeServices.length > 0 && (
        <section className="section about-offer">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Capabilities</div>
                <h2>What we offer</h2>
              </div>
              <p className="meta">A fully integrated range of lighting services.</p>
            </div>
            <div className="about-offer-grid">
              {activeServices.map((s, i) => (
                <div className="offer-card reveal" key={s.id}>
                  <span className="offer-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title_en}</h3>
                  {s.items?.length > 0 && (
                    <ul>
                      {s.items
                        .filter((it) => it.is_active)
                        .sort((a, b) => a.sort_order - b.sort_order)
                        .map((it) => (
                          <li key={it.id}>{it.text_en}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sectors we serve ─────────────────────────────────── */}
      {activeSectors.length > 0 && (
        <section className="section about-sectors">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Where we work</div>
                <h2>Sectors we serve</h2>
              </div>
            </div>
            <div className="about-sectors-grid">
              {activeSectors.map((s) => (
                <div className="sector-chip reveal" key={s.id}>
                  <span className="sc-dot" aria-hidden />
                  {s.name_en}
                </div>
              ))}
            </div>
            {pc("sectorsWeServe_closing")?.content_en && (
              <p className="about-sectors-note reveal">
                {pc("sectorsWeServe_closing")?.content_en}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── Leadership ───────────────────────────────────────── */}
      {leaders.length > 0 && (
        <section className="section about-team">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">The people</div>
                <h2>Leadership</h2>
              </div>
              <p className="meta">A word from the founders.</p>
            </div>
            <div className="about-team-grid">
              {leaders.map((m) => {
                const src = imageUrl(m.image_url);
                const quote = paras(m.quote_en);
                return (
                  <article className="leader-card reveal" key={m.id}>
                    <div className="lc-head">
                      {src ? (
                        <span className="lc-photo">
                          <Image
                            src={src}
                            alt={m.name_en}
                            fill
                            sizes="96px"
                            className="lc-img"
                          />
                        </span>
                      ) : (
                        <span className="lc-photo lc-photo--ph" aria-hidden>
                          {m.name_en.replace(/^(Mr\.|Ms\.|Mrs\.)\s*/, "").charAt(0)}
                        </span>
                      )}
                      <div className="lc-id">
                        <h3>{m.name_en}</h3>
                        {m.designation_en && <div className="lc-role">{m.designation_en}</div>}
                      </div>
                    </div>
                    <div className="lc-quote">
                      <span className="lc-mark" aria-hidden>
                        &ldquo;
                      </span>
                      {quote.length > 0 ? (
                        quote.map((p, i) => <p key={i}>{p}</p>)
                      ) : (
                        <p>{m.quote_en}</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="about-cta">
        <div className="wrap">
          <div className="about-cta-inner reveal">
            <div>
              <div className="eyebrow">Let&apos;s build together</div>
              <h2>Have a project in mind?</h2>
            </div>
            <a href="/contact" className="about-cta-btn">
              Talk to our team <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
