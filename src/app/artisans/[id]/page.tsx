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
import { Music, Video, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";


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

  const isMusician = artisan.category === 'Musique';

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
           {isMusician && (
            <div className="flex flex-wrap gap-4 mb-6">
                <Button>
                    <Music className="mr-2 h-4 w-4" /> Écouter un extrait
                </Button>
                 <Button variant="secondary">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Acheter l'album
                </Button>
            </div>
          )}
          <Separator className="my-6" />
          <h2 className="text-2xl font-headline font-semibold mb-3">À propos de l'artiste</h2>
          <p className="text-base leading-relaxed">
            {artisan.bio}
          </p>
        </div>
      </div>

      <div className="mt-12 md:mt-20">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">
            {isMusician ? 'Discographie & Vidéos' : 'Galerie'}
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {artisan.gallery.map((imgSrc, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="relative group aspect-video w-full overflow-hidden rounded-md cursor-pointer">
                    <Image
                      src={imgSrc}
                      alt={`${artisan.name}'s work ${index + 1}`}
                      data-ai-hint={isMusician ? "album cover" : "craft product"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                     {isMusician && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Video className="h-12 w-12 text-white" />
                        </div>
                    )}
                  </div>
                   {isMusician && (
                    <div className="mt-2 text-center">
                        <p className="font-semibold">Titre de l'œuvre {index + 1}</p>
                        <p className="text-sm text-muted-foreground">Album Name</p>
                    </div>
                  )}
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
