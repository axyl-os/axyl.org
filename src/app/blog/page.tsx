import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface BlogPostMeta {
  title: string;
  author: string;
  date: string;
  readTime?: string;
  category?: string;
  slug: string;
  excerpt?: string;
}

function getAllBlogPosts(): BlogPostMeta[] {
  const blogDir = path.join(process.cwd(), "src/app/blog");
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogPostMeta[] = [];

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      fs.existsSync(path.join(blogDir, entry.name, "content.mdx"))
    ) {
      const slug = entry.name;
      const filePath = path.join(blogDir, slug, "content.mdx");
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);

      // Use first paragraph as excerpt if not provided
      let excerpt = data.excerpt;
      if (!excerpt) {
        const match = content.match(/(?:^|\n)([^#\n][^\n]+)/);
        excerpt = match ? match[1].trim() : "";
      }

      posts.push({
        title: data.title || slug,
        author: data.author || "Unknown",
        date: data.date || "",
        readTime: data.readTime || "",
        category: data.category || "",
        slug,
        excerpt,
      });
    }
  }

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AxylOS Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            News, releases, tutorials, and stories from the AxylOS team and community.
          </p>
        </div>
        <div className="space-y-8">
          {posts.length === 0 && (
            <div className="text-center text-muted-foreground">No blog posts found.</div>
          )}
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-border hover:shadow-lg transition-shadow bg-background/80"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
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
                  {post.category && (
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                      {post.category}
                    </span>
                  )}
                </div>
                <p className="mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary font-medium">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}