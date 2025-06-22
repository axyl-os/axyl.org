"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  MessageCircle,
  Github,
  Heart,
  Star,
  Calendar,
  ExternalLink,
  Trophy,
  Zap,
  BookOpen,
  Code,
  Coffee,
  Gamepad2,
  Mic,
  Video,
  Globe,
  Clock,
  UserPlus,
  Activity,
  Target,
  Sparkles,
  Shield,
} from "lucide-react";

interface CommunityStats {
  totalMembers: number;
  onlineMembers: number;
  totalPosts: number;
  activeToday: number;
  githubStars: number;
  githubForks: number;
}

interface DiscordChannel {
  id: string;
  name: string;
  topic: string;
  memberCount: number;
  isActive: boolean;
  category: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "meeting" | "workshop" | "release" | "social";
  location: "Discord" | "Online" | "Hybrid";
  attendees: number;
  maxAttendees?: number;
}

interface ContributorSpotlight {
  id: string;
  name: string;
  avatar: string;
  role: string;
  contributions: string[];
  joinDate: string;
  githubUsername: string;
}

const communityStats: CommunityStats = {
  totalMembers: 12847,
  onlineMembers: 1284,
  totalPosts: 89372,
  activeToday: 432,
  githubStars: 2847,
  githubForks: 394,
};

const discordChannels: DiscordChannel[] = [
  {
    id: "general",
    name: "general",
    topic: "General discussion about AxylOS",
    memberCount: 12847,
    isActive: true,
    category: "General",
  },
  {
    id: "help",
    name: "help-support",
    topic: "Get help with installation and troubleshooting",
    memberCount: 8932,
    isActive: true,
    category: "Support",
  },
  {
    id: "development",
    name: "development",
    topic: "Development discussions and contributions",
    memberCount: 2847,
    isActive: true,
    category: "Development",
  },
  {
    id: "customization",
    name: "rice-showcase",
    topic: "Show off your desktop customizations",
    memberCount: 6543,
    isActive: true,
    category: "Showcase",
  },
  {
    id: "offtopic",
    name: "off-topic",
    topic: "Anything not related to AxylOS",
    memberCount: 5678,
    isActive: false,
    category: "Social",
  },
];

