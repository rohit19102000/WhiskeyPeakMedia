"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
      const tl = gsap.timeline();

      // Label entrance
      tl.fromTo(
        ".hero-label",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );

      // Staggered 3D roll-in for letters
      tl.fromTo(
        ".hero-letter",
        {
          opacity: 0,
          y: 70,
          rotateX: -80,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          stagger: 0.035,
          duration: 1.1,
          ease: "back.out(1.5)",
          transformOrigin: "50% 50% -50",
        },
        "-=0.7"
      );

      // Subtext entrance
      tl.fromTo(
        ".hero-subtext",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      // Buttons entrance
      tl.fromTo(
        ".hero-buttons",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const words = "WHISKEY PEAK".split(" ");

  return (
    <>
      <style>{`
        /* Gold metallic reflection sweep */
        .hero-title-shimmer {
          color: var(--accent-gold);
          background: linear-gradient(
            to right,
            var(--text-primary) 15%,
            var(--accent-gold) 35%,
            #FFFFFF 50%,
            var(--accent-gold) 65%,
            var(--text-primary) 85%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: goldShine 6s linear infinite;
        }

        @supports (-webkit-background-clip: text) or (background-clip: text) {
          .hero-title-shimmer {
            color: transparent;
          }
        }

        @keyframes goldShine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src="/images/hero-bg.png"
            alt="Whiskey Peak Media Hero Background"
            fill
            priority
            className="object-cover opacity-45"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

        {/* Content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 flex items-center justify-center h-full w-full px-6"
        >
          <div
            ref={textRef}
            className="text-center flex flex-col items-center gap-6"
            style={{ perspective: "1000px" }}
          >
            {/* Label */}
            <p className="hero-label text-xs md:text-sm tracking-[0.4em] uppercase text-gold">
              Premium Web Design Agency
            </p>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none flex flex-nowrap justify-center gap-x-3 md:gap-x-8 overflow-hidden py-2 whitespace-nowrap w-full"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="hero-letter inline-block transform-gpu hero-title-shimmer"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <p className="hero-subtext text-[#C8C4BC] font-light max-w-xl text-base md:text-lg">
              We craft digital experiences that convert visitors into customers.
              Premium websites with motion design that moves.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex gap-6 mt-2">
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
              className="w-full h-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
