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
    <section id="contacto" className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#29a03b] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#29a03b] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado con estilo moderno */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#29a03b]"></div>
              <MapPin className="h-8 w-8 text-[#29a03b]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#29a03b]"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#29a03b] via-green-600 to-[#29a03b] bg-clip-text text-transparent animate-gradient">
              Nuestra Ubicación
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para cuidar de tu salud. Visítanos o contáctanos para más información.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Información de Contacto con diseño moderno */}
          <div className="space-y-6">
            {/* Tarjeta de Dirección */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:border-[#29a03b]/30">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-4 rounded-xl shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Nuestra Dirección</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{settings.contactAddress}</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Horario */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:border-[#29a03b]/30">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-4 rounded-xl shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Horario de Atención</h3>
                  <p className="text-gray-700 text-lg">Abierto las 24 horas, los 365 días del año</p>
                  <p className="text-[#29a03b] font-semibold mt-2">✓ Siempre disponibles para ti</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Contacto */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:border-[#29a03b]/30">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#29a03b] to-green-600 p-4 rounded-xl shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Contáctanos</h3>
                  <div className="space-y-3">
                    <a 
                      href={`tel:${settings.contactPhone}`}
                      className="flex items-center group text-lg text-gray-700 hover:text-[#29a03b] transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3 text-[#29a03b] group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{settings.contactPhone}</span>
                    </a>
                    <a 
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center group text-lg text-gray-700 hover:text-[#29a03b] transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3 text-[#29a03b] group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{settings.contactEmail}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            {(settings.facebookUrl || settings.instagramUrl || settings.twitterUrl) && (
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Síguenos en Redes Sociales</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-medium">Facebook</span>
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.297c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-1.297 0-2.448.49-3.323 1.297-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.807-.875 1.297-2.026 1.297-3.323s-.49-2.448-1.297-3.323c-.875-.807-2.026-1.297-3.323-1.297z"/>
                      </svg>
                      <span className="font-medium">Instagram</span>
                    </a>
                  )}
                  {settings.twitterUrl && (
                    <a
                      href={settings.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="font-medium">Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mapa con diseño destacado */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ubicación en el Mapa</h3>
              <p className="text-gray-600">Encuentranos fácilmente con Google Maps</p>
            </div>
            <div className="h-[500px] rounded-xl overflow-hidden">
              <ContactMap latitude={latitude} longitude={longitude} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
