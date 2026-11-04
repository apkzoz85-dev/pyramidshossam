# Pyramids City – Landing Page (Grandeur Spaces – وسيط مستقل)

Next.js 16.4.5 · React 19.3 · Tailwind 4 · عربي RTL · صفحة واحدة + /thank-you (noindex)

## قبل الرفع — عدّل `lib/site.ts`
- `url` → الدومين النهائي (أو env `NEXT_PUBLIC_SITE_URL` على Vercel)
- `gtmId` / `adsId` / `conversions` → أكواد التتبع (فاضية حاليًا = مش هتتحمّل)

## التتبع
dataLayer events: `lead_form`, `whatsapp_click`, `call_click` (+ `source`, `project`).
لو حطيت Conversion Labels في `conversions` هتتبعت تلقائيًا بـ gtag.

## الفورم
بدون إيميل — زرارين: واتساب (رسالة جاهزة بالاسم والرقم ونوع الوحدة) أو اتصال، وبعدها /thank-you.

## المحتوى
كل النصوص في `lib/content.ts`.
