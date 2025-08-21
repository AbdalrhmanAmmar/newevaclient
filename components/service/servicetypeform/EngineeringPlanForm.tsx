"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createEngineeringPlan } from "@/lib/api/services/engineeringPlan"

const engineeringPlanSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
  activity: z.string().min(1, "النشاط مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  ownerId: z.any().optional(),
  ownershipDoc: z.any().optional(),
})

export type EngineeringPlanValues = z.infer<typeof engineeringPlanSchema>

export default function EngineeringPlanForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EngineeringPlanValues>({
    resolver: zodResolver(engineeringPlanSchema),
    defaultValues: {
      name: "",
      phone: "",
      activity: "",
      address: "",
    },
  })

  const handleSubmit = async (data: EngineeringPlanValues) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('phone', data.phone)
      formData.append('activity', data.activity)
      formData.append('address', data.address)
      
      if (data.ownerId) {
        formData.append('ownerId', data.ownerId)
      }
      
      if (data.ownershipDoc) {
        formData.append('ownershipDoc', data.ownershipDoc)
      }

      await createEngineeringPlan(formData)
      
      toast.success("تم إرسال الطلب بنجاح")
      form.reset()
      onClose?.()
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إرسال الطلب")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-yellow-50 py-10 my-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-3xl p-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-3xl font-bold text-center text-yellow-600">مخطط هندسي</h3>
          <p className="text-muted-foreground mt-2 text-center">الرجاء ملء البيانات المطلوبة</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="activity" render={({ field }) => (
                <FormItem>
                  <FormLabel>النشاط المطلوب</FormLabel>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="ownerId" render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>هوية المالك</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="ownershipDoc" render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>صك الملكية</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}