"use client"

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'

const logos = Array.from({ length: 26 }, (_, i) => `/logos/Untitled-${i+1}.png`)

export const OurClients = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return (
    <section ref={ref} className="md:py-12 sm:py-3 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
          className="text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-bold md:mb-4">
            عملاؤنا <span className="text-gradient">الكرام</span>
          </h3>
          <p className="text-muted-foreground text-2xl">شركاء النجاح والثقة</p>
        </motion.div>

        <div className="relative h-32">
          <div className="absolute inset-0" />
          
          <motion.div
            className="flex absolute left-[100%]"
            animate={{
              x: ['0%', '-100%'],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }
              }
            }}
          >
            {[...logos].map((logo, i) => (
              <div 
                key={`${logo}-${i}`}
                className="flex-shrink-0 mx-2 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:mx-8 md:w-48 md:h-48 relative my-2"
              >
                <Image
                  src={logo}
                  alt={`شريك ${i+1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 639px) 120px, (max-width: 767px) 160px, 192px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}