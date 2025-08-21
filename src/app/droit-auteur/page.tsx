import { ShieldCheck, DollarSign } from 'lucide-react';

export default function DroitAuteurPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <ShieldCheck className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Droits d'Auteur et Monétisation</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Protéger la créativité et assurer une juste rémunération pour nos artistes.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-2xl font-headline font-semibold mb-3">Notre Engagement</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sur notre plateforme, chaque œuvre, qu'elle soit musicale, visuelle ou artisanale, est la propriété intellectuelle de son créateur. Nous nous engageons à respecter et à faire respecter les droits d'auteur. L'achat d'une œuvre sur ce site vous confère une licence d'utilisation personnelle et non commerciale, sauf indication contraire spécifiée par l'artiste.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-2xl font-headline font-semibold mb-3 flex items-center gap-2"><DollarSign className="h-6 w-6"/>Monétisation et Commissions</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous offrons aux artistes plusieurs moyens de monétiser leur travail. Une commission est prélevée sur chaque vente pour couvrir les frais de fonctionnement de la plateforme, le marketing et le support. Cette commission nous permet de continuer à offrir une vitrine de qualité et d'attirer un public mondial. Les artistes peuvent suivre leurs ventes et leurs revenus en toute transparence via leur tableau de bord. Des options d'affiliation et de sponsoring sont également disponibles pour les artistes Premium.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-2xl font-headline font-semibold mb-3">Pour les Artistes</h2>
          <p className="text-muted-foreground leading-relaxed">
            En publiant vos œuvres sur notre catalogue, vous conservez l'intégralité de vos droits d'auteur. Vous nous accordez une licence de distribution pour vendre et promouvoir votre travail auprès de notre communauté mondiale. Vous avez le contrôle total sur vos prix, vos conditions de vente et les types de licences que vous souhaitez offrir. Notre tableau de bord vous permet de suivre vos ventes et vos revenus en toute transparence.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-2xl font-headline font-semibold mb-3">Pour les Acheteurs et Auditeurs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Lorsque vous achetez une chanson, une vidéo ou une autre création, vous soutenez directement un artiste. Vous obtenez le droit d'écouter, de regarder et de profiter de l'œuvre pour votre usage personnel. Toute reproduction, distribution publique ou utilisation commerciale sans l'autorisation expresse de l'artiste est strictly interdite et constitue une violation des lois sur le droit d'auteur.
          </p>
        </div>
         <div className="text-center pt-6">
            <p className="text-sm text-muted-foreground">Pour toute question relative aux droits d'auteur ou à l'utilisation des œuvres, veuillez <a href="/contact" className="underline hover:text-primary">nous contacter</a>.</p>
        </div>
      </div>
    </div>
  );
}
