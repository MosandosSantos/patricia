"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, HeartCrack, Zap, Users, Clock, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const challenges = [
  {
    icon: Brain,
    title: "Ansiedade",
    description:
      "Preocupacao excessiva, mente acelerada, irritabilidade e dificuldade em relaxar podem ser sinais de que a ansiedade esta limitando sua vida.",
  },
  {
    icon: Zap,
    title: "TDAH",
    description:
      "Dificuldade de foco, organizacao e gestao do tempo podem estar impactando sua produtividade e relacionamentos.",
  },
  {
    icon: HeartCrack,
    title: "Depressao",
    description:
      "Desanimo, desesperanca e perda de interesse nas atividades que antes traziam prazer podem indicar que voce precisa de apoio.",
  },
  {
    icon: Users,
    title: "Ansiedade Social",
    description:
      "Medo de julgamento, evitacao de situacoes sociais e dificuldade em se expressar podem estar limitando suas conexoes.",
  },
  {
    icon: Clock,
    title: "Burnout",
    description:
      "Esgotamento fisico e emocional, perda de motivacao e cinismo em relacao ao trabalho sao sinais de alerta importantes.",
  },
  {
    icon: Sparkles,
    title: "Autoestima",
    description:
      "Autocritica constante, dificuldade em reconhecer suas qualidades e medo de nao ser suficiente afetam todas as areas da vida.",
  },
]

export function ChallengesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })

      const cards = cardsRef.current?.children || []
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      })

      // Hover animation setup
      Array.from(cards).forEach((card) => {
        const cardEl = card as HTMLElement
        cardEl.addEventListener("mouseenter", () => {
          gsap.to(cardEl, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
        })
        cardEl.addEventListener("mouseleave", () => {
          gsap.to(cardEl, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="desafios"
      className="py-24 lg:py-32 bg-[#F5EBE8] relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#C9A9A6]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#E8D5D2]/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A9A6] text-sm tracking-[0.3em] uppercase font-medium">
            Voce nao esta sozinha
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#4A3F3F] mt-3 leading-tight">
            Voce tem vivido algum desses <span className="text-[#C9A9A6]">desafios</span>?
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-[#C9A9A6]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C9A9A6] transition-colors duration-500">
                <challenge.icon className="w-8 h-8 text-[#C9A9A6] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl text-[#4A3F3F] mb-3 group-hover:text-[#C9A9A6] transition-colors duration-300">
                {challenge.title}
              </h3>
              <p className="text-[#7A6B6B] text-sm leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#7A6B6B] text-lg max-w-xl mx-auto">
            Se voce se identificou com algum desses desafios, a psicoterapia pode ajudar.
          </p>
        </div>
      </div>
    </section>
  )
}
