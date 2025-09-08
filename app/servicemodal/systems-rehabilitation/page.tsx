import RehabilitationForm from "@/components/service/servicetypeform/RehabilitationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إعادة تأهيل الأنظمة - إيفا للأمن والسلامة",
  description: "إعادة تأهيل وتحديث أنظمة الأمن والسلامة القديمة. ترقية التقنيات، استبدال المكونات، وتحسين الأداء لضمان الكفاءة والموثوقية.",
  keywords: "إعادة تأهيل الأنظمة, تحديث أنظمة الأمن, ترقية أنظمة السلامة, تحسين الأداء, استبدال المكونات"
};

export default function InfoPage() {
  return <RehabilitationForm />;
}
