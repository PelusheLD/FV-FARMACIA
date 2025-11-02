import LocationIllustration from './LocationIllustration';

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#29a03b] to-green-600 rounded-full mb-4 shadow-md">
            <span className="text-white font-bold text-xs">NUESTRA UBICACIÓN</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Visítanos
          </h2>
        </div>

        {/* Ilustración animada */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-200">
            <div className="h-[400px]">
              <LocationIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
