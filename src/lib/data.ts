import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';

export const categories = ['Mode', 'Sculpture', 'Bijoux', 'Musique', 'Chaussures', 'Peinture'] as const;

export type Review = {
    id: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    authorAvatar: string;
};

export type Artisan = {
  id: string;
  name: string;
  category: (typeof categories)[number];
  description: string;
  bio: string;
  image: string;
  gallery: string[];
  reviews: Review[];
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
    const newsQuery = query(newsCol, orderBy('date', 'desc'));
    const newsSnapshot = await getDocs(newsQuery);
    const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    return newsList;
  } catch(error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

    