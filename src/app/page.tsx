"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import {
  HardHat,
  Hammer,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hydration-safe check: false on server, true on client              */
/* ------------------------------------------------------------------ */
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* ------------------------------------------------------------------ */
/*  Intersection-observer hook for scroll-triggered reveal animations */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMounted = useHydrated();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMounted]);

  return { ref, isVisible, isMounted };
}

/* ---------- tiny RevealSection wrapper ---------- */
function RevealSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const { ref, isVisible, isMounted } = useReveal();

  // Before JS hydration: no animation classes (content visible)
  // After hydration: apply hidden class, then visible when intersecting
  const dirClass = !isMounted
    ? ""
    : direction === "left"
      ? "reveal-left-hidden"
      : direction === "right"
        ? "reveal-right-hidden"
        : "reveal-hidden";

  const visibleClass = isVisible ? "visible" : "";

  return (
    <div
      ref={ref}
      className={`${dirClass} ${visibleClass} ${className}`}
      style={isMounted ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("Erro ao redirecionar para o WhatsApp. Tente novamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao enviar solicitação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="min-h-screen font-sans">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="bg-zinc-900 text-white sticky top-0 z-50 border-b border-amber-500/20 animate-slide-down">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardHat className="text-amber-500 h-7 w-7 sm:h-8 sm:w-8" />
            <span className="text-lg sm:text-xl font-bold uppercase tracking-wider">
              Construtor<span className="text-amber-500">Pro</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 font-semibold items-center">
            <a
              href="#inicio"
              className="hover:text-amber-500 transition-colors duration-300"
            >
              Início
            </a>
            <a
              href="#servicos"
              className="hover:text-amber-500 transition-colors duration-300"
            >
              Serviços
            </a>
            <a
              href="#portfolio"
              className="hover:text-amber-500 transition-colors duration-300"
            >
              Obras
            </a>
            <a
              href="#orcamento"
              className="bg-amber-500 text-zinc-900 px-4 py-2 rounded font-bold hover:bg-amber-400 transition-colors duration-300"
            >
              Faça seu Orçamento
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-white hover:text-amber-500 transition-colors"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-3 px-4 pb-4 font-semibold">
            <a
              href="#inicio"
              onClick={closeMobileMenu}
              className="hover:text-amber-500 transition-colors py-1"
            >
              Início
            </a>
            <a
              href="#servicos"
              onClick={closeMobileMenu}
              className="hover:text-amber-500 transition-colors py-1"
            >
              Serviços
            </a>
            <a
              href="#portfolio"
              onClick={closeMobileMenu}
              className="hover:text-amber-500 transition-colors py-1"
            >
              Obras
            </a>
            <a
              href="#orcamento"
              onClick={closeMobileMenu}
              className="bg-amber-500 text-zinc-900 px-4 py-2 rounded font-bold text-center hover:bg-amber-400 transition-colors"
            >
              Faça seu Orçamento
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ─── Hero Section ─────────────────────────────────── */}
        <section
          id="inicio"
          className="relative min-h-[60vh] sm:min-h-[70vh] md:h-[80vh] flex items-center overflow-hidden"
        >
          {/* Background gradient fallback (no external image needed) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            {/* Decorative floating shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-amber-600/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-20">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 animate-hero-text">
                Construindo sonhos com{" "}
                <span className="text-amber-500">qualidade</span> e{" "}
                <span className="text-amber-500">segurança</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-6 sm:mb-8 animate-hero-text delay-200">
                Especialista em obras residenciais e comerciais. Do alicerce ao
                acabamento, entregamos excelência em cada detalhe do seu
                projeto.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 animate-hero-text delay-400">
                <a
                  href="#orcamento"
                  className="bg-amber-500 text-zinc-900 px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-center hover:bg-amber-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 animate-pulse-glow"
                >
                  Solicitar Orçamento{" "}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#portfolio"
                  className="border-2 border-white px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-center hover:bg-white hover:text-zinc-900 transition-all duration-300 hover:scale-105"
                >
                  Ver Nossas Obras
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Services Section ─────────────────────────────── */}
        <section id="servicos" className="py-14 sm:py-20 bg-zinc-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6">
            <RevealSection className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase text-zinc-800 dark:text-white">
                Nossos Serviços
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto" />
              <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Soluções completas para a sua obra, executadas por profissionais
                qualificados e com materiais de primeira linha.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  Icon: Hammer,
                  title: "Construção do Zero",
                  text: "Execução completa do projeto arquitetônico, desde a fundação até o telhado, com rigoroso controle de qualidade e prazos.",
                },
                {
                  Icon: HardHat,
                  title: "Reformas em Geral",
                  text: "Renovação de ambientes residenciais e comerciais. Demolição, alvenaria, instalações e acabamentos refinados.",
                },
                {
                  Icon: CheckCircle,
                  title: "Acabamentos Finais",
                  text: "Assentamento de porcelanatos, pintura profissional, instalação de forros, esquadrias e detalhamentos de alto padrão.",
                },
              ].map(({ Icon, title, text }, i) => (
                <RevealSection key={title} delay={i * 150}>
                  <div className="bg-white dark:bg-zinc-800 p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-amber-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-amber-500 mb-4 sm:mb-6" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-zinc-800 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      {text}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Portfolio Section ────────────────────────────── */}
        <section id="portfolio" className="py-14 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <RevealSection className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase text-zinc-800 dark:text-white">
                Obras Entregues
              </h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto" />
              <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Conheça alguns dos nossos projetos concluídos com excelência e
                satisfação total dos clientes.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Residência Alto Padrão",
                  tag: "Construção Completa",
                  gradient: "from-amber-700 via-amber-800 to-zinc-900",
                },
                {
                  title: "Modernização de Interiores",
                  tag: "Reforma e Acabamento",
                  gradient: "from-zinc-700 via-zinc-800 to-zinc-900",
                },
                {
                  title: "Galpão Comercial",
                  tag: "Fundação e Estrutura",
                  gradient: "from-stone-700 via-stone-800 to-zinc-900",
                },
              ].map(({ title, tag, gradient }, i) => (
                <RevealSection key={title} delay={i * 150}>
                  <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] cursor-pointer">
                    {/* Gradient placeholder background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-110`}
                    />
                    {/* Construction-themed icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <HardHat className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                    </div>
                    {/* Label overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        {title}
                      </h3>
                      <p className="text-amber-500 font-medium text-sm sm:text-base">
                        {tag}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact / Budget Section ────────────────────── */}
        <section id="orcamento" className="py-14 sm:py-20 bg-amber-500">
          <div className="container mx-auto px-4 sm:px-6">
            <RevealSection>
              <div className="flex flex-col lg:flex-row gap-0 bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden">
                {/* Contact Info */}
                <div className="lg:w-1/3 bg-zinc-900 text-white p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                      Vamos construir juntos!
                    </h2>
                    <p className="text-zinc-400 mb-6 sm:mb-10 text-sm sm:text-base">
                      Preencha o formulário para falar diretamente comigo pelo
                      WhatsApp. Terei o maior prazer em entender o seu projeto e
                      enviar um orçamento sem compromisso.
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      {[
                        {
                          Icon: Phone,
                          label: "Telefone / WhatsApp",
                          value: "(11) 99999-9999",
                        },
                        {
                          Icon: Mail,
                          label: "E-mail",
                          value: "contato@construtorpro.com",
                        },
                        {
                          Icon: MapPin,
                          label: "Atendimento",
                          value: "São Paulo e Região",
                        },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 sm:gap-4">
                          <div className="bg-amber-500/20 p-2 sm:p-3 rounded-full shrink-0">
                            <Icon className="text-amber-500 h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-zinc-400">
                              {label}
                            </p>
                            <p className="font-bold text-sm sm:text-base truncate">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="lg:w-2/3 p-6 sm:p-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-zinc-800 dark:text-white uppercase">
                    Solicite seu Orçamento
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2"
                        >
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow text-sm sm:text-base"
                          placeholder="João da Silva"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2"
                        >
                          Serviço Desejado *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow text-sm sm:text-base"
                        >
                          <option value="" disabled>
                            Selecione uma opção
                          </option>
                          <option value="Construção Nova">Construção Nova</option>
                          <option value="Reforma Residencial">
                            Reforma Residencial
                          </option>
                          <option value="Reforma Comercial">
                            Reforma Comercial
                          </option>
                          <option value="Acabamentos">
                            Acabamentos (Piso, Pintura, etc)
                          </option>
                          <option value="Fundação e Alvenaria">
                            Fundação e Alvenaria
                          </option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2"
                      >
                        Detalhes da Obra (Opcional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow resize-none text-sm sm:text-base"
                        placeholder="Descreva brevemente o que você precisa..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-500 text-zinc-900 font-bold py-3 sm:py-4 rounded hover:bg-amber-400 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        "Processando..."
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                          Enviar no WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>
      </main>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="bg-zinc-950 text-zinc-400 py-6 sm:py-8 text-center border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-3 sm:mb-4">
            <HardHat className="text-zinc-600 h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-500">
              Construtor<span className="text-zinc-600">Pro</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} ConstrutorPro. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
