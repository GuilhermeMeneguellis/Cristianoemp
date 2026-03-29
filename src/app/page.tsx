"use client";

import { useState } from 'react';
import Image from 'next/image';
import { HardHat, Hammer, CheckCircle, ArrowRight, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        alert('Erro ao redirecionar para o WhatsApp. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao enviar solicitação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-zinc-900 text-white sticky top-0 z-50 border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardHat className="text-amber-500 h-8 w-8" />
            <span className="text-xl font-bold uppercase tracking-wider">Construtor<span className="text-amber-500">Pro</span></span>
          </div>
          <nav className="hidden md:flex gap-6 font-semibold">
            <a href="#inicio" className="hover:text-amber-500 transition-colors">Início</a>
            <a href="#servicos" className="hover:text-amber-500 transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-amber-500 transition-colors">Obras</a>
            <a href="#orcamento" className="bg-amber-500 text-zinc-900 px-4 py-2 rounded font-bold hover:bg-amber-400 transition-colors">Faça seu Orçamento</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-zinc-900/70 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070"
              alt="Obra de construção civil em andamento"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Construindo sonhos com <span className="text-amber-500">qualidade</span> e <span className="text-amber-500">segurança</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-8">
                Especialista em obras residenciais e comerciais. Do alicerce ao acabamento, entregamos excelência em cada detalhe do seu projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#orcamento" className="bg-amber-500 text-zinc-900 px-8 py-4 rounded font-bold text-center hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                  Solicitar Orçamento <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#portfolio" className="border-2 border-white px-8 py-4 rounded font-bold text-center hover:bg-white hover:text-zinc-900 transition-colors">
                  Ver Nossas Obras
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-20 bg-zinc-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase text-zinc-800 dark:text-white">Nossos Serviços</h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Soluções completas para a sua obra, executadas por profissionais qualificados e com materiais de primeira linha.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white dark:bg-zinc-800 p-8 rounded shadow-lg border-t-4 border-amber-500 hover:-translate-y-2 transition-transform">
                <Hammer className="h-12 w-12 text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-zinc-800 dark:text-white">Construção do Zero</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Execução completa do projeto arquitetônico, desde a fundação até o telhado, com rigoroso controle de qualidade e prazos.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-white dark:bg-zinc-800 p-8 rounded shadow-lg border-t-4 border-amber-500 hover:-translate-y-2 transition-transform">
                <HardHat className="h-12 w-12 text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-zinc-800 dark:text-white">Reformas em Geral</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Renovação de ambientes residenciais e comerciais. Demolição, alvenaria, instalações e acabamentos refinados.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-white dark:bg-zinc-800 p-8 rounded shadow-lg border-t-4 border-amber-500 hover:-translate-y-2 transition-transform">
                <CheckCircle className="h-12 w-12 text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-zinc-800 dark:text-white">Acabamentos Finais</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Assentamento de porcelanatos, pintura profissional, instalação de forros, esquadrias e detalhamentos de alto padrão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase text-zinc-800 dark:text-white">Obras Entregues</h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Conheça alguns dos nossos projetos concluídos com excelência e satisfação total dos clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
              <div className="group relative overflow-hidden rounded shadow-lg aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1470"
                  alt="Casa de alto padrão"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">Residência Alto Padrão</h3>
                  <p className="text-amber-500 font-medium">Construção Completa</p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative overflow-hidden rounded shadow-lg aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1631"
                  alt="Reforma de interiores"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">Modernização de Interiores</h3>
                  <p className="text-amber-500 font-medium">Reforma e Acabamento</p>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative overflow-hidden rounded shadow-lg aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1470"
                  alt="Prédio comercial"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">Galpão Comercial</h3>
                  <p className="text-amber-500 font-medium">Fundação e Estrutura</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Budget Section */}
        <section id="orcamento" className="py-20 bg-amber-500">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden">

              {/* Contact Info */}
              <div className="lg:w-1/3 bg-zinc-900 text-white p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Vamos construir juntos!</h2>
                  <p className="text-zinc-400 mb-10">
                    Preencha o formulário para falar diretamente comigo pelo WhatsApp. Terei o maior prazer em entender o seu projeto e enviar um orçamento sem compromisso.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500/20 p-3 rounded-full">
                        <Phone className="text-amber-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Telefone / WhatsApp</p>
                        <p className="font-bold">(11) 99999-9999</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500/20 p-3 rounded-full">
                        <Mail className="text-amber-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">E-mail</p>
                        <p className="font-bold">contato@construtorpro.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500/20 p-3 rounded-full">
                        <MapPin className="text-amber-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Atendimento</p>
                        <p className="font-bold">São Paulo e Região</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:w-2/3 p-10">
                <h3 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white uppercase">Solicite seu Orçamento</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Seu Nome Completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="João da Silva"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Serviço Desejado *</label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="Construção Nova">Construção Nova</option>
                        <option value="Reforma Residencial">Reforma Residencial</option>
                        <option value="Reforma Comercial">Reforma Comercial</option>
                        <option value="Acabamentos">Acabamentos (Piso, Pintura, etc)</option>
                        <option value="Fundação e Alvenaria">Fundação e Alvenaria</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Detalhes da Obra (Opcional)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Descreva brevemente o que você precisa..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-zinc-900 font-bold py-4 rounded hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processando...' : (
                      <>
                        <MessageCircle className="h-6 w-6" />
                        Enviar no WhatsApp
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-8 text-center border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <HardHat className="text-zinc-600 h-6 w-6" />
            <span className="text-lg font-bold uppercase tracking-wider text-zinc-500">Construtor<span className="text-zinc-600">Pro</span></span>
          </div>
          <p>© {new Date().getFullYear()} ConstrutorPro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
