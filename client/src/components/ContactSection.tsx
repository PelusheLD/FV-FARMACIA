import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock, Check, Plus } from 'lucide-react';
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
    <section id="contacto" className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#29a03b] rounded-full blur-3xl opacity-3"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-300 rounded-full blur-3xl opacity-3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Layout compacto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda - Información compacta */}
          <div className="space-y-5">
            {/* Título principal */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#29a03b] to-green-600 rounded-full mb-4 shadow-md">
                <MapPin className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-xs">NUESTRA UBICACIÓN</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                Encuéntranos Fácilmente
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Estamos en un lugar accesible para brindarte la mejor atención farmacéutica.
              </p>
            </div>

            {/* Información tipo cards compactas */}
            <div className="space-y-3">
              {/* Card de Dirección */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-700 text-sm">{settings.contactAddress}</p>
                  </div>
                </div>
              </div>

              {/* Card de Horario */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">Horario</h3>
                    <p className="text-gray-700 text-sm mb-2">24 horas, 365 días</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full">
                      <Check className="h-3 w-3 text-[#29a03b]" />
                      <span className="text-[#29a03b] font-bold text-xs">Siempre abierto</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Contacto */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-green-500 to-[#29a03b] p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-2">Contacto</h3>
                    <div className="space-y-1">
                      <a 
                        href={`tel:${settings.contactPhone}`}
                        className="flex items-center text-gray-700 hover:text-[#29a03b] transition-colors group/link"
                      >
                        <Phone className="h-4 w-4 mr-2 text-[#29a03b] group-hover/link:rotate-12 transition-transform" />
                        <span className="font-semibold text-sm">{settings.contactPhone}</span>
                      </a>
                      <a 
                        href={`mailto:${settings.contactEmail}`}
                        className="flex items-center text-gray-700 hover:text-[#29a03b] transition-colors group/link"
                      >
                        <Mail className="h-4 w-4 mr-2 text-[#29a03b] group-hover/link:rotate-12 transition-transform" />
                        <span className="font-semibold text-sm">{settings.contactEmail}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
