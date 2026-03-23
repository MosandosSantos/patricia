'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart, Handshake, BookOpen, Briefcase, Leaf, Sparkles } from 'lucide-react';

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Heart,
      title: 'Psicoterapia Individual',
      description: 'Espaço confidencial para trabalhar ansiedade, depressão, autoestima e desafios pessoais.',
    },
    {
      icon: Handshake,
      title: 'Terapia de Casal',
      description: 'Fortaleça a comunicação e a conexão emocional com seu parceiro.',
    },
    {
      icon: BookOpen,
      title: 'Terapia Infantil e Adolescente',
      description: 'Ajudando crianças e adolescentes a lidar com emoções e desafios do desenvolvimento.',
    },
    {
      icon: Briefcase,
      title: 'Orientação de Carreira',
      description: 'Apoio para decisões profissionais e desenvolvimento da vida laboral.',
    },
    {
      icon: Leaf,
      title: 'Trabalho de Luto',
      description: 'Acompanhamento compássivo durante períodos de perda e transformação.',
    },
    {
      icon: Sparkles,
      title: 'Desenvolvimento Pessoal',
      description: 'Explore seu potencial e transforme padrões limitantes em possibilidades.',
    },
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-16 text-balance">
          Serviços <span className="text-sage-green font-normal">Oferecidos</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-lg border border-border bg-white transition-all duration-700 transform hover:shadow-lg hover:border-sage-green hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-sage-green/10 group-hover:bg-sage-green group-hover:text-white transition-all duration-300">
                    <Icon size={24} className="text-sage-green group-hover:text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-serif font-light mb-2 text-foreground group-hover:text-sage-green transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <button className="text-sm font-light text-sage-green hover:text-deep-olive transition-colors flex items-center gap-2 group/btn">
                    Saiba mais
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
