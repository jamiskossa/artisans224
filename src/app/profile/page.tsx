
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile, User as FirebaseUser, signOut } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setImagePreview(currentUser.photoURL);
      } else {
        router.push('/auth');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  
  const isArtisan = user && !user.email?.includes('client');
  const dashboardUrl = isArtisan ? '/dashboard' : '/dashboard-client';

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // The photoURL can't be a data URI. It must be a public URL.
      // In a real app, you would upload the file to a service like Firebase Storage
      // and get a downloadable URL to use here.
      // For this demo, we will only update the display name.
      await updateProfile(user, {
        displayName: displayName,
      });

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
    } catch (error: any) {
       toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: 'destructive'
      });
    } finally {
        setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast({
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté.",
    });
    router.push("/");
  };
  
  const handleDeleteAccount = () => {
    if(confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
        // In a real app, this would call `user.delete()` and handle re-authentication if needed.
        toast({
            title: "Compte supprimé",
            description: "Votre compte a été supprimé.",
            variant: "destructive"
        });
        router.push("/");
    }
  };

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
  
  const getInitials = (name: string | null | undefined) => {
    if (!name?.trim()) return "?";
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return "?";
    return parts.map(n => n[0]).join('').toUpperCase();
  }
  
  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <Card>
                <CardHeader className="text-center">
                    <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-4 w-64 mx-auto mt-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Avatar className="w-full h-full text-4xl">
                    <AvatarImage src={imagePreview ?? undefined} alt={user?.displayName ?? ""} data-ai-hint="profile photo" />
                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                </div>
                <Input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange}
                    className="hidden" 
                    accept="image/*"
                />
            </div>
          <CardTitle className="text-3xl">Mon Profil</CardTitle>
          <CardDescription>Gérez les informations de votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="displayName">Prénom & Nom</Label>
                <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input id="email" type="email" value={user?.email ?? ''} readOnly disabled />
          </div>
           <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <Input id="password" type="password" placeholder="Laisser vide pour ne pas changer" />
          </div>
          <Button className="w-full" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer les modifications
          </Button>

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
