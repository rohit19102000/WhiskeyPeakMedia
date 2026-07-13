"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM } from "@/data/team";

gsap.registerPlugin(ScrollTrigger);

const parallaxRanges: [number, number][] = [
  [100, -100],
  [50, -50],
  [80, -80],
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const range = parallaxRanges[index % parallaxRanges.length];
  const y = useTransform(scrollYProgress, [0, 1], range);

  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current.querySelector("img");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        {
          filter: "blur(20px)",
          opacity: 0,
          scale: 1.1,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div ref={cardRef} style={{ y }}>
      <div
        ref={imageRef}
        className="relative h-[50vh] md:h-[60vh] w-full rounded-3xl overflow-hidden group transform-gpu"
      >
        {/* Offset decorative frame */}
        <div
          className="absolute inset-0 border border-gold/15 rounded-3xl translate-x-4 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6 pointer-events-none z-10"
        />

        {/* Image */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          <h3
            className="text-xl md:text-2xl font-bold text-foreground mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {member.name}
          </h3>
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-3">
            {member.role}
          </p>
          <p className="text-sm text-body leading-relaxed italic opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            &ldquo;{member.quote}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgTextRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgTextRef.current, {
        xPercent: -5,
        scale: 1.1,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="min-h-[120vh] bg-background text-foreground overflow-hidden flex items-center py-20 relative"
    >
      {/* Large background text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] leading-none font-bold text-white/5 uppercase tracking-tighter whitespace-nowrap select-none pointer-events-none z-0 transform-gpu"
      >
        OUR TEAM
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4 block">
            The People
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Makers &amp; Thinkers
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TEAM.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
