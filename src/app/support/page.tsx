"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  HelpCircle, 
  Bug, 
  MessageCircle, 
  Search,
  ExternalLink,
  Github,
  Book,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Lightbulb,
  Heart,
  Zap,
  Shield
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

interface SupportChannel {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  url: string
  responseTime: string
  status: "online" | "busy" | "offline"
}

const faqItems: FAQItem[] = [
  {
    id: "install-requirements",
    question: "What are the minimum system requirements for AxylOS?",
    answer: "AxylOS requires a 64-bit processor with SSE2 support, 2GB of RAM (4GB recommended), and 20GB of available disk space. A stable internet connection is recommended for updates and package installation.",
    category: "Installation",
    tags: ["requirements", "hardware", "installation"]
  },
  {
    id: "dual-boot",
    question: "Can I dual boot AxylOS with Windows?",
    answer: "Yes, AxylOS supports dual booting with Windows and other operating systems. During installation, you can choose to install alongside your existing OS. Make sure to back up your data before proceeding.",
    category: "Installation",
    tags: ["dual-boot", "windows", "installation"]
  },
  {
    id: "package-manager",
    question: "What package manager does AxylOS use?",
    answer: "AxylOS uses pacman as the primary package manager, inherited from Arch Linux. You can install packages using 'sudo pacman -S package-name' and update your system with 'sudo pacman -Syu'.",
    category: "Package Management",
    tags: ["pacman", "packages", "software"]
  },
  {
    id: "aur-access",
    question: "Can I use AUR packages on AxylOS?",
    answer: "Yes, AxylOS has full access to the Arch User Repository (AUR). You can use AUR helpers like 'yay' or 'paru' to easily install AUR packages. These come pre-installed with AxylOS.",
    category: "Package Management",
    tags: ["aur", "yay", "paru", "packages"]
  },
  {
    id: "desktop-environment",
    question: "What desktop environment does AxylOS use?",
    answer: "AxylOS comes with a customized desktop environment that focuses on beauty and functionality. It includes a curated selection of applications and themes designed to provide an excellent out-of-the-box experience.",
    category: "Desktop",
    tags: ["desktop", "environment", "interface"]
  },
  {
    id: "customization",
    question: "How can I customize the appearance of AxylOS?",
    answer: "AxylOS is highly customizable. You can change themes, icons, wallpapers, and window decorations through the system settings. Advanced users can also modify configuration files directly for deeper customization.",
    category: "Desktop",
    tags: ["customization", "themes", "appearance"]
  },
  {
    id: "wifi-issues",
    question: "My WiFi isn't working after installation. What should I do?",
    answer: "Most WiFi issues are related to missing drivers. Try running 'sudo pacman -S linux-firmware' to install additional firmware, or check if your WiFi adapter requires specific drivers. You can also use NetworkManager to manage connections.",
    category: "Hardware",
    tags: ["wifi", "network", "drivers", "hardware"]
  },
  {
    id: "graphics-drivers",
    question: "How do I install graphics drivers?",
    answer: "For NVIDIA cards, install 'nvidia' or 'nvidia-lts' packages. For AMD cards, the open-source drivers are usually pre-installed. For Intel graphics, install 'mesa' and 'intel-media-driver'. Use 'lspci | grep VGA' to identify your graphics card.",
    category: "Hardware",
    tags: ["graphics", "drivers", "nvidia", "amd", "intel"]
  },
  {
    id: "system-updates",
    question: "How do I update AxylOS?",
    answer: "Update your system using 'sudo pacman -Syu' to update all packages. For a complete system upgrade including the kernel, use 'sudo pacman -Syyu'. It's recommended to update regularly to get the latest security patches and features.",
    category: "System",
    tags: ["updates", "upgrade", "maintenance"]
  },
  {
    id: "backup-restore",
    question: "How can I backup my AxylOS installation?",
    answer: "You can use tools like 'rsync' for file-level backups or 'dd' for complete disk imaging. For system snapshots, consider using 'timeshift' or 'snapper'. Always backup your important data to an external drive or cloud storage.",
    category: "System",
    tags: ["backup", "restore", "data", "timeshift"]
  }
]

