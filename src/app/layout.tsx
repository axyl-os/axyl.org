import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteBanner } from "@/components/site-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AxylOS - A Beautiful Arch-based Linux Distribution",
  description:
    "AxylOS is a beautiful, user-friendly Arch-based Linux distribution designed for desktop users who want power and simplicity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <SiteBanner />
            <Navigation />
            <main className="pt-[100px]">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
