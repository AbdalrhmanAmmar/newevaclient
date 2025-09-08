import SafetySystemsInstallationForm from "@/components/service/servicetypeform/SafetySystemsInstallationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تركيب أنظمة السلامة - إيفا للأمن والسلامة",
  description: "تركيب وتشغيل أنظمة السلامة المتطورة. أنظمة إنذار الحريق، كاميرات المراقبة، أنظمة التحكم في الدخول، وحلول الأمان المتكاملة.",
  keywords: "تركيب أنظمة السلامة, أنظمة إنذار الحريق, كاميرات المراقبة, أنظمة التحكم في الدخول, حلول الأمان"
};

export default function InfoPage() {
  return <SafetySystemsInstallationForm />;
}