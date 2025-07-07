// Static blog data to avoid server/client mismatch
export interface BlogPostMeta {
  title: string;
  author: string;
  date: string;
  readTime?: string;
  category?: string;
  slug: string;
  excerpt?: string;
}

export const blogPosts: BlogPostMeta[] = [
  {
    title: "AxylOS 2024.1 Release: What's New",
    author: "AxylOS Team",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Release",
    slug: "axylos-2024-1-release",
    excerpt: "Discover the latest features, improvements, and optimizations in our newest release including enhanced performance and new desktop themes."
  },
  {
    title: "Getting Started with AxylOS Development",
    author: "John Developer",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Development",
    slug: "getting-started-with-development",
    excerpt: "A comprehensive guide for developers looking to contribute to AxylOS or build applications for our platform."
  }
];