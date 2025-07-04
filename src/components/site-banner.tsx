"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

export function SiteBanner({ isClosed, onCloseAction }: { isClosed: boolean, onCloseAction: () => void }) {
  if (isClosed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-amber-500 dark:bg-amber-600 text-black dark:text-white py-2 px-4 h-[40px]">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm font-medium">
            This site is currently conceptual during our rewrite. For any questions, please visit our{" "}
            <Link 
              href="https://discord.axyl.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-bold inline-flex items-center"
            >
              Discord <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </p>
        </div>
        <button 
          onClick={onCloseAction}
          className="text-sm font-medium hover:underline"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}
