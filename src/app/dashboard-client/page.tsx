
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Download, ShoppingBag, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import type { Order } from '@/lib/data-seed';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientDashboardPage() {
    const { toast } = useToast();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        if (!user && process.env.NEXT_PUBLIC_USE_FIREBASE !== 'false') return;

        setIsLoading(true);
        // In a real app, you'd have a more secure way to fetch orders for the logged-in user.
        // For this demo, we'll fetch orders where userId matches a dummy ID.
        // This query is insecure and for demonstration purposes only.
        const q = query(collection(db, "orders"));

        const unsubscribeOrders = onSnapshot(q, (querySnapshot) => {
            const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            // Filter client-side for demo purposes.
            // In a real app, you would use a where clause: where("userId", "==", user.uid)
            setOrders(fetchedOrders.filter(o => o.userId === 'client-1' || o.userId === 'client-2'));
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching orders: ", error);
            setIsLoading(false);
            toast({
                title: "Erreur",
                description: "Impossible de charger l'historique des commandes.",
                variant: "destructive"
            })
        });

        return () => unsubscribeOrders();

    }, [user, toast]);

    const handleTrackOrder = (order: Order) => {
        if(order.trackingNumber && order.carrier){
            toast({
                title: `Suivi de la commande ${order.id}`,
                description: `Transporteur: ${order.carrier}, Numéro: ${order.trackingNumber}. Le colis est en route !`,
            });
        }
    }

    const getStatusBadgeVariant = (status: string) => {
        switch(status) {
            case 'Livré':
                return 'bg-green-500/20 text-green-300';
            case 'Expédiée':
                return 'bg-blue-500/20 text-blue-300';
            case 'En cours':
                 return 'bg-yellow-500/20 text-yellow-300';
            default:
                return 'bg-gray-500/20 text-gray-300';
        }
    }

  return (
    <div className="container mx-auto py-12">
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Mon Espace Client</h1>
         <Button onClick={() => window.location.href='/catalogue'}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Continuer mes achats
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes Commandes</CardTitle>
          <CardDescription>Voici l'historique de vos achats et le suivi de livraison.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-24" /></TableCell>
                    </TableRow>
                ))
              ) : orders.length > 0 ? (
                orders.map((order) => (
                    <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Image src={order.items[0].image} alt={order.items[0].name} width={32} height={32} className="rounded-md object-cover" />
                            <div className="truncate">
                                <span>{order.items[0].name}</span>
                                {order.items.length > 1 && <span className="text-muted-foreground text-xs"> +{order.items.length - 1} autre(s)</span>}
                            </div>
                        </div>
                        </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                        <Badge variant={'secondary'}
                            className={getStatusBadgeVariant(order.status)}>
                        {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        {order.trackingNumber && (
                            <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order)}>
                                <Truck className="mr-2 h-4 w-4" /> Suivre
                            </Button>
                        )}
                        <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Facture
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">Aucune commande trouvée.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
