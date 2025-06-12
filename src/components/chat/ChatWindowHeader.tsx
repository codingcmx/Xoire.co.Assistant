'use client';

import { GripVertical, Minus, X } from 'lucide-react';

export function ChatWindowHeader() {
  return (
    <div className="flex h-12 items-center justify-between bg-secondary px-3 border-b border-border">
      <div className="flex items-center gap-2">
        <GripVertical className="h-5 w-5 text-secondary-foreground opacity-70" />
        <span className="font-medium text-sm text-secondary-foreground">
          Xoire AI Assistant
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="p-1 rounded hover:bg-white/10" aria-label="Minimize">
          <Minus className="h-4 w-4 text-secondary-foreground opacity-70" />
        </button>
        <button className="p-1 rounded hover:bg-white/10" aria-label="Close">
          <X className="h-4 w-4 text-secondary-foreground opacity-70" />
        </button>
      </div>
    </div>
  );
}
