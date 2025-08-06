"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck, Users, Award, CheckCircle, ArrowDown } from 'lucide-react';
import AnimatedArrowDown from './Arrow';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: ShieldCheck, title: "حلول معتمدة", description: "أنظمة مطابقة للدفاع المدني" },
    { icon: Users, title: "فريق خبراء", description: "مهندسون وفنيون معتمدون ذوو كفاءة عالية" },
    { icon: Award, title: "جودة مثبتة", description: "تنفيذ دقيق وفق أعلى معايير الجودة" },
    { icon: CheckCircle, title: " دعم مستمر 24/7", description: " خدمات ما بعد البيع وصيانة دورية" }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
            <div className="  glass-card rounded-2xl  aspect-[4/4] ">
              <Image 
                src="/images/Whisk.jpg" 
                alt="فريق إيفاء للأمن والسلامة"
                fill
                className="object-cover rounded-md "
              />
            </div>

         

          {/* Content Section */}
          <div className="space-y-8">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card transition-all duration-1000 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
            }`}>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                الهوية المؤسسية
              </span>
            </div>

            {/* Title */}
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              <span className="text-gradient">من نحن – إيفاء للأمن والسلامة</span>
            </h2>

            {/* Description */}
            <div className={`space-y-4 text-muted-foreground transition-all duration-1000 delay-400 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-lg leading-relaxed">
                إيفاء هي شركة سعودية متخصصة في حلول الأمن والسلامة المعتمدة، تقدم خدمات احترافية مصممة لتلبية أعلى المعايير الوطنية والدولية. نعمل على توريد وتركيب أنظمة الحماية، إعداد التقارير والشهادات المعتمدة، وتنفيذ عقود الصيانة وإعادة التأهيل، لتوفير بيئة آمنة ومستدامة للمشاريع والمنشآت.
              </p>
              <p className="text-lg leading-relaxed">
                نعتمد على فريق من المهندسين والفنيين ذوي الخبرة، ونستخدم أحدث التقنيات لضمان تنفيذ الحلول بكفاءة وجودة عالية. نهدف إلى أن نكون الشريك الموثوق لكل من يبحث عن سلامة حقيقية، واستثمار محمي، واعتماد موثوق.
              </p>
            </div>

            {/* Features Grid */}
            <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-1000 delay-600 ${
              isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'
            }`}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="p-4 rounded-xl glass-card hover:bg-primary/5 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 delay-800 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
            }`}>
              <Button size="lg" className="btn-gradient text-lg px-6 py-3 group mt-6">
تعرف على خدماتنا
                <AnimatedArrowDown  />
              </Button>
            </div>
            
          </div>
        </div>
                  <div className={`grid grid-cols-2 lg:grid-cols-5 gap-6 mt-20 transition-all duration-1000 delay-800 ${
            isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-4'
          }`}>
            {[
                { value: '15+', label: 'سنة خبرة' },

                { value: '500+', label: 'مشروع مكتمل' },
              
              { value: '1000+', label: 'عميل راضٍ' },
              { value: '40+', label: "اعضاء فريق العمل" },
              
              { value: '24/7', label: 'دعم فني' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default AboutUs;