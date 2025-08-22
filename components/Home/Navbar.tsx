"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Home, Info, Box, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from "@/store/authStore";
import { useScrollStore } from '@/store/scrollStroe';
import AccountSelect from './AccountSelect';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const footerRef = useScrollStore((state) => state.footerRef);
  
  // Auth state - directly access what we need
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  // Derive isAuthenticated from token
  const isAuthenticated = !!token;

  // UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = () => {
    if (footerRef) {
      footerRef.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const navItems = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/about", label: "من نحن", icon: Info },
    { href: "/service", label: "الخدمات", icon: Box },
    { href: "/info", label: "تواصل معنا", icon: Phone },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card bg-opacity-90 backdrop-blur-xl shadow-medium' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div 
                onClick={() => router.push("/")} 
                className="cursor-pointer"
              >
                <Image
                  src="/Images/mainLogo.png"
                  alt="إيفاء Logo"
                  width={80}
                  height={80}
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8 space-x-reverse">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`relative transition-colors duration-300 font-medium group ${
                    pathname === item.href 
                      ? 'text-foreground' 
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {isAuthenticated ? (
        <div className="flex items-center space-x-4 space-x-reverse">
<AccountSelect handleLogout={handleLogout} />

</div>

              ) : (
                <Button 
                  variant="ghost" 
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10"
                  onClick={() => router.push('/auth/login')}
                >
                  <User className="w-4 h-4 ml-2" />
                
                </Button>
              )}
              
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
          
                  {isAuthenticated ? (
        <div className="flex items-center space-x-4 space-x-reverse">
<AccountSelect handleLogout={handleLogout} />

</div>

              ) : (
                <Button 
                  variant="ghost" 
                  className="text-foreground/80 hover:text-foreground hover:bg-primary/10"
                  onClick={() => router.push('/auth/login')}
                >
                  <User className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )}
        </div>
      </div>

      {/* Mobile Account Menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute bottom-16 left-0 right-0 glass-card bg-opacity-95 border-t border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {/* {isAuthenticated ? (
                  <Button 
                    variant="ghost"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </Button>
                ) : (
                  <Button 
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/auth/login');
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                )} */}
                
                <Button 
                  onClick={() => {
                    scrollToFooter();
                    setIsMobileMenuOpen(false);
                  }} 
                  className="btn-gradient w-full"
                >
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              onClick={() => router.push("/")} 
              className="cursor-pointer"
            >
              <Image
                src="/Images/evalogo.png"
                alt="إيفاء Logo"
                width={60}
                height={60}
                className="object-cover"
                quality={100}
                priority
              />
            </div>
                <Button onClick={scrollToFooter} className="btn-gradient">
                احصل على عرض
              </Button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed positioning */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;