

// This file is for seeding the database and is a copy of the original data.
// It's separate to avoid including it in the main client bundle.
import type { Artisan, NewsArticle } from './data';

export type Message = {
  id: string;
  senderId: string; 
  text: string;
  timestamp: string;
};

export type Participant = {
  id: string;
  name: string;
  role: 'client' | 'artisan';
  avatar: string;
}

export type Conversation = {
  id: string;
  type: 'client-artisan' | 'artisan-artisan';
  participants: Record<string, Participant>;
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
};

export type Order = {
    id: string;
    date: string;
    status: 'Livré' | 'Expédiée' | 'En cours';
    total: string;
    items: { name: string; image: string; }[];
    trackingNumber: string | null;
    carrier: string | null;
    userId: string;
}

export type Artwork = {
    id: string;
    title: string;
    image: string;
    price: string;
    status: 'Publiée' | 'Brouillon';
    views: number;
    sales: number;
    description: string;
    artisanId: string;
};

export type Review = {
    id: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    authorAvatar: string;
};


export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    type: 'client-artisan',
    participants: {
      'client-1': { id: 'client-1', name: 'Aissatou Bah', role: 'client', avatar: '/images/profile/sophie-dubois.png' },
      'artisan-fatoumata-camara': { id: 'artisan-fatoumata-camara', name: 'Fatoumata Camara', role: 'artisan', avatar: '/images/artisans/elena-vidal.png' },
    },
    lastMessage: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?",
    lastMessageTimestamp: '2024-07-28T11:00:00Z',
    messages: [
      { id: 'msg-1-1', senderId: 'client-1', text: 'Bonjour Fatoumata, je voudrais savoir où en est ma commande.', timestamp: '2024-07-28T10:59:00Z' },
      { id: 'msg-1-2', senderId: 'artisan-fatoumata-camara', text: "Bonjour ! Bien sûr, je peux vérifier cela pour vous.", timestamp: '2024-07-28T10:59:30Z' },
      { id: 'msg-1-3', senderId: 'artisan-fatoumata-camara', text: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?", timestamp: '2024-07-28T11:00:00Z' },
    ],
  },
  {
    id: 'conv-2',
    type: 'client-artisan',
    participants: {
      'client-2': { id: 'client-2', name: 'Sékou Kourouma', role: 'client', avatar: '/images/profile/thomas-roy.png' },
      'artisan-amina-kourouma': { id: 'artisan-amina-kourouma', name: 'Amina Kourouma', role: 'artisan', avatar: '/images/artisans/amina-traore.png' },
    },
    lastMessage: "Absolument, je serai en concert à Conakry le mois prochain !",
    lastMessageTimestamp: '2024-07-27T15:20:00Z',
    messages: [
      { id: 'msg-2-1', senderId: 'client-2', text: 'J\'adore votre dernier album ! Prévoyez-vous des dates de tournée ?', timestamp: '2024-07-27T15:19:00Z' },
      { id: 'msg-2-2', senderId: 'artisan-amina-kourouma', text: "Merci beaucoup pour votre soutien ! Absolument, je serai en concert à Conakry le mois prochain !", timestamp: '2024-07-27T15:20:00Z' },
    ],
  },
    {
    id: 'conv-3',
    type: 'client-artisan',
    participants: {
      'client-3': { id: 'client-3', name: 'Mariama Sylla', role: 'client', avatar: '/images/profile/marie-claire.png' },
      'artisan-issa-conde': { id: 'artisan-issa-conde', name: 'Issa Condé', role: 'artisan', avatar: '/images/artisans/issa-kone.png' },
    },
    lastMessage: "Bien sûr, nous proposons la personnalisation.",
    lastMessageTimestamp: '2024-07-26T09:05:00Z',
    messages: [
      { id: 'msg-3-1', senderId: 'client-3', text: 'Bonjour, est-il possible de commander une paire de chaussures sur mesure ?', timestamp: '2024-07-26T09:04:00Z' },
      { id: 'msg-3-2', senderId: 'artisan-issa-conde', text: 'Bonjour, oui bien sûr, nous proposons la personnalisation.', timestamp: '2024-07-26T09:05:00Z' },
    ],
  },
  {
    id: 'conv-4',
    type: 'artisan-artisan',
    participants: {
      'artisan-issa-conde': { id: 'artisan-issa-conde', name: 'Issa Condé', role: 'artisan', avatar: '/images/artisans/issa-kone.png' },
      'artisan-mamadou-aliou-barry': { id: 'artisan-mamadou-aliou-barry', name: 'Mamadou Aliou Barry', role: 'artisan', avatar: '/images/artisans/marc-dupont.png' },
    },
    lastMessage: "Super, merci pour l'info !",
    lastMessageTimestamp: '2024-07-29T14:00:00Z',
    messages: [
        { id: 'msg-4-1', senderId: 'artisan-issa-conde', text: "Salut Mamadou, j'ai vu ta nouvelle sculpture, c'est magnifique ! Où as-tu trouvé ce type de bronze ?", timestamp: '2024-07-29T13:58:00Z' },
        { id: 'msg-4-2', senderId: 'artisan-mamadou-aliou-barry', text: "Merci Issa ! C'est un fournisseur à Labé, je t'envoie le contact.", timestamp: '2024-07-29T13:59:00Z' },
        { id: 'msg-4-3', senderId: 'artisan-issa-conde', text: "Super, merci pour l'info !", timestamp: '2024-07-29T14:00:00Z' },
    ]
  }
];

