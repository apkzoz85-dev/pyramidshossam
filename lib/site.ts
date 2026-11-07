// ============================================================
//  إعدادات الموقع — عدّل هنا بس
// ============================================================
export const SITE = {
  // الدومين النهائي (بدون / في الآخر) — غيّره قبل الرفع
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pyramidsdevelopments.org",
  brand: "Grandeur Spaces",
  phone: "01065159906",
  // Web3Forms access key — من web3forms.com
  web3formsKey: "be25d795-5d0b-40e8-b23b-68070068bfeb",
  phoneIntl: "+201065159906",
  whatsapp: "201065159906",
  project: "Pyramids City",
  projectAr: "بيراميدز سيتي",
  developer: "Pyramids Developments",
  // Google Tag Manager / Google Ads — حط الأكواد هنا
  gtmId: "", // مثال: GTM-XXXXXXX
  adsId: "AW-18505247132", // مثال: AW-XXXXXXXXXX
  conversions: {
    form: "AW-18505247132/q4tKCPTPg5gdEJzT_vdE", // مثال: AW-XXXXXXXXXX/abcDEF
    whatsapp: "AW-18505247132/GqcdCI6IlpodEJzT_vdE",
    call: "AW-18505247132/eOnGCPuIlJodEJzT_vdE",
  },
};

export const telLink = `tel:${SITE.phoneIntl}`;

export function waLink(msg?: string) {
  const text =
    msg ??
    `مرحبًا، أريد معرفة تفاصيل ${SITE.projectAr} (Pyramids City) في العاصمة الإدارية ونظام الحجز بـ EOI 200 ألف جنيه.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

type Ev = "lead_form" | "whatsapp_click" | "call_click";

export function track(event: Ev, extra: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, project: "pyramids-city", ...extra });
  const map: Record<Ev, string> = {
    lead_form: SITE.conversions.form,
    whatsapp_click: SITE.conversions.whatsapp,
    call_click: SITE.conversions.call,
  };
  const sendTo = map[event];
  if (sendTo && typeof w.gtag === "function") {
    w.gtag("event", "conversion", { send_to: sendTo });
  }
}
