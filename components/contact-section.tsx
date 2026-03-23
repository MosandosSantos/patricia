'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefone',
      value: '(11) 98765-4321',
      href: 'tel:+5511987654321',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@marinasilva.com',
      href: 'mailto:contato@marinasilva.com',
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: 'São Paulo, SP',
    },
    {
      icon: Clock,
      label: 'Horário',
      value: 'Seg-Sex: 9h-18h',
    },
  ];

  return (
    <section id="contato" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-center mb-16 text-balance">
          Entre em <span className="text-sage-green font-normal">Contato</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Pronto para começar sua jornada de transformação? Entre em contato comigo e 
              vamos agendar uma primeira consulta para conhecermos melhor.
            </p>

            <div className="space-y-4 pt-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href || '#'}
                    className={`flex items-start gap-4 p-4 rounded-lg border border-border hover:border-sage-green hover:bg-white transition-all duration-300 group ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="p-3 rounded-lg bg-sage-green/10 group-hover:bg-sage-green group-hover:text-white transition-all duration-300">
                      <Icon size={20} className="text-sage-green group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-light text-foreground group-hover:text-sage-green transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 bg-white p-8 rounded-lg border border-border shadow-sm transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-light text-foreground mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-sage-green/50 transition-all"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-light text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-sage-green/50 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-light text-foreground mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-sage-green/50 transition-all"
                placeholder="(11) 98765-4321"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-light text-foreground mb-2">
                Tipo de Serviço
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-sage-green/50 transition-all"
              >
                <option value="">Selecione um serviço</option>
                <option value="individual">Psicoterapia Individual</option>
                <option value="casal">Terapia de Casal</option>
                <option value="infantil">Terapia Infantil</option>
                <option value="carreira">Orientação de Carreira</option>
                <option value="luto">Trabalho de Luto</option>
                <option value="pessoal">Desenvolvimento Pessoal</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-light text-foreground mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-light focus:outline-none focus:ring-2 focus:ring-sage-green/50 transition-all resize-none"
                placeholder="Conte um pouco sobre você e sua situação"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sage-green text-white rounded-lg font-light hover:bg-deep-olive transition-all duration-300 hover:shadow-lg"
            >
              Enviar Mensagem
            </button>

            {submitted && (
              <div className="p-4 bg-sage-green/10 border border-sage-green rounded-lg animate-fade-in-up">
                <p className="text-sm font-light text-sage-green">
                  Mensagem enviada com sucesso! Retornarei em breve.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
