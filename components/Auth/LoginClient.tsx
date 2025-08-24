"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, LogIn, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { authAPI } from "@/lib/api/Auth";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginClient() {
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAuthStore();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string; general?: string }>({});

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^966\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = (): boolean => {
    const newErrors: { phone?: string; password?: string } = {};

    if (!phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (!password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
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
      const data = await authAPI.login({ phone, password });

      setUser((data as any).user);
      setToken((data as any).token);
      setAuthenticated(true);

      router.refresh();

      setTimeout(() => {
        const redirectPath = (data as any).user.role === "admin" ? "/dashboard" : "/myprofile";
        router.push(redirectPath);
        toast.success("تم تسجيل الدخول بنجاح!");
      }, 300);
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "حدث خطأ في الاتصال بالخادم";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "رقم الهاتف أو كلمة المرور غير صحيحة";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      setErrors({ general: errorMessage });
      toast.error(errorMessage);
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
                    src="/Images/evalogo.png"
                    alt="إيفاء Logo"
                    width={60}
                    height={60}
                    className="object-cover mx-auto"
                    quality={100}
                    priority
                  />
          <h2 className="text-3xl font-bold text-foreground">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-muted-foreground">مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <AnimatePresence mode="wait">
            {errors.general && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400 text-sm">{errors.general}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 text-right">
                رقم الهاتف السعودي
              </label>
              <div className="relative" >
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pr-10 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground text-right transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-muted"
                  }`}
                  placeholder="كلمة المرور"
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
          </div>

          {/* <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary/80">
                نسيت كلمة المرور؟
              </Link>
            </div>
          </div> */}

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
                <>
                  <LogIn className="h-5 w-5 ml-2" />
                  تسجيل الدخول
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            ليس لديك حساب؟{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
              سجل الآن
            </Link>
          </p>
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