import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "user" | "admin" | "superadmin";
  isVerified: boolean;
  verificationStatus?: "pending" | "approved" | "rejected";
  // يمكن إضافة المزيد من الحقول حسب الحاجة
  points?: number;
  entityType?: "individual" | "organization" | "company";
  entityName?: string;
  accountRole?: string;
  jobTitle?: string;
  addresses?: Array<{
    country: string;
    city: string;
    buildingNumber: string;
    unitNumber?: string;
    apartmentNumber?: string;
    addressDetails?: string;
  }>;
  commercialRecordNumber?: string;
  taxNumber?: string;
  nationalAddressNumber?: string;
  hasLoggedIn?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  otpId: string | null;
  isOTPSent: boolean;
  otpExpiresAt: string | null;
  pendingPhone: string | null;

  resetToken: string | null;
  isResettingPassword: boolean;

  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setOTPData: (otpId: string, expiresAt: string) => void;
  setOTPSent: (sent: boolean) => void;
  setPendingPhone: (phone: string) => void;
  clearOTPData: () => void;

  setResetToken: (token: string) => void;
  setResettingPassword: (status: boolean) => void;
  setVerificationStatus: (status: "pending" | "approved" | "rejected") => void;

  logout: () => void;
  clearAll: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      otpId: null,
      isOTPSent: false,
      otpExpiresAt: null,
      pendingPhone: null,

      resetToken: null,
      isResettingPassword: false,

      // دالة معدلة لضمان دمج الحالة الحالية مع التحديثات الجديدة
      setUser: (user) => set((state) => ({
        user: {
          ...state.user, // الاحتفاظ بالبيانات الحالية
          ...user,      // تطبيق التحديثات الجديدة
          // الحفاظ على verificationStatus الحالي إذا لم يتم توفيره في التحديث
          verificationStatus: user.verificationStatus ?? state.user?.verificationStatus
        }
      })),

      // دالة جديدة لتحديث حالة التحقق مباشرة
      setVerificationStatus: (status) => 
        set((state) => ({
          user: state.user ? { ...state.user, verificationStatus: status } : null
        })),

      setToken: (token) => set({ token }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      setOTPData: (otpId, expiresAt) =>
        set({
          otpId,
          otpExpiresAt: expiresAt,
          isOTPSent: true,
        }),
      setOTPSent: (sent) => set({ isOTPSent: sent }),
      setPendingPhone: (phone) => set({ pendingPhone: phone }),
      clearOTPData: () =>
        set({
          otpId: null,
          isOTPSent: false,
          otpExpiresAt: null,
          pendingPhone: null,
        }),

      setResetToken: (token) => set({ resetToken: token }),
      setResettingPassword: (status) => set({ isResettingPassword: status }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          otpId: null,
          isOTPSent: false,
          otpExpiresAt: null,
          pendingPhone: null,
          resetToken: null,
          isResettingPassword: false,
        });
      },

      clearAll: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          otpId: null,
          isOTPSent: false,
          otpExpiresAt: null,
          pendingPhone: null,
          resetToken: null,
          isResettingPassword: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        otpId: state.otpId,
        isOTPSent: state.isOTPSent,
        pendingPhone: state.pendingPhone,
      }),
    }
  )
);