//@ts-nocheck
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
import { createSafetySystemsInstallation } from "@/lib/api/services/safety-systems-installation"

// API function


// Schema validation
const safetyPlanSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الهاتف غير صحيح"),
  safetyPlanFile: z.any().optional(),
})

export type SafetyPlanValues = z.infer<typeof safetyPlanSchema>

function SafetySystemsInstallationForm({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SafetyPlanValues>({
    resolver: zodResolver(safetyPlanSchema),
    defaultValues: {
      name: "",
      phone: "",
      safetyPlanFile: null,
    },
  })

  const handleSubmit = async (data: SafetyPlanValues) => {
    setIsSubmitting(true)
    try {
      // API call
      await createSafetySystemsInstallation({
        name: data.name,
        phone: data.phone,
        safetyPlanFile: data.safetyPlanFile
      })

      toast.success("✅ تم إرسال الطلب بنجاح", { position: "top-center" })
      form.reset()
      onClose?.()
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ غير متوقع")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-yellow-50 py-10 my-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-3xl p-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-3xl font-bold text-center text-yellow-600">
            توريد وتركيب أنظمة السلامة
          </h3>
          <p className="text-muted-foreground mt-2 text-center">الرجاء ملء البيانات المطلوبة</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6">

            {/* الاسم + الهاتف */}
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

            {/* ملف مخطط السلامة */}
            <FormField control={form.control} name="safetyPlanFile" render={({ field }) => (
              <FormItem>
                <FormLabel>مخطط السلامة</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => document.getElementById("safetyPlanFile")?.click()}
                    >
                      اختر ملف
                    </Button>
                    <span className="text-sm text-gray-600 truncate max-w-[120px]">
                      {field.value?.name || "لم يتم اختيار ملف"}
                    </span>
                    <Input
                      id="safetyPlanFile"
                      type="file"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

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

export default SafetySystemsInstallationForm