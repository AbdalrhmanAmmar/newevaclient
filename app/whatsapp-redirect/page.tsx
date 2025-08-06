"use client"

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function WhatsAppRedirect() {
  const searchParams = useSearchParams();
  const whatsappUrl = searchParams.get('url') || '';

  useEffect(() => {
    if (whatsappUrl) {
      // تأخير 3 ثواني قبل الانتقال
      const timer = setTimeout(() => {
        window.location.href = decodeURIComponent(whatsappUrl);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [whatsappUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <Loader2 className="h-12 w-12 text-[#25D366] animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">جاري تحويلك إلى واتساب</h2>
        <p className="text-gray-600">
          سوف يتم تحويلك تلقائياً خلال 3 ثواني...
        </p>
      </div>
    </div>
  );
}