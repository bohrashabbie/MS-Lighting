"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const s = searchParams.get("subject") || "";
    const m = searchParams.get("message") || "";
    const model = searchParams.get("model") || "";
    if (s) setSubject(s);
    if (m) setMessage(m);
    else if (model) {
      setSubject(`Quote request — ${model}`);
      setMessage(`I would like a quote for model ${model}.\n\nQuantity:\nProject / location:\nNotes:\n`);
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setResult(null);
    setTimeout(() => {
      setSending(false);
      setResult({ ok: true, msg: "Message sent successfully!" });
      form.reset();
      setSubject("");
      setMessage("");
    }, 600);
  }

  return (
    <div className="form-card">
      <h2 className="serif">Send us a message</h2>
      <p className="sub">Product enquiries, pricing or project lighting — we reply within 24 hours.</p>
      <form onSubmit={onSubmit}>
        <label className="field"><span>Name</span><input name="name" type="text" required /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required /></label>
        <label className="field"><span>Phone</span><input name="phone" type="tel" /></label>
        <label className="field">
          <span>Subject</span>
          <input name="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label className="field">
          <span>Message</span>
          <textarea name="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit" className="btn btn-primary full" disabled={sending}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          {sending ? "Sending…" : "Send message"}
        </button>
        {result && <div className={`form-result ${result.ok ? "ok" : "err"}`}>{result.msg}</div>}
      </form>
    </div>
  );
}
