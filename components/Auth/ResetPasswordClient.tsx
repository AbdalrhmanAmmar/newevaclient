"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPasswordClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  useEffect(() => {
    const resetPhone = localStorage.getItem('resetPhone');
    if (resetPhone) {
      setPhone(resetPhone);
    } else {
      router.push('/auth/forgot-password');
    }
  }, [router]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:4000/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        localStorage.removeItem('resetPhone');
        
        toast.success("تم إعادة تعيين كلمة المرور بنجاح!");
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        const errorMsg = data.message || 'حدث خطأ في إعادة تعيين كلمة المرور';
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

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card shadow-xl rounded-2xl p-8 border border-muted">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Image
              src="/Images/black.png"
              alt="إيفاء Logo"
              width={90}
              height={90}
              className="object-cover mx-auto mb-6"
              quality={100}
              priority
            />
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg p-6 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">تم بنجاح!</h2>
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                تم إعادة تعيين كلمة المرور بنجاح
              </p>
              <p className="text-sm text-muted-foreground">
                يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              جاري توجيهك إلى صفحة تسجيل الدخول...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-foreground">إعادة تعيين كلمة المرور</h2>
          <p className="mt-2 text-sm text-muted-foreground">أدخل كلمة المرور الجديدة</p>
        </motion.div>

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
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 text-right">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`block w-full pr-10 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground text-right transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-muted"
                  }`}
                  placeholder="كلمة المرور الجديدة"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1 text-right">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2 text-right">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`block w-full pr-10 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground text-right transition-all duration-200 ${
                    errors.confirmPassword ? "border-red-500" : "border-muted"
                  }`}
                  placeholder="تأكيد كلمة المرور"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1 text-right">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
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
                "إعادة تعيين كلمة المرور"
              )}
            </motion.button>
          </div>
        </motion.form>

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