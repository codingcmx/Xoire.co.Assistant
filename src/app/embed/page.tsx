
'use client';

import { ChatWindow } from '@/components/chat/ChatWindow';

export default function EmbedPage() {
  // This page is designed to be embedded in an iframe.
  // The ChatWindow will fill this div, and this div will fill the iframe.
  return (
    <div className="w-full h-full">
      <ChatWindow />
    </div>
  );
}
