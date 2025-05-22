"use client";

import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturesSection } from "@/components/features/home/FeaturesSection";
import { ToolsSection } from "@/components/features/home/ToolsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ToolsSection />
    </div>
  );
}
