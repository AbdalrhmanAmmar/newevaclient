"use client"

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, User, Home, Info, Box, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation';
// import { useScrollStore } from '@/stores/scrollStore';
import Image from 'next/image';
import { useScrollStore } from '@/store/scrollStroe';



const Navbar = () => {
    const footerRef = useScrollStore((state) => state.footerRef);

      const scrollToFooter = () => {
    if (footerRef) {
      footerRef.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/about", label: "من نحن", icon: Info },
    { href: "/service", label: "الخدمات", icon: Box },
    { href: "/info", label: "تواصل معنا", icon: Phone },
  ];



  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card bg-opacity-90 backdrop-blur-xl shadow-medium' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto container-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 space-x-reverse">
<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary overflow-hidden">
  <Image
     src="/Images/evaa.jpg"
    alt="إيفاء Logo"
    width={40}  // تخفيض حجم الصورة الأصلية لتناسب المساحة
    height={40}
    className="w-full h-full object-cover"  // الأهم هنا
    quality={100}
     layout="responsive"
  
  />
</div>
              <div className="text-2xl font-bold text-gradient">EVA</div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8 space-x-reverse">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* {token ? (
                <LogoutBtn />
              ) : (
                <Button 
                  variant="ghost" 
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10"
                  onClick={() => router.push('/auth/login')}
                >
                  <User className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )} */}
              <Button onClick={scrollToFooter} className="btn-gradient">
                احصل على عرض
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card bg-opacity-95 backdrop-blur-xl border-t border-border shadow-medium">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                pathname === item.href 
                  ? 'text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          ))}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              isMobileMenuOpen 
                ? 'text-foreground' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">الحساب</span>
          </button>
        </div>
      </div>

      {/* Mobile Account Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-16 left-0 right-0 glass-card bg-opacity-95 border-t border-border">
            <div className="container-padding py-4">
              <div className="flex flex-col space-y-3">
      
                <Button className="btn-gradient justify-center">
                  احصل على عرض
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card bg-opacity-90 backdrop-blur-xl shadow-medium' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto container-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold text-gradient">EVA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed positioning */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;