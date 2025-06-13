
'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { SendHorizonal, Loader2, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { knowledgeBasedChat, KnowledgeBasedChatInput } from '@/ai/flows/knowledge-based-chat';
import { greetAndAssist, GreetAndAssistInput } from '@/ai/flows/greeting-and-assistance';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | React.ReactNode; // Content should be string for history purposes
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function getInitialGreeting() {
      setIsLoading(true);
      try {
        const greetingInput: GreetAndAssistInput = { firstMessage: true };
        const response = await greetAndAssist(greetingInput);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), role: 'assistant', content: response.greeting },
        ]);
      } catch (error) {
        console.error('Error fetching greeting:', error);
        toast({
          title: "Error",
          description: "Could not fetch initial greeting.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }
    getInitialGreeting();
  }, [toast]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent,
    };
    
    const historyPayload = messages.slice(-2).map(msg => ({
      role: msg.role,
      content: typeof msg.content === 'string' ? msg.content : String(msg.content)
    }));

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatInput: KnowledgeBasedChatInput = {
        message: userMessageContent,
        history: historyPayload.length > 0 ? historyPayload : undefined,
      };
      const aiResponse = await knowledgeBasedChat(chatInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse.response },
      ]);
      if (!isFirstMessageSent) {
        setIsFirstMessageSent(true);
      }
    } catch (error) {
      console.error('Error in knowledgeBasedChat:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: "Sorry, I encountered an error. Please try again." },
      ]);
       toast({
          title: "Chat Error",
          description: "Failed to get response from AI. Please try again.",
          variant: "destructive",
        });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden bg-card">
      <ScrollArea className="flex-grow p-4 md:p-6" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
             <div className="flex items-start gap-3 py-2 justify-start animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-input text-card-foreground rounded-xl rounded-bl-none py-3 px-4 shadow-md text-[15px]">
                  <div className="flex space-x-1.5 items-center h-5">
                    <div className="typing-dot typing-dot-1"></div>
                    <div className="typing-dot typing-dot-2"></div>
                    <div className="typing-dot typing-dot-3"></div>
                  </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border p-3 bg-card"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask Xoire AI..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow bg-input placeholder:text-muted-foreground text-card-foreground border-border rounded-[10px] py-3 px-4 text-[15px]"
          disabled={isLoading && !(messages.length > 0 && messages[messages.length-1].role === 'user')}
          aria-label="Chat input"
          suppressHydrationWarning
        />
        <Button 
          type="submit" 
          disabled={isLoading && !(messages.length > 0 && messages[messages.length-1].role === 'user')} 
          aria-label="Send message"
          className="rounded-full p-[10px] bg-accent hover:bg-[#7C3AED] text-accent-foreground w-auto h-auto"
          suppressHydrationWarning
        >
          {isLoading && !(messages.length > 0 && messages[messages.length-1].role === 'user') ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizonal className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
