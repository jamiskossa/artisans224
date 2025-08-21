
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, User, Store, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message, Conversation, Participant } from '@/lib/messages';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

type UserRole = 'client' | 'artisan';

export default function MessageriePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('client');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        const isArtisan = user && !user.email?.includes('client');
        setCurrentUserRole(isArtisan ? 'artisan' : 'client');
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    setIsLoading(true);
    // This query is simplified for the demo. A real app would need a more robust query
    // that checks an array of participant IDs.
    const q = query(collection(db, "conversations"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let userConversations: Conversation[] = [];
      for (const doc of querySnapshot.docs) {
        const conv = doc.data() as Conversation;
        conv.id = doc.id;
        // Check if current user is a participant
        if (Object.keys(conv.participants).some(pId => pId.includes(currentUserRole))) { // Simplified logic
           if(currentUserRole === 'client' && conv.type === 'artisan-artisan') continue;
           userConversations.push(conv);
        }
      }
      setConversations(userConversations);
      setIsLoading(false);

      if (userConversations.length > 0 && !selectedConversation) {
          setSelectedConversation(userConversations[0]);
      }
    }, (error) => {
        console.error("Error fetching conversations: ", error);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, currentUserRole, selectedConversation]);

   useEffect(() => {
    if (selectedConversation) {
      const messagesQuery = query(collection(db, `conversations/${selectedConversation.id}/messages`), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [selectedConversation]);
  
  useEffect(() => {
    // Auto-scroll to the bottom
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    setIsSending(true);
    const messagePayload = {
      // In a real app, use a more specific senderId, e.g. `client-${currentUser.uid}`
      senderId: currentUserRole === 'client' ? `client-${currentUser.uid}` : `artisan-${currentUser.uid}`, 
      text: newMessage,
      timestamp: serverTimestamp(),
    };

    try {
        await addDoc(collection(db, `conversations/${selectedConversation.id}/messages`), messagePayload);
        setNewMessage('');
    } catch(error) {
        console.error("Error sending message: ", error);
    } finally {
        setIsSending(false);
    }
  };
  
  const getOtherParticipant = (convo: Conversation): Participant | undefined => {
    // This is a simplified mock. In a real app, you'd compare against the currentUser.uid
    const participants = Object.values(convo.participants);
    if (currentUserRole === 'client') {
        return participants.find(p => p.role === 'artisan');
    }
    if(convo.type === 'client-artisan'){
        return participants.find(p => p.role === 'client');
    }
    // Simplified: just return the other artisan.
    return participants.find(p => !p.id.includes(currentUserRole));
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
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            ) : (
                conversations.map(convo => {
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
                })
            )}
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
              <ScrollArea className="flex-1 bg-muted/20" ref={scrollAreaRef}>
                <div className="p-6 space-y-6">
                  {messages.map(msg => {
                    // Simplified logic for who is the current user
                    const isCurrentUser = msg.senderId.includes(currentUserRole);
                    const sender = isCurrentUser ? null : selectedConversation.participants[msg.senderId];
                    
                    return (
                        <div
                        key={msg.id}
                        className={cn(
                            "flex items-end gap-2",
                            isCurrentUser ? "justify-end" : "justify-start"
                        )}
                        >
                        {!isCurrentUser && sender && <Avatar className="h-8 w-8"><AvatarImage src={sender.avatar} data-ai-hint="person portrait"/><AvatarFallback>{sender.name?.charAt(0)}</AvatarFallback></Avatar>}
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
                    disabled={isSending}
                  />
                  <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9" disabled={isSending || !newMessage.trim()}>
                    {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>{isLoading ? 'Chargement des conversations...' : 'Sélectionnez une conversation pour commencer'}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
