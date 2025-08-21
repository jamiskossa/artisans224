import Image from "next/image";
import { news } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">News & Events</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Stay updated with the latest stories, exhibitions, and cultural happenings from the world of artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <Card key={article.id} className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  data-ai-hint="event gallery"
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
              <Badge variant="outline" className="w-fit mb-2">{format(new Date(article.date), 'MMMM d, yyyy')}</Badge>
              <CardTitle className="text-xl font-headline mb-2">{article.title}</CardTitle>
              <p className="text-muted-foreground flex-grow">{article.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
