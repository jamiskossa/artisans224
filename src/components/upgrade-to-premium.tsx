
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UpgradeToPremium() {
    const { toast } = useToast();

    const handleUpgrade = () => {
        toast({
            title: "Fonctionnalité Premium",
            description: "Le système d'abonnement est en cours de développement. Revenez bientôt!",
        });
    }

    return (
        <Card className="bg-gradient-to-br from-accent via-background to-background border-primary/20 my-8">
            <CardHeader className="flex-row items-start gap-4">
                 <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Star className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="text-xl">Passez au Compte Premium</CardTitle>
                    <CardDescription>Débloquez des outils puissants pour booster votre visibilité et vos ventes.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>Mise en avant de vos produits dans le catalogue</span>
                    </li>
                     <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>Outils d'analyse de ventes avancés</span>
                    </li>
                     <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>Support prioritaire de notre équipe</span>
                    </li>
                </ul>
                 <Button className="w-full" size="lg" onClick={handleUpgrade}>
                    Mettre à niveau (10 €/mois)
                </Button>
            </CardContent>
        </Card>
    )
}

    