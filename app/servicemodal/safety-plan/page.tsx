import SafetyPlanForm from "@/components/service/servicetypeform/SafetyPlanForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "خطة السلامة والطوارئ - إيفا للأمن والسلامة",
  description: "إعداد خطط السلامة والطوارئ الشاملة للمنشآت. تقييم المخاطر، إجراءات الإخلاء، خطط الاستجابة للطوارئ، وبرامج التدريب المتخصصة.",
  keywords: "خطة السلامة, خطة الطوارئ, تقييم المخاطر, إجراءات الإخلاء, برامج التدريب, السلامة المهنية"
};

export default function InfoPage() {
  return <SafetyPlanForm />;
}
