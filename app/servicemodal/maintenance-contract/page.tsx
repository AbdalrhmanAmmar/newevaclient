import MaintenanceContractForm from "@/components/service/servicetypeform/MaintenanceContractForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function InfoPage() {
  return <MaintenanceContractForm />;
}
