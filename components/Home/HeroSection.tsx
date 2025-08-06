"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Building2, Settings, Star } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingElements = [
    { icon: Shield, delay: 0, position: 'top-20 left-10' },
    { icon: Building2, delay: 1000, position: 'top-40 right-20' },
    { icon: Settings, delay: 2000, position: 'bottom-40 left-20' },
    { icon: Star, delay: 1500, position: 'bottom-20 right-10' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <div
            key={index}
            className={`absolute ${element.position} animate-float opacity-20 hidden lg:block`}
            style={{
              animationDelay: `${element.delay}ms`,
              animationDuration: '6s'
            }}
          >
            <div className="p-4 rounded-2xl glass-card">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
          </div>
        );
      })}

      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto container-padding text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
          }`}>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              الحلول الأمنية المتطورة
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl sm:text-4xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <span className="block text-gradient ">إيفاء شريكك في السلامة</span>
          </h1>
              <span className="text-4xl sm:text-3xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000  delay-200 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8">نحمي منشأتك ونعزز ثقتك</span>


          {/* Description */}
          <p className={`text-xl lg:text-2xl text-muted-foreground mb-12 mt-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
          }`}>
لسنا مجرد مزوّد خدمة، نحن شريكك في بناء مشاريع آمنة ومعتمدة – بخبرة عقارية مدعومة بأحدث تقنيات الأمن والسلامة          </p>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-600 ${
            isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'
          }`}>
            <Button size="lg" className="btn-gradient text-lg px-8 py-4 group">
              ابدأ رحلتك معنا
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 glass-card hover:bg-primary/5 hover:border-primary/30"
            >
              شاهد أعمالنا
            </Button>
          </div>

          {/* Stats */}

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;