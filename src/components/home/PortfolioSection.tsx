"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const triggerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const scroller = scrollRef.current;
    if (!trigger || !scroller) return;

    const ctx = gsap.context(() => {
      // ─── Horizontal scroll tween ───
      const scrollTween = gsap.fromTo(
        scroller,
        { x: 0 },
        {
          x: () => -(scroller.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${scroller.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        }
      );

      // ─── Mobile: grayscale focus effect per item ───
      ScrollTrigger.matchMedia({
        "(max-width: 768px)": () => {
          itemsRef.current.filter(Boolean).forEach((item) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item!,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "right 20%",
                scrub: true,
              },
            });

            tl.fromTo(
              item!,
              { filter: "grayscale(100%)", scale: 1 },
              { filter: "grayscale(0%)", scale: 1.05, duration: 0.5 }
            ).to(item!, {
              filter: "grayscale(100%)",
              scale: 1,
              duration: 0.5,
            });
          });
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={triggerRef}
      className="h-screen overflow-hidden bg-[#0A0A0A] text-[#F0EDE8]"
    >
      {/* ─── Fixed header ─── */}
      <div className="absolute top-8 left-8 z-10 mix-blend-difference">
        <span className="text-[#C8A97E] uppercase tracking-[0.25em] text-sm font-medium">
          Selected Works
        </span>
      </div>

      {/* ─── Horizontal container ─── */}
      <div
        ref={scrollRef}
        className="flex h-full w-fit items-center gap-20 px-20 will-change-transform"
      >
        {/* ─── First panel: intro text ─── */}
        <div className="w-[50vw] flex-shrink-0 flex flex-col justify-center pr-10">
          <h2
            className="text-6xl md:text-8xl font-bold leading-[0.95] text-[#F0EDE8]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Projects That
            <br />
            Speak Volumes
          </h2>
          <p className="text-[#C8C4BC] mt-8 max-w-md text-lg leading-relaxed">
            A curated collection of work that showcases our craft—strategy,
            design, and code coming together to create unforgettable digital
            experiences.
          </p>
        </div>

        {/* ─── Project cards ─── */}
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="h-[60vh] w-[70vw] md:w-[30vw] flex-shrink-0 overflow-hidden rounded-2xl relative group grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
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
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8A97E] font-medium">
                {project.category}
              </span>
              <h3
                className="text-2xl font-bold text-[#F0EDE8] mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        ))}

        {/* ─── End panel: View All ─── */}
        <div className="w-[30vw] flex-shrink-0 flex items-center justify-center">
          <Link
            href="/portfolio"
            className="text-3xl md:text-4xl font-bold text-[#F0EDE8] border-b-2 border-[#C8A97E] pb-2 transition-opacity duration-300 hover:opacity-70"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
