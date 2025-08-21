
export type Message = {
  id: string;
  senderId: string; 
  text: string;
  timestamp: string;
};

// Added 'role' to identify participants as 'client' or 'artisan'
export type Participant = {
  id: string;
  name: string;
  role: 'client' | 'artisan';
  avatar: string;
}

// Added 'type' to distinguish conversation types
export type Conversation = {
  id: string;
  type: 'client-artisan' | 'artisan-artisan';
  participants: Record<string, Participant>;
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
};


// currentUser can be either a client or an artisan depending on the context.
// For this simulation, we'll assume a fixed ID for the current user.
const CURRENT_USER_ID = 'currentUser';

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    type: 'client-artisan',
    participants: {
      'client-1': { id: 'client-1', name: 'Sophie Dubois', role: 'client', avatar: 'https://placehold.co/100x100.png' },
      'artisan-elena-vidal': { id: 'artisan-elena-vidal', name: 'Elena Vidal', role: 'artisan', avatar: 'https://placehold.co/100x100.png' },
    },
    lastMessage: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?",
    lastMessageTimestamp: '2024-07-28T11:00:00Z',
    messages: [
      { id: 'msg-1-1', senderId: 'client-1', text: 'Bonjour Elena, je voudrais savoir où en est ma commande.', timestamp: '2024-07-28T10:59:00Z' },
      { id: 'msg-1-2', senderId: 'artisan-elena-vidal', text: "Bonjour ! Bien sûr, je peux vérifier cela pour vous.", timestamp: '2024-07-28T10:59:30Z' },
      { id: 'msg-1-3', senderId: 'artisan-elena-vidal', text: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?", timestamp: '2024-07-28T11:00:00Z' },
    ],
  },
  {
    id: 'conv-2',
    type: 'client-artisan',
    participants: {
      'client-2': { id: 'client-2', name: 'Thomas Roy', role: 'client', avatar: 'https://placehold.co/100x100.png' },
      'artisan-amina-traore': { id: 'artisan-amina-traore', name: 'Amina Traoré', role: 'artisan', avatar: 'https://placehold.co/100x100.png' },
    },
    lastMessage: "Absolument, je serai en concert à Paris le mois prochain !",
    lastMessageTimestamp: '2024-07-27T15:20:00Z',
    messages: [
      { id: 'msg-2-1', senderId: 'client-2', text: 'J\'adore votre dernier album ! Prévoyez-vous des dates de tournée ?', timestamp: '2024-07-27T15:19:00Z' },
      { id: 'msg-2-2', senderId: 'artisan-amina-traore', text: "Merci beaucoup pour votre soutien ! Absolument, je serai en concert à Paris le mois prochain !", timestamp: '2024-07-27T15:20:00Z' },
    ],
  },
    {
    id: 'conv-3',
    type: 'client-artisan',
    participants: {
      'client-3': { id: 'client-3', name: 'Marie Claire', role: 'client', avatar: 'https://placehold.co/100x100.png' },
      'artisan-issa-kone': { id: 'artisan-issa-kone', name: 'Issa Koné', role: 'artisan', avatar: 'https://placehold.co/100x100.png' },
    },
    lastMessage: "Bien sûr, nous proposons la personnalisation.",
    lastMessageTimestamp: '2024-07-26T09:05:00Z',
    messages: [
      { id: 'msg-3-1', senderId: 'client-3', text: 'Bonjour, est-il possible de commander une paire de chaussures sur mesure ?', timestamp: '2024-07-26T09:04:00Z' },
      { id: 'msg-3-2', senderId: 'artisan-issa-kone', text: 'Bonjour, oui bien sûr, nous proposons la personnalisation.', timestamp: '2024-07-26T09:05:00Z' },
    ],
  },
  {
    id: 'conv-4',
    type: 'artisan-artisan',
    participants: {
      'artisan-issa-kone': { id: 'artisan-issa-kone', name: 'Issa Koné', role: 'artisan', avatar: 'https://placehold.co/100x100.png' },
      'artisan-marc-dupont': { id: 'artisan-marc-dupont', name: 'Marc Dupont', role: 'artisan', avatar: 'https://placehold.co/100x100.png' },
    },
    lastMessage: "Super, merci pour l'info !",
    lastMessageTimestamp: '2024-07-29T14:00:00Z',
    messages: [
        { id: 'msg-4-1', senderId: 'artisan-issa-kone', text: "Salut Marc, j'ai vu ta nouvelle sculpture, c'est magnifique ! Où as-tu trouvé ce type de bronze ?", timestamp: '2024-07-29T13:58:00Z' },
        { id: 'msg-4-2', senderId: 'artisan-marc-dupont', text: "Merci Issa ! C'est un fournisseur à Lyon, je t'envoie le contact.", timestamp: '2024-07-29T13:59:00Z' },
        { id: 'msg-4-3', senderId: 'artisan-issa-kone', text: "Super, merci pour l'info !", timestamp: '2024-07-29T14:00:00Z' },
    ]
  }
];

// This helper function simulates getting conversations for the current user.
// In a real app, this logic would be on the backend.
export const getConversationsForUser = (userId: string, userRole: 'client' | 'artisan') => {
  if (userRole === 'client') {
    // A client sees conversations where they are a participant.
    return conversations.filter(c => c.participants[userId]);
  } else { // userRole is 'artisan'
    // An artisan sees all conversations they are part of, PLUS all artisan-artisan chats.
    return conversations.filter(c => c.participants[userId] || c.type === 'artisan-artisan');
  }
};
