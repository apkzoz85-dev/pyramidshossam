import {
  Building2, Cable, Check, Drama, Eye, Fish, Flag, Glasses, Lightbulb, MapPin,
  MonitorPlay, ShoppingBag, Store, Theater, ChevronDown, type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { CallButton, PrivacyLink, WaButton } from "@/components/Actions";
import { C } from "@/lib/content";
import { SITE } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Cable, Lightbulb, Fish, Glasses, ShoppingBag, Drama, Eye, Store, Building2, Theater, Flag, MonitorPlay,
};

function Head({ kicker, title, sub, light = false, center = false }: { kicker: string; title: string; sub?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="kicker">{kicker}</span>
      <h2 className={`mt-2 text-3xl font-bold leading-snug sm:text-4xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      <div className={`gold-line mt-4 ${center ? "mx-auto" : ""}`} />
      {sub && <p className={`mt-4 text-lg leading-8 ${light ? "text-white/70" : "text-ink/70"}`}>{sub}</p>}
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      name: "Pyramids City – بيراميدز سيتي",
      description: C.meta.description,
      image: `${SITE.url}/images/pyramids-mall-night.webp`,
      address: { "@type": "PostalAddress", addressLocality: "العاصمة الإدارية الجديدة", addressCountry: "EG" },
    },
    {
      "@type": "FAQPage",
      mainEntity: C.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    { "@type": "RealEstateAgent", name: SITE.brand, telephone: SITE.phoneIntl, url: SITE.url },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="top">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink pt-24 pb-16 sm:pt-32 sm:pb-24">
          <img src="/images/pyramids-city-aerial-night.webp" alt="" aria-hidden fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-ink via-ink/85 to-ink/40" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="fade-up text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm text-gold-2">
                <MapPin className="h-4 w-4" /> {C.hero.kicker}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {C.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">{C.hero.body}</p>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {C.hero.badges.map((b) => (
                  <div key={b.l} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur sm:p-4">
                    <p className="font-latin text-xl font-bold text-gold-2 sm:text-2xl" dir="ltr">{b.v}</p>
                    <p className="mt-1 text-xs leading-5 text-white/70 sm:text-sm">{b.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
                <WaButton source="hero" />
                <CallButton source="hero" className="btn btn-ghost px-6 py-3" />
              </div>
            </div>
            <div className="fade-up rounded-3xl bg-white p-6 shadow-2xl sm:p-8" style={{ animationDelay: "0.15s" }}>
              <p className="text-sm font-semibold text-gold">احجز بـ EOI 200 ألف جنيه</p>
              <p className="mt-1 mb-5 text-2xl font-bold text-navy">سجّل اهتمامك بالمبنى الجديد</p>
              <LeadForm source="hero" />
            </div>
          </div>
          <a href="#new-building" aria-label="انزل" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/50 sm:block">
            <ChevronDown className="h-7 w-7 animate-bounce" />
          </a>
        </section>

        {/* STATS */}
        <section className="bg-navy">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
            {C.stats.map((s) => (
              <div key={s.l} className="px-4 py-3 text-center">
                <p className="font-latin text-3xl font-bold text-gold-2" dir="ltr">{s.v}</p>
                <p className="mt-1 text-sm text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEW BUILDING */}
        <section id="new-building" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <Head kicker={C.newBuilding.kicker} title={C.newBuilding.title} />
              <p className="-mt-4 text-lg leading-8 text-ink/75">{C.newBuilding.body}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {C.newBuilding.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check className="h-4 w-4" /></span>
                    <span className="font-medium">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border-r-4 border-gold bg-gold/10 p-4 leading-7 text-ink/80">{C.newBuilding.note}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WaButton source="new-building" label="ابعتلي التفاصيل أول بأول" />
                <CallButton source="new-building" className="btn btn-navy px-6 py-3" />
              </div>
            </div>
            <figure className="overflow-hidden rounded-3xl bg-white p-2 shadow-xl">
              <img src="/images/pyramids-city-metropolis-g8.webp" alt={C.newBuilding.alt} width={1012} height={576} loading="lazy" className="w-full rounded-2xl" />
              <figcaption className="px-3 py-3 text-sm text-ink/60">موقع المبنى الجديد G+8 – منطقة Metropolis</figcaption>
            </figure>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <img src="/images/pyramids-city-commercial-building.webp" alt="مبنى تجاري إداري على البحيرة – بيراميدز سيتي العاصمة الإدارية" width={960} height={960} loading="lazy" className="aspect-square w-full rounded-3xl object-cover shadow-xl" />
              <div className="absolute -bottom-6 left-6 rounded-2xl bg-navy px-6 py-4 text-white shadow-xl">
                <p className="font-latin text-3xl font-bold text-gold-2">155</p>
                <p className="text-sm text-white/70">فدان على بوابة العاصمة</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Head kicker={C.about.kicker} title={C.about.title} />
              <p className="-mt-4 text-lg leading-8 text-ink/75">{C.about.body}</p>
              <div className="mt-8 grid gap-4">
                {C.about.cards.map((c) => (
                  <div key={c.t} className="rounded-2xl border border-ink/10 bg-sand p-5">
                    <p className="font-bold text-navy">{c.t}</p>
                    <p className="mt-1 text-ink/70">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="relative isolate overflow-hidden bg-ink py-20 sm:py-28">
          <img src="/images/pyramids-city-aerial-day.webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head kicker={C.location.kicker} title={C.location.title} sub={C.location.body} light />
            <div className="grid gap-8 lg:grid-cols-2">
              <ul className="grid gap-3">
                {C.location.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-2" />
                    <span className="leading-7">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="min-h-[360px] overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title={C.location.mapTitle}
                  src="https://www.google.com/maps?q=Al+Fattah+Al+Aleem+Mosque,+New+Administrative+Capital&z=13&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[360px] w-full grayscale-[30%]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ENTERTAINMENT */}
        <section id="entertainment" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head kicker={C.entertainment.kicker} title={C.entertainment.title} sub={C.entertainment.sub} center />
            <div className="flex flex-wrap justify-center gap-4">
              {C.entertainment.items.map((it) => {
                const I = ICONS[it.icon];
                return (
                  <div key={it.t} className="group w-[calc(50%-0.5rem)] rounded-3xl bg-white p-5 sm:w-[calc(33.33%-0.7rem)] lg:w-[calc(25%-0.75rem)] shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl sm:p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold-2 transition group-hover:bg-gold group-hover:text-ink">
                      <I className="h-6 w-6" />
                    </span>
                    <p className="mt-4 font-latin font-bold text-navy" dir="ltr">{it.t}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/65">{it.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INVEST */}
        <section className="relative isolate overflow-hidden bg-navy py-20 sm:py-28">
          <img src="/images/pyramids-city-light-gate.webp" alt="" aria-hidden loading="lazy" className="absolute inset-y-0 left-0 -z-10 h-full w-full object-cover opacity-20 lg:w-1/2 lg:opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-navy via-navy/95 to-navy/40" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Head kicker={C.invest.kicker} title={C.invest.title} light />
              <div className="grid gap-4 sm:grid-cols-2">
                {C.invest.items.map((it, i) => (
                  <div key={it.t} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <p className="font-latin text-sm font-bold text-gold">0{i + 1}</p>
                    <p className="mt-2 text-lg font-bold text-white">{it.t}</p>
                    <p className="mt-1 leading-7 text-white/70">{it.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MASTERPLAN */}
        <section id="masterplan" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head kicker={C.masterplan.kicker} title={C.masterplan.title} sub={C.masterplan.sub} />
            <img src="/images/pyramids-city-masterplan.webp" alt={C.masterplan.alt} width={1024} height={576} loading="lazy" className="w-full rounded-3xl shadow-xl" />
            <div className="mt-6 flex flex-wrap gap-2">
              {C.masterplan.zones.map((z) => (
                <span key={z} dir="ltr" className={`rounded-full px-4 py-2 font-latin text-sm font-medium ${z === "Metropolis" ? "bg-gold text-ink" : "bg-sand text-navy"}`}>
                  {z}{z === "Metropolis" && " · G+8 جديد"}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head kicker={C.gallery.kicker} title={C.gallery.title} center />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {C.gallery.images.map((im) => (
                <img key={im.src} src={im.src} alt={im.alt} width={1024} height={1024} loading="lazy" className={`aspect-square w-full rounded-2xl object-cover shadow-md transition hover:scale-[1.02]`} />
              ))}
            </div>
          </div>
        </section>

        {/* EOI */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head kicker={C.eoi.kicker} title={C.eoi.title} center />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {C.eoi.steps.map((s, i) => (
                <li key={s.t} className="relative rounded-3xl bg-sand p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-latin text-lg font-bold text-gold-2">{i + 1}</span>
                  <p className="mt-4 text-lg font-bold text-navy">{s.t}</p>
                  <p className="mt-1 leading-7 text-ink/70">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Head kicker={C.faq.kicker} title={C.faq.title} center />
            <div className="space-y-3">
              {C.faq.items.map((f, i) => (
                <details key={f.q} open={i === 0} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                    <h3>{f.q}</h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gold transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 leading-8 text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative isolate overflow-hidden bg-ink py-20 sm:py-28">
          <img src="/images/pyramids-mall-night.webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div className="text-white">
              <img src="/brand/pyramids-city-logo-white.png" alt="Pyramids City" width={288} height={290} loading="lazy" className="mb-6 h-20 w-auto" />
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{C.cta.title}</h2>
              <p className="mt-4 text-lg text-gold-2">{C.cta.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <WaButton source="footer-cta" className="btn btn-wa px-7 py-3.5" />
                <CallButton source="footer-cta" className="btn btn-ghost px-7 py-3.5" />
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <p className="mb-5 text-xl font-bold text-navy">سجّل اهتمامك – EOI 200 ألف</p>
              <LeadForm source="footer-cta" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-28 pt-10 text-sm text-white/60 sm:pb-10">
        <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6">
          <p className="leading-7">{C.disclosure}</p>
          <p className="leading-7">{C.priceNote}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <p>© {new Date().getFullYear()} {SITE.brand} – وسيط عقاري مستقل</p>
            <div className="flex items-center gap-4">
              <PrivacyLink className="hover:text-gold-2" />
              <a href={`tel:${SITE.phoneIntl}`} dir="ltr" className="text-gold-2">{SITE.phone}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
