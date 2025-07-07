"use client";

import {
  Sparkles,
  Calendar,
  User,
  Clock,
  Bookmark,
  ArrowRight,
  Github,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const metadata = {
  title: "AxylOS - What's New?",
  author: "AxylOS Team",
  date: "2025-07-05",
  readTime: "10 min read",
  category: "Update",
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-muted/20 pt-10 pb-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bookmark className="h-3 w-3" />
              {metadata.category}
            </Badge>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" /> {metadata.date}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <User className="h-4 w-4" /> {metadata.author}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" /> {metadata.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent flex items-center gap-2 justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
            {metadata.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4 text-center">
            Discover the latest work that we have been doing on AxylOS to ensure
            that it is the best Operating System that you have ever, and will
            ever, use.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-4xl mx-auto p-6 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center">
              <Sparkles className="h-5 w-5 text-primary" /> Highlights
            </h2>
            <ul className="flex flex-col gap-8 mb-8 justify-between">
              <li className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-3">
                  Performance
                </Badge>
                <span className="flex flex-col gap-0.5">
                  <strong>Enhanced Performance:</strong>
                  <span>
                    Major optimizations across the desktop and core system for a
                    smoother experience.
                  </span>
                </span>
              </li>
              <li className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-3">
                  Themes
                </Badge>
                <span className="flex flex-col gap-0.5">
                  <strong>New Desktop Themes:</strong>
                  <span>
                    Fresh, modern themes for a beautiful and customizable look.
                  </span>
                </span>
              </li>
              <li className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-3">
                  Software
                </Badge>
                <span className="flex flex-col gap-0.5">
                  <strong>Updated Software:</strong>
                  <span>
                    The latest versions of your favorite applications and tools.
                  </span>
                </span>
              </li>
              <li className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-3">
                  Installer
                </Badge>
                <span className="flex flex-col gap-0.5">
                  <strong>Improved Installer:</strong>
                  <span>
                    Easier and faster installation process with better hardware
                    detection.
                  </span>
                </span>
              </li>
              <li className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-3">
                  Community
                </Badge>
                <span className="flex flex-col gap-0.5">
                  <strong>Community Contributions:</strong>
                  <span>
                    Thanks to everyone who contributed bug reports, code, and
                    feedback!
                  </span>
                </span>
              </li>
            </ul>
          </section>

          <hr className="my-8 border-muted" />

          <section>
            <h2 className="text-xl font-semibold mb-2 text-center">
              The Words
            </h2>
            <div className="space-y-6">
              <p className="text-center text-justify mx-auto">
                There are many things that need to be said here, though we will
                do our best in border to ensure that the message of what we are
                working on is loud and clear
              </p>
              <p className="text-center text-justify mx-auto">There</p>
            </div>
          </section>

          <hr className="my-8 border-muted" />

          <section>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Detailed Work
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-1 text-primary">
                  Performance Improvements
                </h3>
                <p>
                  AxylOS 2024.1 brings significant performance boosts,
                  especially on lower-end hardware. Boot times are faster, and
                  memory usage has been reduced across the board.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-primary">
                  New Themes
                </h3>
                <p>
                  We&apos;ve added several new desktop themes, including both
                  light and dark variants. You can switch themes easily from the
                  settings menu.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-primary">
                  Updated Applications
                </h3>
                <p>
                  All core applications have been updated to their latest stable
                  versions, including the terminal, file manager, and browser.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-primary">
                  Installer Enhancements
                </h3>
                <p>
                  The installer now supports more hardware out of the box and
                  provides clearer instructions for new users.
                </p>
              </div>
            </div>
          </section>

          <hr className="my-8 border-muted" />

          <section className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 justify-center">
              <Users className="h-5 w-5 text-primary" /> Get Involved
            </h2>
            <p className="mb-4">
              Want to help shape the next release? Join our{" "}
              <Link
                href="https://discord.axyl.org"
                className="text-primary underline inline-flex items-center"
                target="_blank"
              >
                Discord <ArrowRight className="h-4 w-4 ml-1" />
              </Link>{" "}
              or contribute on{" "}
              <Link
                href="https://github.com/axyl-os"
                className="text-primary underline inline-flex items-center"
                target="_blank"
              >
                GitHub <Github className="h-4 w-4 ml-1" />
              </Link>
              .
            </p>
            <div className="text-center font-medium mt-8">
              <Button asChild size="lg" className="px-8">
                <Link href="/blog">Read more AxylOS news</Link>
              </Button>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
