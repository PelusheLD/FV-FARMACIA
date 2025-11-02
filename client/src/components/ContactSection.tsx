import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock, Check, Plus } from 'lucide-react';
import type { SiteSettings } from '@shared/schema';

// Componente de mapa usando iframe de Google Maps (más simple y confiable)
const ContactMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapCoordinates = `${latitude},${longitude}`;
  
  return (
    <div className="map-container w-full h-full rounded-3xl overflow-hidden border-4 border-[#29a03b]/30 shadow-2xl relative bg-gradient-to-br from-green-50 to-white">
      <iframe
        src={`https://maps.google.com/maps?q=${mapCoordinates}&z=18&output=embed&hl=es&t=m`}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de FV FARMACIA"
        className="rounded-3xl"
        onLoad={() => {
          // Ocultar el fallback cuando el iframe carga
          const fallback = document.querySelector('.map-fallback');
          if (fallback) {
            (fallback as HTMLElement).style.display = 'none';
          }
        }}
      />
      {/* Fallback si el iframe no carga */}
      <div className="map-fallback absolute inset-0 bg-gradient-to-br from-green-50 to-white flex items-center justify-center text-gray-600 text-center p-4 rounded-3xl">
        <div>
          <MapPin className="h-16 w-16 mx-auto mb-4 text-[#29a03b]" />
          <p className="font-semibold text-xl">Mapa interactivo</p>
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
    <section id="contacto" className="py-24 bg-gradient-to-br from-purple-50 via-white to-green-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo inspirados en el diseño */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos difuminados en las esquinas */}
        <div className="absolute top-5 left-5 w-80 h-80 bg-[#29a03b] rounded-full blur-3xl opacity-5"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-5 right-5 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Layout: Izquierda información, Derecha mapa grande con ilustraciones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Columna Izquierda - Información con diseño tipo flat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Título principal */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#29a03b] to-green-600 rounded-full mb-5 shadow-lg">
                <MapPin className="h-5 w-5 text-white" />
                <span className="text-white font-bold text-sm">NUESTRA UBICACIÓN</span>
              </div>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Encuéntranos Fácilmente
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Estamos en un lugar accesible para brindarte la mejor atención farmacéutica cuando la necesites.
              </p>
            </div>

            {/* Información tipo cards planas */}
            <div className="space-y-4">
              {/* Card de Dirección */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-700 text-lg">{settings.contactAddress}</p>
                  </div>
                </div>
              </div>

              {/* Card de Horario */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Horario</h3>
                    <p className="text-gray-700 text-lg mb-2">24 horas, 365 días</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 rounded-full">
                      <Check className="h-4 w-4 text-[#29a03b]" />
                      <span className="text-[#29a03b] font-bold text-sm">Siempre abierto</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Contacto */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-[#29a03b] p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Contacto</h3>
                    <div className="space-y-2">
                      <a 
                        href={`tel:${settings.contactPhone}`}
                        className="flex items-center text-gray-700 hover:text-[#29a03b] transition-colors group/link"
                      >
                        <Phone className="h-5 w-5 mr-3 text-[#29a03b] group-hover/link:rotate-12 transition-transform" />
                        <span className="font-semibold">{settings.contactPhone}</span>
                      </a>
                      <a 
                        href={`mailto:${settings.contactEmail}`}
                        className="flex items-center text-gray-700 hover:text-[#29a03b] transition-colors group/link"
                      >
                        <Mail className="h-5 w-5 mr-3 text-[#29a03b] group-hover/link:rotate-12 transition-transform" />
                        <span className="font-semibold">{settings.contactEmail}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            {(settings.facebookUrl || settings.instagramUrl || settings.twitterUrl) && (
              <div className="bg-gradient-to-br from-white to-green-50/50 p-8 rounded-2xl shadow-xl border-2 border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Síguenos</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-bold">Facebook</span>
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.297c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-1.297 0-2.448.49-3.323 1.297-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.807-.875 1.297-2.026 1.297-3.323s-.49-2.448-1.297-3.323c-.875-.807-2.026-1.297-3.323-1.297z"/>
                      </svg>
                      <span className="font-bold">Instagram</span>
                    </a>
                  )}
                  {settings.twitterUrl && (
                    <a
                      href={settings.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="font-bold">Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha - Mapa grande con elementos decorativos tipo ilustración */}
          <div className="lg:col-span-3 relative">
            {/* Contenedor del mapa con fondo tipo "pasto" */}
            <div className="relative">
              {/* Elemento decorativo: "pasto" verde en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-400 to-green-300 rounded-t-3xl z-10"></div>
              
              {/* Contenedor del mapa */}
              <div className="relative z-20 bg-white p-8 rounded-3xl shadow-2xl border-4 border-green-200">
                <ContactMap latitude={latitude} longitude={longitude} />
                
                {/* Elementos decorativos flotantes inspirados en la imagen */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  {/* Checkmarks dispersos */}
                  <Check className="absolute top-8 right-12 h-8 w-8 text-orange-500 animate-bounce" style={{ animationDelay: '0s' }} />
                  <Check className="absolute bottom-24 left-8 h-6 w-6 text-orange-400 animate-bounce" style={{ animationDelay: '1s' }} />
                  <Check className="absolute top-20 left-16 h-5 w-5 text-[#29a03b] animate-bounce" style={{ animationDelay: '2s' }} />
                  
                  {/* Plus signs */}
                  <Plus className="absolute top-16 left-12 h-5 w-5 text-purple-400 rotate-45" />
                  <Plus className="absolute bottom-20 right-8 h-4 w-4 text-green-400 rotate-45" />
                  <Plus className="absolute top-32 right-20 h-3 w-3 text-[#29a03b] rotate-45" />
                </div>
              </div>
              
              {/* Badge decorativo tipo "Read more" */}
              <div className="absolute -bottom-6 right-12 z-40">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold text-sm flex items-center gap-2">
                    Ver en Google Maps
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
