import EngineeringPlanForm from "@/components/service/servicetypeform/EngineeringPlanForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخطة الهندسية للأمن والسلامة - إيفا للأمن والسلامة",
  description: "تصميم وإعداد الخطط الهندسية المتخصصة لأنظمة الأمن والسلامة. دراسات فنية شاملة، تصاميم معتمدة، ومخططات تفصيلية لضمان أعلى معايير الحماية.",
  keywords: "الخطة الهندسية, تصميم أنظمة الأمن, تصميم أنظمة السلامة, المخططات الهندسية, الدراسات الفنية"
};

export default function InfoPage() {
  return <EngineeringPlanForm />;
}
