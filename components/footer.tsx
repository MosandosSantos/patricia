"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre Mim", href: "#sobre" },
    { label: "Desafios", href: "#desafios" },
    { label: "A Psicoterapia", href: "#psicoterapia" },
    { label: "FAQ", href: "#faq" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer
      ref={footerRef}
      className="bg-[#4A3F3F] text-white relative overflow-hidden"
    >
      {/* Top CTA Section */}
      <div className="bg-[#C9A9A6] py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h3 className="font-serif text-2xl lg:text-4xl text-white mb-4">
            Pronta para comecar sua jornada?
          </h3>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            De o primeiro passo em direcao a uma vida mais equilibrada e plena.
            Agende sua primeira sessao.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#C9A9A6] hover:bg-[#F5EBE8] rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            asChild
          >
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar Consulta
            </a>
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div ref={contentRef} className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl text-white mb-2">
              Patricia Oliveira
            </h3>
            <p className="text-[#C9A9A6] tracking-[0.2em] uppercase text-sm mb-4">
              Psicologa Clinica
            </p>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Psicologa clinica especializada em Terapia Cognitivo-Comportamental.
              Atendimento online para todo o Brasil.
            </p>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#C9A9A6] hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Links Rapidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#C9A9A6] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  className="flex items-center gap-3 text-white/60 hover:text-[#C9A9A6] transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>(11) 99999-9999</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@patriciaoliveira.com.br"
                  className="flex items-center gap-3 text-white/60 hover:text-[#C9A9A6] transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>contato@patriciaoliveira.com.br</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-5 h-5" />
                  <span>Atendimento Online - Brasil</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            CRP 06/123456 - Todos os direitos reservados
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-[#C9A9A6]" /> em {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}