export const artisans: Artisan[] = [
  {
    id: 'fatoumata-camara',
    name: 'Fatoumata Camara',
    category: 'Mode',
    description: 'Mode intemporelle et matières durables de la Basse-Guinée.',
    bio: 'Fatoumata Camara est une pionnière de la mode durable. Ses créations marient silhouettes classiques et tissus éco-responsables, créant des pièces à la fois belles et respectueuses de la planète. Chaque vêtement est méticuleusement confectionné dans son atelier de Conakry, reflétant un profond respect pour la tradition et l\'innovation.',
    image: '/images/artisans/elena-vidal.png',
    gallery: [
      '/images/gallery/elena-vidal/1.png',
      '/images/gallery/elena-vidal/2.png',
      '/images/gallery/elena-vidal/3.png',
      '/images/gallery/elena-vidal/4.png',
    ],
    reviews: [],
  },
  {
    id: 'mamadou-aliou-barry',
    name: 'Mamadou Aliou Barry',
    category: 'Sculpture',
    description: 'Sculptures en bronze qui capturent le mouvement et l\'émotion.',
    bio: 'Mamadou Aliou Barry est un sculpteur du Fouta-Djalon dont le travail sur bronze et pierre explore la fluidité de la forme humaine. Ses pièces sont réputées pour leur énergie dynamique et leur profondeur émotionnelle. Diplômé des Beaux-Arts, Mamadou a exposé ses œuvres dans des galeries à travers l\'Europe.',
    image: '/images/artisans/marc-dupont.png',
    gallery: [
      '/images/gallery/marc-dupont/1.png',
      '/images/gallery/marc-dupont/2.png',
      '/images/gallery/marc-dupont/3.png',
      '/images/gallery/marc-dupont/4.png',
    ],
    reviews: [
        { id: 'rev1', author: 'Aissatou Bah', rating: 5, title: 'Absolument magnifique !', comment: "La sculpture que j'ai commandée est arrivée en parfait état. Le niveau de détail est incroyable. C'est encore plus beau en vrai. Un artiste exceptionnel.", date: '2024-07-15', authorAvatar: '/images/profile/sophie-dubois.png' },
        { id: 'rev2', author: 'Thomas Roy', rating: 4, title: 'Très impressionné', comment: "Une œuvre puissante qui a transformé mon salon. La livraison a été un peu lente, mais l'attente en valait la peine. Je recommande vivement.", date: '2024-06-28', authorAvatar: '/images/profile/thomas-roy.png' },
    ],
  },
  {
    id: 'nantenin-keita',
    name: 'Nanténin Keita',
    category: 'Bijoux',
    description: "Bijoux exquis inspirés de la géométrie de la nature.",
    bio: 'Nanténin Keita, originaire de Haute-Guinée, crée des bijoux exquis qui marient la beauté brute des pierres précieuses naturelles à la précision du design géométrique. Depuis son atelier, elle forge à la main chaque pièce en or et argent recyclés. Ses collections témoignent de sa conviction que le bijou doit être à la fois une déclaration personnelle et une œuvre d\'art.',
    image: '/images/artisans/chloe-leroy.png',
    gallery: [
      '/images/gallery/chloe-leroy/1.png',
      '/images/gallery/chloe-leroy/2.png',
      '/images/gallery/chloe-leroy/3.png',
      '/images/gallery/chloe-leroy/4.png',
    ],
    reviews: [],
  },
   {
    id: 'sia-haba',
    name: 'Sia Haba',
    category: 'Mode',
    description: 'Maroquinerie et accessoires avant-gardistes de la Guinée Forestière.',
    bio: 'Sia Haba est une maître maroquinière de la région forestière, connue pour ses sacs et accessoires d\'avant-garde. Son travail repousse les limites de l\'artisanat traditionnel, en incorporant des formes audacieuses et des techniques non conventionnelles. Elle croit en la création d\'"art portable", à la fois fonctionnel et provocateur.',
    image: '/images/artisans/jean-pierre.png',
    gallery: [
      '/images/gallery/jean-pierre/1.png',
      '/images/gallery/jean-pierre/2.png',
      '/images/gallery/jean-pierre/3.png',
      '/images/gallery/jean-pierre/4.png',
    ],
    reviews: [],
  },
  {
    id: 'amina-kourouma',
    name: 'Amina Kourouma',
    category: 'Musique',
    description: 'Vocaliste Soul aux mélodies envoûtantes de Haute-Guinée.',
    bio: 'Amina Kourouma est une chanteuse et compositrice dont la voix puissante et les paroles poétiques ont captivé les scènes underground. Sa musique fusionne des éléments de soul, de jazz et de rythmes ouest-africains traditionnels. Son dernier album, "Conakry Blues", est une ode à ses racines et un succès critique.',
    image: '/images/artisans/amina-traore.png',
    gallery: [
      '/images/gallery/amina-traore/1.png',
      '/images/gallery/amina-traore/2.png',
      '/images/gallery/amina-traore/3.png',
      '/images/gallery/amina-traore/4.png',
    ],
    reviews: [],
  },
  {
    id: 'djeli-kouyate',
    name: 'Djeli Kouyaté',
    category: 'Musique',
    description: 'Maître de la Kora et conteur moderne.',
    bio: 'Héritier d\'une longue lignée de griots, Djeli Kouyaté fait vibrer la kora avec une virtuosité rare. Ses compositions racontent des histoires ancestrales sur des arrangements contemporains, créant un pont entre les générations. Il a collaboré avec des artistes de renommée mondiale et s\'engage à préserver le patrimoine musical mandingue.',
    image: '/images/artisans/djeli-kouyate.png',
    gallery: [
      '/images/gallery/djeli-kouyate/1.png',
      '/images/gallery/djeli-kouyate/2.png',
      '/images/gallery/djeli-kouyate/3.png',
      '/images/gallery/djeli-kouyate/4.png',
    ],
    reviews: [],
  },
  {
    id: 'issa-conde',
    name: 'Issa Condé',
    category: 'Chaussures',
    description: 'Chaussures en cuir faites à la main avec une touche moderne.',
    bio: 'Issa Condé est un maître cordonnier qui allie techniques traditionnelles et design contemporain. Chaque paire est fabriquée à la main dans son atelier de Kankan, en utilisant les meilleurs cuirs locaux. Ses créations sont reconnues pour leur confort, leur durabilité et leur style unique qui honore l\'artisanat malien.',
    image: '/images/artisans/issa-kone.png',
    gallery: [
      '/images/gallery/issa-kone/1.png',
      '/images/gallery/issa-kone/2.png',
      '/images/gallery/issa-kone/3.png',
      '/images/gallery/issa-kone/4.png',
    ],
    reviews: [],
  },
  {
    id: 'kadiatou-diallo',
    name: 'Kadiatou Diallo',
    category: 'Peinture',
    description: 'Toiles vibrantes qui capturent la lumière du Fouta-Djalon.',
    bio: 'Kadiatou Diallo est une artiste peintre dont les œuvres vibrantes et colorées sont une célébration de la vie et des paysages du Fouta-Djalon. Utilisant des pigments naturels qu\'elle prépare elle-même, son style unique mélange abstraction et réalisme. Ses toiles sont une fenêtre ouverte sur l\'âme de la Moyenne-Guinée.',
    image: '/images/artisans/kadiatou-diallo.png',
    gallery: [
      '/images/gallery/kadiatou-diallo/1.png',
      '/images/gallery/kadiatou-diallo/2.png',
      '/images/gallery/kadiatou-diallo/3.png',
      '/images/gallery/kadiatou-diallo/4.png',
    ],
    reviews: [],
  }
];

