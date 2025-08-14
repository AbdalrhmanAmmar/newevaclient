"use client"

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReelsSection from './ReelsSection';
import { useChooseUsStore } from '@/store/scrollStroe';

const WhyChooseUs = () => {
  const ChooseRef = useRef<HTMLElement>(null)
  const setChooseus = useChooseUsStore((state)=>state.setChooseUsRef)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

      useEffect(() => {
      if (ChooseRef.current) {
        setChooseus(ChooseRef.current);
      }
    }, [setChooseus]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const features = [
    { 
      icon: '🔒', 
      title: "حلول معتمدة وشاملة", 
      description: "خدمات متكاملة معتمدة من الجهات الرسمية" 
    },
    { 
      icon: '🛠️', 
      title: "خبرة ميدانية", 
      description: "فريق من المهندسين والفنيين المؤهلين" 
    },
    { 
      icon: '🚀', 
      title: "التزام بالجودة", 
      description: "تنفيذ المشاريع في الوقت المحدد" 
    },
    { 
      icon: '🧾', 
      title: "اعتمادات رسمية", 
      description: "مساعدتك في تلبية اشتراطات الدفاع المدني" 
    },
    { 
      icon: '🔧', 
      title: "دعم فني مستمر", 
      description: "خدمة ما بعد البيع والصيانة" 
    },
    { 
      icon: '🤝', 
      title: "شريك طويل الأمد", 
      description: "علاقة مستدامة قائمة على الثقة" 
    },
  ];

  

  return (
    <section ref={ChooseRef} id="why-us" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">لماذا تختار إيفاء؟</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            في عالم تتزايد فيه متطلبات السلامة، نحرص على أن نكون الاختيار الأمثل
          </p>
        </div>

        <div className="flex md:flex-row flex-col md:gap-6  items-center ">
          {/* Features Grid - Adjusted for mobile and medium screens */}
          <div className="w-full lg:w-1/2 grid lg:grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex lg:flex-col flex-row  bg-background/80 backdrop-blur-sm p-4  rounded-xl border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-2">{feature.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reels Section - Adjusted scaling */}
          <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-full scale-[0.55] sm:scale-[0.45] md:scale-100">
              <ReelsSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;