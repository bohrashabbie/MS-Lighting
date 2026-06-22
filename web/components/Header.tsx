import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" aria-label="MS Lighting home" className="logo-badge">
          <Image src="/logo.png" alt="MS Lighting" width={132} height={38} className="logo-img" priority />
        </Link>
        <nav className="menu">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
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
