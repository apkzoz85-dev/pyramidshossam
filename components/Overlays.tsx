"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, X } from "lucide-react";
import { SITE, telLink, track, waLink } from "@/lib/site";
import { C } from "@/lib/content";
import LeadForm from "./LeadForm";

export default function Overlays() {
  const path = usePathname();
  const onThanks = path?.startsWith("/thank-you");
  const [popup, setPopup] = useState(false);
  const [cookie, setCookie] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    const open = () => setPrivacy(true);
    window.addEventListener("open-privacy", open);
    try {
      if (!localStorage.getItem("pc_cookie")) setCookie(true);
    } catch {}
    return () => window.removeEventListener("open-privacy", open);
  }, []);

  useEffect(() => {
    if (onThanks) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("pc_popup");
    } catch {}
    if (seen) return;
    const show = () => {
      try {
        if (sessionStorage.getItem("pc_popup")) return;
        sessionStorage.setItem("pc_popup", "1");
      } catch {}
      setPopup(true);
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if ((h.scrollTop + h.clientHeight) / h.scrollHeight >= 0.57) show();
    };
    const t = window.setTimeout(show, 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [onThanks]);

  return (
    <>
      {/* أيقونات عائمة */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3">
        <a
          href={waLink()}
          target="_blank"
          rel="noopener"
          onClick={() => track("whatsapp_click", { source: "floating" })}
          aria-label="واتساب"
          className="grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-xl ring-4 ring-wa/20 transition hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
        <a
          href={telLink}
          onClick={() => track("call_click", { source: "floating" })}
          aria-label={`اتصل ${SITE.phone}`}
          className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-xl ring-4 ring-gold/25 transition hover:scale-105"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4 backdrop-blur-sm" onClick={() => setPopup(false)}>
          <div className="fade-up relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-32 bg-navy">
              <img src="/images/pyramids-mall-entrance.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <img src="/brand/pyramids-city-logo-white.png" alt="Pyramids City" width={288} height={290} className="absolute right-1/2 top-1/2 h-20 w-auto -translate-y-1/2 translate-x-1/2" />
              <button onClick={() => setPopup(false)} aria-label="إغلاق" className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-xl font-bold text-navy">{C.popup.title}</p>
              <p className="mt-1 mb-4 text-sm text-ink/70">{C.popup.sub}</p>
              <LeadForm source="popup" />
            </div>
          </div>
        </div>
      )}

      {/* Privacy */}
      {privacy && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 p-4" onClick={() => setPrivacy(false)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-navy">سياسة الخصوصية</h2>
              <button onClick={() => setPrivacy(false)} aria-label="إغلاق" className="grid h-9 w-9 place-items-center rounded-full bg-sand">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm leading-7 text-ink/80">
              <p>{C.disclosure}</p>
              <p><b>البيانات اللي بنجمعها:</b> الاسم ورقم الموبايل ونوع الوحدة اللي بتختارها، فقط لغرض التواصل معاك بخصوص استفسارك.</p>
              <p><b>استخدام البيانات:</b> بنستخدم بياناتك للرد عليك بالتليفون أو الواتساب وإرسال تفاصيل المشروع، ومش بنبيعها لأي طرف تالت. ممكن نشاركها مع فريق المبيعات المعني بالمشروع بس.</p>
              <p><b>الكوكيز والتتبع:</b> الموقع بيستخدم كوكيز وأدوات قياس (Google Ads / Google Tag Manager) لقياس أداء الإعلانات وتحسين التجربة.</p>
              <p><b>حقوقك:</b> تقدر تطلب تعديل أو حذف بياناتك في أي وقت بالتواصل على {SITE.phone}.</p>
              <p><b>إخلاء مسؤولية:</b> {C.priceNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cookie */}
      {cookie && (
        <div className="fixed bottom-3 left-24 right-3 z-40 max-w-md rounded-2xl bg-ink/95 p-4 text-sm text-white shadow-2xl">
          <p className="leading-6 text-white/80">
            بنستخدم الكوكيز لتحسين تجربتك وقياس أداء الإعلانات.{" "}
            <button onClick={() => setPrivacy(true)} className="text-gold-2 underline">اعرف أكتر</button>
          </p>
          <button
            onClick={() => {
              try { localStorage.setItem("pc_cookie", "1"); } catch {}
              setCookie(false);
            }}
            className="btn btn-gold mt-3 px-6 py-2 text-sm"
          >
            موافق
          </button>
        </div>
      )}
    </>
  );
}
