"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { CallButton, WaButton } from "./Actions";

export default function ThanksBody() {
  const sp = useSearchParams();
  const name = sp.get("n") ?? "";
  const unit = sp.get("u") ?? "";
  const via = sp.get("via");
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-ink px-4 py-16">
      <img src="/images/pyramids-mall-entrance.webp" alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
        <img src="/brand/pyramids-city-logo-white.png" alt="Pyramids City" width={288} height={290} className="mx-auto mb-4 h-20 w-auto rounded-2xl bg-navy p-2" />
        <CheckCircle2 className="mx-auto h-14 w-14 text-wa" />
        <h1 className="mt-4 text-2xl font-bold text-navy">شكرًا{name ? ` يا ${name}` : ""}!</h1>
        <p className="mt-3 leading-8 text-ink/70">
          {via === "call"
            ? "بنحوّلك للمكالمة دلوقتي. لو المكالمة متفتحتش، دوس على زرار الاتصال تحت."
            : "اتفتحلك الواتساب برسالة جاهزة، ابعتها وهنرد عليك بتفاصيل المبنى الجديد ونظام الحجز."}
        </p>
        {unit && (
          <div className="mt-5 rounded-2xl bg-sand p-4 text-sm">
            <p className="text-ink/60">اهتمامك</p>
            <p className="mt-1 font-bold text-navy">{unit} – بيراميدز سيتي (المبنى الجديد G+8)</p>
          </div>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <WaButton source="thank-you" className="btn btn-wa py-3" label="واتساب" />
          <CallButton source="thank-you" className="btn btn-gold py-3" label="اتصل" />
        </div>
        <a href="/" className="mt-6 inline-block text-sm text-ink/50 underline">رجوع للصفحة الرئيسية</a>
      </div>
    </main>
  );
}
