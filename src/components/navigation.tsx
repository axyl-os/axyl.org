"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  FileText,
  BookOpen,
  Download,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

function NavigationContent() {
  // Simplified navigation without auth
  const [loading, setLoading] = useState(false);

  return (
    <nav className="fixed top-[36px] w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <Terminal className="h-6 w-6 text-primary" />
            <span>AxylOS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/download"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Link>
            <Link
              href="/docs"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export function Navigation() {
  return <NavigationContent />;
}
