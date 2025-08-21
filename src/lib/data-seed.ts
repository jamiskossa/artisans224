
// This file is for seeding the database and is a copy of the original data.
// It's separate to avoid including it in the main client bundle.

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
