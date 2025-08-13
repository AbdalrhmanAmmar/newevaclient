// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import Script from "next/script";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://evasaudi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ايفاء العقارية لأنظمة الأمن والسلامة | أنظمة إنذار ومكافحة حريق ومراقبة",
  description:
    "ايفاء العقارية لأنظمة الأمن والسلامة: توريد وتركيب وصيانة أنظمة الإنذار ومكافحة الحريق، وكاميرات المراقبة، وأنظمة الدخول، وخدمات السلامة المهنية للمصانع والمباني والمنشآت.",
  keywords: [
"تصريح الدفاع المدني",
"محلات السلامة",
"دفاع مدني",
"لانظمة الامن والسلامة",
"محلات ادوات السلامة بالرياض",
"نجوم الهندسة",
"دورة أمن وسلامة عن بعد",
"شهادة سلامة الدفاع المدني",
"دفاع مدني سلامة",
"السلامة والصحة المهنية",
"عن الامن والسلامه",
"انظمة امن وسلامة",
"شركات السلامة بالرياض",
"تعبئة طفايات الحريق الرياض",
"شركات الأمن والسلامة في السعودية",
"شركات السلامة المعتمدة من الدفاع المدني جدة",
"طرق الامن والسلامه",
"الدفاع المدني",
"طفايات حريق",
"معدات الامن والسلامه",
"شركات هندسة في السعودية",
"خدمات الدفاع المدني",
"امن وسلامه",
"محل ادوات الامن والسلامة",
"ادوات سلامة الرياض",
"امن سلامة",
"معدات السلامة",
"شركة طفايات حريق",
"شركات مكافحة الحريق في السعودية",
"الأمن الصناعى",
"شركات الامن والسلامة بالرياض",
"شركة سلامة",
"أفضل شهادة في الأمن والسلامة",
"تقرير فني للدفاع المدني",
"محلات السلامة في الرياض",
"كيفية الحصول على شهادة السلامة والصحة المهنية",
"الامن والسلامة في بيئة العمل",
"الصحة والسلامة المهنية",
"امن وسلامة",
"ادوات امن وسلامة",
"امن وسلامة جدة",
"محلات الامن والسلامة",
"رخصة الدفاع المدني",
"صيانة طفايات الحريق",
"بيع ادوات السلامه",
"دورة الصحة والسلامة المهنية",
"متجر أدوات السلامة",
"متطلبات الدفاع المدني",
"ادوات السلامة الدفاع المدني",
"الامن والسلامه",
"موقع سلامة الدفاع المدني",
"امن الصناعي",
"معدات الامن والسلامة المهنية",
"انظمة الدفاع المدني",
"شهادة تركيب ادوات الوقاية والحماية من الحريق",
"عقد صيانة سلامة",
"مواد السلامة",
"محلات بيع أدوات الأمن والسلامة",
"السلامة المهنية",
"تعبئة طفايات الحريق",
"خدمات هندسية",
"شركة الامن والسلامه",
"شهادة امن وسلامه",
"تقرير سلامة الدفاع المدني",
"صور ادوات السلامه",
"شركة امن وسلامه",
"محلات السلامه الرياض",
"شهادة السلامة والصحة المهنية",
"محلات الامن والسلامه",
"محلات ادوات سلامة",
"شركات الامن والسلامة",
"ادوات سلامة",
"قسم الامن والسلامة",
"شركات السلامة في الرياض",
"تصريح دفاع مدني",
"أمن و سلامة",
"اجهزة السلامة",
"أجهزة السلامة",
"مضخات حريق",
"تجديد رخصة الدفاع المدني",
"موضوع الامن والسلامة",
"البناء الهندسي",
"الدفاع المدنى",
"وحدة الامن والسلامة",
"لمعدات السلامة",
"عمل الامن والسلامه",
"شركة امن وسلامة",
"ترخيص سلامة",
"ترخيص الدفاع المدني",
"الدفاع المدني سلامة",
"نظام الامن والسلامة",
"مؤسسة سلامة",
"اجهزة الامن والسلامة",
"مشروع عن الامن والسلامة",
"محل أدوات سلامة",
"انظمة الامن والسلامة",
"محلات امن وسلامة في الرياض",
"شركات سلامة الرياض",
"شهادة السلامة من الدفاع المدني",
"ادوات السلامة",
"الامن والسلامة",
"شركات سلامة",
"مكتب هندسية",
"ادوات امن وسلامه",
"امن و سلامة",
"شهادة الامن والسلامة",
"شهادة الدفاع المدني",
"دورة الامن والسلامة",
"بيع ادوات السلامة",
"الأمن والسلامة الدفاع المدني",
"محلات بيع ادوات الامن والسلامة",
"محلات امن وسلامه",
"مكتب للاستشارات",
"شركات الهندسة في السعودية",
"شركة هندسيه",
"مؤسسة السلامه",
"دورة امن وسلامة",
"مكتب امن وسلامة",
"ادوات الامن",
"شركة امن وسلامة الرياض",
"طفايات حريق الرياض",
"الامن والسلامة المهنية",
"شهادة أمن وسلامة",
"الدفاع المدني الأمن والسلامة",
"شهادة السلامه",
"غرف الغاز",
"أمن وسلامه",
"انظمة السلامة",
"محلات السلامة في جدة",
"معدات الأمن والسلامة",
"محلات ادوات السلامة",
"تقرير الامن والسلامة",
"مؤسسة امن وسلامة",
"تقرير سلامة من الدفاع المدني",
"شهادة تركيب ادوات السلامة",
"شركات امن وسلامة في جدة",
"مشروع الامن والسلامة",
"محلات بيع معدات الأمن والسلامة",
"مستلزمات السلامه",
"شهادة سلامة",
"شهادة أمن وسلامة معتمدة"

  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ايفاء العقارية لأنظمة الأمن والسلامة",
    description:
      "حلول أمن وسلامة متكاملة: إنذار ومكافحة الحريق، المراقبة، التحكم في الدخول، وخطط الإخلاء.",
    siteName: "ايفاء العقارية",
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: "ايفاء العقارية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ايفاء العقارية لأنظمة الأمن والسلامة",
    description:
      "توريد وتركيب وصيانة أنظمة الأمن والسلامة للمؤسسات والأفراد.",
    images: [`${siteUrl}/og.jpg`],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ايفاء العقارية لأنظمة الأمن والسلامة",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/evaSaudiRealestate",
      "https://www.instagram.com/evasaudirealestate",
      "https://wa.me/966540800987"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966540800987",
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic"]
    },
    description:
      "توفير أنظمة وخدمات الأمن والسلامة المتكاملة: إنذار ومكافحة الحريق، كاميرات المراقبة، التحكم في الدخول، وخطط الإخلاء."
  };

  // يساعد جوجل يفهم وجود صندوق بحث وسيتلينكس
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "ايفاء العقارية لأنظمة الأمن والسلامة",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // يعرّف عناصر التنقل المهمة (بيساعد على ظهور الأزرار تحت نتيجة البحث)
  const navJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "اتصل بنا",
        url: `+966540800987`
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "تواصل واتساب",
        url: "https://wa.me/966540800987"
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "الخدمات",
        url: `${siteUrl}/service`
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZDKDP7V97P"
          strategy="afterInteractive"
        />
        {/* Google Analytics init */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZDKDP7V97P');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Toaster />
          <WhatsAppButton />
          <Footer />
        </ThemeProvider>

        {/* Structured Data */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="nav-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navJsonLd) }}
        />


      </body>
    </html>
  );
}
