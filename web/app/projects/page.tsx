import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects & References",
  description:
    "MS Lighting project references across Kuwait, the UAE, China and Egypt — retail, hospitality, office, façade and industrial schemes.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">References</div>
          <h1>Projects</h1>
          <p>
            Selected schemes delivered through the Al-Burhan regional network.
            Placeholder case studies — replace with live project photos as they land.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <article className={`proj-card reveal${p.featured ? " featured" : ""}`} key={p.slug}>
                <div className="proj-media">
                  <Image src={p.image} alt={p.title} fill quality={80} sizes="(max-width:900px) 100vw, 50vw" />
                </div>
                <div className="proj-body">
                  <div className="proj-meta">
                    <span>{p.sector}</span>
                    <span>{p.year}</span>
                  </div>
                  <h2>{p.title}</h2>
                  <p className="proj-loc">{p.location}</p>
                  <p>{p.blurb}</p>
                  <div className="proj-fams">
                    {p.fixtures.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/contact?subject=Project%20enquiry" className="btn btn-primary">
              Discuss your project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
