//@ts-nocheck
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createMaintenanceContract } from "@/lib/api/services/MaintenanceContractApi"

const serviceFormSchema = z.object({
  entityType: z.string().min(1, "اختيار الجهة مطلوب"),
  name: z.string().min(2, "الاسم مطلوب"),
  commercialRegisterNumber: z.string().min(1, "رقم السجل مطلوب"),
  pieceNumber: z.string().min(1, "رقم القطعة مطلوب"),
  maintenanceContract: z.instanceof(File).optional(),
  rentContract: z.instanceof(File).optional(),
  commercialRegisterFile: z.instanceof(File).optional(),
  buildingLicense: z.instanceof(File).optional(),
  phone: z.string().min(9, "رقم الهاتف غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  activity: z.string().min(1, "النشاط مطلوب"),
  vatNumber: z.string().min(1, "رقم الضريبة مطلوب"),
  extinguisherType: z.string().min(1, "نوع الطفاية مطلوب"),
  extinguisherWeight: z.string().min(1, "وزن الطفاية مطلوب"),
  extinguisherCount: z.string().min(1, "عدد الطفايات مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  planNumber: z.string().min(1, "رقم المخطط مطلوب"),
  area: z.string().min(1, "المساحة مطلوبة"),
  systems: z.array(
    z.object({
      system: z.string().min(1, "اختر النظام"),
      status: z.string().min(1, "اختر الحالة"),
    })
  ),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>

function MaintenanceContractForm({
  serviceTitle = "عقد صيانة",
  isOpen = true,
  onClose,
}: {
  serviceTitle?: string
  isOpen?: boolean
  onClose?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [entityLabel, setEntityLabel] = useState("الاسم")

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      entityType: "",
      name: "",
      commercialRegisterNumber: "",
      pieceNumber: "",
      phone: "",
      email: "",
      activity: "",
      vatNumber: "",
      extinguisherType: "",
      extinguisherWeight: "",
      extinguisherCount: "",
      address: "",
      planNumber: "",
      area: "",
      systems: [{ system: "", status: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "systems",
  })

  const handleSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'systems') {
          formData.append(key, JSON.stringify(value))
        } else if (value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      })

      // Add files to formData
      const fileFields = [
        'maintenanceContract',
        'rentContract',
        'commercialRegisterFile',
        'buildingLicense'
      ]
      
      fileFields.forEach(field => {
        if (data[field]) {
          formData.append(field, data[field])
        }
      })

      const response = await createMaintenanceContract(formData)
      
      if (response.error) {
        throw new Error(response.error.message || "حدث خطأ في الخادم")
      }

      toast.success("✅ تم إرسال الطلب بنجاح", { position: "top-center" })
      router.push(`/`)
      form.reset()
      onClose?.()
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ غير متوقع")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-yellow-50 py-10 my-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-7xl p-10">
        <div className="flex flex-col items-center justify-center mb-10">
          <h3 className="text-3xl font-bold text-center text-yellow-600">طلب {serviceTitle}</h3>
          <p className="text-muted-foreground mt-2 text-center">الرجاء ملء النموذج بالكامل</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-8">
            
            {/* First 4 fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Entity Type */}
              <FormField
                control={form.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>هل أنت شركة أم مؤسسة؟</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val)
                        setEntityLabel(val === "company" ? "اسم الشركة" : "اسم المؤسسة")
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">شركة</SelectItem>
                        <SelectItem value="organization">مؤسسة</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name */}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>{entityLabel}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Commercial Register */}
              <FormField control={form.control} name="commercialRegisterNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم السجل التجاري</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Piece Number */}
              <FormField control={form.control} name="pieceNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم القطعة</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {/* Next 4 fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField control={form.control} name="planNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم المخطط</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="area" render={({ field }) => (
                <FormItem>
                  <FormLabel>المساحة</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>الهاتف</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {/* Next 3 fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="activity" render={({ field }) => (
                <FormItem>
                  <FormLabel>النشاط</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="vatNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>الرقم الضريبي</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {/* Systems Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-yellow-600">الأنظمة والحالة</h4>
              {fields.map((item, index) => (
                <div key={item.id} className="flex w-full gap-2 items-end">
                  
                  {/* System */}
                  <FormField
                    control={form.control}
                    name={`systems.${index}.system`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>النظام</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                            <SelectValue placeholder="اختر النظام" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fire">نظام إنذار مبكر</SelectItem>
                            <SelectItem value="extinguisher">نظام الرش الآلي وصناديق الحريق</SelectItem>
                            <SelectItem value="fm200">نظام FM-200</SelectItem>
                            <SelectItem value="novec">نظام نوفيك 1230</SelectItem>
                            <SelectItem value="co2">نظام CO2</SelectItem>
                            <SelectItem value="firepro">نظام فاير برو</SelectItem>
                            <SelectItem value="kitchen">نظام كيتشن هود</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <div className="flex flex-1 items-end gap-2">
                    <FormField
                      control={form.control}
                      name={`systems.${index}.status`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>الحالة</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">يعمل</SelectItem>
                              <SelectItem value="inactive">لا يعمل</SelectItem>
                              <SelectItem value="needs-maintenance">يعمل ولكن يحتاج لصيانة</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex">
                      {index === fields.length - 1 && (
                        <Button
                          type="button"
                          className="h-10 px-3 bg-yellow-500 hover:bg-yellow-600 text-white ml-1"
                          onClick={() => append({ system: "", status: "" })}
                        >
                          ➕
                        </Button>
                      )}
                 
                      {index > 0 && (
                        <Button
                          type="button"
                          className="h-10 bg-red-500 text-white hover:bg-red-600"
                          onClick={() => remove(index)}
                        >
                          ❌
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Extinguisher Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <h4 className="text-xl font-semibold text-yellow-600 col-span-3">
                انواع الطفايات
              </h4>

              {/* Extinguisher Type */}
              <FormField
                control={form.control}
                name="extinguisherType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الطفاية</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="powder">بودرة</SelectItem>
                        <SelectItem value="co2">ثاني أكسيد الكربون</SelectItem>
                        <SelectItem value="foam">فوم</SelectItem>
                        <SelectItem value="water">مائية</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extinguisher Weight */}
              <FormField
                control={form.control}
                name="extinguisherWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وزن الطفاية</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                        <SelectValue placeholder="اختر الوزن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 كجم</SelectItem>
                        <SelectItem value="2">2 كجم</SelectItem>
                        <SelectItem value="3">3 كجم</SelectItem>
                        <SelectItem value="4">4 كجم</SelectItem>
                        <SelectItem value="6">6 كجم</SelectItem>
                        <SelectItem value="10">10 كجم</SelectItem>
                        <SelectItem value="12">12 كجم</SelectItem>
                        <SelectItem value="25">25 كجم</SelectItem>
                        <SelectItem value="50">50 كجم</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Extinguisher Count */}
              <FormField
                control={form.control}
                name="extinguisherCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الطفايات</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Files Section */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-600 col-span-3">
                الملفات المطلوب رفعها
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: "maintenanceContract", label: "عقد الصيانة" },
                  { name: "rentContract", label: "عقد الإيجار" },
                  { name: "commercialRegisterFile", label: "السجل التجاري" },
                  { name: "buildingLicense", label: "رخصة البناء" },
                ].map((fileField) => (
                  <FormField 
                    key={fileField.name} 
                    control={form.control} 
                    name={fileField.name} 
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>{fileField.label}</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Button 
                              type="button" 
                              className="bg-yellow-500 hover:bg-yellow-600 text-white" 
                              onClick={() => document.getElementById(fileField.name)?.click()}
                            >
                              اختر ملف
                            </Button>
                            <span className="text-sm text-gray-600 truncate max-w-[150px]">
                              {value?.name || "لم يتم اختيار ملف"}
                            </span>
                            <Input 
                              id={fileField.name} 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default MaintenanceContractForm