import Image from "next/image";
import type { Brand } from "@/lib/api";

/**
 * "One vision, many brands" — MS Lighting leads, partner brands follow.
 * Logos come from the CMS; MS Lighting is the local mark. Plain <img> is used
 * for the remote logos because their intrinsic sizes and formats vary.
 */
export default function Brands({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;
  const total = brands.length + 1; // + MS Lighting

  return (
    <section className="brands">
      <div className="wrap">
        <div className="brands-head reveal">
          <div className="eyebrow">Our brands</div>
          <h2>
            One vision. <em>{total} brands.</em>
          </h2>
          <p>
            MS Lighting leads a curated network of specialist lighting ateliers —
            bringing design sophistication and technical depth to every project we
            supply across the region.
          </p>
        </div>

        <div className="brands-grid">
          <div className="brand-card lead reveal">
            <Image src="/logo.png" alt="MS Lighting" width={150} height={44} className="brand-logo" />
            <span className="brand-tag">House brand</span>
          </div>
          {brands.map((b) => (
            <div className="brand-card reveal" key={b.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.logo_url} alt={b.name.trim()} className="brand-logo" loading="lazy" />
              <span className="brand-name">{b.name.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
