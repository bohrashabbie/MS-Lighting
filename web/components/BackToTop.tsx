"use client";
export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", display: "inline-flex", alignItems: "center", gap: 6, font: "inherit" }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      Top
    </button>
  );
}
