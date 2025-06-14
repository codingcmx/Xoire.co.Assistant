
'use client';

import { ChatInterface } from './ChatInterface';
// ChatWindowHeader import removed

export function ChatWindow() {
  return (
    // Changed:
    // - Reduced max-w from [420px] to [360px]
    // - Reduced max-h from [680px] to [600px]
    // - Removed ChatWindowHeader component
    <div className="w-full h-full max-w-[360px] mx-auto max-h-[600px] sm:rounded-lg shadow-xl flex flex-col overflow-hidden bg-card text-card-foreground">
      {/* ChatWindowHeader component removed */}
      <ChatInterface />
    </div>
  );
}

