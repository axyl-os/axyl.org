"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Terminal,
  Palette,
  Users,
  Download,
  Gamepad2,
  Layers,
  Rocket,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-2xl w-full space-y-8">
        {/* Hero Section */}
        <Card className="w-full">
          <CardHeader>
            <Badge variant="secondary" className="mb-4 flex items-center gap-2 text-base px-3 py-1">
              <Rocket className="h-4 w-4" />
              The Rise of AxylOS
            </Badge>
            <CardTitle className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              Modern. Open. User-First.
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              In 2025, the OS landscape felt stagnant: fragmented Linux, ad-driven Windows, and restrictive macOS. AxylOS is our answer—a ground-up OS built on Helctic, a Rust-based microkernel, designed for speed, security, and genuine user freedom.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Helctic Microkernel</CardTitle>
              <CardDescription>
                Drivers isolated in Driver-Space for core protection and reliability.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Custom Init</CardTitle>
              <CardDescription>
                UNIX-style init replaces systemd for minimal overhead and fast boots.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">No Bloat, No Telemetry</CardTitle>
              <CardDescription>
                No forced accounts. No tracking. Just pure OS.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Unified App Hub</CardTitle>
              <CardDescription>
                Bazaar integrates Nix, Flatpak, AUR, Snap, AppImage—one interface, real choice.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Gaming & Anticheat</CardTitle>
              <CardDescription>
                OS-native anticheat for performance and integrity. Gamers get first-class support.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Fast, Customizable UI</CardTitle>
              <CardDescription>
                Hyprland compositor & Quickshell-based “Dots Hyprland” design—fast, elegant, deeply customizable.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Philosophy Section */}
        <Card className="w-full mt-8">
          <CardHeader>
            <Badge variant="outline" className="mb-3 flex items-center gap-2 px-2 py-1">
              <Users className="h-4 w-4" />
              Our Philosophy
            </Badge>
            <CardDescription className="text-base">
              Build the OS we want to use. Creativity over metrics, stability over spectacle, users over shareholders. AxylOS isn’t another option—it’s a statement: modern, open, performant, and respectful.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Call to Action */}
        <div className="flex justify-center mt-6">
          <Button size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
