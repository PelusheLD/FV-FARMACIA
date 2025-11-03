import { ArrowRight, ShieldCheck, Clock, Stethoscope, ExternalLink, Phone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  // Carrusel data
  carouselData?: {
    enableCarousel1?: boolean;
    enableCarousel2?: boolean;
    enableCarousel3?: boolean;
    title1?: string;
    subtitle1?: string;
    description1?: string;
    image1?: string;
    background1?: string;
    button1?: string;
    url1?: string;
    title2?: string;
    subtitle2?: string;
    description2?: string;
    image2?: string;
    background2?: string;
    button2?: string;
    url2?: string;
    title3?: string;
    subtitle3?: string;
    description3?: string;
    image3?: string;
    background3?: string;
    button3?: string;
    url3?: string;
  };
}

export default function Hero({ carouselData }: HeroProps) {
  const [currentSlide] = useState(0);
  // Contenido base del hero (no-carrusel) totalmente nuevo
  const slides = [
    {
      title: carouselData?.title3 || "FV FARMACIA",
      subtitle: carouselData?.subtitle3 || "Tu farmacia de confianza",
      description:
        carouselData?.description3 ||
        "Medicamentos, cuidado personal y bienestar. Atención cercana y precios justos.",
      image: carouselData?.image3,
      background: carouselData?.background3,
      buttonText: carouselData?.button3 || "Ir a Farmacia",
      buttonUrl: carouselData?.url3,
    },
  ];

  // Función para manejar clics de botones
  const handleButtonClick = useCallback((slideIndex: number) => {
    const slide = slides[slideIndex];
    const buttonNumber = slideIndex + 1;
    const buttonNames = ['FV FARMACIA'];
    
    console.log(`🔘 BOTÓN ${buttonNumber} (${buttonNames[slideIndex]}) clickeado`);
    console.log('📝 Texto del botón:', slide.buttonText);
    console.log('🔗 URL configurada:', slide.buttonUrl);
    
    if (slide.buttonUrl) {
      console.log('✅ Abriendo URL externa:', slide.buttonUrl);
      window.open(slide.buttonUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('⚠️ No hay URL configurada, haciendo scroll a categorías');
      // Fallback: scroll a categorías si no hay URL
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [slides]);

  // Fondo y layout nuevos, sin carrusel
  return (
    <section className="relative overflow-hidden">
      {/* Capa base con gradientes suaves en verde */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-white to-emerald-50" />
      {/* Radiales decorativas */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Columna izquierda: contenido */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4" /> Servicio farmacéutico certificado
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mt-4 text-gray-900 leading-tight">
              {slides[currentSlide].title}
        </h1>
            <p className="text-emerald-700/90 text-lg md:text-xl mt-3">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-xl">
              {slides[currentSlide].description}
            </p>
            
            {/* Badges de beneficios */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-white shadow-sm ring-1 ring-gray-200 px-3 py-2 text-sm text-gray-700">
                <Clock className="h-4 w-4 text-emerald-600" /> Entrega rápida
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white shadow-sm ring-1 ring-gray-200 px-3 py-2 text-sm text-gray-700">
                <Stethoscope className="h-4 w-4 text-emerald-600" /> Atención farmacéutica
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white shadow-sm ring-1 ring-gray-200 px-3 py-2 text-sm text-gray-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Productos garantizados
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button 
                id={`hero-primary-${currentSlide + 1}`}
              onClick={() => handleButtonClick(currentSlide)}
            size="lg"
                className="bg-[#29a03b] hover:bg-[#238a33] text-white font-semibold px-6"
                data-testid={`hero-primary-${currentSlide + 1}`}
            >
                <ExternalLink className="h-5 w-5 mr-2" /> {slides[currentSlide].buttonText}
          </Button>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white px-6 py-3 text-emerald-800 font-semibold hover:bg-emerald-50 transition"
              >
                Ver categorías <ArrowRight className="ml-2 h-4 w-4" />
              </a>
          </div>
        </div>
        
          {/* Columna derecha: composición con imagen */}
          <div className="relative hidden md:block">
            <div className="relative ml-auto w-full max-w-none md:-mt-8 lg:-mt-12">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-emerald-400/20">
                <img
                  src={slides[currentSlide].background && slides[currentSlide].background.trim() !== '' ? slides[currentSlide].background : '/fvfarmacia.svg'}
                  alt="FV Farmacia"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* Tarjeta flotante */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 p-4 flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Atención al cliente</p>
                  <p className="text-gray-600">Asesoría para tus compras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador ondulado */}
      <div className="relative">
        <svg className="w-full h-10 text-emerald-600/20" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,64L48,64C96,64,192,64,288,64C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,26.7C1248,32,1344,32,1392,32L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" />
        </svg>
    </div>
    </section>
  );
}
