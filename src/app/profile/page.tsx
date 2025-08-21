
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Basic role simulation based on referrer or state (a real app would use a session/DB)
  const isArtisan = typeof window !== 'undefined' && (document.referrer.includes('/dashboard') && !document.referrer.includes('client'));
  const dashboardUrl = isArtisan ? '/dashboard' : '/dashboard-client';

  const handleSaveChanges = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleLogout = () => {
     toast({
        title: "Déconnexion simulée",
        description: "Vous êtes maintenant déconnecté.",
    });
    router.push("/");
  };
  
  const handleDeleteAccount = () => {
    if(confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")){
        toast({
            title: "Compte supprimé",
            description: "Votre compte a été supprimé.",
            variant: "destructive"
        });
        router.push("/");
    }
  };


  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
                <Avatar className="w-full h-full text-4xl">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Yattara Ousmane" />
                    <AvatarFallback>YO</AvatarFallback>
                </Avatar>
            </div>
          <CardTitle className="text-3xl">Mon Profil</CardTitle>
          <CardDescription>Gérez les informations de votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" defaultValue="Yattara Ousmane (Démo)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input id="email" type="email" defaultValue="demo@artisan.com" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <Input id="password" type="password" placeholder="Laisser vide pour ne pas changer" />
          </div>
          <Button className="w-full" onClick={handleSaveChanges}>Enregistrer les modifications</Button>

          <Separator />

          <div className="space-y-4">
             <Button variant="outline" className="w-full" onClick={() => router.push(dashboardUrl)}>
                Aller au tableau de bord
            </Button>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
                Se déconnecter
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
              Supprimer le compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
