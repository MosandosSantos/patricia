"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { MessageCircle, Check, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Acolhimento",
    description:
      "Na primeira sessao, voce tera um espaco seguro para compartilhar sua historia e suas dificuldades sem julgamentos.",
  },
  {
    number: "02",
    title: "Avaliacao",
    description:
      "Faremos uma avaliacao detalhada para entender suas necessidades e definir objetivos terapeuticos claros.",
  },
  {
    number: "03",
    title: "Intervencao",
    description:
      "Utilizaremos tecnicas da TCC para identificar e modificar pensamentos e comportamentos que geram sofrimento.",
  },
  {
    number: "04",
    title: "Transformacao",
    description:
      "Voce desenvolvera novas habilidades e estrategias para lidar com os desafios e construir uma vida mais plena.",
  },
]

const benefits = [
  "Reducao de sintomas de ansiedade e depressao",
  "Melhora na autoestima e autoconfianca",
  "Desenvolvimento de habilidades emocionais",
  "Melhora nos relacionamentos interpessoais",
  "Maior clareza e foco nos objetivos",
  "Ferramentas praticas para o dia a dia",
]

export function TherapySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll(".step-card") || []
      gsap.from(stepElements, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: -80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Benefits animation
      const benefitElements = benefitsRef.current?.querySelectorAll(".benefit-item") || []
      gsap.from(benefitElements, {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="psicoterapia"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5EBE8] to-transparent" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E8D5D2]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A9A6] text-sm tracking-[0.3em] uppercase font-medium">
            Como funciona
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#4A3F3F] mt-3 leading-tight">
            A Jornada da <span className="text-[#C9A9A6]">Psicoterapia</span>
          </h2>
          <p className="text-[#7A6B6B] mt-4 max-w-lg mx-auto">
            A Terapia Cognitivo-Comportamental e uma abordagem pratica e baseada em evidencias que ajuda a transformar padroes de pensamento e comportamento.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div ref={stepsRef} className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`step-card cursor-pointer p-6 rounded-3xl transition-all duration-500 ${
                  activeStep === index
                    ? "bg-[#C9A9A6] text-white shadow-xl scale-[1.02]"
                    : "bg-[#F5EBE8] hover:bg-[#E8D5D2]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-serif text-3xl ${
                      activeStep === index ? "text-white/60" : "text-[#C9A9A6]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-serif text-xl ${
                          activeStep === index ? "text-white" : "text-[#4A3F3F]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          activeStep === index
                            ? "text-white translate-x-1"
                            : "text-[#C9A9A6]"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm mt-2 leading-relaxed ${
                        activeStep === index ? "text-white/90" : "text-[#7A6B6B]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-[#F5EBE8] rounded-[2rem] p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-[#4A3F3F] mb-6">
                Beneficios da TCC
              </h3>
              <div ref={benefitsRef} className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#C9A9A6] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#5C4F4F]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#E8D5D2]">
                <Button
                  size="lg"
                  className="w-full bg-[#C9A9A6] hover:bg-[#A88A87] text-white rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                  asChild
                >
                  <a
                    href="https://wa.me/5521979978050"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Agendar Primeira Sessao
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
