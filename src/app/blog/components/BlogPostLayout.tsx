"use client";
import { Calendar, User, Clock, ChevronLeft, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlogPostLayoutProps {
  title: string;
  author: string;
  date: string;
  readTime?: string;
  category?: string;
  children: ReactNode;
}

export default function BlogPostLayout({
  title,
  author,
  date,
  readTime,
  category,
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-background via-background to-muted/20 pt-10 pb-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="group flex items-center text-muted-foreground hover:text-foreground mb-4"
              asChild
            >
              <Link href="/blog">
                <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Back to all posts
              </Link>
            </Button>

            {category && (
              <Badge variant="secondary" className="mb-4">
                <Bookmark className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              {author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {author}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-4xl mx-auto p-6 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
          <article className="prose prose-lg mx-auto max-w-none">
            <div className="prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
              {children}
            </div>
          </article>
        </Card>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Thanks for reading!</p>
          <Button asChild>
            <Link href="/blog">
              Explore more articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
