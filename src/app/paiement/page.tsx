
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ShoppingCart, Smartphone, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Dummy data for cart items
const cartItems = [
    { id: 1, name: "Sculpture en Bronze", price: 250, quantity: 1, image: "/images/paiement/sculpture-bronze.png" },
    { id: 2, name: "Chanson 'Conakry Blues'", price: 1.99, quantity: 1, image: "/images/paiement/conakry-blues.png" },
    { id: 3, name: "Chaussures en cuir", price: 120, quantity: 1, image: "/images/paiement/chaussures-cuir.png" },
]

export default function PaiementPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxes = subtotal * 0.1; // Example tax rate
    const total = subtotal + taxes;

    const handlePayment = (method: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Paiement Réussi!",
                description: `Votre paiement via ${method} a été traité avec succès.`,
            });
        }, 2000);
    };


    return (
        <div className="container mx-auto px-4 py-16">
             <div className="text-center mb-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Finaliser la Commande</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Vérifiez votre commande et choisissez votre méthode de paiement.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-8">
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
                     <Card>
                        <CardHeader>
                            <CardTitle>Résumé de la commande</CardTitle>
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
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Paiement</CardTitle>
                            <CardDescription>Choisissez votre méthode de paiement préférée.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Tabs defaultValue="card">
                               <TabsList className="grid w-full grid-cols-3">
                                   <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" /> Carte</TabsTrigger>
                                   <TabsTrigger value="orange"><Smartphone className="mr-2 h-4 w-4" /> Orange</TabsTrigger>
                                   <TabsTrigger value="kulu"><Smartphone className="mr-2 h-4 w-4" /> Kulu</TabsTrigger>
                               </TabsList>
                               <TabsContent value="card" className="mt-6">
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment("Stripe"); }}>
                                        <div className="space-y-2">
                                            <Label htmlFor="card-number">Numéro de carte</Label>
                                            <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry-date">Date d'expiration</Label>
                                                <Input id="expiry-date" placeholder="MM/AA" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" required />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                            {isLoading ? "Traitement..." : `Payer ${total.toFixed(2)} €`}
                                        </Button>
                                    </form>
                               </TabsContent>
                               <TabsContent value="orange" className="mt-6">
                                    <div className="flex justify-center mb-4">
                                        <Image src="/images/paiement/orange-money-logo.png" data-ai-hint="orange money logo" alt="Orange Money" width={80} height={50} />
                                    </div>
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment("Orange Money"); }}>
                                        <div className="space-y-2">
                                            <Label htmlFor="om-phone">Numéro de téléphone Orange</Label>
                                            <Input id="om-phone" type="tel" placeholder="+224 620 00 00 00" required />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                            {isLoading ? "Traitement..." : `Payer ${total.toFixed(2)} € avec Orange Money`}
                                        </Button>
                                    </form>
                               </TabsContent>
                               <TabsContent value="kulu" className="mt-6">
                                    <div className="flex justify-center mb-4">
                                        <Smartphone className="h-12 w-12 text-primary" />
                                    </div>
                                    <p className="text-center font-bold text-xl mb-4">Paiement Kulu</p>
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment("Kulu"); }}>
                                        <div className="space-y-2">
                                            <Label htmlFor="kulu-id">Identifiant Kulu</Label>
                                            <Input id="kulu-id" placeholder="Votre identifiant Kulu" required />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                           {isLoading ? "Traitement..." : `Payer ${total.toFixed(2)} € avec Kulu`}
                                        </Button>
                                    </form>
                               </TabsContent>
                           </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
