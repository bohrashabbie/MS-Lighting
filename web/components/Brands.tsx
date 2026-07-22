import { COMPONENT_BRANDS } from "@/lib/componentBrands";

/**
 * "Built with the world's best" — the tier-one LED chip and driver brands MS
 * Lighting engineers its fixtures around, split into two labelled groups. Real
 * brand marks are served locally from /public/brands and rendered greyscale so
 * the wall reads as one system, colourising on hover. Brands without a hosted
 * logo fall back to a clean typographic wordmark. Plain <img> is used for the
 * logos because their intrinsic sizes and formats vary.
 */
export default function Brands() {
  return (
    <section className="brands">
      <div className="wrap">
        <div className="brands-head reveal">
          <div className="eyebrow">Our components</div>
          <h2>
            Built with the <em>world&apos;s best.</em>
          </h2>
          <p>
            Every MS Lighting fixture is engineered around tier-one LED chips and
            drivers — the same components trusted across architectural and
            professional lighting worldwide.
          </p>
        </div>

        {COMPONENT_BRANDS.map((group) => (
          <div className="brand-group reveal" key={group.label}>
            <div className="brand-group-label">{group.label}</div>
            <div className="brands-grid">
              {group.brands.map((b) => (
                <div className="brand-card" key={group.label + b.name}>
                  {b.logo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.logo} alt={b.name} className="brand-logo" loading="lazy" />
                      <span className="brand-name">{b.name}</span>
                    </>
                  ) : (
                    <span className="brand-word">{b.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
