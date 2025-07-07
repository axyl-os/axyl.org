// This file contains server-only code
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface BlogPostMeta {
  title: string;
  author: string;
  date: string;
  readTime?: string;
  category?: string;
  slug: string;
  excerpt?: string;
}

export function getBlogPostMetadata(slug: string): BlogPostMeta {
  const filePath = path.join(process.cwd(), `src/app/blog/${slug}/content.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  
  // Use first paragraph as excerpt if not provided
  let excerpt = data.excerpt;
  if (!excerpt) {
    const match = content.match(/(?:^|\n)([^#\n][^\n]+)/);
    excerpt = match ? match[1].trim() : "";
  }
  
  return {
    title: data.title || slug,
    author: data.author || "Unknown",
    date: data.date || "",
    readTime: data.readTime || "",
    category: data.category || "",
    slug,
    excerpt,
  };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const blogDir = path.join(process.cwd(), "src/app/blog");
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogPostMeta[] = [];

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      fs.existsSync(path.join(blogDir, entry.name, "content.mdx"))
    ) {
      const slug = entry.name;
      posts.push(getBlogPostMetadata(slug));
    }
  }

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}