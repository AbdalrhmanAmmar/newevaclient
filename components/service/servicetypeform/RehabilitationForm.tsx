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
import { createRehabilitation } from "@/lib/api/services/RehabilitationApi"

const rehabFormSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
  address: z.string().min(1, "العنوان مطلوب"),
})

export type RehabFormValues = z.infer<typeof rehabFormSchema>

export default function RehabilitationForm({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RehabFormValues>({
    resolver: zodResolver(rehabFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  })

  const handleSubmit = async (data: RehabFormValues) => {
    setIsSubmitting(true)
    try {
      // Call the API
      await createRehabilitation(data)
      
      toast.success("✅ تم إرسال الطلب بنجاح", { position: "top-center" })
      form.reset()
      onClose?.()
      router.push('/')
    } catch (error: any) {
      console.error("API Error:", error)
      toast.error(error.message || "حدث خطأ أثناء إرسال الطلب")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-yellow-50 py-10 my-6">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-2xl p-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-3xl font-bold text-center text-yellow-600">إعادة تأهيل</h3>
          <p className="text-muted-foreground mt-2 text-center">الرجاء ملء البيانات التالية</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-6">
            {/* الاسم */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            {/* رقم الجوال */}
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الجوال</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            {/* العنوان */}
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <div className="pt-4">
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