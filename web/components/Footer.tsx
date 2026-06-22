import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import BackToTop from "./BackToTop";

const IMail = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
const IPhone = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>);
const IPin = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
const IFb = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300000000000001c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>);
const IIg = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>);
const IIn = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.3 8.65 21 10.9 21 14v7h-4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z" /></svg>);

export default async function Footer() {
  let cats: { slug: string; name_en: string }[] = [];
  try {
    cats = await getCategories();
  } catch {}

  const presence = [
    { name: "Jiangmen Bohan Lighting Co., Ltd", row: "Jianghai District, Jiangmen City, Guangdong, China", icon: <IPin /> },
    { name: "Al-Burhan Hegazi Gen. Trading L.L.C", row: "Al Owais Business Tower, Al Sabkha, Dubai, UAE  ·  +971 56 595 4291", icon: <IPin /> },
    { name: "Al-Burhan Regional Co.", row: "Al Rifal Building, Tunis St, Hawally, Kuwait  ·  +965 511 75 511", icon: <IPin /> },
  ];

  return (
    <footer className="footer">
      <div className="hair" />
      <div className="footer-inner">
        {/* Newsletter */}
        <div className="newsletter">
          <div className="nl-copy">
            <div className="nl-eyebrow">Stay illuminated</div>
            <h3 className="serif">Lighting insights & new releases</h3>
            <p>Catalogue updates, project lighting ideas and product news.</p>
          </div>
          <div className="nl-form">
            <input type="email" placeholder="your@email.com" aria-label="Email" />
            <Link href="/contact" className="nl-subscribe">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              Subscribe
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link href="/" className="logo-badge">
              <Image src="/logo.png" alt="MS Lighting" width={120} height={34} className="logo-img" />
            </Link>
            <p className="desc">
              Professional LED lighting — recessed, surface, linear, magnetic and
              outdoor fixtures, certified and built to perform. Catalogue 2025.
            </p>
            <div className="footer-contact">
              <a href="mailto:info@alburhan-regional.com"><IMail /> info@alburhan-regional.com</a>
              <a href="tel:+96551175511"><IPhone /> +965 511 75 511</a>
              <span><IPin /> Hawally, Kuwait · Dubai, UAE · Jiangmen, China</span>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><IFb /></a>
              <a href="#" aria-label="Instagram"><IIg /></a>
              <a href="#" aria-label="LinkedIn"><IIn /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              {cats.slice(0, 7).map((c) => (
                <li key={c.slug}><Link href={`/products/${c.slug}`}>{c.name_en}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Presence</h4>
            {presence.map((p) => (
              <div className="presence-card" key={p.name}>
                <div className="pc-name">{p.name}</div>
                <div className="pc-row">{p.icon}<span>{p.row}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="fb-inner">
          <span>© {new Date().getFullYear()} MS Lighting. All rights reserved.</span>
          <div className="fb-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
