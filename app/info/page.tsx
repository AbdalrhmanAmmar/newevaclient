import InfoClient from "@/components/Info/InfoClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا - إيفا للأمن والسلامة",
  description: "تواصل مع إيفا للأمن والسلامة للحصول على استشارة مجانية أو طلب خدمة. فريقنا المتخصص جاهز لمساعدتكم في جميع احتياجاتكم من أنظمة الأمن والسلامة.",
  keywords: "تواصل معنا, استشارة مجانية, خدمة العملاء, إيفا للأمن والسلامة, طلب خدمة"
};

export default function InfoPage() {
  return <InfoClient />;
}
