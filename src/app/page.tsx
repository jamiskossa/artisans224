import { ArtisanCatalogue } from "@/components/artisan-catalogue";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-center flex flex-col justify-center items-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="https://placehold.co/1800x1200.png"
          alt="Artisan workshop background"
          data-ai-hint="artisan workshop"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            Discover the Soul of Craftsmanship
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            A curated journey into the world of exceptional artisans. Explore unique creations, connect with the makers, and be inspired by their passion.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#catalogue">Explore Artisans</Link>
          </Button>
        </div>
      </section>

      <ArtisanCatalogue />
    </div>
  );
}
