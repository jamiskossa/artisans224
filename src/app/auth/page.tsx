
"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserRole = "client" | "artisan";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const router = useRouter();

  const isFirebaseConfigured = !!auth;

  const redirectToDashboard = (userRole: UserRole) => {
    if (userRole === "artisan") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard-client");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseConfigured) {
        toast({
            title: "Mode Démo",
            description: "Fonctionnalité non disponible sans configuration Firebase.",
        });
        return;
    };
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Compte créé",
        description: "Votre inscription a été réussie.",
      });
      redirectToDashboard(role);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!isFirebaseConfigured) {
        toast({
            title: "Connexion simulée",
            description: "Redirection vers le tableau de bord de démo.",
        });
        redirectToDashboard(role);
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Connecté",
        description: "Vous avez été connecté avec succès.",
      });
      redirectToDashboard(role);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured) {
        toast({
            title: "Connexion simulée",
            description: "Redirection vers le tableau de bord de démo.",
        });
        redirectToDashboard(role);
        return;
    };
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Connecté avec Google",
        description: "Vous avez été connecté avec succès.",
      });
      redirectToDashboard(role);
    } catch (error: any) {
        toast({
            title: "Erreur",
            description: error.message,
            variant: "destructive",
        });
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="signup">Inscription</TabsTrigger>
        </TabsList>
        {!isFirebaseConfigured && (
            <Alert variant="destructive" className="mt-6">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Firebase non configuré</AlertTitle>
                <AlertDescription>
                    L'authentification est désactivée. La connexion simulera une redirection vers le tableau de bord.
                </AlertDescription>
            </Alert>
        )}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <Card>
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>
                  Accédez à votre compte pour continuer.{" "}
                  <button type="button" onClick={() => setActiveTab("signup")} className="font-semibold text-primary underline-offset-4 hover:underline">
                    Pas encore de compte ? Inscrivez-vous
                  </button>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label>Vous êtes ?</Label>
                    <RadioGroup defaultValue="client" onValueChange={(value: UserRole) => setRole(value)} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="client" id="r1-login" />
                            <Label htmlFor="r1-login">Client</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="artisan" id="r2-login" />
                            <Label htmlFor="r2-login">Artisan / Créateur</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                Se connecter
                </Button>
                <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                >
                Se connecter avec Google
                </Button>
            </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <Card>
            <CardHeader>
                <CardTitle>Inscription</CardTitle>
                <CardDescription>
                Créez un nouveau compte pour commencer.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Vous êtes ?</Label>
                    <RadioGroup defaultValue="client" onValueChange={(value: UserRole) => setRole(value)} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="client" id="r1-signup" />
                            <Label htmlFor="r1-signup">Client</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="artisan" id="r2-signup" />
                            <Label htmlFor="r2-signup">Artisan / Créateur</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                    id="name"
                    placeholder="Yattara Ousmane"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                    id="email-signup"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password-signup">Mot de passe</Label>
                <Input
                    id="password-signup"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                S'inscrire
                </Button>
                <p className="px-8 text-center text-sm text-muted-foreground">
                En cliquant sur continuer, vous acceptez nos{" "}
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Conditions d'utilisation
                </Link>{" "}
                et notre{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Politique de confidentialité
                </Link>
                .
                </p>
            </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
