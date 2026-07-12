import { TESTIMONIALS } from "@/lib/testimonials";

const Quote = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M9.5 5C6.5 6.2 5 8.6 5 12.2V19h6v-6H8.2c0-2.1.8-3.6 2.6-4.4L9.5 5Zm9 0C15.5 6.2 14 8.6 14 12.2V19h6v-6h-2.8c0-2.1.8-3.6 2.6-4.4L18.5 5Z" />
  </svg>
);

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="section proof-band">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Proof</div>
            <h2>Trusted on the project floor</h2>
          </div>
        </div>

        <div className="tm-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="tm-card reveal" key={i}>
              <div className="tm-mark" aria-hidden><Quote /></div>
              <blockquote>{t.quote}</blockquote>
              {/* Anonymous attribution (role · location) until named, sign-off
                  quotes are collected — never show the placeholder authors. */}
              <figcaption>
                <span className="tm-author">{t.role}</span>
                <span className="tm-role">{t.location}</span>
                {t.project && <span className="tm-project">{t.project}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
