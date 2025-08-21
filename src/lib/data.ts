export type Artisan = {
  id: string;
  name: string;
  category: 'Mode' | 'Sculpture' | 'Bijoux' | 'Musique' | 'Chaussures';
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
