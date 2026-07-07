import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TextRevealSection from "@/components/home/TextRevealSection";
import ProcessSection from "@/components/home/ProcessSection";
import TeamSection from "@/components/home/TeamSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PhilosophyFAQSection from "@/components/home/PhilosophyFAQSection";
import ContactSection from "@/components/home/ContactSection";

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
      <TextRevealSection />
      <ProcessSection />
      <TeamSection />
      <StatsSection />
      <TestimonialsSection />
      <PhilosophyFAQSection />
      <ContactSection />
    </div>
  );
}

