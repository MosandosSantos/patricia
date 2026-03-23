"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Maria S.",
    text: "A Patricia me ajudou a entender meus padroes de pensamento e a desenvolver ferramentas praticas para lidar com a ansiedade. Hoje me sinto muito mais no controle da minha vida.",
    initials: "MS",
  },
  {
    name: "Carlos R.",
    text: "Depois de anos sofrendo com TDAH sem saber, a terapia com a Patricia foi transformadora. Ela me ajudou a desenvolver estrategias que realmente funcionam no meu dia a dia.",
    initials: "CR",
  },
  {
    name: "Ana L.",
    text: "O acolhimento e a empatia da Patricia fizeram toda a diferenca. Me senti segura para explorar questoes dificeis e encontrar novos caminhos.",
    initials: "AL",
  },
  {
    name: "Pedro M.",
    text: "A abordagem da TCC foi exatamente o que eu precisava. Resultados praticos e mensuraveis em poucas sessoes. Recomendo muito!",
    initials: "PM",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F5EBE8] rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A9A6] text-sm tracking-[0.3em] uppercase font-medium">
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#4A3F3F] mt-3 leading-tight">
            O que dizem sobre <span className="text-[#C9A9A6]">mim</span>
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="max-w-3xl mx-auto">
          <div className="relative bg-[#F5EBE8] rounded-[3rem] p-8 lg:p-12">
            {/* Quote icon */}
            <div className="absolute -top-6 left-12 w-12 h-12 bg-[#C9A9A6] rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="min-h-[200px] flex flex-col justify-center">
              <p className="text-[#4A3F3F] text-lg lg:text-xl leading-relaxed italic">
                {`"${testimonials[currentIndex].text}"`}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C9A9A6] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {testimonials[currentIndex].initials}
                  </span>
                </div>
                <div>
                  <p className="text-[#4A3F3F] font-medium">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-[#7A6B6B] text-sm">Paciente</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#E8D5D2]">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#C9A9A6] w-8"
                        : "bg-[#E8D5D2] hover:bg-[#C9A9A6]/50"
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full bg-white border border-[#E8D5D2] flex items-center justify-center text-[#7A6B6B] hover:bg-[#C9A9A6] hover:text-white hover:border-[#C9A9A6] transition-all duration-300"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-white border border-[#E8D5D2] flex items-center justify-center text-[#7A6B6B] hover:bg-[#C9A9A6] hover:text-white hover:border-[#C9A9A6] transition-all duration-300"
                  aria-label="Proximo depoimento"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
