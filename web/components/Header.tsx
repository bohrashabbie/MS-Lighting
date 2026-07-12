import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export const GROUP_URL = "http://alburhan-regional.com/";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand mark → home. The group wordmark beside it → the parent site,
            so the corporate link never costs a visitor their way back. */}
        <Link href="/" aria-label="MS Lighting home" className="logo-badge">
          <Image src="/logo.png" alt="MS Lighting" width={132} height={38} className="logo-img" priority />
        </Link>
        <a
          href={GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group-mark"
          title="Al-Burhan Regional — parent company"
        >
          <span className="gm-by">A company of</span>
          <span className="gm-name">Al-Burhan Regional<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M9 7h8v8" /></svg></span>
        </a>

        <nav className="menu">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/products/indoor">Indoor</Link>
          <Link href="/products/outdoor">Outdoor</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-search">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
