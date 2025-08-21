import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white p-6">
        <div className="container mx-auto text-center">
            <div className="flex justify-center items-center space-x-6 mb-4">
                 <Link href="/about" className="hover:underline">À propos</Link>
                 <Link href="/contact" className="hover:underline">Contact</Link>
                 <Link href="/droit-auteur" className="hover:underline">Droits d'auteur</Link>
            </div>
            <p>© {new Date().getFullYear()} Catalogue d’Artisans et Créateurs</p>
            <p className="mt-2">Site créé par <span className="font-bold">Yattara Ousmane</span></p>
        </div>
    </footer>
  );
}
