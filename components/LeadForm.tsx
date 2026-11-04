"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, telLink, track, waLink } from "@/lib/site";

const UNITS = ["وحدة تجارية (محل)", "وحدة إدارية (مكتب)", "لسه بقارن"];

export default function LeadForm({ source, dark = false }: { source: string; dark?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState(UNITS[0]);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState("");

  function valid() {
    const p = phone.replace(/[\s-]/g, "");
    if (name.trim().length < 2) return "من فضلك اكتب اسمك";
    if (!/^(\+?\d{8,15})$/.test(p)) return "من فضلك اكتب رقم موبايل صحيح";
    return "";
  }

  function go(kind: "wa" | "call") {
    if (hp) return; // honeypot
    const e = valid();
    setErr(e);
    if (e) return;
    const q = new URLSearchParams({ n: name.trim(), u: unit, via: kind }).toString();
    try {
      sessionStorage.setItem("pc_popup", "1");
    } catch {}
    track("lead_form", { source, unit, via: kind });
    if (kind === "wa") {
      track("whatsapp_click", { source: `${source}-form` });
      const msg = `مرحبًا، أنا ${name.trim()} – رقمي ${phone.trim()}.\nمهتم بـ ${unit} في بيراميدز سيتي (Pyramids City) – المبنى الجديد.\nعايز التفاصيل ونظام الحجز بـ EOI 200 ألف.`;
      window.open(waLink(msg), "_blank", "noopener");
    } else {
      track("call_click", { source: `${source}-form` });
      window.location.href = telLink;
    }
    router.push(`/thank-you?${q}`);
  }

  const label = dark ? "text-white/80" : "text-ink/70";

  return (
    <form onSubmit={(e) => { e.preventDefault(); go("wa"); }} className="space-y-3" noValidate>
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
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden />
      {err && <p className="text-sm font-medium text-red-500">{err}</p>}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button type="button" onClick={() => go("wa")} className="btn btn-wa py-3.5 text-base">
          <MessageCircle className="h-5 w-5" /> واتساب
        </button>
        <button type="button" onClick={() => go("call")} className="btn btn-gold py-3.5 text-base">
          <Phone className="h-5 w-5" /> اتصل بنا
        </button>
      </div>
      <p className={`text-center text-xs ${dark ? "text-white/50" : "text-ink/50"}`}>
        بالضغط أنت توافق على{" "}
        <button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))} className="underline">
          سياسة الخصوصية
        </button>{" "}
        · {SITE.phone}
      </p>
    </form>
  );
}
