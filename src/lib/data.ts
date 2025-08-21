import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export type Artisan = {
  id: string;
  name: string;
  category: 'Mode' | 'Sculpture' | 'Bijoux' | 'Musique' | 'Chaussures' | 'Peinture';
  description: string;
  bio: string;
  image: string;
  gallery: string[];
};

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
};

export async function getArtisans(): Promise<Artisan[]> {
  if (!db) return [];
  try {
    const artisansCol = collection(db, 'artisans');
    const artisanSnapshot = await getDocs(artisansCol);
    const artisanList = artisanSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artisan));
    return artisanList;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return [];
  }
}

export async function getArtisan(id: string): Promise<Artisan | null> {
  if (!db) return null;
  try {
    const artisanRef = doc(db, 'artisans', id);
    const artisanSnap = await getDoc(artisanRef);
    if (artisanSnap.exists()) {
      return { id: artisanSnap.id, ...artisanSnap.data() } as Artisan;
    }
    return null;
  } catch(error) {
    console.error("Error fetching artisan:", error);
    return null;
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  if (!db) return [];
   try {
    const newsCol = collection(db, 'news');
    const newsSnapshot = await getDocs(newsCol);
    const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    // Sort news by date descending
    return newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch(error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
