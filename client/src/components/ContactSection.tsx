import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import type { SiteSettings } from '@shared/schema';

// Componente de mapa usando iframe de Google Maps (más simple y confiable)
const ContactMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapCoordinates = `${latitude},${longitude}`;
  
  return (
    <div className="map-container w-full h-full rounded-xl overflow-hidden relative">
      <iframe
        src={`https://maps.google.com/maps?q=${mapCoordinates}&z=18&output=embed&hl=es&t=m`}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de FV FARMACIA"
        className="rounded-xl"
        onLoad={() => {
          // Ocultar el fallback cuando el iframe carga
          const fallback = document.querySelector('.map-fallback');
          if (fallback) {
            (fallback as HTMLElement).style.display = 'none';
          }
        }}
      />
      {/* Fallback si el iframe no carga */}
      <div className="map-fallback absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-600 text-center p-4 rounded-xl">
        <div>
          <MapPin className="h-12 w-12 mx-auto mb-3 text-[#29a03b]" />
          <p className="font-semibold">Mapa interactivo</p>
          <p className="text-sm mt-2">Ubicación: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
};

export default function ContactSection() {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['/api/settings'],
  });

  if (!settings) {
    return null;
  }

  const latitude = parseFloat(settings.latitude || '9.55253367422189');
  const longitude = parseFloat(settings.longitude || '-69.20519760343741');

  return (
    <section id="contacto" className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Layout: Imagen izquierda, Mapa derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda - Imagen */}
          <div className="relative">
            <img 
              src="/ubicacion.png" 
              alt="Nuestra Ubicación" 
              className="w-full h-auto rounded-2xl object-contain animate-float"
            />
          </div>

          {/* Columna Derecha - Mapa elegante */}
          <div className="relative">
            {/* Mapa limpio y elegante */}
            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-green-200">
              <div className="h-[400px]">
                <ContactMap latitude={latitude} longitude={longitude} />
              </div>
              
              {/* Botón de Google Maps integrado */}
              <div className="absolute bottom-4 right-4 z-30">
                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#29a03b] to-green-600 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span className="text-white font-bold text-xs">Ver en Google Maps</span>
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
