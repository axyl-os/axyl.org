import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Clock,
  User,
  ArrowRight,
  Rss,
  BookOpen,
  Terminal,
  Zap
} from "lucide-react"

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "AxylOS 2024.1 Release: What's New",
      excerpt: "Discover the latest features, improvements, and optimizations in our newest release including enhanced performance and new desktop themes.",
      author: "AxylOS Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Release",
      featured: true
    },
    {
      title: "Getting Started with AxylOS Development",
      excerpt: "A comprehensive guide for developers looking to contribute to AxylOS or build applications for our platform.",
      author: "John Developer",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Development",
      featured: true
    }
  ]

  const recentPosts = [
    {
      title: "Optimizing Your AxylOS Installation for Gaming",
      excerpt: "Tips and tricks to get the best gaming performance on AxylOS, including driver optimization and system tweaks.",
      author: "Gaming Team",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Gaming"
    },
    {
      title: "Understanding AxylOS Package Management",
      excerpt: "Deep dive into our package management system and how to effectively manage software on your system.",
      author: "Package Maintainer",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Tutorial"
    },
    {
      title: "Community Spotlight: Amazing AxylOS Setups",
      excerpt: "Showcasing beautiful desktop customizations and setups created by our amazing community members.",
      author: "Community Team",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "Community"
    },
    {
      title: "Security Best Practices for AxylOS Users",
      excerpt: "Essential security tips and configurations to keep your AxylOS system safe and secure.",
      author: "Security Team",
      date: "2023-12-28",
      readTime: "9 min read",
      category: "Security"
    }
  ]

  const categories = [
    { name: "Release", count: 3, icon: Zap },
    { name: "Tutorial", count: 8, icon: BookOpen },
    { name: "Development", count: 5, icon: Terminal },
    { name: "Community", count: 12, icon: User },
    { name: "Gaming", count: 4, icon: Rss },
    { name: "Security", count: 6, icon: Clock }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Blog
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AxylOS Blog
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, tutorials, and insights from the AxylOS team and community.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <Badge variant="outline">Featured</Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="space-y-6">
                {recentPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight hover:text-primary transition-colors mb-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-2 flex-shrink-0 ml-4" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription>
                    Get the latest AxylOS news and updates delivered to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Rss className="h-4 w-4 mr-2" />
                    Subscribe to RSS
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/docs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                  <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Download AxylOS
                  </Link>
                  <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Community Forum
                  </Link>
                  <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    GitHub Repository
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <section className="text-center py-12 mt-12 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Blog Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;re preparing amazing content about AxylOS, including tutorials, release notes, 
            and community stories. Stay tuned for regular updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs">
                Read Documentation
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}