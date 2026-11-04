"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { C } from "@/lib/content";
import { SITE, telLink, track } from "@/lib/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition ${solid || open ? "bg-ink/95 shadow-lg backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src="/brand/pyramids-city-logo-white.png" alt="بيراميدز سيتي Pyramids City" width={288} height={290} className="h-11 w-auto sm:h-12" />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/85 lg:flex">
          {C.nav.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-gold-2">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={telLink} onClick={() => track("call_click", { source: "header" })} className="btn btn-gold px-4 py-2 text-sm">
            <Phone className="h-4 w-4" />
            <span dir="ltr" className="font-latin">{SITE.phone}</span>
          </a>
          <button onClick={() => setOpen(!open)} aria-label="القائمة" className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 lg:hidden">
          {C.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-3 text-white/90">
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
