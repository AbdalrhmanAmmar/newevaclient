"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowUpRight,
  Shield,
  Building2,
  ClipboardList,
} from "lucide-react";
import { FaTiktok,FaWhatsapp,FaSnapchatGhost  } from "react-icons/fa";
import { dir } from "console";
import { useRef,useEffect } from "react";
import ContactForm from "./ContactForm";
import { useScrollStore } from "@/store/scrollStroe";


const services = [
  { icon: Shield, label: "الأمن والحماية", href: "/about" },
  { icon: Building2, label: "التطوير العقاري", href: "/about" },
  { icon: ClipboardList, label: "إدارة الأملاك", href: "/about" },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "المملكة العربية السعودية، الرياض, حي الفيحاء – طريق ابن ماجة",
    href: "#",
  },
  {
    icon: Phone,
    label: "+966 54 080 0987",
    href: "tel:+966540800987",
  },
  {
    icon: Mail,
    label: "info@evasaudi.com",
    href: "mailto:info@evasaudi.com",
  },
  {
    icon: Clock,
    label: "الأحد - الخميس: 9:00 ص - 9:00 م",
    href: "#",
  },
];

const socialLinks = [

  {
    icon: Facebook,
    label: "فيسبوك",
    href: "https://www.facebook.com/evaSaudiRealestate",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
  {
    icon: Instagram,
    label: "انستغرام",
    href: "https://www.instagram.com/eva_realstate",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
  {
    icon: Twitter,
    label: "تويتر",
    href: "https://x.com/Eva__RealeState",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
  {
    icon: FaSnapchatGhost,
    label: "سناب شات",
    href: "https://www.snapchat.com/add/eva_realestate",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
  {
    icon: FaTiktok ,
    label: "تيك توك",
    href: "www.tiktok.com/@eva__realestate",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },

  {
    icon: FaWhatsapp,
    label: "واتساب",
    href: "https://wa.me/966540800987",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    href: "mailto:Sales@EvaSaudi.com",
    color: "bg-secondary/10 border border-secondary/20 text-foreground",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

    const footerRef = useRef<HTMLElement>(null);
  const setFooterRef = useScrollStore((state) => state.setFooterRef);

    useEffect(() => {
    if (footerRef.current) {
      setFooterRef(footerRef.current);
    }
  }, [setFooterRef]);

  return (
    <footer ref={footerRef}   className="bg-background border-t border-primary/10 ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 order-1"
          >
            <Link href="/" className="block">
       <Image
    src="/Images/blackrm.png" 
  alt="إيفاء Logo"
  width={120}
  height={120}
  className="w-auto h-24 object-contain" // الأهم هنا
  quality={100} // لضمان الجودة العالية
  priority // إذا كانت الصورة فوق الطية
  unoptimized={true}
/>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              نقدم حلولاً متكاملة في مجالات الأمن والحماية والتطوير العقاري وإدارة الأملاك، مع التركيز على الابتكار والجودة.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 order-3 md:order-2"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">خدماتنا</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <motion.div
                  key={service.label}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <service.icon className="w-4 h-4" />
                    <span>{service.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 order-4 md:order-3"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">معلومات الاتصال</h3>
            <div className="space-y-4">
          {
  contactInfo.map((info) => (
    <motion.a
      key={info.label}
      href={info.href}
      whileHover={{ x: 5 }}
      className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"

    >
      <info.icon className="w-5 h-5 mt-0.5" />
      <span 
        className="text-sm"
        dir={info.icon === Phone ? "ltr" : "rtl"}
      >
        {info.label}
      </span>
    </motion.a>
  ))
}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 order-2 md:order-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">احصل على عرض سعر</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {/* قم بارسال رساله تضمن الخدمه التي تريدها وسنقوم بالتواصل معك في أقرب وقت ممكن. */}
              قم بارسال رساله تضمن الحدمة التي تريدها وسنقوم بالتواصل معك في أقرب وقت ممكن
            </p>
                      <ContactForm />
            
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} إيفاء. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}