'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function ApproachSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const steps = [
    {
      number: '01',
      title: 'Acolhimento',
      description: 'Criaremos um espaço seguro e confidencial onde suas preocupações são ouvidas com atenção e respeito.',
    },
    {
      number: '02',
      title: 'Compreensão',
      description: 'Exploraremos juntos seus pensamentos, sentimentos e padrões para uma compreensão profunda.',
    },
    {
      number: '03',
      title: 'Transformação',
      description: 'Trabalharemos em estratégias práticas para mudança e desenvolvimento pessoal.',
    },
    {
      number: '04',
      title: 'Integração',
      description: 'Consolidaremos os aprendizados e ferramentas para continuar sua jornada de forma autônoma.',
    },
  ];

  const benefits = [
    'Maior clareza emocional',
    'Redução de ansiedade',
    'Melhora nos relacionamentos',
    'Autoconhecimento profundo',
    'Ferramentas práticas',
    'Bem-estar duradouro',
  ];

  return (
    <section id="abordagem" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-16 text-balance">
          Minha <span className="text-sage-green font-normal">Abordagem</span>
        </h2>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-4 md:gap-2">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-500 text-center group ${
                    activeStep === index
                      ? 'border-sage-green bg-sage-green/10'
                      : 'border-border hover:border-sage-green/50'
                  }`}
                >
                  <div className="text-2xl font-serif font-light text-sage-green mb-2">
                    {step.number}
                  </div>
                  <h3 className="font-light text-sm md:text-base text-foreground group-hover:text-sage-green transition-colors">
                    {step.title}
                  </h3>
                </button>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2">
                    <ArrowRight
                      size={20}
                      className={`transition-all duration-500 ${
                        activeStep >= index ? 'text-sage-green' : 'text-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active Step Description */}
          <div className={`mt-8 p-6 bg-white border border-sage-green/20 rounded-lg transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-lg font-light text-foreground leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-white border border-border hover:border-sage-green hover:shadow-md transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sage-green" />
                <span className="font-light text-foreground">{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
