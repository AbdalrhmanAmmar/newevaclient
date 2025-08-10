import InfoClient from "@/components/Info/InfoClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا ",
  description: "لديك استفسار أو طلب خدمة؟ تواصل معنا مباشرة من خلال الروابط المتاحة وسنرد عليك في أقرب وقت ممكن",
};

export default function InfoPage() {
  return <InfoClient />;
}
