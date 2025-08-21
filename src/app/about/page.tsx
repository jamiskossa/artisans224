import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">À Propos</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Notre histoire est une histoire de passion pour l'artisanat, de profond respect pour le patrimoine et de vision d'un monde plus connecté et créatif.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Card className="max-w-2xl text-center">
            <CardHeader>
                <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                        src="/images/about/yattara-ousmane.png"
                        alt="Yattara Ousmane"
                        data-ai-hint="portrait man"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>
                <CardTitle className="font-headline text-2xl">Yattara Ousmane</CardTitle>
                <p className="text-sm text-muted-foreground">Créateur du Projet</p>
            </CardHeader>
            <CardContent>
                <p>
                    Passionné par la richesse culturelle et le talent des artisans, Yattara Ousmane a imaginé cette plateforme pour offrir une vitrine mondiale aux créateurs. Son objectif est de construire un pont entre les mains qui créent et les cœurs qui apprécient l'authenticité et le savoir-faire.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Instagram className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Youtube className="h-6 w-6" />
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
