"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

export default function IntroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-container",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="intro-container py-32 px-6 md:px-20 bg-[#0A0A0A] text-[#F0EDE8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
        {/* Left Column */}
        <div className="md:w-1/3">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C8A97E] mb-6">
            Who We Are
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight text-[#F0EDE8]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Crafting Digital Excellence.
          </h2>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 max-w-2xl flex flex-col gap-8">
          <p className="reveal-text text-xl md:text-2xl font-light text-[#C8C4BC] leading-relaxed">
            We are a premium web design agency specializing in high-converting
            websites that blend stunning aesthetics with strategic functionality.
            Every pixel is placed with purpose, every animation crafted to
            captivate.
          </p>

          <p className="reveal-text text-base text-[#888] leading-relaxed">
            From concept to launch, we partner with ambitious brands to build
            digital experiences that stand apart. Our approach combines
            data-driven strategy with award-winning design to deliver results
            that exceed expectations.
          </p>

          <div className="reveal-text">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#portfolio")}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
