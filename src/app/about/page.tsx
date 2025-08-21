import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Artisan's Compass</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Our story is one of passion for craftsmanship, a deep respect for heritage, and a vision for a more connected, creative world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
            <div className="prose prose-lg text-foreground max-w-none">
                <h2 className="font-headline text-3xl">Our Founder's Story</h2>
                <p>
                    Artisan's Compass was born from a simple yet profound love for the handmade. Our founder, a lifelong traveler and art enthusiast, witnessed the incredible dedication of artisans around the globe. Yet, so many of these brilliant creators lacked a platform to share their stories and reach a wider audience. This platform is the realization of a dream: to build a bridge between the hands that create and the hearts that appreciate.
                </p>
            </div>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image src="https://placehold.co/600x600.png" alt="Founder" data-ai-hint="portrait woman" layout="fill" objectFit="cover" className="rounded-full shadow-lg"/>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
                <Eye className="h-10 w-10 mx-auto text-primary mb-2"/>
              <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">To be the leading global platform that champions authentic craftsmanship, fostering a community where artisans thrive and their heritage is celebrated and preserved for future generations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <Target className="h-10 w-10 mx-auto text-primary mb-2"/>
              <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">To empower artisans by providing them with a beautiful, effective stage to showcase their work, share their stories, and connect with a global audience that values quality, authenticity, and the human touch.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <Users className="h-10 w-10 mx-auto text-primary mb-2"/>
              <CardTitle className="font-headline text-2xl">Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We are a diverse team of designers, developers, and storytellers united by a shared passion for art and culture. We believe in the power of craft to connect people and enrich lives.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
