"use client";

import Link from "next/link";
import {
  Terminal,
  FileText,
  BookOpen,
  Download,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

function NavigationContent({ bannerClosed }: { bannerClosed: boolean }) {
  // nav height: 64px, banner height: 40px
  const navTop = bannerClosed ? 0 : 40;

  return (
    <nav
      className="fixed w-full z-40 bg-background/80 backdrop-blur-md border-b border-border"
      style={{ top: navTop, height: 64 }}
    >
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

export function Navigation({ bannerClosed }: { bannerClosed: boolean }) {
  return <NavigationContent bannerClosed={bannerClosed} />;
}
