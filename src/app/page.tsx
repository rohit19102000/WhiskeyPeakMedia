import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";

const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"));
const PortfolioSection = dynamic(() => import("@/components/home/PortfolioSection"));
const TextRevealSection = dynamic(() => import("@/components/home/TextRevealSection"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const TeamSection = dynamic(() => import("@/components/home/TeamSection"));
const StatsSection = dynamic(() => import("@/components/home/StatsSection"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const PhilosophyFAQSection = dynamic(() => import("@/components/home/PhilosophyFAQSection"));
const ContactSection = dynamic(() => import("@/components/home/ContactSection"));

export const metadata: Metadata = {
  title: "Whiskey Peak Media | Premium Web Design Agency",
  description:
    "We craft digital experiences that convert visitors into customers. Premium websites with motion design that moves.",
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <IntroSection />
      <ServicesSection />
      <PortfolioSection />
      {/* Digital Craft is now rendered by PortfolioSection's Phase 2 transition
          on both desktop and mobile — TextRevealSection no longer renders here.
          TextRevealSection.tsx is kept as a reference/fallback file. */}
      <ProcessSection />
      <TeamSection />
      <StatsSection />
      <TestimonialsSection />
      <PhilosophyFAQSection />
      <ContactSection />
    </div>
  );
}

