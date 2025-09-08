import { Metadata } from 'next'
import FireExtinguisherMaintenanceForm from "@/components/service/servicetypeform/FireExtinguisherMaintenanceForm"

export const metadata: Metadata = {
  title: 'صيانة وتعبئة طفايات الحريق - إيفا للأمن والسلامة',
  description: 'خدمات صيانة وتعبئة طفايات الحريق المتخصصة. فحص دوري شامل، تعبئة جميع الأنواع، استبدال القطع التالفة، وإصدار شهادات معتمدة. خدمة سريعة وموثوقة.',
  keywords: 'صيانة طفايات الحريق, تعبئة طفايات الحريق, فحص طفايات الحريق, شهادات صيانة معتمدة, خدمات الأمن والسلامة'
}

export default function FireExtinguisherMaintenancePage() {
  return (
    <div className="min-h-screen">
      <FireExtinguisherMaintenanceForm />
    </div>
  )
}