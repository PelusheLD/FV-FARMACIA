import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import type { SiteSettings } from '@shared/schema';

// Componente de mapa usando iframe de Google Maps (más simple y confiable)
const ContactMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapCoordinates = `${latitude},${longitude}`;
  
  return (
    <div className="map-container w-full h-full rounded-lg overflow-hidden border">
      <iframe
        src={`https://maps.google.com/maps?q=${mapCoordinates}&z=18&output=embed&hl=es&t=m`}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de FV GRUPO EMPRESARIAL"
        onLoad={() => {
          // Ocultar el fallback cuando el iframe carga
          const fallback = document.querySelector('.map-fallback');
          if (fallback) {
            (fallback as HTMLElement).style.display = 'none';
          }
        }}
      />
      {/* Fallback si el iframe no carga */}
      <div className="map-fallback absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-600 text-center p-4">
        <div>
          <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <p className="font-semibold">Mapa interactivo</p>
          <p className="text-sm">Ubicación: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
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
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MapPin className="h-8 w-8 text-emerald-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Nuestra ubicación
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para atenderte. Visítanos o contáctanos para más información.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Imagen flotante (más pequeña) */}
          <div className="relative flex justify-center">
            <img
              src="/ubicacion.png"
              alt="Nuestra Ubicación"
              className="w-11/12 lg:w-5/6 max-w-xl h-auto rounded-2xl object-contain animate-float-slow mx-auto mt-12 md:mt-16"
            />
          </div>

          {/* Mapa */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicación en el Mapa</h3>
            <div className="h-96 rounded-lg overflow-hidden">
              <ContactMap latitude={latitude} longitude={longitude} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
