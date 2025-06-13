
'use client';

import { GripVertical, Minus, X } from 'lucide-react';
import { Bot } from 'lucide-react'; // Added based on previous interactions
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Added based on previous interactions

export function ChatWindowHeader() {
  return (
    <div className="flex h-12 items-center justify-between bg-secondary px-3 border-b border-border">
      <div className="flex items-center gap-2">
        {/* Changed GripVertical to blinking Bot Avatar based on previous interactions */}
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-transparent text-secondary-foreground">
            <Bot className="h-5 w-5 animate-blink" suppressHydrationWarning />
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm text-secondary-foreground">
          Xoire AI Assistant
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          className="p-1 rounded hover:bg-white/10"
          aria-label="Minimize"
          suppressHydrationWarning
        >
          <Minus className="h-4 w-4 text-secondary-foreground opacity-70" />
        </button>
        <button
          className="p-1 rounded hover:bg-white/10"
          aria-label="Close"
          suppressHydrationWarning
        >
          <X className="h-4 w-4 text-secondary-foreground opacity-70" />
        </button>
      </div>
    </div>
  );
}
