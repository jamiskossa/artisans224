
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Download, ShoppingBag, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulating some order data with shipping details
const orders = [
  { 
    id: 'ORD001', 
    date: '2024-07-20', 
    status: 'Livré', 
    total: '251.99 €', 
    items: [{ name: 'Sculpture en Bronze', image: 'https://placehold.co/100x100.png' }],
    trackingNumber: 'LP123456789FR',
    carrier: 'La Poste'
  },
  { 
    id: 'ORD002', 
    date: '2024-07-18', 
    status: 'Expédiée', 
    total: '120.00 €', 
    items: [{ name: 'Chaussures en cuir', image: 'https://placehold.co/100x100.png' }],
    trackingNumber: 'DHL987654321',
    carrier: 'DHL'
  },
  { 
    id: 'ORD003', 
    date: '2024-06-12', 
    status: 'Livré', 
    total: '1.99 €', 
    items: [{ name: "Chanson 'Conakry Blues'", image: 'https://placehold.co/100x100.png' }],
    trackingNumber: null, // Digital product
    carrier: null
  },
   { 
    id: 'ORD004', 
    date: '2024-07-22', 
    status: 'En cours', 
    total: '89.99 €', 
    items: [{ name: 'Bijoux en argent', image: 'https://placehold.co/100x100.png' }],
    trackingNumber: null,
    carrier: null
  },
];


export default function ClientDashboardPage() {
    const { toast } = useToast();

    const handleTrackOrder = (order: typeof orders[0]) => {
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                   <TableCell>
                       <div className="flex items-center gap-2">
                           <Image src={order.items[0].image} alt={order.items[0].name} width={32} height={32} className="rounded-md" />
                           <span>{order.items[0].name}</span>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
