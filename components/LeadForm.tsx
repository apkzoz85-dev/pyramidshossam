"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { SITE, track, waLink } from "@/lib/site";

const UNITS = ["وحدة تجارية (محل)", "وحدة إدارية (مكتب)", "لسه بقارن"];

type Lead = { name: string; phone: string; unit: string; source: string; via: "email" | "whatsapp" };

function sendWeb3Forms(lead: Lead, keepalive = false) {
  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    keepalive,
    body: JSON.stringify({
      access_key: SITE.web3formsKey,
      subject: `ليد جديد – Pyramids City (${lead.unit})`,
      from_name: "Pyramids City Landing",
      الاسم: lead.name,
      الموبايل: lead.phone,
      "نوع الوحدة": lead.unit,
      المشروع: "Pyramids City – المبنى الجديد G+8",
      "طريقة التواصل": lead.via === "email" ? "فورم" : "واتساب",
      المصدر: lead.source,
      الصفحة: typeof window !== "undefined" ? window.location.href : "",
      botcheck: "",
    }),
  });
}

export default function LeadForm({ source, dark = false }: { source: string; dark?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState(UNITS[0]);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function valid() {
    const p = phone.replace(/[\s-]/g, "");
    if (name.trim().length < 2) return "من فضلك اكتب اسمك";
    if (!/^(\+?\d{8,15})$/.test(p)) return "من فضلك اكتب رقم موبايل صحيح";
    return "";
  }

  function done(via: Lead["via"]) {
    try {
      sessionStorage.setItem("pc_popup", "1");
    } catch {}
    const q = new URLSearchParams({ n: name.trim(), u: unit, via }).toString();
    router.push(`/thank-you?${q}`);
  }

  async function submitEmail() {
    if (hp || busy) return;
    const e = valid();
    setErr(e);
    if (e) return;
    setBusy(true);
    try {
      const r = await sendWeb3Forms({ name: name.trim(), phone: phone.trim(), unit, source, via: "email" });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw new Error();
      track("lead_form", { source, unit, via: "email" });
      done("email");
    } catch {
      setErr("حصلت مشكلة في الإرسال، جرّب تاني أو ابعتلنا واتساب.");
      setBusy(false);
    }
  }

  function submitWhatsApp() {
    if (hp) return;
    const e = valid();
    setErr(e);
    if (e) return;
    // نسجّل الليد على الإيميل كمان في الخلفية عشان ميضيعش لو مبعتش الرسالة
    sendWeb3Forms({ name: name.trim(), phone: phone.trim(), unit, source, via: "whatsapp" }, true).catch(() => {});
    track("lead_form", { source, unit, via: "whatsapp" });
    track("whatsapp_click", { source: `${source}-form` });
    const msg = `مرحبًا، أنا ${name.trim()} – رقمي ${phone.trim()}.\nمهتم بـ ${unit} في بيراميدز سيتي (Pyramids City) – المبنى الجديد.\nعايز التفاصيل ونظام الحجز بـ EOI 200 ألف.`;
    window.open(waLink(msg), "_blank", "noopener");
    done("whatsapp");
  }

  const label = dark ? "text-white/80" : "text-ink/70";

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitEmail(); }} className="space-y-3" noValidate>
      <label className="block">
        <span className={`mb-1 block text-sm ${label}`}>الاسم</span>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="اسمك" />
      </label>
      <label className="block">
        <span className={`mb-1 block text-sm ${label}`}>رقم الموبايل</span>
        <input className="field text-right" dir="ltr" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="01xxxxxxxxx" />
      </label>
      <label className="block">
        <span className={`mb-1 block text-sm ${label}`}>نوع الوحدة</span>
        <select className="field" value={unit} onChange={(e) => setUnit(e.target.value)}>
          {UNITS.map((u) => <option key={u}>{u}</option>)}
        </select>
      </label>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={!!hp} onChange={(e) => setHp(e.target.checked ? "1" : "")} className="hidden" aria-hidden />
      {err && <p className="text-sm font-medium text-red-500">{err}</p>}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button type="submit" disabled={busy} className="btn btn-gold py-3.5 text-base disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />} إرسال
        </button>
        <button type="button" onClick={submitWhatsApp} className="btn btn-wa py-3.5 text-base">
          <MessageCircle className="h-5 w-5" /> واتساب
        </button>
      </div>
      <p className={`text-center text-xs ${dark ? "text-white/50" : "text-ink/50"}`}>
        بالضغط أنت توافق على{" "}
        <button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))} className="underline">
          سياسة الخصوصية
        </button>
      </p>
    </form>
  );
}
