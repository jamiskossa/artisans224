import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Artisan } from "@/lib/data";

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Link href={`/artisans/${artisan.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={artisan.image}
              alt={`Work by ${artisan.name}`}
              data-ai-hint="artisan portrait"
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle as="h3" className="text-xl font-headline mb-1">{artisan.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{artisan.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant="secondary">{artisan.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
