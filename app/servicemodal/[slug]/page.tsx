// app/servicemodal/[slug]/page.tsx
"use client"

import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { createSafetyRequest } from '@/lib/api/ServiceForm'
import { useRouter } from 'next/navigation'
import { services } from './../../../components/service/ServiceClient';
import { serviceFormSchema, ServiceFormValues } from '@/components/service/ServiceFormValues'

export default function ServicePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // العثور على الخدمة المحددة بناءً على الـ slug
  const service = services.find(s => s.slug === params.slug)
  
  const defaultValues: ServiceFormValues = {
    nameService: service?.title || "",
    interiorNumber: "",
    commercialRegisterNumber: "",
    activityCode: "",
    shopArea: 0,
    region: "",
    city: "",
    neighborhood: "",
    street: "",
    signName: "",
    buildingArea: 0,
    mobile: "",
    clientName:"",
    extinguishersCount: 0,
    smokeDetectorsCount: 0,
    emergencyLightsCount: 0
  }

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: defaultValues
  })

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value
    const numValue = value === '' ? 0 : Number(value)
    if (!isNaN(numValue)) {
      field.onChange(numValue)
    }
  }

  const handleSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await createSafetyRequest(data)

      if (response?.error) {
        throw new Error(response.error.message || "حدث خطأ في الخادم")
      }

      toast.success("تم إرسال الطلب بنجاح سيتواصل فريق ايفاء معك", {
        position: "top-center",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          fontSize: "16px",
        },
      })

      router.push(`/`)
      form.reset()
    } catch (error: any) {
      console.error("Error submitting form:", error)
      const errorMessage = error.response?.data?.message
        || error.message
        || "حدث خطأ غير متوقع أثناء إرسال الطلب"
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!service) {
    return <div className="flex items-center justify-center h-screen">الخدمة غير موجودة</div>
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-primary/5 py-10 my-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-7xl p-10">
        
        {/* العنوان */}
        <div className="flex flex-col items-center justify-center mb-10">
          
          <h3 className="text-3xl font-bold text-center">طلب خدمة: {service.title}</h3>
          <p className="text-muted-foreground mt-2 text-center">
            {service.description}
          </p>
        </div>
        
        {/* ميزات الخدمة */}
   
        
        {/* الفورم */}
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {/* interiorNumber */}
            <FormField
              control={form.control}
              name="interiorNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرقم الوطني الموحد</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* commercialRegisterNumber */}
            <FormField
              control={form.control}
              name="commercialRegisterNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم السجل التجاري</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* activityCode */}
            <FormField
              control={form.control}
              name="activityCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كود النشاط</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* shopArea */}
            <FormField
              control={form.control}
              name="shopArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مساحة المحل</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => handleNumberInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* region */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المنطقة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* city */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدينة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* neighborhood */}
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الحي</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* street */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الشارع</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* signName */}
            <FormField
              control={form.control}
              name="signName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم اللوحة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* buildingArea */}
            <FormField
              control={form.control}
              name="buildingArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مساحة المبنى</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => handleNumberInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الجوال</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                        field.onChange(value)
                      }}
                      placeholder="05XXXXXXXX"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* extinguishersCount */}
            <FormField
              control={form.control}
              name="extinguishersCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الطفايات</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => handleNumberInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* smokeDetectorsCount */}
            <FormField
              control={form.control}
              name="smokeDetectorsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد كواشف الدخان</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => handleNumberInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* emergencyLightsCount */}
            <FormField
              control={form.control}
              name="emergencyLightsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد أضواء الطوارئ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => handleNumberInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 pt-6">
              <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}