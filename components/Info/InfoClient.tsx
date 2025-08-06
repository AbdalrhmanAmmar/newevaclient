"use client";

import { motion } from 'framer-motion';
import { FaTiktok, FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const links = [
  {
    icon: Facebook,
    label: "فيسبوك",
    href: "https://www.facebook.com/evaSaudiRealestate",
  },
  {
    icon: Instagram,
    label: "انستغرام",
    href: "https://www.instagram.com/eva_realstate",
  },
  {
    icon: Twitter,
    label: "تويتر",
    href: "https://x.com/Eva__RealeState",
  },
  {
    icon: FaSnapchatGhost,
    label: "سناب شات",
    href: "https://www.snapchat.com/add/eva_realestate",
  },
  {
    icon: FaTiktok,
    label: "تيك توك",
    href: "www.tiktok.com/@eva__realestate",
  },
  {
    icon: FaWhatsapp,
    label: "واتساب",
    href: "https://wa.me/966540800987",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    href: "mailto:Sales@EvaSaudi.com",
  },
];

export default function InfoClient() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 relative overflow-hidden">
 
        <div className="max-w-lg mx-auto relative z-10">
          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-primary/50 hover:border-primary/30 text-foreground hover:bg-card/80 transition-all transform hover:scale-[1.02] backdrop-blur-sm w-full"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-muted-foreground text-sm text-center mt-8"
          >
            تواصل معنا عبر منصاتنا الاجتماعية
          </motion.p>
        </div>
     
    </div>
  );
}