
'use client';

import { ChatInterface } from './ChatInterface';
import { ChatWindowHeader } from './ChatWindowHeader';

export function ChatWindow() {
  return (
    // Changed:
    // - Removed fixed w-[420px] h-[680px] to allow it to fill its parent.
    // - Added max-w-[420px] and max-h-[680px] as a common size for chat widgets.
    //   The iframe itself will typically be sized to 420x680.
    // - Changed rounded-lg to sm:rounded-lg so it's not rounded if it fills a very small iframe.
    // - Adjusted shadow slightly.
    <div className="w-full h-full max-w-[420px] mx-auto max-h-[680px] sm:rounded-lg shadow-xl flex flex-col overflow-hidden bg-card text-card-foreground">
      <ChatWindowHeader />
      <ChatInterface />
    </div>
  );
}
