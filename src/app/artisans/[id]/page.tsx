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
import { Music, Video, PlayCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


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
          <Separator className="my-6" />
          <h2 className="text-2xl font-headline font-semibold mb-3">À propos de l'artiste</h2>
          <p className="text-base leading-relaxed">
            {artisan.bio}
          </p>
        </div>
      </div>
      
      {isMusician && (
        <>
          <div className="mt-12 md:mt-20">
             <h2 className="text-3xl font-headline font-bold text-center mb-8">
                Clips Vidéo
            </h2>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {artisan.gallery.map((videoSrc, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                           <div className="relative group aspect-video w-full overflow-hidden cursor-pointer">
                                <Image
                                src={videoSrc}
                                alt={`Vidéo de ${artisan.name} ${index + 1}`}
                                data-ai-hint="music video thumbnail"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle className="h-16 w-16 text-white" />
                                </div>
                            </div>
                           <div className="p-4">
                                <h3 className="font-semibold text-lg">Titre de la vidéo {index + 1}</h3>
                                <p className="text-sm text-muted-foreground">Album Name</p>
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <div className="mt-12 md:mt-20">
             <h2 className="text-3xl font-headline font-bold text-center mb-8">
                Écouter
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {artisan.gallery.map((track, index) => (
                    <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Headphones className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Titre de la chanson {index + 1}</p>
                                    <p className="text-sm text-muted-foreground">{artisan.name}</p>
                                </div>
                            </div>
                            <Button size="icon" variant="ghost">
                                <PlayCircle className="h-6 w-6" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </>
      )}

      {!isMusician && (
        <div className="mt-12 md:mt-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">
                Galerie
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
                {artisan.gallery.map((imgSrc, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                    <div className="relative group aspect-square w-full overflow-hidden rounded-md cursor-pointer">
                        <Image
                        src={imgSrc}
                        alt={`${artisan.name}'s work ${index + 1}`}
                        data-ai-hint="craft product"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
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
      )}
    </div>
  );
}
