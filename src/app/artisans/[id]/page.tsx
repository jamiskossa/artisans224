import { artisans } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ArtisanPageProps {
  params: {
    id: string;
  };
}

export default function ArtisanPage({ params }: ArtisanPageProps) {
  const artisan = artisans.find((a) => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-5 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={artisan.image}
              alt={`Portrait of ${artisan.name}`}
              data-ai-hint="artisan portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <Badge variant="default" className="mb-2 bg-accent text-accent-foreground">{artisan.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{artisan.name}</h1>
          <p className="text-lg text-muted-foreground italic mb-6">
            {artisan.description}
          </p>
          <Separator className="my-6" />
          <h2 className="text-2xl font-headline font-semibold mb-3">About the Artisan</h2>
          <p className="text-base leading-relaxed">
            {artisan.bio}
          </p>
        </div>
      </div>

      <div className="mt-12 md:mt-20">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Gallery</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {artisan.gallery.map((imgSrc, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <Image
                      src={imgSrc}
                      alt={`${artisan.name}'s work ${index + 1}`}
                      data-ai-hint="craft product"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}