export const news: NewsArticle[] = [
  {
    id: 'exhibition-opening',
    title: 'Grande Exposition : L\'Art d\'une Génération',
    date: '2024-08-15',
    image: '/images/news/exhibition-opening.png',
    content: 'Rejoignez-nous pour l\'ouverture de l\'événement culturel le plus attendu de l\'année. Présentant les œuvres de plus de 50 artisans, dont notre propre Mamadou Aliou Barry, cette exposition est une célébration de l\'artisanat contemporain. L\'événement a lieu au Grand Palais, à partir de 19h.',
  },
  {
    id: 'artisan-spotlight-vidal',
    title: 'Artisan à la une : La Vision Durable de Fatoumata Camara',
    date: '2024-07-22',
    image: '/images/news/spotlight-vidal.png',
    content: 'Ce mois-ci, nous plongeons dans le monde de Fatoumata Camara, une créatrice qui redéfinit la mode de luxe avec son engagement pour la durabilité. Découvrez son processus, son inspiration et sa mission pour créer un monde plus éthique et plus beau, un vêtement à la fois.',
  },
  {
    id: 'unesco-partnership',
    title: 'Artisan\'s Compass en partenariat avec l\'UNESCO',
    date: '2024-06-05',
    image: '/images/news/unesco-partnership.png',
    content: 'Nous sommes fiers d\'annoncer notre nouveau partenariat avec l\'UNESCO pour promouvoir et préserver l\'artisanat traditionnel dans le monde. Cette collaboration soutiendra les artisans dans des domaines menacés et aidera à transmettre leurs compétences inestimables aux générations futures.',
  },
];

