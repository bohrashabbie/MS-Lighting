import Image from "next/image";
import type { Brand } from "@/lib/api";

/**
 * "One vision, many brands" — MS Lighting leads, partner brands follow, in an
 * infinite marquee (pure CSS, pauses on hover, static wrap under reduced
 * motion). Logos come from the CMS; MS Lighting is the local mark. Plain
 * <img> is used for the remote logos because their intrinsic sizes and
 * formats vary.
 */
function Row({ brands, hidden }: { brands: Brand[]; hidden?: boolean }) {
  return (
    <div className="bm-row" aria-hidden={hidden || undefined}>
      <div className="brand-card lead">
        <Image src="/logo.png" alt={hidden ? "" : "MS Lighting"} width={150} height={44} className="brand-logo" />
        <span className="brand-tag">House brand</span>
      </div>
      {brands.map((b) => (
        <div className="brand-card" key={b.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.logo_url} alt={hidden ? "" : b.name.trim()} className="brand-logo" loading="lazy" />
          <span className="brand-name">{b.name.trim()}</span>
        </div>
      ))}
    </div>
  );
}

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
      </div>

      <div className="brands-marquee reveal">
        {/* the track is two identical rows; -50% translate loops seamlessly */}
        <div className="bm-track" style={{ animationDuration: `${Math.max(26, total * 7)}s` }}>
          <Row brands={brands} />
          <Row brands={brands} hidden />
        </div>
      </div>
    </section>
  );
}
