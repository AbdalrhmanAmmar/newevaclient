// "use client"

// import { Button } from '@/components/ui/button'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { serviceFormSchema, ServiceFormValues } from './ServiceFormValues'
// import { useState } from 'react'
// import { toast } from 'sonner'
// import { createSafetyRequest } from '@/lib/api/ServiceForm'
// import {useRouter } from 'next/navigation'


// interface ServiceOpenModalProps {
//   isOpen: boolean
//   onClose: () => void
//   serviceTitle: string
// }

// function ServiceOpenModal({ isOpen, onClose, serviceTitle }: ServiceOpenModalProps) {
//   const router = useRouter()
//   const defaultValues: ServiceFormValues = {
//     interiorNumber: "",
//     commercialRegisterNumber: "",
//     activityCode: "",
//     shopArea: 0,
//     region: "",
//     city: "",
//     neighborhood: "",
//     street: "",
//     signName: "",
//     buildingArea: 0,
//     mobile: "",
//     extinguishersCount: 0,
//     smokeDetectorsCount: 0,
//     emergencyLightsCount: 0
//   }

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const form = useForm<ServiceFormValues>({
//     resolver: zodResolver(serviceFormSchema),
//     defaultValues: defaultValues
//   })

//   const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
//     const value = e.target.value
//     const numValue = value === '' ? 0 : Number(value)
    
//     if (!isNaN(numValue)) {
//       field.onChange(numValue)
//     }
//   }

//   const handleSubmit = async (data: ServiceFormValues) => {
//     setIsSubmitting(true)
//     try {
//       const response = await createSafetyRequest(data)
      
//       if (response?.error) {
//         throw new Error(response.error.message || "حدث خطأ في الخادم")
//       }

//       toast.success("تم إرسال الطلب بنجاح")
//       router.push(`/RequestConfirmation`)
//       form.reset()
//       onClose()
//     } catch (error: any) {
//       console.error("Error submitting form:", error)
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || "حدث خطأ غير متوقع أثناء إرسال الطلب"
//       toast.error(errorMessage)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-bold">طلب خدمة: {serviceTitle}</h3>
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
          
//           <div className="mb-6">
//             <div className="text-lg font-medium mb-4 text-center">
//               الرجاء ملء الفورم بالكامل لطلب الخدمة
//             </div>
            
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="interiorNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الرقم الداخلي</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="commercialRegisterNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>رقم السجل التجاري</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="activityCode"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>كود النشاط</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="shopArea"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>مساحة المحل</FormLabel>
//                       <FormControl>
//                         <Input 
//                           type="number"
//                           min="1"
//                           {...field}
//                           onChange={(e) => handleNumberInputChange(e, field)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="region"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>المنطقة</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="city"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>المدينة</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="neighborhood"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الحي</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="street"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الشارع</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="signName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>اسم اللوحة</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="buildingArea"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>مساحة المبنى</FormLabel>
//                       <FormControl>
//                         <Input 
//                           type="number"
//                           min="1"
//                           {...field}
//                           onChange={(e) => handleNumberInputChange(e, field)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="mobile"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>رقم الجوال</FormLabel>
//                       <FormControl>
//                         <Input 
//                           {...field} 
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
//                             field.onChange(value)
//                           }}
//                           placeholder="05XXXXXXXX"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="extinguishersCount"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>عدد الطفايات</FormLabel>
//                       <FormControl>
//                         <Input 
//                           type="number"
//                           min="0"
//                           {...field}
//                           onChange={(e) => handleNumberInputChange(e, field)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="smokeDetectorsCount"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>عدد كواشف الدخان</FormLabel>
//                       <FormControl>
//                         <Input 
//                           type="number"
//                           min="0"
//                           {...field}
//                           onChange={(e) => handleNumberInputChange(e, field)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <FormField
//                   control={form.control}
//                   name="emergencyLightsCount"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>عدد أضواء الطوارئ</FormLabel>
//                       <FormControl>
//                         <Input 
//                           type="number"
//                           min="0"
//                           {...field}
//                           onChange={(e) => handleNumberInputChange(e, field)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
                
//                 <div className="md:col-span-2 pt-4">
//                   <Button type="submit" className="w-full" disabled={isSubmitting}>
//                     {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ServiceOpenModal