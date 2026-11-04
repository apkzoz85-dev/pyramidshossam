"use client";

import { MessageCircle, Phone } from "lucide-react";
import { telLink, track, waLink } from "@/lib/site";

export function WaButton({ source, className = "btn btn-wa px-6 py-3", label = "كلّمنا واتساب" }: { source: string; className?: string; label?: string }) {
  return (
    <a href={waLink()} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { source })} className={className}>
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

export function CallButton({ source, className = "btn btn-gold px-6 py-3", label = "اتصل الآن" }: { source: string; className?: string; label?: string }) {
  return (
    <a href={telLink} onClick={() => track("call_click", { source })} className={className}>
      <Phone className="h-5 w-5" /> {label}
    </a>
  );
}

export function PrivacyLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))} className={className}>
      سياسة الخصوصية
    </button>
  );
}
