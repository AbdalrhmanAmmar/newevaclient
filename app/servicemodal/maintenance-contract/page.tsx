import MaintenanceContractForm from "@/components/service/servicetypeform/MaintenanceContractForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عقود الصيانة الشاملة - إيفا للأمن والسلامة",
  description: "عقود صيانة شاملة لأنظمة الأمن والسلامة. صيانة دورية، فحص شامل، استبدال القطع، وضمان الجودة. خدمات موثوقة ومعتمدة لحماية منشآتكم.",
  keywords: "عقود الصيانة, صيانة أنظمة الأمن, صيانة أنظمة السلامة, عقود الصيانة الشاملة, خدمات الصيانة المعتمدة"
};

export default function InfoPage() {
  return <MaintenanceContractForm />;
}
