import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";
import { C } from "@/lib/content";
import Overlays from "@/components/Overlays";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: C.meta.title,
  description: C.meta.description,
  keywords: C.meta.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    title: C.meta.title,
    description: C.meta.description,
    images: [{ url: "/images/pyramids-mall-night.webp", width: 1024, height: 1024, alt: "بيراميدز سيتي العاصمة الإدارية" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0c1524", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
        />
        {SITE.gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`}
          </Script>
        )}
        {SITE.adsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.adsId}`} strategy="afterInteractive" />
            <Script id="gtag" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.adsId}');`}
            </Script>
          </>
        )}
      </head>
      <body>
        {SITE.gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        {children}
        <Overlays />
      </body>
    </html>
  );
}
