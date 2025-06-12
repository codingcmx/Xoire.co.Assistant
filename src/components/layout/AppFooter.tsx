import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} XOIRE AI. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/book-meeting">Book a Meeting</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Form</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
