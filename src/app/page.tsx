import { ChatInterface } from '@/components/chat/ChatInterface';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <ChatInterface />
      </main>
      <AppFooter />
    </div>
  );
}
