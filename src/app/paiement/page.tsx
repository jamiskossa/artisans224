
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ShoppingCart, Smartphone } from "lucide-react";
import Image from "next/image";

// Dummy data for cart items
const cartItems = [
    { id: 1, name: "Sculpture en Bronze", price: 250, quantity: 1, image: "https://placehold.co/100x100.png" },
    { id: 2, name: "Chanson 'Conakry Blues'", price: 1.99, quantity: 1, image: "https://placehold.co/100x100.png" },
    { id: 3, name: "Chaussures en cuir", price: 120, quantity: 1, image: "https://placehold.co/100x100.png" },
]

export default function PaiementPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxes = subtotal * 0.1; // Example tax rate
    const total = subtotal + taxes;

    return (
        <div className="container mx-auto px-4 py-16">
             <div className="text-center mb-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Votre Panier</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Vérifiez votre commande et procédez au paiement.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails de la commande</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                                <Image src={item.image} alt={item.name} data-ai-hint="product image" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">{item.price.toFixed(2)} €</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Résumé</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Sous-total</p>
                                <p>{subtotal.toFixed(2)} €</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Taxes</p>
                                <p>{taxes.toFixed(2)} €</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>{total.toFixed(2)} €</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <Button className="w-full" size="lg">
                                <CreditCard className="mr-2 h-5 w-5" /> Procéder au paiement
                            </Button>
                            <div className="text-center w-full">
                                <p className="text-sm font-medium mb-2">Paiements mobiles acceptés</p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Image src="https://placehold.co/40x25.png" data-ai-hint="orange money logo" alt="Orange Money" width={40} height={25} />
                                        <span className="text-xs font-semibold">Orange Money</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                         <Smartphone className="h-5 w-5" />
                                        <span className="text-xs font-semibold">Kulu</span>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
