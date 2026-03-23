"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "Como funcionam as consultas online?",
    answer:
      "As sessoes sao realizadas por videoconferencia em uma plataforma segura e sigilosa. Voce so precisa de um dispositivo com camera, microfone e conexao estavel com a internet.",
  },
  {
    question: "Quanto tempo dura cada sessao?",
    answer:
      "Cada sessao tem duracao de 50 minutos. A frequencia geralmente e semanal, mas pode ser ajustada conforme suas necessidades e objetivos.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Cada pessoa tem seu proprio ritmo. Muitos pacientes percebem mudancas nas primeiras 4 a 8 sessoes. A TCC e conhecida por oferecer resultados mais rapidos que outras abordagens.",
  },
  {
    question: "Qual e o valor das consultas?",
    answer:
      "Entre em contato pelo WhatsApp para informacoes sobre valores e formas de pagamento. Ofereco valores especiais para pacotes mensais.",
  },
  {
    question: "O que e a Terapia Cognitivo-Comportamental (TCC)?",
    answer:
      "A TCC e uma abordagem terapeutica que trabalha a relacao entre pensamentos, emocoes e comportamentos. E uma das terapias mais estudadas e com maior evidencia cientifica de eficacia.",
  },
  {
    question: "Como agendar uma sessao?",
    answer:
      "Voce pode entrar em contato pelo WhatsApp ou formulario de contato. Respondo em ate 24 horas e agendamos um horario que funcione para voce.",
  },
]

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
        stagger: 0.15,
        ease: "power3.out",
      })

      const faqItems = faqsRef.current?.querySelectorAll(".faq-item") || []
      gsap.from(faqItems, {
        scrollTrigger: {
          trigger: faqsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: -60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 lg:py-32 bg-[#F5EBE8] relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-48 h-48 bg-[#C9A9A6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#E8D5D2]/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Title and CTA */}
          <div ref={titleRef} className="lg:sticky lg:top-32">
            <span className="text-[#C9A9A6] text-sm tracking-[0.3em] uppercase font-medium">
              Tire suas duvidas
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-[#4A3F3F] mt-3 leading-tight">
              Perguntas <span className="text-[#C9A9A6]">Frequentes</span>
            </h2>
            <p className="text-[#7A6B6B] mt-4 mb-8">
              Ficou com alguma duvida que nao esta aqui? Entre em contato, estou
              disponivel para esclarecer qualquer questao.
            </p>

            <Button
              size="lg"
              className="bg-[#C9A9A6] hover:bg-[#A88A87] text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              asChild
            >
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Fale Comigo
              </a>
            </Button>
          </div>

          {/* Right - FAQ Items */}
          <div ref={faqsRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-medium text-[#4A3F3F]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A9A6] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-[#7A6B6B] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
