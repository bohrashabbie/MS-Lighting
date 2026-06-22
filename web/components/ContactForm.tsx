"use client";
import { useState } from "react";
import { submitContact } from "@/lib/api";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setResult(null);
    const res = await submitContact({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || undefined,
      subject: String(fd.get("subject") || "") || undefined,
      message: String(fd.get("message") || ""),
    });
    setSending(false);
    if (res.ok) {
      setResult({ ok: true, msg: "Message sent — we'll get back to you within 24 hours." });
      form.reset();
    } else {
      setResult({ ok: false, msg: res.error || "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="form-card">
      <h2 className="serif">Send us a message</h2>
      <p className="sub">Product enquiries, pricing or project lighting — we reply within 24 hours.</p>
      <form onSubmit={onSubmit}>
        <label className="field"><span>Name</span><input name="name" type="text" required /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required /></label>
        <label className="field"><span>Phone</span><input name="phone" type="tel" /></label>
        <label className="field"><span>Subject</span><input name="subject" type="text" /></label>
        <label className="field"><span>Message</span><textarea name="message" rows={5} required /></label>
        <button type="submit" className="btn btn-primary full" disabled={sending}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          {sending ? "Sending…" : "Send message"}
        </button>
        {result && <div className={`form-result ${result.ok ? "ok" : "err"}`}>{result.msg}</div>}
      </form>
    </div>
  );
}
