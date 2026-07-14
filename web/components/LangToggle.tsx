"use client";

import { useEffect, useState } from "react";

/** EN / AR toggle — sets dir + lang on <html>. Arabic strings are partial for now. */
export default function LangToggle() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ms-lang");
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("ms-lang", lang);
    } catch {}
  }, [lang]);

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === "ar" ? "on" : ""}
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
      >
        ع
      </button>
    </div>
  );
}
