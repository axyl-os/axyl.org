"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Terminal,
  Download,
  Settings,
  Users,
  Wrench,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Documentation
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AxylOS Documentation
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about installing, configuring, and using
            AxylOS. From beginner guides to advanced customization.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Installation Guide</CardTitle>
                <CardDescription>
                  Step-by-step instructions to install AxylOS on your system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">First Steps</CardTitle>
                <CardDescription>
                  Essential configuration and setup after your first boot.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Terminal Basics</CardTitle>
                <CardDescription>
                  Learn the command line essentials for AxylOS users.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Main Documentation Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Documentation Sections</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">User Guides</h3>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    System Requirements
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Hardware requirements and compatibility information
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Desktop Environment
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Customizing your desktop experience
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Package Management
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Installing and managing software packages
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    System Administration
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Managing users, services, and system settings
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Advanced Topics</h3>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Kernel Customization
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Building and configuring custom kernels
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Development Setup
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Setting up development environments
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    System Optimization
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Performance tuning and optimization tips
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Troubleshooting
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Common issues and their solutions
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Community & Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Community Forum</CardTitle>
                <CardDescription>
                  Join discussions, ask questions, and share your experiences
                  with other AxylOS users.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-fit">
                  Visit Forum
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Bug Reports</CardTitle>
                <CardDescription>
                  Found a bug? Report it on our GitHub repository to help
                  improve AxylOS.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-fit">
                  Report Bug
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Wiki</CardTitle>
                <CardDescription>
                  Community-maintained wiki with additional guides, tips, and
                  tricks.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-fit">
                  Browse Wiki
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="text-center py-12 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Documentation Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;re working hard to create comprehensive documentation for
            AxylOS. In the meantime, join our community for support and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
