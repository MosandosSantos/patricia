"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Mim", href: "#sobre" },
  { label: "Desafios", href: "#desafios" },
  { label: "A Psicoterapia", href: "#psicoterapia" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(navRef.current?.children || [], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        gsap.from(mobileMenuRef.current.children, {
          opacity: 0,
          x: -30,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        })
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }, [isMobileMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FDF8F6]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div ref={logoRef}>
            <Link href="#inicio" className="group">
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl text-[#4A3F3F] tracking-wide">
                  Patrícia Sampaio
                </span>
                <span className="text-xs lg:text-sm text-[#C9A9A6] tracking-[0.3em] uppercase">
                  Psicoterapia presencial e online
                </span>
              </div>
            </Link>
          </div>

          <nav ref={navRef} className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[#5C4F4F] hover:text-[#C9A9A6] transition-colors duration-300 font-medium text-sm tracking-wide group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A9A6] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
            <Button
              className="bg-[#C9A9A6] hover:bg-[#A88A87] text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://wa.me/5521979978050" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Agendar
              </a>
            </Button>
          </nav>

          <button
            className="lg:hidden p-2 text-[#4A3F3F] hover:text-[#C9A9A6] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden h-0 opacity-0"
        >
          <nav className="flex flex-col gap-4 pt-6 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#5C4F4F] hover:text-[#C9A9A6] transition-colors duration-300 font-medium py-2 border-b border-[#E8D5D2]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="bg-[#C9A9A6] hover:bg-[#A88A87] text-white rounded-full mt-4"
              asChild
            >
              <a href="https://wa.me/5521979978050" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Fale Comigo
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
