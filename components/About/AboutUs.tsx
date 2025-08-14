"use client"

import { motion } from "framer-motion";
import { Shield, Target, Users, Trophy, Lightbulb, CheckCircle2, Building2, ClipboardList } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">من نحن</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            في عالم يتغير بسرعة، تبقى إيفاء ثابتة في التزامها بتقديم الجودة، والابتكار، والثقة
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="text-primary" />
                نبذة عنا
              </h3>
              <p className="text-muted-foreground">
                نحن شركة سعودية تأسست برؤية واضحة: توفير حلول متكاملة في قطاعات متنوعة تشمل الأمن والسلامة، التطوير العقاري، وإدارة الأملاك، مع التزام عميق بمبادئ المهنية والاستدامة.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-primary" />
                رؤيتنا ورسالتنا
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">الرؤية:</h4>
                  <p className="text-muted-foreground">
                    أن نكون الخيار الأول على مستوى المملكة والخليج العربي في تقديم حلول متكاملة تتميز بالابتكار والموثوقية.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">الرسالة:</h4>
                  <p className="text-muted-foreground">
                    نهدف إلى تمكين عملائنا من خلال توفير خدمات احترافية وشاملة، مبنية على فهم دقيق لتحديات السوق المحلي والاحتياجات الفعلية لكل عميل.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="text-primary" />
                قيمنا الأساسية
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "الجودة", description: "لا نقبل بأقل من الأفضل" },
                  { icon: Users, title: "المصداقية", description: "نفي بوعودنا ونلتزم بالشفافية" },
                  { icon: Trophy, title: "الابتكار", description: "نبحث دائمًا عن حلول جديدة وفعالة" },
                  { icon: CheckCircle2, title: "الاحترافية", description: "في كل خطوة، من التواصل إلى التنفيذ" },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <value.icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why EVA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ClipboardList className="text-primary" />
                لماذا إيفاء؟
              </h3>
              <ul className="space-y-3">
                {[
                  "خبرة تمتد لسنوات في السوق السعودي",
                  "شراكات ناجحة مع شركات وجهات حكومية وخاصة",
                  "التزام دقيق بمعايير الجودة والسلامة",
                  "دعم فني واستشاري مستمر قبل وأثناء وبعد الخدمة",
                  "فريق عمل مؤهل بخبرة محلية وعالمية"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Location Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-2">موقعنا</h3>
          <p className="text-muted-foreground">الرياض – حي الفيحاء – طريق ابن ماجة</p>
          <p className="mt-4 text-lg">
            إيفاء ليست مجرد شركة، بل هي شريكك في النجاح والاستدامة.
          </p>
        </motion.div>
      </div>
    </section>
  );
}