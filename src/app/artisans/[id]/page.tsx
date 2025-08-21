

"use client";

import { artisans } from "@/lib/data";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Music, Video, PlayCircle, Headphones, Hand, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ChatbotWidget } from "@/components/chatbot-widget";

const ThreeSixtyViewer = ({ images }: { images: string[] }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startFrame.current = currentFrame;
    viewerRef.current!.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (viewerRef.current) {
        viewerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !viewerRef.current) return;
    const dx = e.clientX - startX.current;
    const sensitivity = viewerRef.current.offsetWidth / images.length / 2;
    const frameChange = Math.round(dx / sensitivity);
    let newFrame = (startFrame.current + frameChange) % images.length;
    if (newFrame < 0) newFrame += images.length;
    setCurrentFrame(newFrame);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startFrame.current = currentFrame;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !viewerRef.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const sensitivity = viewerRef.current.offsetWidth / images.length / 2;
    const frameChange = Math.round(dx / sensitivity);
    let newFrame = (startFrame.current + frameChange) % images.length;
    if (newFrame < 0) newFrame += images.length;
    setCurrentFrame(newFrame);
  };


  return (
    <div
      ref={viewerRef}
      className="relative w-full max-w-xl mx-auto aspect-square cursor-grab select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Frame ${index + 1}`}
          data-ai-hint="360 view product"
          fill
          className={`object-contain transition-opacity duration-100 ${index === currentFrame ? 'opacity-100' : 'opacity-0'}`}
          priority={index === 0}
          draggable="false"
        />
      ))}
       <div className="absolute bottom-4 right-4 bg-background/70 text-foreground p-2 rounded-lg flex items-center gap-2 text-sm pointer-events-none">
        <Hand className="h-5 w-5" />
        <span>Glisser pour faire pivoter</span>
      </div>
    </div>
  );
};


export default function ArtisanPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const artisan = artisans.find((a) => a.id === id);
  const { toast } = useToast();

  if (!artisan) {
    notFound();
  }

  const handleAddToCart = (item: string) => {
    toast({
        title: "Ajouté au panier!",
        description: `${item} a été ajouté à votre panier.`,
    })
  }

  const isMusician = artisan.category === 'Musique';
  const has360View = ['Sculpture', 'Bijoux', 'Mode', 'Chaussures'].includes(artisan.category);

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
                                <h3 className="font-semibold text-lg">Clip Vidéo #{index + 1}</h3>
                                <p className="text-sm text-muted-foreground">Album: Titre de l'album</p>
                                <Button className="mt-2 w-full" onClick={() => handleAddToCart(`Clip Vidéo ${index + 1}`)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Acheter le clip (2.99 €)
                                </Button>
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
                Musique & Albums
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {artisan.gallery.map((track, index) => (
                    <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Headphones className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Titre de la chanson {index + 1}</p>
                                    <p className="text-sm text-muted-foreground">{artisan.name} - Album: Titre de l'album</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost">
                                    <PlayCircle className="h-6 w-6" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleAddToCart(`Chanson ${index + 1}`)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Acheter (0.99 €)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <div className="text-center pt-4">
                    <Button size="lg" onClick={() => handleAddToCart(`Album de ${artisan.name}`)}>
                         <ShoppingCart className="mr-2 h-5 w-5" /> Acheter l'album complet (9.99 €)
                    </Button>
                </div>
            </div>
          </div>
        </>
      )}

      {has360View && (
        <div className="mt-12 md:mt-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-headline font-bold">Vue 360°</h2>
                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Faites glisser votre souris sur l'image pour faire pivoter l'objet et découvrir chaque détail sous tous les angles.
                </p>
            </div>
            <ThreeSixtyViewer images={artisan.gallery} />
            <div className="text-center mt-6">
                <Button size="lg" onClick={() => handleAddToCart(`${artisan.category} de ${artisan.name}`)}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au panier
                </Button>
            </div>
        </div>
      )}

      {!isMusician && !has360View && (
        <div className="mt-12 md:mt-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">
                Galerie
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
                {artisan.gallery.map((imgSrc, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="p-0">
                          <div className="relative group aspect-square w-full overflow-hidden rounded-md cursor-pointer">
                              <Image
                              src={imgSrc}
                              alt={`${artisan.name}'s work ${index + 1}`}
                              data-ai-hint="craft product"
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                          </div>
                           <div className="p-4">
                                <h3 className="font-semibold">Oeuvre #{index + 1}</h3>
                                <Button className="mt-2 w-full" onClick={() => handleAddToCart(`Oeuvre ${index + 1}`)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter au panier
                                </Button>
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
      )}

      <ChatbotWidget artisanName={artisan.name} />
    </div>
  );
}
