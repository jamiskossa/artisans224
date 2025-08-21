export type Artisan = {
  id: string;
  name: string;
  category: 'Mode' | 'Sculpture' | 'Bijoux';
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

export const artisans: Artisan[] = [
  {
    id: 'elena-vidal',
    name: 'Elena Vidal',
    category: 'Mode',
    description: 'Timeless fashion with sustainable materials.',
    bio: 'Elena Vidal has been a pioneer in the sustainable fashion movement for over a decade. Her designs blend classic silhouettes with modern, eco-conscious fabrics, creating pieces that are both beautiful and kind to the planet. Each garment is meticulously crafted in her Paris studio, reflecting a deep respect for tradition and innovation.',
    image: 'https://placehold.co/600x800.png',
    gallery: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
  },
  {
    id: 'marc-dupont',
    name: 'Marc Dupont',
    category: 'Sculpture',
    description: 'Bronze sculptures that capture motion and emotion.',
    bio: 'Marc Dupont is a sculptor whose work in bronze and stone explores the fluidity of the human form. His pieces are renowned for their dynamic energy and emotional depth. A graduate of the École des Beaux-Arts, Marc has exhibited his work in galleries across Europe, earning accolades for his ability to breathe life into static materials.',
    image: 'https://placehold.co/600x800.png',
    gallery: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
  },
  {
    id: 'chloe-leroy',
    name: 'Chloé Leroy',
    category: 'Bijoux',
    description: 'Exquisite jewelry inspired by nature\'s geometry.',
    bio: 'Chloé Leroy creates exquisite jewelry that marries the raw beauty of natural gemstones with the precision of geometric design. From her workshop in the heart of Lyon, she hand-forges each piece in recycled gold and silver. Her collections are a testament to her belief that jewelry should be both a personal statement and a work of art.',
    image: 'https://placehold.co/600x800.png',
    gallery: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
  },
   {
    id: 'jean-pierre',
    name: 'Jean Pierre',
    category: 'Mode',
    description: 'Avant-garde leatherwork and accessories.',
    bio: 'Jean Pierre is a master leatherworker, known for his avant-garde bags and accessories. His work pushes the boundaries of traditional craftsmanship, incorporating bold shapes and unconventional techniques. He believes in creating "wearable art" that is both functional and provocative, challenging the norms of everyday fashion.',
    image: 'https://placehold.co/600x800.png',
    gallery: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
  },
];

export const news: NewsArticle[] = [
  {
    id: 'exhibition-opening',
    title: 'Grand Exhibition: The Art of a Generation',
    date: '2024-08-15',
    image: 'https://placehold.co/800x600.png',
    content: 'Join us for the opening of the most anticipated cultural event of the year. Featuring works from over 50 artisans, including our very own Marc Dupont, this exhibition is a celebration of contemporary craft. The event takes place at the Grand Palais, starting at 7 PM.',
  },
  {
    id: 'artisan-spotlight-vidal',
    title: 'Artisan Spotlight: The Sustainable Vision of Elena Vidal',
    date: '2024-07-22',
    image: 'https://placehold.co/800x600.png',
    content: 'This month, we delve into the world of Elena Vidal, a designer who is redefining luxury fashion with her commitment to sustainability. Learn about her process, her inspiration, and her mission to create a more ethical and beautiful world, one garment at a time.',
  },
  {
    id: 'unesco-partnership',
    title: 'Artisan\'s Compass Partners with UNESCO',
    date: '2024-06-05',
    image: 'https://placehold.co/800x600.png',
    content: 'We are proud to announce our new partnership with UNESCO to promote and preserve traditional craftsmanship worldwide. This collaboration will support artisans in endangered fields and help transmit their invaluable skills to future generations.',
  },
];
