// app/page.tsx
"use client";

import Script from "next/script";
import AboutUs from "@/components/Home/AboutUs";
import HeroSection from "@/components/Home/HeroSection";
import WhyChooseUs from "@/components/Home/chooseUs";
import { OurClients } from "@/components/Home/OurClient";
import CustomerReviews from "@/components/Home/CustomerReviews";
import ServicesSection from "@/components/Home/ServicesSection";

export default function Page() {
  return (
    <div>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17429700835"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17429700835');
        `}
      </Script>

      <HeroSection />
      <AboutUs />
      <WhyChooseUs />
      <ServicesSection />
      <OurClients />
      <CustomerReviews />
    </div>
  );
}
