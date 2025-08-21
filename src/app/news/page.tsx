
"use client";

import Image from "next/image";
import { getNews, NewsArticle } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const fetchedNews = await getNews();
      setNews(fetchedNews);
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">News & Events</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Stay updated with the latest stories, exhibitions, and cultural happenings from the world of artisans.
        </p>
      </div>

      {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden flex flex-col">
                    <CardHeader className="p-0">
                        <Skeleton className="aspect-video w-full" />
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <Skeleton className="h-5 w-1/4 mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                </Card>
            ))}
          </div>
      ) : (
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
      )}
    </div>
  );
}

    