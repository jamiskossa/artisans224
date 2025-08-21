import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white p-6 text-center">
        <div className="container mx-auto">
            <p>© {new Date().getFullYear()} Catalogue d’Artisans et Créateurs</p>
            <p className="mt-2">Site créé par <span className="font-bold">Yattara Ousmane</span></p>
        </div>
    </footer>
  );
}