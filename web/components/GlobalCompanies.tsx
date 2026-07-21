import { getCountries, getContactInfo, getPageContents } from "@/lib/api";

const REGIONAL_BASE = "https://alburhan-regional.com/en";

const Pin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const Phone = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const Mail = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

/**
 * "Our Global Companies" — one refined card per regional company, driven by the
 * CMS. Cards link to the matching country page on alburhan-regional.com.
 */
export default async function GlobalCompanies() {
  const [countries, contacts, contents] = await Promise.all([
    getCountries().catch(() => []),
    getContactInfo().catch(() => []),
    getPageContents("home").catch(() => []),
  ]);

  if (countries.length === 0) return null;

  const contactFor = (id: number) => contacts.find((c) => c.country_id === id);
  const heading =
    contents.find((c) => c.section_key === "section_aboutUs")?.title_en?.trim() ||
    "Our Global Companies";

  return (
    <section className="section companies">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">Al-Burhan network</div>
            <h2>{heading}</h2>
          </div>
          <p className="companies-sub">
            Four countries, one team — integrated lighting from the Gulf to Asia
            and North Africa.
          </p>
        </div>

        <div className="companies-grid">
          {countries.map((c) => {
            const contact = contactFor(c.id);
            const email = contact?.email?.trim() || "";
            const phone = contact?.phone1?.trim() || "";
            const hasEmail = email.includes("@");
            const hasPhone = /\d/.test(phone) && !/to be added/i.test(phone);
            const live = hasEmail || hasPhone;

            return (
              <a
                href={`${REGIONAL_BASE}/${c.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                key={c.id}
                className={`company-card reveal${live ? "" : " is-soon"}`}
                aria-label={`${c.name_en} — ${c.firm_name_en || "Al-Burhan"} (opens on alburhan-regional.com)`}
              >
                <span
                  className="cc-bg"
                  aria-hidden
                  style={
                    c.country_image_url
                      ? { backgroundImage: `url("${c.country_image_url}")` }
                      : undefined
                  }
                />
                <span className="cc-veil" aria-hidden />
                <span className="cc-loc">
                  <Pin /> {c.name_en}
                </span>
                <div className="cc-body">
                  <h3>{c.name_en}</h3>
                  <div className="cc-firm">{c.firm_name_en || "Al-Burhan"}</div>
                  {live ? (
                    <div className="cc-contact">
                      {hasPhone && (
                        <span>
                          <Phone /> {phone}
                        </span>
                      )}
                      {hasEmail && (
                        <span>
                          <Mail /> {email}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="cc-soon">Coming soon</span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
