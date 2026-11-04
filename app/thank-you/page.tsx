import type { Metadata } from "next";
import { Suspense } from "react";
import ThanksBody from "@/components/ThanksBody";

export const metadata: Metadata = {
  title: "شكرًا لتواصلك | بيراميدز سيتي",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <Suspense>
      <ThanksBody />
    </Suspense>
  );
}
