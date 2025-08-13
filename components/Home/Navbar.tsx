"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Home, Info, Box, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from "@/store/authStore";
import { useScrollStore } from '@/store/scrollStroe';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
                  src="/Images/evalogo.png"
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
              <ThemeToggle />
              
              {/* {isAuthenticated ? (
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Button 
                    variant="ghost"
                    className="text-foreground/80 hover:text-foreground hover:bg-primary/10"
                    onClick={handleLogout}
                  >
                    <User className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </Button>
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
              )} */}
              
              <Button onClick={scrollToFooter} className="btn-gradient shadow-lg hover:shadow-xl">
                احصل على عرض
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
        {/* Gradient overlay for extra beauty */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                pathname === item.href 
                  ? 'text-primary bg-primary/10 shadow-lg' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {pathname === item.href && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
              <item.icon className={`w-5 h-5 transition-all duration-300 ${
                pathname === item.href ? 'scale-110' : ''
              }`} />
              <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                pathname === item.href ? 'text-primary' : ''
              }`}>{item.label}</span>
            </a>
          ))}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              isMobileMenuOpen 
                ? 'text-primary bg-primary/10 shadow-lg' 
                : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
            }`}
          >
            {isMobileMenuOpen && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
            )}
            <User className={`w-5 h-5 transition-all duration-300 ${
              isMobileMenuOpen ? 'scale-110' : ''
            }`} />
            <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
              isMobileMenuOpen ? 'text-primary' : ''
            }`}>الحساب</span>
          </button>
        </div>
      </div>

      {/* Mobile Account Menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute bottom-16 left-0 right-0 glass-card bg-card/95 border-t border-border/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none rounded-t-lg" />
            
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">الإعدادات</span>
                  <ThemeToggle />
                </div>
                
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
                  className="btn-gradient w-full shadow-lg hover:shadow-xl"
                >
                  احصل على عرض
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'glass-card bg-card/90 backdrop-blur-xl shadow-2xl border-b border-border/50' 
          : 'bg-transparent'
      }`}>
        {isScrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        )}
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              onClick={() => router.push("/")} 
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
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
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
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