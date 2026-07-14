import type { Metadata } from "next";
import DownloadsClient from "@/components/DownloadsClient";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "MS Lighting catalogue, family sheets and certification documents — CE, RoHS, CB, SASO.",
};

export default function DownloadsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">Resources</div>
          <h1>Downloads</h1>
          <p>
            Catalogue, family sheets and certification packs for specification and tender.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <DownloadsClient />
        </div>
      </section>
    </>
  );
}
