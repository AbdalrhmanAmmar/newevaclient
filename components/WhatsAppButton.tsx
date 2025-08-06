"use client"

import { X, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const phoneNumber = "966123456789"; // استبدل برقمك
  const defaultMessage = "مرحبا كيف يمكننا مساعدتك؟"; // الرسالة الافتراضية

  useEffect(() => {
    // تأخير ظهور الأيقونة بعد 3 ثواني
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    // فتح النافذة تلقائياً بعد 5 ثواني
    const autoOpenTimer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(autoOpenTimer);
    };
  }, []);

  useEffect(() => {
    // إغلاق الشات عند النقر خارجها
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setIsRedirecting(true);
    
    // انتظر 3 ثواني قبل التوجيه
    setTimeout(() => {
      const finalMessage = message || defaultMessage;
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // الانتقال إلى صفحة التحميل الوسيطة
      router.push(`/whatsapp-redirect?url=${encodeURIComponent(whatsappUrl)}`);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed lg:bottom-6 right-6 z-50 bottom-16" ref={chatRef}>
      {isOpen ? (
        <div className="w-80 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-yellow-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/32X32 أسود بدون خلفية-01.png"
                alt="إيفاء Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-lg">ايفاء</span>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 h-60 overflow-y-auto">
            <div className="flex flex-col items-center mb-2">
              <Image
                src="/images/32X32 أسود بدون خلفية-01.png"
                alt="إيفاء Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain mb-2"
              />
              <div className="btn-gradient text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full btnopacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                متصل الآن
              </div>
            </div>
            
            <div className="mb-4">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg inline-block max-w-xs">
                {defaultMessage}
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200 flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 border border-gray-300 rounded-l-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              disabled={isRedirecting}
            />
            <button
              onClick={sendMessage}
              disabled={isRedirecting}
              className="btn-gradient text-white px-4 rounded-r-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
            >
              {isRedirecting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg transition-all duration-1500 animate-bounce hover:animate-none"
          aria-label="فتح محادثة واتساب"
        >
          <FaWhatsapp className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default WhatsAppButton;