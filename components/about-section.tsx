"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Check } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })

      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const credentials = [
    "Psicologa Clinica - CRP 05/86082",
    "Especialista em Terapia Cognitivo-Comportamental",
    "Pos-graduacao em Saude Mental e TDAH",
    "Atendimento online para todo o Brasil",
  ]

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5EBE8] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E8D5D2]/30 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-4 bg-[#C9A9A6]/20 rounded-[4rem] -rotate-3" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/patricia-about.jpg"
                alt="Patrícia Sampaio - Psicologa"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating quote */}
            <div className="absolute -right-6 -bottom-6 lg:-right-12 lg:-bottom-8 bg-white rounded-3xl shadow-xl p-6 max-w-xs border border-[#E8D5D2]">
              <p className="text-[#7A6B6B] italic text-sm leading-relaxed">
                "Cada pessoa carrega em si a capacidade de se transformar. Meu papel e facilitar essa jornada."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[#C9A9A6] rounded-full" />
                <span className="text-[#C9A9A6] text-xs font-medium">Patrícia</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <span className="text-[#C9A9A6] text-sm tracking-[0.3em] uppercase font-medium">
                Sobre Mim
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-[#4A3F3F] mt-3 leading-tight">
                Ola, sou a Patrícia
              </h2>
            </div>

            <div className="space-y-4 text-[#7A6B6B] leading-relaxed">
              <p>
                Sou psicóloga clínica e realizo atendimentos presencial e online para adolescentes e adultos. Minha abordagem é a Terapia Cognitivo Comportamental (TCC), baseada em evidências científicas.
              </p>
              <p>
                Acredito que a psicoterapia é transformação e construir uma relação mais saudável consigo mesmo.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-3 pt-4">
              {credentials.map((cred, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#C9A9A6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#C9A9A6]" />
                  </div>
                  <span className="text-[#5C4F4F]">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
