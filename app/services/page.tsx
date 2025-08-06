
import ServiceClient from "@/components/service/ServiceClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVA - الخدمات",
  description: "استعرض خدماتنا المتميزة في مجال الأمن والحماية والتطوير العقاري",
};

export default function ServicesPage() {
  return <>
  <ServiceClient/>

  </>;
}