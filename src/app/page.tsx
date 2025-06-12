import { ChatWindow } from '@/components/chat/ChatWindow';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <ChatWindow />
    </div>
  );
}
