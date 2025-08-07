"use client";

import { IContactForm, submitContactForm } from "@/lib/api/Form";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const initialFormState: IContactForm = {
  Fullname: "",
  PhoneNumber: "",
  Details: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<IContactForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.Fullname.trim()) {
      toast.error("الاسم الكامل مطلوب");
      return false;
    }
    
    if (!formData.PhoneNumber.trim()) {
      toast.error("رقم الهاتف مطلوب");
      return false;
    }
    
    if (!formData.Details.trim()) {
      toast.error("تفاصيل الرسالة مطلوبة");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      toast.success("تم ارسال طلبك بنجاح سوف يتم مراجعته من قبل فريقنا", {
        duration: 5000,
        position: "top-right",
      });
      setFormData(initialFormState);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("حدث خطأ أثناء إرسال النموذج. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="Fullname"
          value={formData.Fullname}
          onChange={handleChange}
          placeholder="الاسم الكامل"
          aria-label="الاسم الكامل"
          className="w-full px-4 py-2 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          aria-label="رقم الهاتف"
          className="w-full px-4 py-2 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
          disabled={isSubmitting}
        />

        <textarea
          name="Details"
          value={formData.Details}
          onChange={handleChange}
          placeholder="تفاصيل الخدمه التي تريدها"
          aria-label="تفاصيل الرسالة"
          rows={3}
          className="w-full px-4 py-2 bg-primary/5 border border-primary/10 rounded-lg resize-none focus:outline-none focus:border-primary transition-colors"
          disabled={isSubmitting}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "جاري الإرسال..." : "إرسال"}
      </motion.button>
    </form>
  );
}