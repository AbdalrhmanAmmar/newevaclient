// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Lock, UserPlus, User, AlertCircle, ChevronLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { authAPI } from "@/lib/api/Auth";
import { useAuthStore } from "@/store/authStore";

// Step 1: Phone verification
const PhoneVerificationStep = ({
  phone,
  setPhone,
  isLoading,
  error,
  onSubmit
}: {
  phone: string;
  setPhone: (phone: string) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      setPhone('966' + value);
    }
  };

  const displayPhone = phone.startsWith('966') ? phone.substring(3) : phone;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <Image
            src="/Images/black.png"
            alt="EVA Logo"
            width={90}
            height={90}
            className="mx-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-foreground">مرحباً بك في إيفا</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          سجل حسابك الجديد في خطوات بسيطة
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 space-y-6"
        onSubmit={onSubmit}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 text-right">
            رقم الجوال السعودي
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
              className="block w-full pr-32 py-3 text-right border border-muted rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground transition-all duration-200"
              dir="ltr"
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground text-right">
            مثال: 512345678
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الإرسال...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>إرسال رمز التحقق</span>
                <Mail className="w-4 h-4 mr-2" />
              </div>
            )}
          </button>
        </motion.div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm"
      >
        <p className="text-muted-foreground">
          لديك حساب بالفعل؟{' '}
          <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
            تسجيل الدخول
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

// Step 2: OTP Verification
const OTPVerificationStep = ({
  phone,
  otp,
  setOtp,
  isLoading,
  error,
  onSubmit,
  onResendOTP,
  timeLeft,
  onBack
}: {
  phone: string;
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onResendOTP: () => void;
  timeLeft: number;
  onBack: () => void;
}) => {
  const formattedPhone = `${phone.substring(0, 5)} **** ${phone.substring(9)}`;

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !isLoading) {
      onSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  }, [otp]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4 ml-1" />
          العودة
        </button>
        
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground">تحقق من رقمك</h2>
        <p className="mt-2 text-sm text-muted-foreground" >
          تم إرسال رمز التحقق إلى الرقم{' '}
          <span dir="ltr" className="font-medium text-foreground">{formattedPhone}</span>
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 space-y-6"
        onSubmit={onSubmit}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div>
      <label htmlFor="otp" className="sr-only">رمز التحقق</label>
<div className="flex justify-center gap-2 sm:gap-3">
  {[0, 1, 2, 3, 4, 5].map((index) => (
    <motion.div
      key={index}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1 * index }}
      className="relative"
    >
      <input
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={otp[index] || ''}
        onChange={(e) => {
          const newOtp = [...otp];
          newOtp[index] = e.target.value.replace(/\D/g, '');
          setOtp(newOtp.join(''));
          
          // Auto focus next input
          if (e.target.value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
          }

          // Auto focus previous input on backspace
          if (e.target.value === '' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
          }
        }}
        onKeyDown={(e) => {
          // Handle backspace for empty fields
          if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
          }
        }}
        id={`otp-${index}`}
        className="w-12 h-14 text-2xl font-bold text-center border border-muted rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition-all duration-200"
      />
      {index === 2 && (
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          -
        </span>
      )}
    </motion.div>
  ))}
</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="btn-gradient w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحقق...
              </div>
            ) : (
              'التحقق والمتابعة'
            )}
          </button>

          <div className="text-sm text-center">
            {timeLeft > 0 ? (
              <p className="text-muted-foreground">
                يمكنك إعادة الإرسال خلال{' '}
                <span className="font-medium text-foreground">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </p>
            ) : (
              <button
                onClick={onResendOTP}
                disabled={isLoading}
                className="text-primary hover:text-primary/80 font-medium"
              >
                إعادة إرسال الرمز
              </button>
            )}
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
};

// Step 3: Complete Registration
const CompleteRegistrationStep = ({
  formData,
  setFormData,
  isLoading,
  error,
  onSubmit,
  onBack
}: {
  formData: {
    name: string;
    password: string;
  };
  setFormData: (data: any) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4 ml-1" />
          العودة
        </button>
        
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground">استكمال التسجيل</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          أكمل بياناتك الشخصية لإنشاء حسابك
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 space-y-6"
        onSubmit={onSubmit}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 text-right">
            الاسم الكامل
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="block w-full pr-10 py-3 border border-muted rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground text-right transition-all duration-200"
              placeholder="أدخل اسمك الكامل"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
          </div>
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
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="block w-full pr-10 py-3 border border-muted rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground text-right transition-all duration-200"
              placeholder="كلمة المرور (6 أحرف على الأقل)"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري إنشاء الحساب...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>إنشاء حساب</span>
                <UserPlus className="w-4 h-4 mr-2" />
              </div>
            )}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

