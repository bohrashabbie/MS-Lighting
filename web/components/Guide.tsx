import type { GuideItem } from "@/lib/guide";

/**
 * WAC-style educational layer — collapsible editorial sections under a
 * category grid. Native <details> so it works without JS and stays crawlable
 * (closed <details> content is still indexed).
 */
export default function Guide({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: GuideItem[];
}) {
  return (
    <section className="guide">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2>{heading}</h2>
          </div>
        </div>
        <div className="gd-list">
          {items.map((g, i) => (
            <details className="reveal" key={g.title} open={i === 0}>
              <summary>
                {g.title}
                <span className="gd-ic" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="gd-body">{g.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
