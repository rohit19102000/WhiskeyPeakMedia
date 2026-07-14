"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pinned timeline with staggered card reveal
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: "+=150%",
            scrub: true,
          },
        });

        tl.from(
          cardsRef.current.filter(Boolean),
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          }
        );
      });

      // Mobile: each card fades in individually
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.filter(Boolean).forEach((card) => {
          gsap.from(card!, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-gold uppercase tracking-[0.25em] text-sm font-medium">
              Our Expertise
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Beyond Inspiration.
            </h2>
          </div>
          <p className="text-body max-w-md text-right text-base leading-relaxed">
            We blend strategy, design, and technology to build digital
            experiences that elevate brands beyond the ordinary.
          </p>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`group relative overflow-hidden rounded-3xl bg-card h-96 md:h-auto transform-gpu ${service.className}`}
            >
              {/* Background image */}
              <Image
                src={service.img}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/30" />

              {/* Bottom gradient + text */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-body mt-1 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {service.desc}
                </p>
              </div>

              {/* Arrow button */}
              <div className="absolute top-4 right-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
