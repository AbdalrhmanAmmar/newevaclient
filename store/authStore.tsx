import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "user" | "admin" | "superadmin";
  isVerified: boolean;
  verificationStatus?: "pending" | "approved" | "rejected";
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

      setUser: (user) => set((state) => ({
        user: {
          ...state.user,
          ...user,
          verificationStatus: user.verificationStatus ?? state.user?.verificationStatus
        }
      })),

      setVerificationStatus: (status) => 
        set((state) => ({
          user: state.user ? { ...state.user, verificationStatus: status } : null
        })),

      setToken: (token) => set({ token, isAuthenticated: !!token }),
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
        // Clear local storage manually to ensure complete cleanup
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
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

      clearAll: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Add version to handle future migrations
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic from version 0 to 1 if needed
        }
        return persistedState as AuthState;
      },
    }
  )
);

// Utility hook for easy access to auth state
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError,
    logout,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError,
    logout,
  };
};