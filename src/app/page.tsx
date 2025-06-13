
import { ChatWindow } from '@/components/chat/ChatWindow';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      {/* 
        This div now provides the explicit sizing and styling for the direct view of ChatWindow.
        ChatWindow's w-full h-full will fill this container.
        Its max-w and max-h will be respected.
      */}
      <div className="w-[420px] h-[680px] rounded-lg overflow-hidden shadow-2xl">
        <ChatWindow />
      </div>
    </div>
  );
}
