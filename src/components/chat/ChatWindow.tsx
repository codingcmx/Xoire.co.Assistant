'use client';

import { ChatInterface } from './ChatInterface';
import { ChatWindowHeader } from './ChatWindowHeader';

export function ChatWindow() {
  return (
    <div className="w-[420px] h-[680px] bg-card text-card-foreground rounded-lg shadow-2xl flex flex-col overflow-hidden">
      <ChatWindowHeader />
      <ChatInterface />
    </div>
  );
}
