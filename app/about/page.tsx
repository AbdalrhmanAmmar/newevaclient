import AboutUs from "@/components/About/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن - إيفا للأمن والسلامة",
  description: "تعرف على إيفا للأمن والسلامة، الشركة الرائدة في مجال أنظمة الأمن والسلامة. خبرة واسعة في توريد وتركيب وصيانة أنظمة الحماية المعتمدة من الدفاع المدني.",
  keywords: "من نحن, إيفا للأمن والسلامة, شركة أمن وسلامة, خبرة في الأمن والسلامة, خدمات معتمدة"
};

export default function AboutPage() {
  return <AboutUs />;
}