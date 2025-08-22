"use client"

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ServiceOpenModal from '../service/ServiceOpenModal';

export const services = [
  { 
    icon: '📋', 
    title: "تقرير فني فوري",
    slug: "instant-technical-report",
    description: "تقرير فني شامل يتم إعداده فوراً مع توصيات فورية لتحسين السلامة من الحرائق",
    features: [
      "",
      "يتم اصدار التقرير خلال 24 ساعه",
      "يعتمد من خلال منصات (بلدي / سلامه)",
      ""
    ]
  },
  { 
    icon: '📊', 
    title: "تقرير فني غير فوري",
    slug: "detailed-technical-report",
    description: "تقرير مفصل مع تحليل شامل لاحتياجات السلامة من الحرائق في المنشأة",
    features: [
      "دراسة متعمقة للمخاطر",
      "خطط سلامة طويلة الأجل",
      "تحليل التكلفة والعائد",
      "تقرير مفصل خلال 3 أيام عمل"
    ]
  },
  { 
    icon: '🏅', 
    title: "شهادة تركيب أدوات السلامة",
    slug: "safety-installation-certificate",
    description: "إصدار شهادات معتمدة لتركيب أنظمة السلامة ومكافحة الحريق حسب المعايير",
    features: [
      "فحص شامل للأدوات المثبتة",
      "شهادة معتمدة من الدفاع المدني",
      "توثيق كافة الأنظمة",
      "متابعة دورية للصيانة"
    ]
  },
  { 
    icon: '📝', 
    title: "عقد الصيانة",
    slug: "maintenance-contract",
    description: "عقود صيانة دورية شاملة لأنظمة السلامة والحماية من الحرائق",
    features: [
      "فحوصات دورية شهرية/سنوية",
      "صيانة وقائية للأنظمة",
      "تقرير مفصل بعد كل زيارة",
      "استجابة سريعة للطوارئ"
    ]
  },
  { 
    icon: '🏗️', 
    title: "مخطط هندسي",
    slug: "engineering-plan",
    description: "تصميم مخططات هندسية متكاملة لأنظمة السلامة من الحرائق",
    features: [
      "رفع مساحي معماري معتمد",
      "إنشاء المخططات (المعمارية - الإنشائية - المكانكية _ الكهربائية)",
      "رفع الطلب لموقع الأمانة",
      "إصدار رخصة البناء"
    ]
  },
  { 
    icon: '🛡️', 
    title: "مخطط سلامة",
    slug: "safety-plan",
    description: "إعداد خطط سلامة متكاملة للمنشآت وفق أعلى المعايير",
    features: [
      "كود البناء ومتطلبات الدفاع المدني",
      "خرائط توزيع أنظمة الإنذار",
      "خرائط توزيع أنظمة الإطفاء وطفايات الحريق",
      "خرائط توزيع أنظمة سحب الدخان",
      "دراسة حجم وسعه مضخة الحريق",
      "لايف سيفتي (إنارة إحتياطية - أبواب طوارئ - لوحات ارشادية - نقاط التجمع)"
    ]
  },
  { 
    icon: '🏭', 
    title: "توريد وتركيب أنظمة السلامة",
    slug: "safety-systems-installation",
    description: "حلول متكاملة للمشاريع الحكومية والخاصة",
    features: [
      "أنظمة إنذار الحريق المبكر العادي والمعنون",
      "أنظمة إطفاء متكاملة (رش آلي - صناديق حريق- مضخات - طفايات)",
      "أنظمة الغاز (نوفيك 1230 - FM200 - CO2 - فاير برو - كيتشن هود)",
      "لايف سيفتي (إنارة إحتياطية - أبواب طوارئ - لوحات ارشادية - نقاط التجمع)"
    ]
  },
  { 
    icon: '🔄', 
    title: "إعادة تأهيل الأنظمة",
    slug: "systems-rehabilitation",
    description: "ترقية وتحديث أنظمة السلامة القديمة لمواكبة المعايير الحديثة",
    features: [
      "تقييم حالة الأنظمة الحالية",
      "اقتراحات التحديث والتحسين",
      "استبدال المعدات القديمة",
      "تحسين كفاءة الأنظمة"
    ]
  }
];

const ServiceClient = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [randomServices, setRandomServices] = useState<typeof services>([]);

  useEffect(() => {
    // Get 3 random services on component mount
    const shuffled = [...services].sort(() => 0.5 - Math.random());
    setRandomServices(shuffled.slice(0, 3));
  }, []);

  const handleOpen = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService("");
  };

  const handleNavigate = (slug: string) => {
    router.push(`/servicemodal/${slug}`);
  };

  return (
    <section id="services" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-primary/5" data-nosnippet>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">
              حلولنا المتكاملة في السلامة من الحرائق
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات المصممة لحماية منشآتك وأصولك وأفرادك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {randomServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start mb-4">
                  <span className="text-3xl mr-3 bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-2">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.length > 0 ? (
                        <>
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-sm">{feature}</span>
                        </>
                      ) : (
                        <span className="text-sm">{feature}</span>
                      )}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleNavigate(service.slug)} 
                  className="w-full mt-auto group-hover:bg-primary group-hover:text-white transition-colors"
                  variant="outline"
                >
                  طلب الخدمة
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => handleOpen("جميع الخدمات")}
            size="lg" 
            className="px-8"
          >
            اكتشف جميع خدماتنا
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </div>

      <ServiceOpenModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        serviceTitle={selectedService} 
      />
    </section>
  );
};

export default ServiceClient;