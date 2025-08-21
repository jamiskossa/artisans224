
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

// Simulating some initial artworks for the dashboard
const initialArtworks = [
  { id: 1, title: 'Sculpture en Bronze "L\'envol"', image: 'https://placehold.co/100x100.png', price: '450 €', status: 'Publiée' },
  { id: 2, title: 'Chanson "Conakry Blues"', image: 'https://placehold.co/100x100.png', price: '1.99 €', status: 'Publiée' },
  { id: 3, title: 'Chaussures en cuir "Nomade"', image: 'https://placehold.co/100x100.png', price: '120 €', status: 'Brouillon' },
];

type Artwork = typeof initialArtworks[0];

function ArtisanDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const { toast } = useToast();

  const addArtwork = () => {
    const newId = artworks.length > 0 ? Math.max(...artworks.map(a => a.id)) + 1 : 1;
    const newArtwork: Artwork = {
      id: newId,
      title: `Nouvelle Oeuvre ${newId}`,
      image: 'https://placehold.co/100x100.png',
      price: '0.00 €',
      status: 'Brouillon',
    };
    setArtworks([...artworks, newArtwork]);
    toast({
      title: 'Oeuvre Ajoutée',
      description: `"${newArtwork.title}" a été ajoutée à vos brouillons.`,
    });
  };

  const deleteArtwork = (id: number) => {
    const artworkToDelete = artworks.find(a => a.id === id);
    setArtworks(artworks.filter(a => a.id !== id));
     toast({
      title: 'Oeuvre Supprimée',
      description: `"${artworkToDelete?.title}" a été supprimée.`,
      variant: "destructive"
    });
  };
  
  const publishArtwork = (id: number) => {
    setArtworks(artworks.map(a => a.id === id ? { ...a, status: 'Publiée' } : a));
    const artworkToPublish = artworks.find(a => a.id === id);
    toast({
      title: 'Oeuvre Publiée!',
      description: `"${artworkToPublish?.title}" est maintenant en ligne.`,
    });
  };


  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Tableau de Bord</h1>
        <Button onClick={addArtwork}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une oeuvre
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes Oeuvres</CardTitle>
          <CardDescription>Gérez et publiez vos créations ici.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artworks.map((artwork) => (
                <TableRow key={artwork.id}>
                  <TableCell>
                    <Image src={artwork.image} alt={artwork.title} width={40} height={40} className="rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">{artwork.title}</TableCell>
                  <TableCell>{artwork.price}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${artwork.status === 'Publiée' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {artwork.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert('Modification de ' + artwork.title)}>Modifier</DropdownMenuItem>
                         {artwork.status !== 'Publiée' && <DropdownMenuItem onClick={() => publishArtwork(artwork.id)}>Publier</DropdownMenuItem>}
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteArtwork(artwork.id)}>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
    return <ArtisanDashboard />;
}
