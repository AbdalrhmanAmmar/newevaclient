import WhatsAppRedirect from "@/components/whatsapp/whatsapp-redirect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVA - الأمن والحماية",
  description: "صفحة معلومات الاتصال",
};

export default function InfoPage() {
  return <WhatsAppRedirect />;
}
