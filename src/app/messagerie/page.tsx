
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, User, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { conversations as initialConversations, Message, Conversation, Participant } from '@/lib/messages';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

type UserRole = 'client' | 'artisan';

// In a real app, you would get this from the user's session
const MOCK_CURRENT_USER = {
  id: 'currentUser', // This ID doesn't exist in participants, it's just a placeholder
  name: 'Moi',
};

export default function MessageriePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('client');

  const pathname = usePathname();

  // Simulate setting user role based on the navigation path.
  // This is a temporary solution for demonstration purposes.
  useEffect(() => {
    // A more robust solution would be to use a session or context provider.
    const isArtisan = typeof window !== 'undefined' && (document.referrer.includes('/dashboard') && !document.referrer.includes('client'));
    const role = isArtisan ? 'artisan' : 'client';
    setCurrentUserRole(role);
    
    // Simulate fetching conversations based on user role
    if (role === 'artisan') {
      // If artisan, they see their talks with clients AND other artisans
      setConversations(initialConversations); 
    } else {
      // If client, they only see their talks with artisans
      setConversations(initialConversations.filter(c => c.type === 'client-artisan'));
    }
  }, []);

  useEffect(() => {
      if (conversations.length > 0 && !selectedConversation) {
          setSelectedConversation(conversations[0]);
      }
  }, [conversations, selectedConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: MOCK_CURRENT_USER.id, // In a real app, this would be the logged-in user's ID
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTimestamp: message.timestamp,
    };
    
    setSelectedConversation(updatedConversation);
    setConversations(conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c));
    setNewMessage('');
  };
  
  const getOtherParticipant = (convo: Conversation): Participant | undefined => {
    // In a two-participant convo, finds the other person.
    // This logic needs to be more complex for group chats.
    const participants = Object.values(convo.participants);
    if (currentUserRole === 'client') {
        return participants.find(p => p.role === 'artisan');
    }
    // If user is artisan, and it's a client chat, return client.
    if(convo.type === 'client-artisan'){
        return participants.find(p => p.role === 'client');
    }
    // If user is artisan and it's an artisan chat, return other artisan.
    // This part is tricky with mock data as we don't know which artisan the "currentUser" is.
    // We will just return the one that is not the first for this simulation.
     return participants[1];
  }


  return (
    <div className="container mx-auto py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Messagerie</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Échangez directement avec les {currentUserRole === 'artisan' ? 'clients et autres créateurs' : 'artisans'}.
        </p>
      </div>
      <Card className="h-[75vh] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {/* Conversations List */}
        <div className="flex flex-col border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Conversations</h2>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map(convo => {
              const otherParticipant = getOtherParticipant(convo);
              if (!otherParticipant) return null;

              return (
                <div
                    key={convo.id}
                    className={cn(
                    "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50",
                    selectedConversation?.id === convo.id && "bg-muted"
                    )}
                    onClick={() => handleSelectConversation(convo)}
                >
                    <Avatar>
                    <AvatarImage src={otherParticipant.avatar} data-ai-hint="person portrait"/>
                    <AvatarFallback>{otherParticipant.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{otherParticipant.name}</p>
                        <Badge variant={otherParticipant.role === 'artisan' ? 'secondary' : 'outline'} className="capitalize text-xs">
                           {otherParticipant.role === 'artisan' ? <Store className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                           {otherParticipant.role}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>

        {/* Message View */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-4">
                <Avatar>
                   <AvatarImage src={getOtherParticipant(selectedConversation)?.avatar} data-ai-hint="person portrait" />
                   <AvatarFallback>{getOtherParticipant(selectedConversation)?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{getOtherParticipant(selectedConversation)?.name}</h3>
                   <p className="text-sm text-muted-foreground capitalize">{getOtherParticipant(selectedConversation)?.role}</p>
                </div>
              </div>
              <ScrollArea className="flex-1 bg-muted/20">
                <div className="p-6 space-y-6">
                  {selectedConversation.messages.map(msg => {
                    const sender = selectedConversation.participants[msg.senderId] || MOCK_CURRENT_USER;
                    const isCurrentUser = msg.senderId === MOCK_CURRENT_USER.id || (currentUserRole === 'client' && selectedConversation.participants[msg.senderId]?.role === 'client');
                    
                    return (
                        <div
                        key={msg.id}
                        className={cn(
                            "flex items-end gap-2",
                            isCurrentUser ? "justify-end" : "justify-start"
                        )}
                        >
                        {!isCurrentUser && <Avatar className="h-8 w-8"><AvatarImage src={sender.avatar} data-ai-hint="person portrait"/><AvatarFallback>{sender.name?.charAt(0)}</AvatarFallback></Avatar>}
                        <div
                            className={cn(
                            "max-w-[70%] rounded-lg px-4 py-2 text-base",
                            isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-background border"
                            )}
                        >
                            {msg.text}
                        </div>
                        </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
                <div className="relative">
                  <Input
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="pr-16 h-12 text-base"
                  />
                  <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
