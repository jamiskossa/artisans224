"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { artisans } from "@/lib/data";
import { ArtisanCard } from "./artisan-card";
import { Input } from "@/components/ui/input";

type Category = "All" | "Mode" | "Sculpture" | "Bijoux" | "Musique" | "Chaussures";

export function ArtisanCatalogue() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtisans = artisans
    .filter((artisan) => 
      activeTab === "All" || artisan.category === activeTab
    )
    .filter((artisan) =>
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section id="catalogue" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Nos Artisans</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Un collectif de créateurs passionnés, chacun avec une histoire unique et un talent extraordinaire.
          </p>
        </div>
        <div className="flex justify-center mb-8">
            <Input 
                type="search"
                placeholder="Rechercher par nom, type..."
                className="max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
            />
        </div>
        <Tabs
          defaultValue="All"
          className="w-full"
          onValueChange={(value) => setActiveTab(value as Category)}
        >
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:mx-auto md:grid-cols-6 mb-8">
            <TabsTrigger value="All">Tous</TabsTrigger>
            <TabsTrigger value="Mode">Mode</TabsTrigger>
            <TabsTrigger value="Sculpture">Sculpture</TabsTrigger>
            <TabsTrigger value="Bijoux">Bijoux</TabsTrigger>
            <TabsTrigger value="Musique">Musique</TabsTrigger>
            <TabsTrigger value="Chaussures">Chaussures</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
             {filteredArtisans.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredArtisans.map((artisan) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground mt-8">Aucun artisan trouvé.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
