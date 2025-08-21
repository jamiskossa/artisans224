import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Icons } from './icons';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">
                Artisan's Compass
              </span>
            </Link>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Youtube className="h-6 w-6" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Artisan's Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
