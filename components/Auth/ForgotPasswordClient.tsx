"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPasswordClient() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; general?: string }>({});

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^966\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!phone.trim()) {
    setErrors({ phone: "رقم الهاتف مطلوب" });
    return;
  }
  
  if (!validatePhone(phone)) {
    setErrors({ phone: "رقم الهاتف غير صحيح" });
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    const response = await fetch('http://localhost:4000/api/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsSubmitted(true);
      // حفظ رقم الهاتف و otpId للتحقق
      localStorage.setItem('resetPhone', phone);
      if (data.otpId) {
        localStorage.setItem('otpId', data.otpId);
      }
      router.push('/auth/verify?type=reset');
      toast.success("تم إرسال رمز التحقق بنجاح!");
    } else {
      const errorMsg = data.message || 'حدث خطأ في إرسال رمز التحقق';
      setErrors({ general: errorMsg });
      toast.error(errorMsg);
    }
  } catch (error) {
    const errorMsg = 'حدث خطأ في الاتصال بالخادم';
    setErrors({ general: errorMsg });
    toast.error(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      setPhone('966' + value);
    }
  };

  const displayPhone = phone.startsWith('966') ? phone.substring(3) : phone;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card shadow-xl rounded-2xl p-8 border border-muted">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center"
        >
          <Image
            src="/Images/black.png"
            alt="إيفاء Logo"
            width={90}
            height={90}
            className="object-cover mx-auto"
            quality={100}
            priority
          />
          <h2 className="text-3xl font-bold text-foreground">استعادة كلمة المرور</h2>
          <p className="mt-2 text-sm text-muted-foreground">أدخل رقم هاتفك لاستعادة كلمة المرور</p>
        </motion.div>

        {!isSubmitted ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400 text-sm">{errors.general}</span>
              </div>
            )}

            <div className="rounded-md space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 text-right">
                  رقم الهاتف السعودي
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-y-0 right-10 flex items-center pr-2 border-r border-muted">
                    <div className="flex items-center gap-1.5 px-2">
                      <span className="text-sm font-medium text-muted-foreground">+966</span>
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image 
                          src="https://flagcdn.com/sa.svg" 
                          alt="Saudi Arabia" 
                          width={20} 
                          height={20} 
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={displayPhone}
                    onChange={handlePhoneChange}
                    placeholder="5X XXX XXXX"
                    className={`block w-full pr-32 py-3 text-right border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground transition-all duration-200 ${
                      errors.phone ? "border-red-500" : "border-muted"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1 text-right">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  مثال: 512345678
                </p>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="btn-gradient w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  "إرسال رمز التحقق"
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg p-6 mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                تم إرسال رمز التحقق بنجاح!
              </p>
              <p className="text-sm text-muted-foreground">
                تم إرسال رمز التحقق إلى رقم هاتفك
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              يرجى التحقق من رسائلك النصية واتباع التعليمات لاستعادة كلمة المرور
            </p>
            <Link href="/auth/verify">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gradient px-6 py-3 rounded-lg text-sm font-medium"
              >
                التحقق من الرمز
              </motion.button>
            </Link>
          </motion.div>
        )}

        <div className="mt-6 text-center text-sm">
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80 inline-flex items-center"
          >
            <ArrowRight className="h-4 w-4 ml-1" />
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </div>
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}