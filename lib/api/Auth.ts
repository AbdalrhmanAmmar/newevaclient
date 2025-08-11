//@ts-nocheck
import api from "./api";

// واجهات البيانات
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      phone: string;
      role: "user" | "admin" | "superadmin";
      isVerified: boolean;
    };
    token?: string;
  };
}

export interface OTPResponse {
  success: boolean;
  message: string;
  data?: {
    otpId: string;
    expiresAt: string;
  };
}

export interface VerifyOTPOnlyResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
    otpId: string;
  };
}

// دوال API
export const authAPI = {
  // تسجيل الدخول
  login: async (data): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/login", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في تسجيل الدخول"
      );
    }
  },

  // إرسال رمز التحقق للتسجيل
  sendOTP: async (data: { phone: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post("/user/send-otp", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "حدث خطأ في إرسال رمز التحقق");
    }
  },

  // التحقق من رمز OTP فقط (بدون استكمال التسجيل)
  verifyOTPOnly: async (data: { otp: string; otpId: string }): Promise<{ 
    success: boolean; 
    message: string;
    data?: { verified: boolean; otpId: string }
  }> => {
    try {
      const response = await api.post("/user/verify-otp-only", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "رمز التحقق غير صحيح");
    }
  },

  // التحقق من الرمز واستكمال التسجيل
verifyOTPAndCompleteRegistration: async (data: {
    otp: string;
    otpId: string;
    name: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/verify-otp-complete", {
        otpId: data.otpId,
        otp: data.otp,
        name: data.name,
        password: data.password
      });
      
      // هنا يجب أن يكون التوكن موجودًا في response.data.token
      const token = response.data.token;
      
      // حفظ التوكن في localStorage أو Cookies
      localStorage.setItem('authToken', token);
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "حدث خطأ في استكمال التسجيل");
    }
  },

  // طلب إعادة تعيين كلمة المرور
  forgotPassword: async (
    data
  ): Promise<OTPResponse> => {
    try {
      const response = await api.post("/user/forgot-password", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في إرسال رمز التحقق"
      );
    }
  },

  // التحقق من رمز OTP (للاستخدام العام)
  verifyOTP: async (
    data: VerifyOTPFormData & { otpId: string }
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/verify-otp", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "رمز التحقق غير صحيح");
    }
  },

  // إعادة تعيين كلمة المرور
  resetPassword: async (
    data: ResetPasswordFormData & { token: string }
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/reset-password", {
        password: data.password,
        token: data.token,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في إعادة تعيين كلمة المرور"
      );
    }
  },

  // إعادة إرسال رمز التحقق
  resendOTP: async (otpId: string): Promise<OTPResponse> => {
    try {
      const response = await api.post("/user/resend-otp", { otpId });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في إعادة إرسال الرمز"
      );
    }
  },
    // تعديل بيانات المستخدم بعد أول تسجيل دخول
updateProfileAfterLogin: async (formData: FormData, token: string): Promise<{ 
  success: boolean; 
  message: string; 
  user: any; // تأكد أن هذا يحتوي على verificationStatus
  verificationStatus?: string; // إضافة صريحة للحالة
}> => {
  try {
    // 1. إضافة بيانات إضافية للتتبع
    console.log('Sending formData:', Array.from(formData.entries()));
    
    const response = await api.put("/user/update-profile", formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
      timeout: 10000,
      // 2. إضافة تحويل البيانات للتتبع
      transformRequest: (data, headers) => {
        console.log('Request data:', data);
        return data;
      }
    });

    // 3. تحقق مفصل من الرد
    if (!response.data.success) {
      console.error('Server error response:', response.data);
      throw new Error(response.data.message || "فشل في تحديث الملف الشخصي");
    }

    // 4. التحقق من وجود بيانات المستخدم المحدثة
    if (!response.data.user) {
      console.warn('الخادم لم يرجع بيانات المستخدم المحدثة');
      throw new Error("بيانات المستخدم غير متوفرة في الرد");
    }

    // 5. تسجيل حالة التحقق للتحقق
    console.log('Updated verificationStatus:', response.data.user.verificationStatus);

    return {
      ...response.data,
      // 6. إضافة صريحة للحالة في مستوى الجذر
      verificationStatus: response.data.user.verificationStatus
    };
    
  } catch (error: any) {
    // 7. تحسين معالجة الأخطاء
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "حدث خطأ غير متوقع أثناء تحديث الملف الشخصي";
    
    console.error('API Error Details:', {
      error: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    throw new Error(errorMessage);
  }
},


  // تسجيل الخروج
  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post("/user/logout");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ في تسجيل الخروج"
      );
    }
  },
  getMe: async (token: string): Promise<{ success: boolean; user: IUser }> => {
    try {
      const response = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ أثناء جلب بيانات المستخدم"
      );
    }
  },
  verifyEmailCode: async (userId: string, code: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/user/verify-email-code", {
      userId,
      code,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "حدث خطأ أثناء التحقق من رمز البريد الإلكتروني"
    );
  }
},

}


