"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const floatShape1 = useRef<HTMLDivElement>(null)
  const floatShape2 = useRef<HTMLDivElement>(null)
  const floatShape3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      gsap.to(floatShape1.current, {
        y: -30,
        x: 10,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(floatShape2.current, {
        y: 20,
        x: -15,
        rotation: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      })

      gsap.to(floatShape3.current, {
        y: -20,
        x: 20,
        rotation: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })

      tl.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            x: 100,
            scale: 0.8,
            duration: 1.2,
          },
          "-=1"
        )
        .from(
          decorRef.current,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 1,
          },
          "-=0.8"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FDF8F6] via-[#F5EBE8] to-[#E8D5D2] pt-24 lg:pt-0"
    >
      <div
        ref={floatShape1}
        className="absolute top-20 left-10 w-32 h-32 lg:w-48 lg:h-48 bg-[#C9A9A6]/20 rounded-full blur-2xl"
      />
      <div
        ref={floatShape2}
        className="absolute bottom-32 right-20 w-40 h-40 lg:w-64 lg:h-64 bg-[#E8D5D2]/40 rounded-full blur-3xl"
      />
      <div
        ref={floatShape3}
        className="absolute top-1/2 left-1/3 w-24 h-24 lg:w-36 lg:h-36 bg-[#C9A9A6]/10 rounded-full blur-xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={titleRef}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#4A3F3F] leading-tight"
            >
              Patricia Oliveira
            </h1>
            <p
              ref={subtitleRef}
              className="text-[#C9A9A6] text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase mt-4 font-light"
            >
              Psicoterapia Cognitivo-Comportamental
            </p>
            <p
              ref={descRef}
              className="text-[#7A6B6B] text-base lg:text-lg mt-6 lg:mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Atendimento online individual para adultos. Transforme sua relacao com voce
              mesmo e conquiste uma vida mais equilibrada e plena.
            </p>

            <div ref={ctaRef} className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#C9A9A6] hover:bg-[#A88A87] text-white rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                asChild
              >
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Fale Comigo
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#C9A9A6] text-[#C9A9A6] hover:bg-[#C9A9A6] hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-500"
                asChild
              >
                <a href="#sobre">Saiba Mais</a>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div
              ref={decorRef}
              className="absolute -z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#E8D5D2] rounded-full -right-10 -top-10"
            />
            <div
              ref={imageRef}
              className="relative w-[280px] h-[350px] md:w-[350px] md:h-[450px] lg:w-[420px] lg:h-[530px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/patricia-hero.jpg"
                alt="Patricia Oliveira - Psicologa"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -left-4 bottom-20 lg:-left-10 lg:bottom-32 bg-white rounded-3xl shadow-xl p-4 lg:p-5 border border-[#E8D5D2]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C9A9A6]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-[#4A3F3F] font-semibold text-sm">CRP 05/86082</p>
                  <p className="text-[#7A6B6B] text-xs">Especialista TCC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#sobre" className="text-[#C9A9A6] hover:text-[#A88A87] transition-colors">
          <ArrowDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  )
}
