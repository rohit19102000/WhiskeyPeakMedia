"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-a-software-developer-working-on-a-computer-7710/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex items-center justify-center h-full w-full px-6"
      >
        <div ref={textRef} className="text-center flex flex-col items-center gap-6">
          {/* Label */}
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#C8A97E]">
            Premium Web Design Agency
          </p>

          {/* Heading */}
          <h1
            className="text-6xl md:text-9xl font-bold tracking-tight text-[#F0EDE8] leading-none"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            WHISKEY PEAK
          </h1>

          {/* Subtext */}
          <p className="text-[#C8C4BC] font-light max-w-xl text-base md:text-lg">
            We craft digital experiences that convert visitors into customers.
            Premium websites with motion design that moves.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 mt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#contact")}
            >
              Start Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("#portfolio")}
            >
              View Work
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="w-full h-1/2 bg-[#C8A97E]"
          />
        </div>
      </motion.div>
    </section>
  );
}
