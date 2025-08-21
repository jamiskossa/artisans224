
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  text: string;
  sender: "user" | "bot";
};

export function ChatbotWidget({ artisanName }: { artisanName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: `Bonjour ! Je suis l'assistant virtuel de ${artisanName}. Comment puis-je vous aider aujourd'hui ?`,
          sender: "bot",
        },
      ]);
    }
  }, [isOpen, artisanName]);

  useEffect(() => {
    // Auto-scroll to the bottom
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        text: `Ceci est une réponse simulée à votre question : "${userMessage.text}". Dans une version future, une IA fournira des réponses détaillées sur les produits de ${artisanName}.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          <span className="sr-only">Ouvrir le chatbot</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-80 h-[28rem] flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Bot className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="text-lg">Assistant Vendeur</CardTitle>
                    <p className="text-xs text-muted-foreground">En ligne</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                        key={index}
                        className={cn(
                            "flex items-end gap-2",
                            msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                        >
                        <div
                            className={cn(
                            "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                            msg.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                        >
                            {msg.text}
                        </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted flex items-center gap-2">
                                <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    </div>
                </ScrollArea>
            </CardContent>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez une question..."
                  className="pr-12"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
