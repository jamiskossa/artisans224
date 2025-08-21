
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, DollarSign, Eye, Package } from "lucide-react";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';

// Simulating some initial artworks for the dashboard
const initialArtworks = [
  { id: 1, title: 'Sculpture en Bronze "L\'envol"', image: 'https://placehold.co/100x100.png', price: '450 €', status: 'Publiée', views: 1200 },
  { id: 2, title: 'Chanson "Conakry Blues"', image: 'https://placehold.co/100x100.png', price: '1.99 €', status: 'Publiée', views: 8500 },
  { id: 3, title: 'Chaussures en cuir "Nomade"', image: 'https://placehold.co/100x100.png', price: '120 €', status: 'Brouillon', views: 350 },
];

const salesData = [
  { month: 'Jan', sales: 1200 },
  { month: 'Fev', sales: 1800 },
  { month: 'Mar', sales: 1500 },
  { month: 'Avr', sales: 2200 },
  { month: 'Mai', sales: 2500 },
  { month: 'Juin', sales: 3100 },
];

type Artwork = typeof initialArtworks[0];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


function DashboardStats({ artworks }: { artworks: Artwork[] }) {
    const totalSales = 4550;
    const totalViews = artworks.reduce((sum, art) => sum + art.views, 0);
    const totalArtworks = artworks.length;

    const viewsData = artworks.map(art => ({ name: art.title, value: art.views }));

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSales.toFixed(2)} €</div>
                        <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vues Totales</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews.toLocaleString('fr-FR')}</div>
                        <p className="text-xs text-muted-foreground">+15% depuis la semaine dernière</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Oeuvres Actives</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalArtworks}</div>
                        <p className="text-xs text-muted-foreground">{artworks.filter(a => a.status === 'Publiée').length} publiées</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Rapport des Ventes</CardTitle>
                        <CardDescription>Ventes mensuelles pour les 6 derniers mois.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={salesData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition des Vues</CardTitle>
                        <CardDescription>Vues par oeuvre.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={{}}>
                             <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                                    <Pie data={viewsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                        {viewsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

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
      views: 0,
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

      <DashboardStats artworks={artworks} />

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
                <TableHead>Vues</TableHead>
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
                   <TableCell>{artwork.views.toLocaleString('fr-FR')}</TableCell>
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

    