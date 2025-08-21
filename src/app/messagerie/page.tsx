
"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { conversations as initialConversations, Message } from '@/lib/messages';

type Conversation = typeof initialConversations[0];

export default function MessageriePage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'currentUser', // In a real app, this would be the logged-in user's ID
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
  
  const getParticipantName = (convo: Conversation) => {
    return Object.values(convo.participantNames).find(name => name !== 'Moi');
  }

  return (
    <div className="container mx-auto py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Messagerie</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Échangez directement avec les artisans et les clients.
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
            {conversations.map(convo => (
              <div
                key={convo.id}
                className={cn(
                  "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50",
                  selectedConversation?.id === convo.id && "bg-muted"
                )}
                onClick={() => handleSelectConversation(convo)}
              >
                <Avatar>
                  <AvatarImage src={convo.participantAvatar} />
                  <AvatarFallback>{getParticipantName(convo)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{getParticipantName(convo)}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Message View */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-4">
                <Avatar>
                   <AvatarImage src={selectedConversation.participantAvatar} />
                   <AvatarFallback>{getParticipantName(selectedConversation)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{getParticipantName(selectedConversation)}</h3>
              </div>
              <ScrollArea className="flex-1 bg-muted/20">
                <div className="p-6 space-y-6">
                  {selectedConversation.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        msg.senderId === 'currentUser' ? "justify-end" : "justify-start"
                      )}
                    >
                       {msg.senderId !== 'currentUser' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.participantAvatar} /><AvatarFallback>{getParticipantName(selectedConversation)?.charAt(0)}</AvatarFallback></Avatar>}
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg px-4 py-2 text-base",
                          msg.senderId === 'currentUser'
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border"
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
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
