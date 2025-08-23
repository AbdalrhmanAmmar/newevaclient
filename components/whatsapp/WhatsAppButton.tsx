"use client";

import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [delayTime, setDelayTime] = useState(10000); // البداية 10 ثواني
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const phoneNumber = "966540800987";

  useEffect(() => {
    const hasSeenWhatsApp = localStorage.getItem("whatsapp_shown");
    if (!hasSeenWhatsApp) {
      localStorage.setItem("whatsapp_shown", "true");
    }

    const triggerMessage = () => {
      setIsVisible(true);

      const audio = new Audio("/sound/whatsapp-message-for-iphone.mp3");
      audio.play().catch(() => {
        console.warn("Autoplay منع الصوت، هيشتغل عند أي تفاعل مع الصفحة");
      });

      // اخفاء الرسالة بعد 5 ثواني
      setTimeout(() => {
        setIsVisible(false);
        // مضاعفة الوقت قبل الظهور التالي
        setDelayTime((prev) => prev * 2);
      }, 5000);
    };

    // بدء الظهور بعد delayTime
    const show = setTimeout(triggerMessage, delayTime);

    return () => clearTimeout(show);
  }, [delayTime]);

  const openWhatsApp = () => {
    // اللينك الرسمي لواتساب بدون نص
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    // التوجيه مباشرة لواتساب
    window.open(whatsappUrl, "_blank");
    
    // أو لو عايز تروح لصفحة وسيطة داخل مشروعك:
    // router.push(`/whatsapp-redirect?url=${encodeURIComponent(whatsappUrl)}`);
  };

  return (
    <div className="fixed lg:bottom-6 right-6 z-50 bottom-16">
      {/* div مشترك عشان المحاذاة */}
      <div className="flex row-reverse items-center gap-3">
        <button
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg"
          aria-label="فتح محادثة واتساب"
          onClick={openWhatsApp}
        >
          <FaWhatsapp className="h-8 w-8" />
        </button>
        {isVisible && (
          <div
            className="bg-white text-black px-5 py-3 rounded-full 
                       shadow-lg font-semibold whitespace-nowrap"
            style={{
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            تواصل معنا الآن
          </div>
        )}
      </div>

      {/* CSS للظهور مع حركة */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;