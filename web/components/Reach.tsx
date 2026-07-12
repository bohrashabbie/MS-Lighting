import { REACH, REACH_STATS } from "@/lib/reach";

export default function Reach() {
  return (
    <section className="section reach-band">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Global reach</div>
            <h2>Delivered across borders</h2>
          </div>
          <div className="reach-stats">
            {REACH_STATS.map((s) => (
              <div className="reach-stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reach-grid">
          {REACH.map((r) => (
            <article className="reach-card reveal" key={r.name}>
              <h3>{r.name}</h3>
              <p>{r.blurb}</p>
              <div className="reach-chips">
                {r.countries.map((c) => (
                  <span
                    key={c.name}
                    className={c.status === "active" ? "on" : c.status === "soon" ? "soon" : ""}
                  >
                    {c.name}
                    {c.status === "soon" ? " ·" : ""}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
