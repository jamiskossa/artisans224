
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, DollarSign, Eye, Package, TrendingUp, Users, Music, Star, Upload, X, Loader2 } from "lucide-react";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { UpgradeToPremium } from '@/components/upgrade-to-premium';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Artwork } from '@/lib/data-seed';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const salesData = [
  { month: 'Jan', sales: 1200 },
  { month: 'Fev', sales: 1800 },
  { month: 'Mar', sales: 1500 },
  { month: 'Avr', sales: 2200 },
  { month: 'Mai', sales: 2500 },
  { month: 'Juin', sales: 3100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COMMISSION_RATE = 0.15; // 15% commission

const projectionData = [
  { name: 'Abonnements Premium', value: 1200, fill: '#8884d8' },
  { name: 'Commissions Ventes', value: 2500, fill: '#82ca9d' },
  { name: 'Ventes Musique', value: 800, fill: '#ffc658' },
  { name: 'Sponsoring', value: 1500, fill: '#ff8042' },
  { name: 'Publicité', value: 600, fill: '#00C49F' },
];
const totalProjectedRevenue = projectionData.reduce((acc, item) => acc + item.value, 0);


function DashboardStats({ artworks }: { artworks: Artwork[] }) {
    const totalSales = 4550;
    const totalEarnings = totalSales * (1 - COMMISSION_RATE);
    const totalViews = artworks.reduce((sum, art) => sum + art.views, 0);
    const totalArtworks = artworks.length;

    const viewsData = artworks.map(art => ({ name: art.title, value: art.views }));

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventes Totales (Brut)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSales.toFixed(2)} €</div>
                        <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vos Gains (Après Commission)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEarnings.toFixed(2)} €</div>
                        <p className="text-xs text-muted-foreground">Commission de la plateforme: {(COMMISSION_RATE * 100).toFixed(0)}%</p>
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
                                    <YAxis />
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

function FinancialProjections() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Projections de Revenus Mensuels</CardTitle>
                <CardDescription>Estimation des revenus basés sur les différentes sources de monétisation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                     <h3 className="text-lg font-semibold mb-4">Répartition des revenus projetés</h3>
                     <ChartContainer config={{}}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={projectionData} layout="vertical" margin={{ left: 100 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickMargin={8}
                                    width={150}
                                />
                                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                                <Bar dataKey="value" radius={4}>
                                    {projectionData.map((entry) => (
                                        <Cell key={entry.name} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <div className="text-center">
                        <p className="text-muted-foreground text-lg">Total Projeté</p>
                        <p className="text-4xl font-bold">{totalProjectedRevenue.toLocaleString('fr-FR')} €</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" /><span>Abonnements Utilisateurs/Artisans</span> <span className="font-medium">1200 €</span></li>
                        <li className="flex justify-between items-center"><Package className="mr-2 h-4 w-4 text-muted-foreground" /><span>Commissions sur Ventes</span> <span className="font-medium">2500 €</span></li>
                        <li className="flex justify-between items-center"><Music className="mr-2 h-4 w-4 text-muted-foreground" /><span>Ventes de Musique</span> <span className="font-medium">800 €</span></li>
                        <li className="flex justify-between items-center"><Star className="mr-2 h-4 w-4 text-muted-foreground" /><span>Sponsoring & Partenariats</span> <span className="font-medium">1500 €</span></li>
                        <li className="flex justify-between items-center"><Eye className="mr-2 h-4 w-4 text-muted-foreground" /><span>Publicité (Ads)</span> <span className="font-medium">600 €</span></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

function AddArtworkForm({ onArtworkAdd, onOpenChange }: { onArtworkAdd: (artwork: Omit<Artwork, 'id' | 'status' | 'views' | 'sales' | 'artisanId'>) => void; onOpenChange: (isOpen: boolean) => void }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onArtworkAdd({ title, price, description, image: imagePreview || 'https://placehold.co/100x100.png' });
            // Reset form
            setTitle('');
            setPrice('');
            setDescription('');
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onOpenChange(false);
        } catch (error) {
            console.error("Error adding artwork:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'oeuvre</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Sculpture 'L'envol'" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 450" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez votre oeuvre..." required />
                </div>
                <div className="space-y-2">
                    <Label>Image</Label>
                    {imagePreview ? (
                         <div className="relative">
                            <Image src={imagePreview} alt="Aperçu" width={100} height={100} className="rounded-md object-cover" />
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => { setImagePreview(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full h-32 border-2 border-dashed rounded-md flex flex-col justify-center items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Cliquez pour choisir un fichier</p>
                        </div>
                    )}
                    <Input id="image" type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Ajouter l'oeuvre
                </Button>
            </DialogFooter>
        </form>
    );
}


function ArtisanDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddArtworkOpen, setIsAddArtworkOpen] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null);
  const { toast } = useToast();
  
  const isPremium = false; 
  const artworkLimit = 3;

   useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
             if (!currentUser) {
                setIsLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        // In a real app, you'd get the artisan's ID securely
        const DUMMY_ARTISAN_ID = 'mamadou-aliou-barry';
        const q = query(collection(db, "artworks"), where("artisanId", "==", DUMMY_ARTISAN_ID));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedArtworks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artwork));
            setArtworks(fetchedArtworks);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching artworks:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

  const handleAddArtwork = async (newArtworkData: Omit<Artwork, 'id' | 'status' | 'views' | 'sales' | 'artisanId'>) => {
    if (!user) {
        toast({ title: "Non authentifié", description: "Vous devez être connecté.", variant: "destructive" });
        return;
    }
    if (!isPremium && artworks.length >= artworkLimit) {
        toast({
            title: "Limite Atteinte",
            description: "Passez à Premium pour ajouter plus de 3 œuvres.",
            variant: "destructive"
        });
        return;
    }

    const DUMMY_ARTISAN_ID = 'mamadou-aliou-barry';

    const newArtwork = {
        ...newArtworkData,
        artisanId: DUMMY_ARTISAN_ID,
        status: 'Brouillon' as const,
        views: 0,
        sales: 0
    };
    
    await addDoc(collection(db, "artworks"), newArtwork);
    
    toast({
      title: 'Oeuvre Ajoutée',
      description: `"${newArtwork.title}" a été ajoutée à vos brouillons.`,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!artworkToDelete || !artworkToDelete.id) return;
    try {
        await deleteDoc(doc(db, "artworks", artworkToDelete.id));
        toast({
         title: 'Oeuvre Supprimée',
         description: `"${artworkToDelete.title}" a été supprimée.`,
         variant: "destructive"
       });
    } catch (error) {
        console.error("Error deleting artwork: ", error);
        toast({ title: "Erreur", description: "La suppression a échoué.", variant: "destructive" });
    }
    setArtworkToDelete(null);
  };
  
  const publishArtwork = async (id: string) => {
    try {
        const artworkRef = doc(db, "artworks", id);
        await updateDoc(artworkRef, { status: 'Publiée' });
        const artworkToPublish = artworks.find(a => a.id === id);
        toast({
          title: 'Oeuvre Publiée!',
          description: `"${artworkToPublish?.title}" est maintenant en ligne.`,
        });
    } catch(error) {
        console.error("Error publishing artwork: ", error);
        toast({ title: "Erreur", description: "La publication a échoué.", variant: "destructive" });
    }
  };


  return (
    <div className="container mx-auto py-12">
       <AlertDialog open={!!artworkToDelete} onOpenChange={(isOpen) => !isOpen && setArtworkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette œuvre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'œuvre "{artworkToDelete?.title}" sera supprimée définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setArtworkToDelete(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Tableau de Bord</h1>
        <Dialog open={isAddArtworkOpen} onOpenChange={setIsAddArtworkOpen}>
            <DialogTrigger asChild>
                 <Button disabled={!isPremium && artworks.length >= artworkLimit}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une oeuvre
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Ajouter une nouvelle oeuvre</DialogTitle>
                <DialogDescription>
                    Remplissez les détails de votre création. Cliquez sur ajouter lorsque vous avez terminé.
                </DialogDescription>
                </DialogHeader>
                <AddArtworkForm onArtworkAdd={handleAddArtwork} onOpenChange={setIsAddArtworkOpen} />
            </DialogContent>
        </Dialog>
      </div>

      <DashboardStats artworks={artworks} />

      <FinancialProjections />

      {!isPremium && <UpgradeToPremium />}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Mes Oeuvres</CardTitle>
          <CardDescription>
            Gérez vos créations. Vous avez {artworks.length}/{artworkLimit} œuvres.
            {!isPremium && ' Passez à Premium pour en ajouter plus.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Vues</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                  <TableRow>
                      <TableCell colSpan={7} className="text-center">
                          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                      </TableCell>
                  </TableRow>
              ) : (
                artworks.map((artwork) => (
                    <TableRow key={artwork.id}>
                    <TableCell>
                        <Image src={artwork.image} alt={artwork.title} width={40} height={40} className="rounded-md object-cover" data-ai-hint="artwork image"/>
                    </TableCell>
                    <TableCell className="font-medium">{artwork.title}</TableCell>
                    <TableCell>{artwork.price} €</TableCell>
                    <TableCell>{artwork.views.toLocaleString('fr-FR')}</TableCell>
                    <TableCell>{artwork.sales.toLocaleString('fr-FR')}</TableCell>
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
                            <DropdownMenuItem onClick={() => alert('La modification sera bientôt disponible !')}>Modifier</DropdownMenuItem>
                            {artwork.status !== 'Publiée' && <DropdownMenuItem onClick={() => publishArtwork(artwork.id)}>Publier</DropdownMenuItem>}
                            <DropdownMenuItem className="text-red-500" onClick={() => setArtworkToDelete(artwork)}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))
              )}
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

    