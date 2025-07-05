"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteBanner } from "@/components/site-banner";
import { Navigation } from "@/components/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Banner height: 40px, nav height: 64px
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false}>
      <SiteBanner
        isClosed={bannerClosed}
        onCloseAction={() => setBannerClosed(true)}
      />
      <Navigation bannerClosed={bannerClosed} />
      <main
        className={
          bannerClosed
            ? "pt-[64px]" // nav height only
            : "pt-[104px]" // banner (40px) + nav (64px)
        }
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </main>
    </ThemeProvider>
  );
}