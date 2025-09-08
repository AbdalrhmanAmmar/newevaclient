
import ServiceClient from "@/components/service/ServiceClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا - إيفا للأمن والسلامة",
  description: "استعرض خدماتنا المتميزة في مجال الأمن والسلامة: أنظمة إنذار الحريق، كاميرات المراقبة، صيانة طفايات الحريق، عقود الصيانة، والخطط الهندسية المعتمدة.",
  keywords: "خدمات الأمن والسلامة, أنظمة إنذار الحريق, كاميرات المراقبة, صيانة طفايات الحريق, عقود الصيانة, خطط السلامة"
};

export default function ServicesPage() {
  return <>
  <ServiceClient/>

  </>;
}