const supportChannels: SupportChannel[] = [
  {
    id: "discord",
    name: "Discord Community",
    description: "Join our active Discord server for real-time help and community discussions.",
    icon: <MessageCircle className="h-5 w-5" />,
    url: "https://discord.gg/axyl",
    responseTime: "Usually within 1 hour",
    status: "online"
  },
  {
    id: "forum",
    name: "Community Forum",
    description: "Post detailed questions and browse solutions from other users.",
    icon: <Users className="h-5 w-5" />,
    url: "https://forum.axyl.org",
    responseTime: "Within 24 hours",
    status: "online"
  },
  {
    id: "github",
    name: "GitHub Issues",
    description: "Report bugs and request features on our GitHub repository.",
    icon: <Github className="h-5 w-5" />,
    url: "https://github.com/axyl-os/axyl/issues",
    responseTime: "Within 48 hours",
    status: "online"
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Comprehensive guides and tutorials for all aspects of AxylOS.",
    icon: <Book className="h-5 w-5" />,
    url: "/docs",
    responseTime: "Available 24/7",
    status: "online"
  }
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [bugReportSubmitted, setBugReportSubmitted] = useState(false)

  const categories = ["All", "Installation", "Package Management", "Desktop", "Hardware", "System"]

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: SupportChannel['status']) => {
    switch (status) {
      case 'online': return 'text-green-600'
      case 'busy': return 'text-yellow-600'
      case 'offline': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: SupportChannel['status']) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'busy': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'offline': return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const handleBugReport = (e: React.FormEvent) => {
    e.preventDefault()
    setBugReportSubmitted(true)
    setTimeout(() => setBugReportSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            Support
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Help & Support
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, report bugs, and connect with the AxylOS community.
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="channels">Support Channels</TabsTrigger>
            <TabsTrigger value="bug-report">Bug Report</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Search FAQ</CardTitle>
                <CardDescription>
                  Find answers to frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  {filteredFAQ.length} question{filteredFAQ.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQ.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <span>{item.question}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-muted-foreground">{item.answer}</p>
                          <div className="flex gap-2">
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Channels Tab */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {supportChannels.map((channel) => (
                <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {channel.icon}
                        <div>
                          <CardTitle className="text-lg">{channel.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(channel.status)}
                            <span className={`text-sm ${getStatusColor(channel.status)}`}>
                              {channel.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">
                      {channel.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Response time: {channel.responseTime}
                      </p>
                      <Button className="w-full" asChild>
                        <Link href={channel.url} target={channel.url.startsWith('http') ? '_blank' : '_self'}>
                          {channel.icon}
                          <span className="ml-2">Visit {channel.name}</span>
                          {channel.url.startsWith('http') && <ExternalLink className="h-4 w-4 ml-2" />}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Statistics</CardTitle>
                <CardDescription>
                  Our growing community is here to help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12,847</div>
                    <div className="text-sm text-muted-foreground">Discord Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3,291</div>
                    <div className="text-sm text-muted-foreground">Forum Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">847</div>
                    <div className="text-sm text-muted-foreground">Issues Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Response Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bug Report Tab */}
          <TabsContent value="bug-report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Report a Bug
                </CardTitle>
                <CardDescription>
                  Help us improve AxylOS by reporting bugs and issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bugReportSubmitted ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Thank you for your bug report! We&apos;ll review it and get back to you soon.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleBugReport} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bug-title">Issue Title</Label>
                        <Input id="bug-title" placeholder="Brief description of the issue" required />
                      </div>
                      <div>
                        <Label htmlFor="bug-category">Category</Label>
                        <select id="bug-category" className="w-full px-3 py-2 border rounded-md bg-background" required>
                          <option value="">Select category</option>
                          <option value="installation">Installation</option>
                          <option value="hardware">Hardware</option>
                          <option value="software">Software</option>
                          <option value="performance">Performance</option>
                          <option value="ui">User Interface</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bug-description">Description</Label>
                      <textarea
                        id="bug-description"
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Please provide detailed steps to reproduce the issue..."
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="system-info">System Information</Label>
                        <Input id="system-info" placeholder="AxylOS version, hardware specs" />
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Contact Email (Optional)</Label>
                        <Input id="contact-email" type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        For urgent security issues, please contact us directly at security@axyl.org
                      </AlertDescription>
                    </Alert>
                    
                    <Button type="submit" className="w-full">
                      <Bug className="h-4 w-4 mr-2" />
                      Submit Bug Report
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Feature Request
                  </CardTitle>
                  <CardDescription>
                    Suggest new features or improvements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://github.com/axyl-os/axyl/issues/new?template=feature_request.md" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit Feature Request
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Contribute
                  </CardTitle>
                  <CardDescription>
                    Help make AxylOS better for everyone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://github.com/axyl-os/axyl/blob/main/CONTRIBUTING.md" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contributing Guide
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Installation Guide</CardTitle>
                  <CardDescription>
                    Step-by-step installation instructions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/docs/installation">
                      View Guide
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Troubleshooting</CardTitle>
                  <CardDescription>
                    Common issues and solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/docs/troubleshooting">
                      Get Help
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Security best practices and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/docs/security">
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community Guidelines</CardTitle>
                  <CardDescription>
                    How to participate in our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/community/guidelines">
                      Read Guidelines
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Developer resources and APIs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/docs/api">
                      View API Docs
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Video guides and walkthroughs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://youtube.com/@axyl-os" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Watch Videos
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  For urgent issues that need immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Security Issues</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Report security vulnerabilities privately
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="mailto:security@axyl.org">
                        Contact Security Team
                      </Link>
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Critical Bugs</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      System-breaking issues that need urgent attention
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://github.com/axyl-os/axyl/issues/new?labels=critical" target="_blank">
                        Report Critical Bug
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}