"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, RefreshCw, Shield, AlertCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationType = searchParams.get("type") || "signup";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpId, setOtpId] = useState<string | null>(localStorage.getItem('otpId'));
  const [phone, setPhone] = useState<string | null>(localStorage.getItem('resetPhone'));

  // العد التنازلي
  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, isVerified]);

useEffect(() => {
  // إذا كان نوع التحقق هو reset، تأكد من وجود resetPhone و otpId
  if (verificationType === "reset") {
    const resetPhone = localStorage.getItem('resetPhone');
    const storedOtpId = localStorage.getItem('otpId');
    
    if (!resetPhone || !storedOtpId) {
      router.push('/auth/forgot-password');
      return;
    }
    
    setPhone(resetPhone);
    setOtpId(storedOtpId);
  }
}, [verificationType, router]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (error) setError(null);
  };

  const validateOTP = (): boolean => {
    if (otp.length !== 6) {
      setError("يجب أن يتكون رمز التحقق من 6 أرقام");
      return false;
    }
    return true;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateOTP()) return;
  if (!otpId || !phone) {
    setError("لم يتم العثور على بيانات التحقق");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch('http://localhost:4000/api/user/verify-reset-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp,
        otpId,
        phone
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsVerified(true);
      toast.success("تم التحقق بنجاح!");

      console.log(`data`, data)

      // حفظ التوكن في localStorage
      if (data.resetToken) {
        localStorage.setItem('resetToken', data.resetToken);
      }

      setTimeout(() => {
        router.push("/auth/reset-password");
      }, 2000);
    } else {
      setError(data.message || "رمز التحقق غير صحيح");
      toast.error(data.message || "رمز التحقق غير صحيح");
    }
  } catch (error: any) {
    setError("حدث خطأ في الاتصال بالخادم");
    toast.error("حدث خطأ في الاتصال بالخادم");
  } finally {
    setIsLoading(false);
  }
};

  const handleResendOTP = async () => {
    if (!phone || !canResend) return;

    try {
      setIsLoading(true);
      setError(null);

      // استبدل هذا باستدعاء API الفعلي
      const response = await fetch('http://localhost:4000/api/user/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setTimer(60);
        setCanResend(false);
        setOtpId(data.otpId);
        localStorage.setItem('otpId', data.otpId);
        toast.success("تم إعادة إرسال رمز التحقق");
      } else {
        setError(data.message || "فشل في إعادة إرسال الرمز");
        toast.error(data.message || "فشل في إعادة إرسال الرمز");
      }
    } catch (error: any) {
      setError("حدث خطأ في الاتصال بالخادم");
      toast.error("حدث خطأ في الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTitle = () => {
    if (verificationType === "reset") {
      return "تأكيد إعادة تعيين كلمة المرور";
    }
    return "التحقق من الحساب";
  };

  const getDescription = () => {
    if (verificationType === "reset") {
      return "تم إرسال رمز التحقق لإعادة تعيين كلمة المرور";
    }
    return "تم إرسال رمز التحقق لتفعيل حسابك";
  };

  const getSuccessMessage = () => {
    if (verificationType === "reset") {
      return "تم التحقق بنجاح! سيتم توجيهك لإعادة تعيين كلمة المرور";
    }
    return "تم التحقق من حسابك بنجاح! سيتم توجيهك لتسجيل الدخول";
  };

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
          <h2 className="text-3xl font-bold text-foreground">{getTitle()}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {getDescription()}
          </p>
          {phone && (
            <p className="text-sm text-primary font-medium mt-1">
              {phone}
            </p>
          )}
        </motion.div>

        {!isVerified ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-3 text-center">
                أدخل رمز التحقق المكون من 6 أرقام
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={handleOTPChange}
                  className="w-full text-center text-2xl font-bold py-4 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary tracking-widest"
                  placeholder="000000"
                  dir="ltr"
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="btn-gradient w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                "تحقق من الرمز"
              )}
            </motion.button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  يمكنك طلب رمز جديد خلال {formatTime(timer)}
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة إرسال الرمز
                </button>
              )}
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg p-6 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </motion.div>
              <p className="text-green-600 dark:text-green-400 font-medium">
                {getSuccessMessage()}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              سيتم توجيهك تلقائياً...
            </p>
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