// Main Component
export default function SignupClient() {
  const router = useRouter();
  const {
    setPendingPhone,
    otpId,
    setOTPData,
    clearOTPData,
  } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("966");
  const [otp, setOtp] = useState("");
  const [registrationData, setRegistrationData] = useState({
    name: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError("رقم الهاتف مطلوب");
      return;
    }

    if (!/^966\d{9}$/.test(phone)) {
      setError("رقم الهاتف غير صحيح (يجب أن يبدأ بـ 966 ويتكون من 12 رقم)");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.sendOTP({ phone });
      console.log("sendOTP response:", response);

      if (response.success) {
        const otpId = response.data?.otpId;
        const expiresAt = response.data?.expiresAt;

        if (otpId && expiresAt) {
          setPendingPhone(phone);
          setOTPData(otpId, expiresAt);
          setTimeLeft(1 * 60);
          setCurrentStep(2);
        } else {
          setError("لم يتم استلام رمز التحقق، يرجى المحاولة مرة أخرى");
        }
      } else {
        setError(response.message || "حدث خطأ في إرسال رمز التحقق");
      }
    } catch (error: any) {
      setError(error.message || "حدث خطأ في إرسال رمز التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("رمز التحقق يجب أن يكون 6 أرقام");
      return;
    }

    if (!otpId) {
      setError("رمز التحقق غير موجود، يرجى إعادة إرسال الرمز.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.verifyOTPOnly({ otp, otpId });
      console.log("verifyOTP response:", response);

      if (response.success) {
        setCurrentStep(3);
      }
    } catch (error: any) {
      setError(error.message || "رمز التحقق غير صحيح");
      console.log("verifyOTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Complete Registration
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationData.name.trim()) {
      setError("الاسم مطلوب");
      toast.error("الاسم مطلوب");
      return;
    }

    if (registrationData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.verifyOTPAndCompleteRegistration({
        otpId: otpId!,
        otp: otp,
        name: registrationData.name,
        password: registrationData.password,
      });

      console.log("Full registration response:", response);

      if (response.success || response.message?.includes("completed")) {
        router.push("/auth/login")
        clearOTPData();

        toast.success("تم إنشاء الحساب بنجاح!");
      } else {
        throw new Error(response.message || "فشل في التسجيل");
      }
    } catch (error: any) {
      console.error("Detailed registration error:", error);
      const errorMsg = error.message || "حدث خطأ في استكمال التسجيل";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
// في handleResendOTP
const handleResendOTP = async () => {
  // استخدم phone من state بدلاً من الاعتماد على otpId فقط
  if (!phone) {
    setError("رقم الهاتف غير موجود، لا يمكن إعادة الإرسال");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    // أعد إرسال الرمز باستخدام رقم الهاتف مباشرة
    const response = await authAPI.sendOTP({ phone });
    
    if (response.success && response.data) {
      setOTPData(response.data.otpId, response.data.expiresAt);
      setTimeLeft(1 * 60);
      setCanResend(false);
      setOtp("");
      toast.success("تم إعادة إرسال الرمز بنجاح");
    } else {
      setError(response.message || "حدث خطأ في إعادة الإرسال");
    }
  } catch (error: any) {
    setError(error.message || "حدث خطأ في إعادة إرسال رمز التحقق");
    console.error("Resend OTP error:", error);
  } finally {
    setIsLoading(false);
  }
};
  // Back button handler
  const handleBack = () => {
    if (currentStep === 2) {
      setOtp("");
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: currentStep === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep === 1 ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            className="bg-card shadow-xl rounded-2xl p-8 border border-muted"
          >
            {currentStep === 1 && (
              <PhoneVerificationStep
                phone={phone}
                setPhone={setPhone}
                isLoading={isLoading}
                error={error}
                onSubmit={handleSendOTP}
              />
            )}

            {currentStep === 2 && (
              <OTPVerificationStep
                phone={phone}
                otp={otp}
                setOtp={setOtp}
                isLoading={isLoading}
                error={error}
                onSubmit={handleVerifyOTP}
                onResendOTP={handleResendOTP}
                timeLeft={timeLeft}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <CompleteRegistrationStep
                formData={registrationData}
                setFormData={setRegistrationData}
                isLoading={isLoading}
                error={error}
                onSubmit={handleCompleteRegistration}
                onBack={handleBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
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