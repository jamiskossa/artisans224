
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Download, ShoppingBag } from "lucide-react";

// Simulating some order data
const orders = [
  { id: 'ORD001', date: '2024-07-20', status: 'Livré', total: '251.99 €', items: [
    { name: 'Sculpture en Bronze', image: 'https://placehold.co/100x100.png' }
  ]},
  { id: 'ORD002', date: '2024-07-18', status: 'En cours', total: '120.00 €', items: [
      { name: 'Chaussures en cuir', image: 'https://placehold.co/100x100.png' }
  ]},
  { id: 'ORD003', date: '2024-06-12', status: 'Livré', total: '1.99 €', items: [
      { name: "Chanson 'Conakry Blues'", image: 'https://placehold.co/100x100.png' }
  ]},
];


export default function ClientDashboardPage() {
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
          <CardDescription>Voici l'historique de vos achats.</CardDescription>
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
                    <Badge variant={order.status === 'Livré' ? 'secondary' : 'default'}
                        className={`${order.status === 'Livré' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