const upcomingEvents: CommunityEvent[] = [
  {
    id: "community-meeting",
    title: "Monthly Community Meeting",
    description:
      "Join us for our monthly community meeting to discuss upcoming features, community feedback, and Q&A with the development team.",
    date: "2024-03-15",
    time: "18:00 UTC",
    type: "meeting",
    location: "Discord",
    attendees: 89,
    maxAttendees: 200,
  },
  {
    id: "customization-workshop",
    title: "Desktop Customization Workshop",
    description:
      "Learn how to customize your AxylOS desktop with themes, icons, and advanced configurations.",
    date: "2024-03-20",
    time: "16:00 UTC",
    type: "workshop",
    location: "Online",
    attendees: 34,
    maxAttendees: 50,
  },
  {
    id: "release-party",
    title: "AxylOS 2024.3 Release Party",
    description:
      "Celebrate the launch of AxylOS 2024.3 with the community! We'll showcase new features and have fun activities.",
    date: "2024-03-25",
    time: "20:00 UTC",
    type: "release",
    location: "Discord",
    attendees: 156,
    maxAttendees: 500,
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getEventIcon = (type: CommunityEvent["type"]) => {
    switch (type) {
      case "meeting":
        return <Users className="h-4 w-4" />;
      case "workshop":
        return <BookOpen className="h-4 w-4" />;
      case "release":
        return <Sparkles className="h-4 w-4" />;
      case "social":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: CommunityEvent["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-700";
      case "workshop":
        return "bg-green-100 text-green-700";
      case "release":
        return "bg-purple-100 text-purple-700";
      case "social":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Users className="h-3 w-3 mr-1" />
            Community
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AxylOS Community
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our vibrant community of Linux enthusiasts, developers, and
            users. Connect, learn, and contribute to the future of AxylOS.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {communityStats.totalMembers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Members
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {communityStats.onlineMembers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {communityStats.totalPosts.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {communityStats.activeToday.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Today
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Join Discord */}
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Join Our Discord
                  </CardTitle>
                  <CardDescription>
                    Connect with the community in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {communityStats.onlineMembers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        members online
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="https://awfixer.link/discord" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Discord Server
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* GitHub Stats */}
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-slate-500/10"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Repository
                  </CardTitle>
                  <CardDescription>
                    Contribute to the development of AxylOS
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {communityStats.githubStars.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold flex items-center justify-center gap-1">
                        <Code className="h-4 w-4 text-blue-500" />
                        {communityStats.githubForks.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Forks</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href="https://github.com/axyl-os/axyl"
                      target="_blank"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Community Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Real-time Help</CardTitle>
                  <CardDescription>
                    Get instant help from community members and experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/support">Get Help Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Showcase Gallery</CardTitle>
                  <CardDescription>
                    Share your desktop customizations and setups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Contribute</CardTitle>
                  <CardDescription>
                    Help improve AxylOS through code, documentation, or feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href="https://github.com/axyl-os/axyl/blob/main/CONTRIBUTING.md"
                      target="_blank"
                    >
                      Start Contributing
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Discord Tab */}
          <TabsContent value="discord" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discord Channels</CardTitle>
                <CardDescription>
                  Explore our Discord server channels and find the right place
                  for your discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discordChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${channel.isActive ? "bg-green-500" : "bg-gray-400"}`}
                        ></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{channel.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {channel.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {channel.topic}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {channel.memberCount.toLocaleString()} members
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {channel.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            <Activity className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Discord Features</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mic className="h-4 w-4 text-primary" />
                      <span>Voice channels for meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-primary" />
                      <span>Screen sharing support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4 text-primary" />
                      <span>Gaming and social activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>Global community access</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" asChild>
                  <Link href="https://awfixer.link/discord" target="_blank">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Our Discord
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getEventColor(event.type)} text-xs`}>
                        {getEventIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.location}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>{event.attendees} attending</span>
                        {event.maxAttendees && (
                          <span className="text-muted-foreground">
                            / {event.maxAttendees} max
                          </span>
                        )}
                      </div>

                      {event.maxAttendees && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      )}

                      <Button className="w-full" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>
                  Our principles for maintaining a welcoming and productive
                  community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Core Values
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm font-bold">
                              1
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Respect & Inclusivity
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              We welcome everyone regardless of background,
                              experience level, or identity. Treat all members
                              with kindness and respect.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm font-bold">
                              2
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Constructive Communication
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Provide helpful, constructive feedback. Focus on
                              the issue, not the person. Ask questions to
                              understand before judging.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm font-bold">
                              3
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">Knowledge Sharing</h4>
                            <p className="text-sm text-muted-foreground">
                              Share your knowledge freely and help others learn.
                              Remember that everyone was a beginner once.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm font-bold">
                              4
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Quality & Excellence
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Strive for quality in contributions. Test your
                              code, proofread your writing, and think before
                              posting.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-500" />
                      Community Rules
                    </h3>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        These rules apply to all community spaces including
                        Discord, GitHub, and forums.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 text-green-700">
                          ✅ Encouraged Behavior
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Ask questions and seek help when needed</li>
                          <li>• Share your knowledge and experience</li>
                          <li>
                            • Provide constructive feedback and suggestions
                          </li>
                          <li>• Report bugs and contribute to improvements</li>
                          <li>• Help newcomers feel welcome</li>
                          <li>
                            • Use appropriate channels for different topics
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-700">
                          ❌ Prohibited Behavior
                        </h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Harassment, discrimination, or hate speech</li>
                          <li>
                            • Spam, excessive self-promotion, or off-topic
                            content
                          </li>
                          <li>• Sharing pirated software or illegal content</li>
                          <li>• Personal attacks or inflammatory language</li>
                          <li>
                            • Doxxing or sharing personal information without
                            consent
                          </li>
                          <li>
                            • Impersonation of other users or team members
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Heart className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Remember:</strong> These guidelines help us
                      maintain a positive environment where everyone can learn,
                      contribute, and enjoy being part of the AxylOS community.
                      Thank you for helping us create an amazing space!
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
