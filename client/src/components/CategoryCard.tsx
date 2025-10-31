import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  imageUrl?: string | null;
  icon?: LucideIcon;
  leySeca?: boolean;
  onClick: () => void;
}

export default function CategoryCard({ name, imageUrl, icon: Icon, leySeca = false, onClick }: CategoryCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group h-48 md:h-52 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 bg-gradient-to-br from-white via-green-50/30 to-white border border-green-200/50 hover:border-[#29a03b] hover:shadow-[#29a03b]/10 p-6 relative overflow-hidden"
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #29a03b 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Borde brillante al hacer hover */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#29a03b]/30 transition-all duration-300" />
      
      {/* Banner de Ley Seca */}
      {leySeca && (
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-red-800">
            🚫 LEY SECA
          </div>
        </div>
      )}
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
        {imageUrl ? (
          <div className="relative">
            {/* Halo de brillo detrás de la imagen */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#29a03b]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1" />
            
            <img
              src={imageUrl}
              alt={name}
              className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:ring-4 group-hover:ring-[#29a03b]/20"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          Icon && (
            <div className="relative">
              {/* Halo de brillo detrás del icono */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#29a03b]/30 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl bg-gradient-to-br from-[#29a03b]/15 via-[#29a03b]/10 to-[#29a03b]/5 flex items-center justify-center group-hover:from-[#29a03b]/25 group-hover:via-[#29a03b]/15 group-hover:to-[#29a03b]/10 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:ring-4 group-hover:ring-[#29a03b]/20">
                <Icon className="h-12 w-12 md:h-14 md:w-14 text-[#29a03b] group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-lg" />
              </div>
            </div>
          )
        )}
        
        <div className="text-center px-2">
          <span className="text-base md:text-lg font-bold text-center line-clamp-2 bg-gradient-to-r from-gray-800 to-gray-700 group-hover:from-[#29a03b] group-hover:to-[#22c55e] bg-clip-text text-transparent transition-all duration-300">
            {name}
          </span>
        </div>
      </div>
      
      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#29a03b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Indicador de hover izquierdo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#29a03b] group-hover:h-12 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
      
      {/* Indicador de hover derecho */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#29a03b] group-hover:h-12 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
    </Card>
  );
}
