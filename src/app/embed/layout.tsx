
import type { Metadata } from 'next';
import '../globals.css'; // We still need base styles and Tailwind.
import { Toaster } from "@/components/ui/toaster"; // Keep if ChatInterface toasts are desired in embed.

export const metadata: Metadata = {
  title: 'XOIRE AI Assistant - Embed',
  description: 'Embeddable XOIRE AI Assistant',
};

export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Ensure fonts are loaded for the embedded content */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* 
        Key styles for an embeddable page:
        - bg-transparent: So the iframe page itself is see-through around your component.
        - h-screen, w-full: Make the body fill the iframe.
        - m-0, p-0: Remove default margins/paddings.
        - overflow-hidden: Prevent scrollbars on the iframe's body if ChatWindow manages its own.
      */}
      <body className="font-body antialiased bg-transparent w-full h-screen m-0 p-0 overflow-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
