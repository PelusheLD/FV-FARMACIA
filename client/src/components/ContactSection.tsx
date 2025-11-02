import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { SiteSettings } from '@shared/schema';

// Componente de mapa usando iframe de Google Maps (más simple y confiable)
const ContactMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapCoordinates = `${latitude},${longitude}`;
  
  return (
    <div className="map-container w-full h-full rounded-xl overflow-hidden border-2 border-[#29a03b]/20 shadow-lg relative">
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
      <div className="map-fallback absolute inset-0 bg-gradient-to-br from-green-50 to-white flex items-center justify-center text-gray-600 text-center p-4 rounded-xl">
        <div>
          <MapPin className="h-12 w-12 mx-auto mb-3 text-[#29a03b]" />
          <p className="font-semibold text-lg">Mapa interactivo</p>
          <p className="text-sm mt-2">Ubicación: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
          <p className="text-xs mt-2 text-gray-500">Cargando mapa de Google...</p>
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
    <section id="contacto" className="py-24 bg-gradient-to-b from-green-50 via-white to-green-50/50 relative overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, #29a03b 0px, #29a03b 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(-45deg, #29a03b 0px, #29a03b 1px, transparent 1px, transparent 50px)
          `
        }}></div>
      </div>

      {/* Círculos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-5 w-64 h-64 bg-[#29a03b] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-5 w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Encabezado mejorado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <MapPin className="h-5 w-5 text-[#29a03b]" />
            <span className="text-[#29a03b] font-semibold">Ubicación</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#29a03b] via-green-500 to-[#29a03b] bg-clip-text text-transparent animate-gradient">
              Visítanos
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Nos encontramos en un lugar accesible para brindarte el mejor servicio farmacéutico
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Información de Contacto con diseño moderno */}
          <div className="space-y-5">
            {/* Tarjeta de Dirección */}
            <div className="bg-gradient-to-br from-white to-green-50/30 p-10 rounded-3xl shadow-2xl border-2 border-green-100 hover:border-[#29a03b] transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-5 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Nuestra Dirección</h3>
                  <p className="text-gray-800 text-xl leading-relaxed font-medium">{settings.contactAddress}</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Horario */}
            <div className="bg-gradient-to-br from-white to-green-50/30 p-10 rounded-3xl shadow-2xl border-2 border-green-100 hover:border-[#29a03b] transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-5 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Horario de Atención</h3>
                  <p className="text-gray-800 text-xl font-medium mb-2">Abierto las 24 horas, los 365 días del año</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <span className="text-[#29a03b] text-lg font-bold">✓</span>
                    <span className="text-[#29a03b] font-extrabold">Siempre disponibles para ti</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de Contacto */}
            <div className="bg-gradient-to-br from-white to-green-50/30 p-10 rounded-3xl shadow-2xl border-2 border-green-100 hover:border-[#29a03b] transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-5 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-5">Contáctanos</h3>
                  <div className="space-y-4">
                    <a 
                      href={`tel:${settings.contactPhone}`}
                      className="flex items-center group/link text-xl text-gray-800 hover:text-[#29a03b] transition-all duration-300 font-semibold hover:translate-x-2"
                    >
                      <Phone className="h-6 w-6 mr-4 text-[#29a03b] group-hover/link:scale-125 group-hover/link:rotate-12 transition-all duration-300" />
                      <span>{settings.contactPhone}</span>
                    </a>
                    <a 
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center group/link text-xl text-gray-800 hover:text-[#29a03b] transition-all duration-300 font-semibold hover:translate-x-2"
                    >
                      <Mail className="h-6 w-6 mr-4 text-[#29a03b] group-hover/link:scale-125 group-hover/link:rotate-12 transition-all duration-300" />
                      <span>{settings.contactEmail}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            {(settings.facebookUrl || settings.instagramUrl || settings.twitterUrl) && (
              <div className="bg-gradient-to-br from-white to-green-50/30 p-10 rounded-3xl shadow-2xl border-2 border-green-100">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Síguenos en Redes Sociales</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl group"
                    >
                      <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-bold text-lg">Facebook</span>
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl group"
                    >
                      <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.297c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-1.297 0-2.448.49-3.323 1.297-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.807-.875 1.297-2.026 1.297-3.323s-.49-2.448-1.297-3.323c-.875-.807-2.026-1.297-3.323-1.297z"/>
                      </svg>
                      <span className="font-bold text-lg">Instagram</span>
                    </a>
                  )}
                  {settings.twitterUrl && (
                    <a
                      href={settings.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl group"
                    >
                      <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="font-bold text-lg">Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mapa con diseño destacado */}
          <div className="bg-gradient-to-br from-white to-green-50/30 p-10 rounded-3xl shadow-2xl border-2 border-green-100 hover:border-[#29a03b] transition-all duration-300 hover:scale-[1.02] sticky top-24">
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Ubicación en el Mapa</h3>
              <p className="text-gray-600 text-lg">Encuéntranos fácilmente con Google Maps</p>
            </div>
            <div className="h-[550px] rounded-2xl overflow-hidden border-4 border-[#29a03b]/20 shadow-inner">
              <ContactMap latitude={latitude} longitude={longitude} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
