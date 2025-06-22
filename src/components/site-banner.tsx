"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SiteBanner() {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  return (
    <div className="w-full bg-amber-500 dark:bg-amber-600 text-black dark:text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
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
          onClick={() => setIsClosed(true)}
          className="text-sm font-medium hover:underline"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}
