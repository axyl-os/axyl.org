"use client";

import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, BookOpen, Bookmark } from "lucide-react";
import { blogPosts } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BlogIndexPage() {
  const posts = blogPosts;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <BookOpen className="h-3 w-3 mr-1" />
            Insights & Updates
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            AxylOS Blog
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            News, releases, tutorials, and stories from the AxylOS team and
            community.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {posts.length === 0 && (
              <div className="text-center text-muted-foreground p-12 border border-dashed rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
                <p>Check back soon for new content!</p>
              </div>
            )}

            {posts.map((post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        {post.category && (
                          <Badge variant="secondary" className="mb-3">
                            <Bookmark className="h-3 w-3 mr-1" />
                            {post.category}
                          </Badge>
                        )}
                        <CardTitle className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </span>
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.author}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                        
                        <CardDescription className="text-base mb-4">
                          {post.excerpt}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button variant="ghost" className="group/btn p-0">
                        <span className="flex items-center text-primary">
                          Read more
                          <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
