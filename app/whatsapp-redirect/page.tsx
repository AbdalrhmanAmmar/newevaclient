import WhatsAppRedirect from "@/components/whatsapp/whatsapp-redirect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function InfoPage() {
  return <WhatsAppRedirect />;
}
