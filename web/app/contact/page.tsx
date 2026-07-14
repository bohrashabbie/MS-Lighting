import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MS Lighting for product enquiries, pricing and project lighting solutions across Kuwait, the UAE, China and Egypt.",
};

const IMail = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
const IPhone = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>);
const IPin = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
const IArrow = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow"><path d="M7 17 17 7M7 7h10v10" /></svg>);

const offices: { name: string; firm: string; email: string | null; phone: string | null; address: string }[] = [
  { name: "Al-Burhan Regional Co.", firm: "Distributor · Kuwait", email: "info@alburhan-regional.com", phone: "+965 999 35 529", address: "Al Refaei Building, 4th Floor, Office 5&6, Tunis Street, Hawally, Kuwait" },
  { name: "Al-Burhan Hegazi Trading", firm: "Distributor · UAE", email: "bdm@alburhan-regional.com", phone: "+971 56 6032 765", address: "Al Owais Business Tower, Shop #13, Al Sabkha, Dubai, UAE" },
  { name: "Jiangmen Bohan Lighting", firm: "Manufacturer · China", email: "al@alburhanlighting.com", phone: "+86 137 2600 6786", address: "B2 Building, No.159, Yunoin Road, Jianghai District, Jiangmen City, Guangdong, China" },
  { name: "Al-Burhan Egypt", firm: "Distributor · Egypt", email: null, phone: null, address: "Egypt — opening soon" },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="inner">
          <div className="eyebrow">Get in touch</div>
          <h1 className="serif">Let&apos;s talk lighting</h1>
          <p>Reach out for product enquiries, pricing or full project lighting solutions — our team across Kuwait, the UAE, China and (soon) Egypt is ready to help.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* Offices */}
            <div>
              <div className="col-label">Our locations</div>
              <div className="office-grid">
                {offices.map((o) => (
                  <div className="office-card" key={o.name}>
                    <div className="oc-top">
                      <div>
                        <h3>{o.name}</h3>
                        <div className="firm">{o.firm}</div>
                      </div>
                      <IArrow />
                    </div>
                    <div className="oc-rows">
                      {o.phone && <a href={`tel:${o.phone.replace(/\s+/g, "")}`}><IPhone /><span>{o.phone}</span></a>}
                      {o.email && <a href={`mailto:${o.email}`}><IMail /><span>{o.email}</span></a>}
                      <div><IPin /><span>{o.address}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <Suspense fallback={<div className="form-card"><p className="sub">Loading form…</p></div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
