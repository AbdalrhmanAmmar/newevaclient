import AboutUs from "@/components/About/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVA - من نحن",
  description: "تعرف على خدماتنا في الأمن والحماية، التطوير العقاري، وإدارة الأملاك",
};

export default function AboutPage() {
  return <AboutUs />;
}