import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ChallengesSection } from "@/components/challenges-section"
import { TherapySection } from "@/components/therapy-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ChallengesSection />
      <TherapySection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
