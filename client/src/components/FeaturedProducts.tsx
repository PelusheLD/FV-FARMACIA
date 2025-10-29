import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import type { Product, SiteSettings } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface FeaturedProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: settings } = useQuery<SiteSettings | undefined>({
    queryKey: ["/api/settings"],
  });

  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  // Autoplay simple: avanza cada 4s si hay API disponible
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      try { api.scrollNext(); } catch { /* noop */ }
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-center">
          PRODUCTOS DESTACADOS
        </h2>
        
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando productos destacados...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hay productos destacados disponibles
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Los administradores pueden marcar productos como destacados desde el panel de administración
            </p>
          </div>
        ) : (
          <div className="relative">
            <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.id} className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      measurementType={product.measurementType}
                      stock={product.stock}
                      taxPercentage={settings?.taxPercentage ? parseFloat(settings.taxPercentage) : 16}
                      onAddToCart={(quantity) => onAddToCart(product, quantity)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="hidden md:flex right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}


