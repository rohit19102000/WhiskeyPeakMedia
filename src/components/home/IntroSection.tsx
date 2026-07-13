"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

export default function IntroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Typing animation for the heading
      const headingEl = headingRef.current;
      if (headingEl) {
        const fullText = "Crafting Digital Excellence.";
        headingEl.innerHTML = ""; // Clear initial text to start typing
        const chars = fullText.split("");

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            let currentText = "";
            chars.forEach((char, index) => {
              gsap.delayedCall(index * 0.05, () => {
                currentText += char;
                // Add a gold blinking cursor during typing
                headingEl.innerHTML =
                  currentText +
                  `<span class="text-gold animate-pulse">|</span>`;

                // Remove the cursor after typing finishes
                if (index === chars.length - 1) {
                  gsap.delayedCall(0.5, () => {
                    headingEl.innerHTML = currentText;
                  });
                }
              });
            });
          },
        });
      }

      // 2. Trigger-once fade-in animation for the paragraphs on the right side
      gsap.fromTo(
        ".reveal-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
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
      className="intro-container py-32 px-6 md:px-20 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
        {/* Left Column */}
        <div className="md:w-1/3">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6">
            Who We Are
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Crafting Digital Excellence.
          </h2>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 max-w-2xl flex flex-col gap-8">
          <p className="reveal-text text-xl md:text-2xl font-light text-body leading-relaxed">
            We are a premium web design agency specializing in high-converting
            websites that blend stunning aesthetics with strategic functionality.
            Every pixel is placed with purpose, every animation crafted to
            captivate.
          </p>

          <p className="reveal-text text-base text-dim leading-relaxed">
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