export const orders: Order[] = [
  { 
    id: 'ORD001', 
    date: '2024-07-20', 
    status: 'Livré', 
    total: '251.99 €', 
    items: [{ name: 'Sculpture en Bronze', image: '/images/paiement/sculpture-bronze.png' }],
    trackingNumber: 'LP123456789FR',
    carrier: 'La Poste',
    userId: 'client-1' // Dummy user ID
  },
  { 
    id: 'ORD002', 
    date: '2024-07-18', 
    status: 'Expédiée', 
    total: '120.00 €', 
    items: [{ name: 'Chaussures en cuir', image: '/images/paiement/chaussures-cuir.png' }],
    trackingNumber: 'DHL987654321',
    carrier: 'DHL',
    userId: 'client-1'
  },
  { 
    id: 'ORD003', 
    date: '2024-06-12', 
    status: 'Livré', 
    total: '1.99 €', 
    items: [{ name: "Chanson 'Conakry Blues'", image: '/images/paiement/conakry-blues.png' }],
    trackingNumber: null, 
    carrier: null,
    userId: 'client-2'
  },
   { 
    id: 'ORD004', 
    date: '2024-07-22', 
    status: 'En cours', 
    total: '89.99 €', 
    items: [{ name: 'Bijoux en argent', image: '/images/gallery/chloe-leroy/1.png' }],
    trackingNumber: null,
    carrier: null,
    userId: 'client-2'
  },
];

export const artworks: Artwork[] = [
  { id: 'art-1', title: 'Sculpture en Bronze "L\'envol"', image: '/images/gallery/mamadou-aliou-barry/1.png', price: '450', status: 'Publiée', views: 1200, sales: 5, description: 'Une sculpture magnifique.', artisanId: 'mamadou-aliou-barry' },
  { id: 'art-2', title: 'Chanson "Conakry Blues"', image: '/images/gallery/amina-kourouma/1.png', price: '1.99', status: 'Publiée', views: 8500, sales: 1500, description: 'Un morceau soul.', artisanId: 'amina-kourouma' },
  { id: 'art-3', title: 'Chaussures en cuir "Nomade"', image: '/images/gallery/issa-conde/1.png', price: '120', status: 'Brouillon', views: 350, sales: 12, description: 'Chaussures faites main.', artisanId: 'issa-conde' },
];

    
