"use client";

import { UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authAPI } from '@/lib/api/Auth';
import { useAuthStore } from "@/store/authStore";


function LogoutBtn() {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authAPI.logout(); // إرسال الطلب إلى الباك
      logoutStore(); // حذف الحالة من الزوستاند
      toast.success("تم تسجيل الخروج بنجاح");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "فشل في تسجيل الخروج"
      );
    }
  };

  return (
    <button
      onClick={handleLogout}
            className="flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full"
                >
      <UserCircle className="w-5 h-5" />
      <span>تسجيل الخروج</span>
    </button>
  );
}

export default LogoutBtn;
