import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'EVA | الأمن والحماية | قريباً',
  description: 'EVA متخصصة في حلول الأمن المتقدمة. موقعنا قيد الصيانة حالياً.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
     
      <body className={inter.className}>
         <Navbar/>
        {children}
             <WhatsAppButton />
        <Footer/>
      
        </body>
    </html>
  );
}
