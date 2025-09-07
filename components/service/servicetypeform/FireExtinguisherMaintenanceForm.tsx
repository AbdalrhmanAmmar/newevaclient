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
import { createFireExtinguisherMaintenance } from "@/lib/api/services/FireExtinguisherMaintenanceApi"

const fireExtinguisherFormSchema = z.object({
  fullName: z.string().min(2, "الاسم بالكامل مطلوب"),
  phone: z.string().min(9, "رقم الهاتف غير صحيح"),
  extinguishers: z.array(
    z.object({
      type: z.string().min(1, "نوع الطفاية مطلوب"),
      weight: z.string().min(1, "وزن الطفاية مطلوب"),
      count: z.string().min(1, "العدد مطلوب"),
      serviceType: z.string().min(1, "نوع الخدمة مطلوب"),
    })
  ),
})

export type FireExtinguisherFormValues = z.infer<typeof fireExtinguisherFormSchema>

function FireExtinguisherMaintenanceForm({
  serviceTitle = "صيانة وتعبئة طفايات الحريق",
  isOpen = true,
  onClose,
}: {
  serviceTitle?: string
  isOpen?: boolean
  onClose?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FireExtinguisherFormValues>({
    resolver: zodResolver(fireExtinguisherFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      extinguishers: [{ type: "", weight: "", count: "", serviceType: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "extinguishers",
  })

  const handleSubmit = async (data: FireExtinguisherFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await createFireExtinguisherMaintenance(data)

      if (response) {
        toast.success('✅ تم إرسال الطلب بنجاح', { position: 'top-center' })
        router.push(`/`)
        form.reset()
        onClose?.()
      }
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ غير متوقع')
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
            
            {/* معلومات العميل */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الاسم بالكامل */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم بالكامل</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-yellow-400 focus:ring-yellow-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* رقم الهاتف */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-yellow-400 focus:ring-yellow-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* قسم الطفايات */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-yellow-600">تفاصيل الطفايات</h4>
              {fields.map((item, index) => (
                <div key={item.id} className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    
                    {/* نوع الطفاية */}
                    <FormField
                      control={form.control}
                      name={`extinguishers.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع الطفاية</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                              <SelectValue placeholder="اختر نوع الطفاية" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="powder">بودرة جافة</SelectItem>
                              <SelectItem value="co2">ثاني أكسيد الكربون</SelectItem>
                              <SelectItem value="foam">فوم</SelectItem>
                              <SelectItem value="water">مائية</SelectItem>
                              <SelectItem value="wet-chemical">كيماوية رطبة</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* وزن الطفاية */}
                    <FormField
                      control={form.control}
                      name={`extinguishers.${index}.weight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وزن الطفاية (كجم)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                              <SelectValue placeholder="اختر الوزن" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 كجم</SelectItem>
                              <SelectItem value="2">2 كجم</SelectItem>
                              <SelectItem value="4">4 كجم</SelectItem>
                              <SelectItem value="6">6 كجم</SelectItem>
                              <SelectItem value="9">9 كجم</SelectItem>
                              <SelectItem value="12">12 كجم</SelectItem>
                              <SelectItem value="25">25 كجم</SelectItem>
                              <SelectItem value="50">50 كجم</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* العدد */}
                    <FormField
                      control={form.control}
                      name={`extinguishers.${index}.count`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العدد</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number" 
                              min="1" 
                              className="border-yellow-400 focus:ring-yellow-500" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* نوع الخدمة */}
                    <FormField
                      control={form.control}
                      name={`extinguishers.${index}.serviceType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع الخدمة</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                              <SelectValue placeholder="اختر نوع الخدمة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maintenance">صيانة</SelectItem>
                              <SelectItem value="refill">تعبئة</SelectItem>
                              <SelectItem value="both">صيانة وتعبئة</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* أزرار الإضافة والحذف */}
                  <div className="flex justify-end gap-2">
                    {index === fields.length - 1 && (
                      <Button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => append({ type: "", weight: "", count: "", serviceType: "" })}
                      >
                        إضافة طفاية أخرى +
                      </Button>
                    )}
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        حذف
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* زر الإرسال */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-3 text-lg"
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

export default FireExtinguisherMaintenanceForm