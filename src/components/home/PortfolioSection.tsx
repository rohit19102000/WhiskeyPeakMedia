"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const triggerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const cards = itemsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          start: "top top",
          end: () => `+=${cards.length * 80}%`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // Quadrant coordinates:
          // Left Top: x = leftX, y = topY
          // Left Bottom: x = leftX, y = bottomY
          // Right Bottom (Exit): x = exitX, y = bottomY
          const leftX = "8vw";
          const topY = "8vh";
          const bottomY = isDesktop ? "54vh" : "52vh";
          const exitX = "120vw"; // Offscreen right
          const startY = "-100vh"; // Offscreen top

          cards.forEach((card, i) => {
            if (isDesktop) {
              // DESKTOP ANIMATION: Left Top -> Left Bottom -> Right Bottom
              // Entrance Position: Left Top -> Left Bottom (straight down, constant X, linear ease)
              tl.fromTo(
                card,
                {
                  x: leftX,
                  y: topY,
                  scale: 0.9,
                  rotate: 0,
                },
                {
                  x: leftX,
                  y: bottomY,
                  scale: 1,
                  rotate: 0,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8
              );

              // Entrance Opacity: Quick fade in (0 -> 1 over 0.3s) at the start of descent
              tl.fromTo(
                card,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.3,
                  ease: "none",
                },
                i * 0.8
              );

              // Exit Position: Left Bottom -> Right Bottom / offscreen right (straight right, constant Y, linear ease)
              tl.fromTo(
                card,
                {
                  x: leftX,
                  y: bottomY,
                  scale: 1,
                  rotate: 0,
                },
                {
                  x: exitX,
                  y: bottomY,
                  scale: 0.9,
                  rotate: 0,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8 + 1.2
              );

              // Exit Opacity: Quick fade out (1 -> 0 over 0.3s) at the end of the slide right
              tl.fromTo(
                card,
                { opacity: 1 },
                {
                  opacity: 0,
                  duration: 0.3,
                  ease: "none",
                },
                i * 0.8 + 1.9 // Starts fading out in the final 0.3s of the 1.0s exit phase
              );
            } else {
              // MOBILE ANIMATION: Right Bottom -> Left Bottom -> Left Top (exit offscreen top)
              // Entrance Position: Right Bottom -> Left Bottom (slides straight left, constant Y)
              tl.fromTo(
                card,
                {
                  x: exitX,
                  y: bottomY,
                  scale: 0.9,
                  rotate: 0,
                },
                {
                  x: leftX,
                  y: bottomY,
                  scale: 1,
                  rotate: 0,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8
              );

              // Entrance Opacity: Fades in to 100% exactly once it reaches Left Bottom (midpoint/center point)
              tl.fromTo(
                card,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8
              );

              // Exit Position: Left Bottom -> Left Top / offscreen top (slides straight up, constant X)
              tl.fromTo(
                card,
                {
                  x: leftX,
                  y: bottomY,
                  scale: 1,
                  rotate: 0,
                },
                {
                  x: leftX,
                  y: startY,
                  scale: 0.9,
                  rotate: 0,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8 + 1.2
              );

              // Exit Opacity: Fades out completely as it moves up
              tl.fromTo(
                card,
                { opacity: 1 },
                {
                  opacity: 0,
                  duration: 1.0,
                  ease: "none",
                },
                i * 0.8 + 1.2
              );
            }
          });
        }
      );
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={triggerRef}
      className="h-screen overflow-hidden bg-background text-foreground relative"
    >
      {/* ─── Fixed header ─── */}
      <div className="absolute top-8 left-8 z-30 mix-blend-difference">
        <span className="text-gold uppercase tracking-[0.25em] text-sm font-medium">
          Selected Works
        </span>
      </div>

      {/* ─── Heading and description at Right Top quadrant (Grid Aligned) ─── */}
      <div className="absolute top-24 left-8 md:top-36 md:left-[52vw] z-20 text-left max-w-lg md:max-w-xl flex flex-col items-start">
        <h2
          className="text-4xl md:text-6xl font-bold leading-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Projects That Speak Volumes
        </h2>
        <p className="text-body mt-6 text-sm md:text-base leading-relaxed mb-8">
          A curated collection of work that showcases our craft—strategy,
          design, and code coming together to create unforgettable digital
          experiences.
        </p>
        <Link
          href="/portfolio"
          className="inline-block text-lg md:text-xl font-medium text-foreground border-b-2 border-gold pb-1 transition-opacity duration-300 hover:opacity-70"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          View All Projects
        </Link>
      </div>

      {/* ─── Cards Container ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className={`absolute w-[68vw] h-[34vh] md:w-[26vw] md:h-[38vh] rounded-3xl overflow-hidden group transition-[filter,opacity] duration-700 cursor-pointer transform-gpu pointer-events-auto shadow-2xl border border-white/5 ${
              clickedCard === i ? "grayscale-0" : "grayscale md:hover:grayscale-0"
            }`}
            onClick={() => {
              if (window.innerWidth < 768) {
                setClickedCard(clickedCard === i ? null : i);
              }
            }}
            style={{
              left: 0,
              top: 0,
              zIndex: i,
              opacity: 0,
            }}
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                {project.category}
              </span>
              <h3
                className="text-2xl font-bold text-foreground mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
