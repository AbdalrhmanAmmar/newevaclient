import { z } from "zod";

export const serviceFormSchema = z.object({
  interiorNumber: z.string()
    .min(1, "الرقم الداخلي مطلوب"),
  
  commercialRegisterNumber: z.string()
    .min(1, "رقم السجل التجاري مطلوب"),
  
  activityCode: z.string()
    .min(1, "كود النشاط مطلوب"),
  
  shopArea: z.number()
    .min(1, "يجب أن تكون مساحة المحل أكبر من 0"),
  
  region: z.string()
    .min(1, "المنطقة مطلوبة"),
  
  city: z.string()
    .min(1, "المدينة مطلوبة"),
  
  neighborhood: z.string()
    .min(1, "الحي مطلوب"),
  
  street: z.string()
    .min(1, "الشارع مطلوب"),
  
  signName: z.string()
    .min(1, "اسم اللوحة مطلوب"),
  
  buildingArea: z.number()
    .min(1, "يجب أن تكون مساحة المبنى أكبر من 0"),
  
  mobile: z.string()
    .min(10, "يجب أن يتكون رقم الجوال من 10 أرقام")
    .max(10, "يجب أن يتكون رقم الجوال من 10 أرقام")
    .regex(/^05\d{8}$/, "يجب أن يبدأ رقم الجوال بـ 05"),
  
  extinguishersCount: z.number()
    .min(0, "يجب أن يكون العدد 0 أو أكثر"),
  
  smokeDetectorsCount: z.number()
    .min(0, "يجب أن يكون العدد 0 أو أكثر"),
  
  emergencyLightsCount: z.number()
    .min(0, "يجب أن يكون العدد 0 أو أكثر")
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;