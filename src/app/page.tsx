import { ArtisanCatalogue } from "@/components/artisan-catalogue";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const partners = [
  { name: "Orange", logo: "/images/partners/orange.png", url: "#" },
  { name: "Kulu", logo: "/images/partners/kulu.png", url: "#" },
  { name: "MTN", logo: "/images/partners/mtn.png", url: "#" },
  { name: "UNESCO", logo: "/images/partners/unesco.png", url: "#" },
  { name: "Gouvernement Guinéen", logo: "/images/partners/gov.png", url: "#" },
  { name: "Canal+", logo: "/images/partners/canal.png", url: "#" },
];

function PartnersSection() {
    return (
        <section className="py-12 md:py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Nos Partenaires</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Ils nous font confiance et soutiennent la promotion de la culture et de l'artisanat.
                    </p>
                </div>
                <Carousel 
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {partners.map((partner) => (
                            <CarouselItem key={partner.name} className="md:basis-1/3 lg:basis-1/5">
                                <div className="p-1">
                                    <Link href={partner.url} target="_blank" rel="noopener noreferrer">
                                        <Card className="flex items-center justify-center p-6 h-32 hover:shadow-lg transition-shadow">
                                            <div className="relative h-16 w-full">
                                                <Image
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-contain"
                                                    data-ai-hint="partner logo"
                                                />
                                            </div>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>
    );
}


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] text-center flex flex-col justify-center items-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/50 via-yellow-500/50 to-red-500/50 z-10" />
        <div className="absolute inset-0 bg-black/60 z-10" />
         <Image
          src="/images/hero-background.png"
          alt="Artisan workshop background"
          data-ai-hint="artisan workshop"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
             Découvrez l'Âme de l'Artisanat
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Un voyage organisé dans le monde d'artisans d'exception. Explorez des créations uniques, connectez-vous avec les créateurs et laissez-vous inspirer par leur passion.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/catalogue">Découvrir les artisans</Link>
          </Button>
        </div>
      </section>

      <ArtisanCatalogue />
      <PartnersSection />
    </div>
  );
}
