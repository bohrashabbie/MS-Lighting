import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "MS Lighting — professional LED lighting manufacturer and supplier. Product Catalogue 2025.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">Our story</div>
          <h1 className="serif">About MS Lighting</h1>
          <p>Professional LED lighting, engineered for spaces that matter.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.8 }}>
            MS Lighting designs and manufactures professional LED lighting — recessed
            and surface down lights, panel and spot lights, linear and magnetic
            systems, track, wall, lawn, street, flood and high-bay fixtures. Built
            with quality components from leading brands, every product in our 2025
            catalogue is certified (CE, RoHS, CB, SASO and more) for reliable,
            energy-efficient performance across China, the UAE and Kuwait.
          </p>
        </div>
      </section>
    </>
  );
}
