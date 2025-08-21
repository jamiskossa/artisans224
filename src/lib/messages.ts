
export type Message = {
  id: string;
  senderId: string; 
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  participantNames: { [key: string]: string };
  participantAvatar: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
};

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['currentUser', 'elena-vidal'],
    participantNames: { currentUser: 'Moi', 'elena-vidal': 'Elena Vidal' },
    participantAvatar: 'https://placehold.co/100x100.png',
    lastMessage: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?",
    lastMessageTimestamp: '2024-07-28T11:00:00Z',
    messages: [
      { id: 'msg-1-1', senderId: 'currentUser', text: 'Bonjour Elena, je voudrais savoir où en est ma commande.', timestamp: '2024-07-28T10:59:00Z' },
      { id: 'msg-1-2', senderId: 'elena-vidal', text: "Bonjour ! Bien sûr, je peux vérifier cela pour vous.", timestamp: '2024-07-28T10:59:30Z' },
      { id: 'msg-1-3', senderId: 'elena-vidal', text: "Oui, c'est tout à fait possible. Quel est le numéro de commande ?", timestamp: '2024-07-28T11:00:00Z' },
    ],
  },
  {
    id: 'conv-2',
    participantIds: ['currentUser', 'amina-traore'],
    participantNames: { currentUser: 'Moi', 'amina-traore': 'Amina Traoré' },
    participantAvatar: 'https://placehold.co/100x100.png',
    lastMessage: "Absolument, je serai en concert à Paris le mois prochain !",
    lastMessageTimestamp: '2024-07-27T15:20:00Z',
    messages: [
      { id: 'msg-2-1', senderId: 'currentUser', text: 'J\'adore votre dernier album ! Prévoyez-vous des dates de tournée ?', timestamp: '2024-07-27T15:19:00Z' },
      { id: 'msg-2-2', senderId: 'amina-traore', text: "Merci beaucoup pour votre soutien ! Absolument, je serai en concert à Paris le mois prochain !", timestamp: '2024-07-27T15:20:00Z' },
    ],
  },
  {
    id: 'conv-3',
    participantIds: ['currentUser', 'issa-kone'],
    participantNames: { currentUser: 'Moi', 'issa-kone': 'Issa Koné' },
    participantAvatar: 'https://placehold.co/100x100.png',
    lastMessage: "Bien sûr, nous proposons la personnalisation.",
    lastMessageTimestamp: '2024-07-26T09:05:00Z',
    messages: [
      { id: 'msg-3-1', senderId: 'currentUser', text: 'Bonjour, est-il possible de commander une paire de chaussures sur mesure ?', timestamp: '2024-07-26T09:04:00Z' },
      { id: 'msg-3-2', senderId: 'issa-kone', text: 'Bonjour, oui bien sûr, nous proposons la personnalisation.', timestamp: '2024-07-26T09:05:00Z' },
    ],
  },
];
